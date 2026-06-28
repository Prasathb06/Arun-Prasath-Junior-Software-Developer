const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

// @POST /api/admin/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required.' })
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() })
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' })
    }

    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' })
    }

    const token = generateToken(admin._id)
    res.json({ success: true, token, admin: { id: admin._id, email: admin.email } })
  } catch (err) {
    next(err)
  }
}

// @POST /api/admin/setup  - One-time admin creation (disable after use)
const setup = async (req, res, next) => {
  try {
    const existing = await Admin.countDocuments()
    if (existing > 0) {
      return res.status(403).json({ success: false, message: 'Admin already exists.' })
    }

    const email = process.env.ADMIN_EMAIL
    const password = process.env.ADMIN_PASSWORD

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Set ADMIN_EMAIL and ADMIN_PASSWORD in .env' })
    }

    const admin = await Admin.create({ email, password })
    const token = generateToken(admin._id)

    res.status(201).json({ success: true, message: 'Admin created successfully!', token })
  } catch (err) {
    next(err)
  }
}

module.exports = { login, setup }
