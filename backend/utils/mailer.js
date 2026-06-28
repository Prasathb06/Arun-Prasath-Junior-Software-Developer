const nodemailer = require('nodemailer')

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })
}

const sendContactEmail = async ({ name, email, subject, message }) => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.log('⚠️  Email not configured - skipping send')
    return
  }

  const transporter = createTransporter()

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO || process.env.MAIL_USER,
    replyTo: email,
    subject: `📬 New Message: ${subject || 'No Subject'} - from ${name}`,
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f1e; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08);">
        <div style="background: linear-gradient(135deg, #06e496, #00bc7a); padding: 28px 32px;">
          <h1 style="color: #030712; margin: 0; font-size: 22px; font-weight: 800;">New Portfolio Message</h1>
          <p style="color: rgba(3,7,18,0.7); margin: 4px 0 0; font-size: 14px;">Someone reached out via your portfolio</p>
        </div>
        <div style="padding: 28px 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 80px;">From</td><td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #06e496;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Subject</td><td style="padding: 8px 0; color: #ffffff;">${subject || 'No Subject'}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <p style="color: #d1d5db; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <a href="mailto:${email}" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #06e496; color: #030712; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">Reply to ${name}</a>
        </div>
        <div style="padding: 16px 32px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
          <p style="color: #374151; font-size: 12px; margin: 0;">Arun Prasath B · Portfolio Contact System</p>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

module.exports = { sendContactEmail }
