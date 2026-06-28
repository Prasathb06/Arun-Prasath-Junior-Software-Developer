require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorHandler')

// Routes
const projectRoutes = require('./routes/projectRoutes')
const contactRoutes = require('./routes/contactRoutes')
const adminRoutes = require('./routes/adminRoutes')

// Connect Database
connectDB()

const app = express()

// ─── Security Middleware ───────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
})
app.use('/api/', limiter)

// Contact form stricter limit
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { success: false, message: 'Too many messages sent. Please wait an hour.' },
})
app.use('/api/contact', contactLimiter)

// ─── Core Middleware ───────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'https://arunprasath.vercel.app', // Update with your actual Vercel URL
  ],
  credentials: true,
}))

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// ─── Routes ───────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Arun Portfolio API is running!',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  })
})

app.use('/api/projects', projectRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/admin', adminRoutes)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
})

// ─── Error Handler ─────────────────────────────────────────────
app.use(errorHandler)

// ─── Start Server ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`)
  console.log(`📁 Environment: ${process.env.NODE_ENV}`)
  console.log(`🔗 Health: http://localhost:${PORT}/api/health\n`)
})
