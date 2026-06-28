const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    techStack: [{ type: String, trim: true }],
    github: { type: String, trim: true, default: '' },
    liveDemo: { type: String, trim: true, default: '' },
    image: { type: String, trim: true, default: '' },
    emoji: { type: String, default: '💻' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Project', projectSchema)
