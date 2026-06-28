import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import ProjectCard from './ProjectCard'

const demoProjects = [
  {
    _id: '1',
    title: 'Full Stack E-Commerce',
    description: 'A complete e-commerce platform with product management, cart, orders, and Razorpay payment integration.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/yourusername/ecommerce',
    liveDemo: 'https://ecommerce-demo.vercel.app',
    emoji: '🛒',
  },
  {
    _id: '2',
    title: 'Portfolio CMS',
    description: 'A developer portfolio with an admin panel to manage projects and messages, built with JWT authentication.',
    techStack: ['React', 'Node.js', 'MongoDB', 'JWT', 'Framer Motion'],
    github: 'https://github.com/yourusername/portfolio',
    liveDemo: 'https://portfolio.vercel.app',
    emoji: '🌐',
  },
  {
    _id: '3',
    title: 'Task Manager App',
    description: 'Real-time task management application with drag-and-drop, priority labels, and team collaboration features.',
    techStack: ['React', 'Express', 'MongoDB', 'Socket.io'],
    github: 'https://github.com/yourusername/taskmanager',
    liveDemo: 'https://tasks-demo.vercel.app',
    emoji: '✅',
  },
  {
    _id: '4',
    title: 'Weather Dashboard',
    description: 'Beautiful weather app with 7-day forecast, geolocation support, and animated weather icons.',
    techStack: ['React', 'OpenWeather API', 'Tailwind CSS'],
    github: 'https://github.com/yourusername/weather',
    liveDemo: 'https://weather-demo.vercel.app',
    emoji: '🌤️',
  },
]

export default function ProjectsSection() {
  const [projects, setProjects] = useState(demoProjects)
  const [loading, setLoading] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const res = await axios.get('/api/projects')
        if (res.data?.projects?.length > 0) {
          setProjects(res.data.projects)
        }
      } catch {
        // Use demo projects if API fails
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <section id="projects" className="py-24 relative">
      {/* BG blur */}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass rounded-2xl h-80 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        )}

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
          >
            View All on GitHub →
          </a>
        </motion.div> */}
      </div>
    </section>
  )
}
