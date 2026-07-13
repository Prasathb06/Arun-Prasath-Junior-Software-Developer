import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import ProjectCard from './ProjectCard'

const API_URL = import.meta.env.VITE_API_URL || ''

const demoProjects = [
  {
    _id: '1',
    title: 'Smart Expense Tracker',
    description: 'A responsive Smart Expense Tracker built with HTML, CSS & JS. Supports full CRUD via MockAPI REST integration, tracks income vs expenses with live charts.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'MockAPI'],
    liveDemo: 'https://smartexpensetracker2026.netlify.app',
    emoji: '💰',
  },
]
export default function ProjectsSection() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${API_URL}/api/projects`)
        if (res.data?.projects?.length > 0) {
          setProjects(res.data.projects)
        } else {
          setProjects(demoProjects)
        }
      } catch {
        setProjects(demoProjects)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <section id="projects" className="py-16 relative">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-500/3 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-primary-400 text-sm tracking-widest uppercase mb-3">My Work</p>
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            A selection of projects I've built — from full-stack web apps to REST APIs
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass rounded-2xl h-80 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}