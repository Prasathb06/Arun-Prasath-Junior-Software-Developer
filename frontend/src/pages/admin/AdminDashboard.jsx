import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  FiPlus, FiEdit2, FiTrash2, FiLogOut, FiMail, FiEye,
  FiX, FiSave, FiFolder, FiInbox, FiUploadCloud, FiImage, FiMenu
} from 'react-icons/fi'
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors
} from '@dnd-kit/core'
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates,
  useSortable, verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useAuth } from '../../context/AuthContext'

const emptyProject = { title: '', description: '', techStack: '', github: '', liveDemo: '', image: '', emoji: '💻' }

// ── Sortable Project Row ──────────────────────────────────────
function SortableProjectRow({ p, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: p._id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 'auto',
  }

  return (
    <div ref={setNodeRef} style={style}>
      <motion.div
        layout
        className={`glass rounded-2xl p-5 border flex items-center justify-between gap-4 transition-all ${isDragging ? 'border-primary-500/40 shadow-lg shadow-primary-500/10' : 'border-white/5'}`}
      >
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-600 hover:text-gray-400 transition-colors flex-shrink-0 touch-none"
        >
          <FiMenu size={18} />
        </button>

        <div className="flex items-center gap-4 flex-1 min-w-0">
          {p.image ? (
            <img src={p.image} alt={p.title} className="w-12 h-12 rounded-xl object-cover border border-white/10 flex-shrink-0" />
          ) : (
            <div className="text-2xl flex-shrink-0">{p.emoji || '💻'}</div>
          )}
          <div className="min-w-0">
            <div className="font-display font-bold text-white truncate">{p.title}</div>
            <div className="text-gray-500 text-xs font-body mt-0.5 truncate">{p.description}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {p.techStack?.slice(0, 3).map(t => <span key={t} className="tag text-xs py-0">{t}</span>)}
              {p.techStack?.length > 3 && <span className="tag text-xs py-0">+{p.techStack.length - 3}</span>}
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button onClick={() => onEdit(p)} className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-500/30 transition-all">
            <FiEdit2 size={15} />
          </button>
          <button onClick={() => onDelete(p._id)} className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-all">
            <FiTrash2 size={15} />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────
export default function AdminDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyProject)
  const [editId, setEditId] = useState(null)
  const [selectedMsg, setSelectedMsg] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [projRes, msgRes] = await Promise.all([
        axios.get('/api/projects'),
        axios.get('/api/admin/messages'),
      ])
      setProjects(projRes.data.projects || [])
      setMessages(msgRes.data.messages || [])
    } catch {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = projects.findIndex(p => p._id === active.id)
    const newIndex = projects.findIndex(p => p._id === over.id)
    const reordered = arrayMove(projects, oldIndex, newIndex)

    setProjects(reordered)

    // Save new order to backend
    try {
      await Promise.all(
        reordered.map((p, i) =>
          axios.put(`/api/projects/${p._id}`, { order: i })
        )
      )
      toast.success('Order saved!')
    } catch {
      toast.error('Failed to save order')
      fetchAll() // revert on error
    }
  }

  const openAdd = () => { setForm(emptyProject); setEditId(null); setModal('add') }
  const openEdit = (p) => { setForm({ ...p, techStack: p.techStack?.join(', ') || '' }); setEditId(p._id); setModal('edit') }

  const handleImageSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB'); return }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setForm(prev => ({ ...prev, image: res.data.imageUrl }))
      toast.success('Image uploaded!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleSave = async () => {
    if (!form.title || !form.description) return toast.error('Title and description required')
    setSaving(true)
    try {
      const payload = { ...form, techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean) }
      if (editId) {
        await axios.put(`/api/projects/${editId}`, payload)
        toast.success('Project updated!')
      } else {
        await axios.post('/api/projects', payload)
        toast.success('Project added!')
      }
      setModal(null)
      fetchAll()
    } catch {
      toast.error('Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await axios.delete(`/api/projects/${id}`)
      toast.success('Deleted!')
      fetchAll()
    } catch {
      toast.error('Delete failed')
    }
  }

  const handleLogout = () => { logout(); navigate('/admin/login') }

  return (
    <div className="min-h-screen bg-dark-900 pt-8 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-white">Admin <span className="text-gradient">Dashboard</span></h1>
            <p className="text-gray-500 font-body text-sm mt-1">Manage your portfolio content</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all text-sm font-body">
            <FiLogOut size={16} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass rounded-2xl p-5 border border-white/5">
            <div className="text-3xl font-display font-bold text-primary-400">{projects.length}</div>
            <div className="text-gray-500 font-body text-sm mt-1">Total Projects</div>
          </div>
          <div className="glass rounded-2xl p-5 border border-white/5">
            <div className="text-3xl font-display font-bold text-blue-400">{messages.length}</div>
            <div className="text-gray-500 font-body text-sm mt-1">Messages Received</div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {['projects', 'messages'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-body font-medium text-sm capitalize transition-all ${tab === t ? 'bg-primary-500/10 text-primary-400 border border-primary-500/30' : 'text-gray-500 hover:text-gray-300 glass border border-white/5'}`}
            >
              {t === 'projects' ? <FiFolder size={14} /> : <FiInbox size={14} />} {t}
            </button>
          ))}
        </div>

        {tab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 font-body text-xs flex items-center gap-1.5">
                <FiMenu size={12} /> Drag to reorder projects
              </p>
              <button onClick={openAdd} className="btn-primary text-sm py-2 px-4">
                <FiPlus size={16} /> Add Project
              </button>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => <div key={i} className="glass rounded-2xl h-20 animate-pulse border border-white/5" />)}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-16 text-gray-600 font-body">No projects yet. Add your first one!</div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={projects.map(p => p._id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-3">
                    {projects.map(p => (
                      <SortableProjectRow key={p._id} p={p} onEdit={openEdit} onDelete={handleDelete} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        )}

        {tab === 'messages' && (
          <div className="space-y-3">
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => <div key={i} className="glass rounded-2xl h-20 animate-pulse border border-white/5" />)}
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-16 text-gray-600 font-body">No messages yet.</div>
            ) : (
              messages.map(m => (
                <motion.div key={m._id} layout className="glass rounded-2xl p-5 border border-white/5 flex items-start justify-between gap-4 cursor-pointer hover:border-primary-500/20 transition-all" onClick={() => { setSelectedMsg(m); setModal('view-msg') }}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <FiMail size={15} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-white text-sm">{m.name}</div>
                      <div className="text-primary-400 font-mono text-xs">{m.email}</div>
                      {m.subject && <div className="text-gray-500 text-xs mt-1 font-body">{m.subject}</div>}
                      <p className="text-gray-500 text-xs mt-1 font-body line-clamp-1">{m.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-gray-600 font-mono text-xs">{new Date(m.createdAt).toLocaleDateString()}</span>
                    <FiEye size={14} className="text-gray-600" />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {modal && modal !== 'view-msg' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-6 border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-white">{modal === 'edit' ? 'Edit Project' : 'Add Project'}</h2>
                <button onClick={() => setModal(null)} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <FiX size={16} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1.5 uppercase tracking-wider">Title *</label>
                  <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="My Awesome Project"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 font-body text-sm focus:outline-none focus:border-primary-500/60 transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1.5 uppercase tracking-wider">Project Image</label>
                  {form.image ? (
                    <div className="relative rounded-xl overflow-hidden border border-white/10 group">
                      <img src={form.image} alt="Preview" className="w-full h-40 object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button type="button" onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur text-white text-xs font-body flex items-center gap-1.5 hover:bg-white/20 transition-all">
                          <FiUploadCloud size={13} /> Replace
                        </button>
                        <button type="button" onClick={() => setForm(p => ({ ...p, image: '' }))}
                          className="px-3 py-1.5 rounded-lg bg-red-500/20 backdrop-blur text-red-300 text-xs font-body flex items-center gap-1.5 hover:bg-red-500/30 transition-all">
                          <FiX size={13} /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                      className="w-full h-32 rounded-xl border border-dashed border-white/15 hover:border-primary-500/40 bg-white/[0.02] hover:bg-primary-500/5 transition-all flex flex-col items-center justify-center gap-2 group disabled:opacity-60">
                      {uploading ? (
                        <><div className="w-6 h-6 rounded-full border-2 border-primary-400 border-t-transparent animate-spin" /><span className="text-xs text-gray-500 font-body">Uploading...</span></>
                      ) : (
                        <><FiImage size={22} className="text-gray-600 group-hover:text-primary-400 transition-colors" />
                          <span className="text-xs text-gray-500 font-body group-hover:text-gray-400 transition-colors">Click to upload image</span>
                          <span className="text-xs text-gray-700 font-mono">JPEG, PNG, WEBP — max 5MB</span></>
                      )}
                    </button>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleImageSelect} className="hidden" />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1.5 uppercase tracking-wider">Emoji (fallback)</label>
                  <input type="text" value={form.emoji} onChange={e => setForm(p => ({ ...p, emoji: e.target.value }))} placeholder="💻"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 font-body text-sm focus:outline-none focus:border-primary-500/60 transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1.5 uppercase tracking-wider">GitHub URL</label>
                  <input type="text" value={form.github} onChange={e => setForm(p => ({ ...p, github: e.target.value }))} placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 font-body text-sm focus:outline-none focus:border-primary-500/60 transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1.5 uppercase tracking-wider">Live Demo URL</label>
                  <input type="text" value={form.liveDemo} onChange={e => setForm(p => ({ ...p, liveDemo: e.target.value }))} placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 font-body text-sm focus:outline-none focus:border-primary-500/60 transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1.5 uppercase tracking-wider">Tech Stack (comma-separated)</label>
                  <input type="text" value={form.techStack} onChange={e => setForm(p => ({ ...p, techStack: e.target.value }))} placeholder="React, Node.js, MongoDB"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 font-body text-sm focus:outline-none focus:border-primary-500/60 transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1.5 uppercase tracking-wider">Description *</label>
                  <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} placeholder="What does this project do?"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 font-body text-sm focus:outline-none focus:border-primary-500/60 transition-all resize-none" />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-all font-body text-sm">Cancel</button>
                <button onClick={handleSave} disabled={saving || uploading} className="flex-1 btn-primary justify-center py-2.5 text-sm disabled:opacity-60">
                  {saving ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <><FiSave size={15} /> Save</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {modal === 'view-msg' && selectedMsg && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-6 border border-white/10 w-full max-w-lg"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-xl text-white">Message</h2>
                <button onClick={() => setModal(null)} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white">
                  <FiX size={16} />
                </button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-gray-500 font-mono mb-1">From</div>
                    <div className="text-white font-body font-medium text-sm">{selectedMsg.name}</div>
                  </div>
                  <div className="glass rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-gray-500 font-mono mb-1">Email</div>
                    <div className="text-primary-400 font-body text-sm">{selectedMsg.email}</div>
                  </div>
                </div>
                {selectedMsg.subject && (
                  <div className="glass rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-gray-500 font-mono mb-1">Subject</div>
                    <div className="text-white font-body text-sm">{selectedMsg.subject}</div>
                  </div>
                )}
                <div className="glass rounded-xl p-4 border border-white/5">
                  <div className="text-xs text-gray-500 font-mono mb-2">Message</div>
                  <p className="text-gray-300 font-body text-sm leading-relaxed whitespace-pre-wrap">{selectedMsg.message}</p>
                </div>
                <div className="text-right text-xs text-gray-600 font-mono">{new Date(selectedMsg.createdAt).toLocaleString()}</div>
              </div>
              <a href={`mailto:${selectedMsg.email}`} className="mt-4 flex w-full btn-primary justify-center text-sm py-2.5">
                <FiMail size={15} /> Reply via Email
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}