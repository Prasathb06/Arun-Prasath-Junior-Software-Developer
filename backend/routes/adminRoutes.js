const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const { login, setup } = require('../controllers/adminController')
const { getMessages } = require('../controllers/contactController')

router.post('/login', login)
router.post('/setup', setup)           // One-time use — run once, then it's disabled
router.get('/messages', protect, getMessages)

module.exports = router
