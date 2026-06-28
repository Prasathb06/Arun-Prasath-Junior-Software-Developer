const Project = require('../models/Project')

// @GET /api/projects  - Public
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 })
    res.json({ success: true, projects })
  } catch (err) {
    next(err)
  }
}

// @POST /api/projects  - Admin only
const createProject = async (req, res, next) => {
  try {
    const { title, description, techStack, github, liveDemo, image, emoji, featured, order } = req.body
    const project = await Project.create({ title, description, techStack, github, liveDemo, image, emoji, featured, order })
    res.status(201).json({ success: true, project })
  } catch (err) {
    next(err)
  }
}

// @PUT /api/projects/:id  - Admin only
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' })
    res.json({ success: true, project })
  } catch (err) {
    next(err)
  }
}

// @DELETE /api/projects/:id  - Admin only
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' })
    res.json({ success: true, message: 'Project deleted' })
  } catch (err) {
    next(err)
  }
}

module.exports = { getProjects, createProject, updateProject, deleteProject }
