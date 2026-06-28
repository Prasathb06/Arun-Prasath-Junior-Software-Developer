const Contact = require('../models/Contact')
const { sendContactEmail } = require('../utils/mailer')

// @POST /api/contact  - Public
const sendMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email.' })
    }

    const contact = await Contact.create({ name, email, subject, message })

    // Send email notification (non-blocking)
    sendContactEmail({ name, email, subject, message }).catch(err =>
      console.error('Email send failed:', err.message)
    )

    res.status(201).json({ success: true, message: 'Message received! I will get back to you soon.', contact })
  } catch (err) {
    next(err)
  }
}

// @GET /api/admin/messages  - Admin only
const getMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.json({ success: true, messages })
  } catch (err) {
    next(err)
  }
}

module.exports = { sendMessage, getMessages }
