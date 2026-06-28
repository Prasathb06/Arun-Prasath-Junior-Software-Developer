import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiMail, FiEye, FiX, FiSave, FiFolder, FiInbox } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const emptyProject = { title: '', description: '', techStack: '', github: '', liveDemo: '', image: '', emoji: '💻' }

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

  const openAdd = () => { setForm(emptyProject); setEditId(null); setModal('add') }
  const openEdit = (p) => { setForm({ ...p, techStack: p.techStack?.join(', ') || '' }); setEditId(p._id); setModal('edit') }

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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-white">Admin <span className="text-gradient">Dashboard</span></h1>
            <p className="text-gray-500 font-body text-sm mt-1">Manage your portfolio content</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all text-sm font-body">
            <FiLogOut size={16} /> Logout
          </button>
        </div>

        {/* Stats */}
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

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['projects', 'messages'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-xl font-body font-medium text-sm capitalize transition-all ${tab === t ? 'bg-primary-500/10 text-primary-400 border border-primary-500/30' : 'text-gray-500 hover:text-gray-300 glass border border-white/5'}`}
            >
              {t === 'projects' ? <FiFolder/> : <FiInbox/> } {t}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {tab === 'projects' && (
          <div className="space-y-4">
            <div className="flex justify-end">
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
              projects.map(p => (
                <motion.div key={p._id} layout className="glass rounded-2xl p-5 border border-white/5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="text-2xl">{p.emoji || '💻'}</div>
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
                    <button onClick={() => openEdit(p)} className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-500/30 transition-all">
                      <FiEdit2 size={15} />
                    </button>
                    <button onClick={() => handleDelete(p._id)} className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-all">
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Messages Tab */}
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

      {/* Modal */}
      <AnimatePresence>
        {modal && modal !== 'view-msg' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-6 border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-white">{modal === 'edit' ? 'Edit Project' : 'Add Project'}</h2>
                <button onClick={() => setModal(null)} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <FiX size={16} />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Title *', name: 'title', placeholder: 'My Awesome Project' },
                  { label: 'Emoji', name: 'emoji', placeholder: '💻' },
                  { label: 'GitHub URL', name: 'github', placeholder: 'https://github.com/...' },
                  { label: 'Live Demo URL', name: 'liveDemo', placeholder: 'https://...' },
                  { label: 'Image URL', name: 'image', placeholder: 'https://...' },
                  { label: 'Tech Stack (comma-separated)', name: 'techStack', placeholder: 'React, Node.js, MongoDB' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-xs font-mono text-gray-500 mb-1.5 uppercase tracking-wider">{f.label}</label>
                    <input
                      type="text"
                      name={f.name}
                      value={form[f.name]}
                      onChange={e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 font-body text-sm focus:outline-none focus:border-primary-500/60 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1.5 uppercase tracking-wider">Description *</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    rows={3}
                    placeholder="What does this project do?"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 font-body text-sm focus:outline-none focus:border-primary-500/60 transition-all resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-all font-body text-sm">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="flex-1 btn-primary justify-center py-2.5 text-sm disabled:opacity-60">
                  {saving ? <div className="w-4 h-4 rounded-full border-2 border-dark-900 border-t-transparent animate-spin" /> : <><FiSave size={15} /> Save</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {modal === 'view-msg' && selectedMsg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
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
