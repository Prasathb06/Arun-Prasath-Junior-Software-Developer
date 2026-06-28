import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi'

const contactInfo = [
  { icon: FiMail, label: 'Email', value: 'arunprasathb045@gmail.com', href: 'mailto:arunprasathb045@gmail.com' },
  { icon: FiMapPin, label: 'Location', value: 'Madurai, Tamil Nadu', href: null },
  { icon: FiGithub, label: 'GitHub', value: '@Prasathb06', href: 'https://github.com/Prasathb06' },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'Arun Prasath B', href: 'https://www.linkedin.com/in/arun-prasath-b-846b9a254/' },
]

export default function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields')
      return
    }
    setSending(true)
    try {
      await axios.post('/api/contact', form)
      toast.success("Message sent! I'll get back to you soon")
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Try again!')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary-500/3 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-primary-400 text-sm tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="section-title">Contact <span className="text-gradient">Me</span></h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">

          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Let's work together — flex-1 so it stretches */}
            <div className="glass rounded-2xl p-6 border border-white/5 flex-1">
              <h3 className="font-display font-bold text-white text-xl mb-2">Let's work together</h3>
              <p className="text-gray-400 font-body text-sm leading-relaxed">
                I'm currently open to freelance projects, full-time roles, and collaboration opportunities.
                If you have an idea, let's build it together!
              </p>
            </div>

            {/* Contact info cards */}
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {info.href ? (
                  <a
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 glass rounded-xl border border-white/5 hover:border-primary-500/30 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors flex-shrink-0">
                      <info.icon className="text-primary-400" size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-gray-500 font-mono">{info.label}</div>
                      <div className="text-sm text-gray-300 font-body font-medium group-hover:text-primary-400 transition-colors truncate">{info.value}</div>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 glass rounded-xl border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                      <info.icon className="text-primary-400" size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-mono">{info.label}</div>
                      <div className="text-sm text-gray-300 font-body font-medium">{info.value}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Right form — h-full so it matches left height */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 h-full"
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 sm:p-8 border border-white/5 flex flex-col gap-5 h-full"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                    Name <span className="text-primary-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Arun Prasath"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 font-body text-sm focus:outline-none focus:border-primary-500/60 focus:bg-primary-500/5 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                    Email <span className="text-primary-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="arun@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 font-body text-sm focus:outline-none focus:border-primary-500/60 focus:bg-primary-500/5 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 font-body text-sm focus:outline-none focus:border-primary-500/60 focus:bg-primary-500/5 transition-all duration-200"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                  Message <span className="text-primary-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  className="flex-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 font-body text-sm focus:outline-none focus:border-primary-500/60 focus:bg-primary-500/5 transition-all duration-200 resize-none min-h-[120px]"
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={18} /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}