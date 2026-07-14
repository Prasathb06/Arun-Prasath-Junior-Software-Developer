const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const upload = require('../middleware/upload')

router.post('/', protect, upload.single('image'), (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' })
        }
        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            imageUrl: req.file.path,
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router