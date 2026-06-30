const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')
const upload = require('../middleware/upload')

router.post('/', protect, upload.single('image'), (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' })
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/projects/${req.file.filename}`

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            imageUrl,
            filename: req.file.filename,
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router