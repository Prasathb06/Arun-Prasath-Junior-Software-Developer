import { motion } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group glass rounded-2xl overflow-hidden border border-white/5 hover:border-primary-500/30 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-36 bg-gradient-to-br from-dark-500 to-dark-700">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="font-mono text-xs text-gray-600 mt-2">{project.title}</div>
            </div>
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'linear-gradient(rgba(104,93,216,1) 1px, transparent 1px), linear-gradient(90deg, rgba(104,93,216,1) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-800/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Live Demo hover button */}
        {project.liveDemo && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-8 h-8 rounded-lg bg-dark-900/80 backdrop-blur flex items-center justify-center text-gray-300 hover:text-primary-400 border border-white/10 hover:border-primary-500/40 transition-all"
            >
              <FiExternalLink size={14} />
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div>
          <h3 className="font-display font-bold text-white text-base group-hover:text-primary-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 font-body text-xs mt-1 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1 flex-1">
          {project.techStack?.map((tech) => (
            <span key={tech} className="tag text-xs py-0">
              {tech}
            </span>
          ))}
        </div>

        {/* Live Demo button only */}
        {project.liveDemo && (
          <div className="pt-2 border-t border-white/5">
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-primary-500/10 border border-primary-500/30 text-primary-400 hover:bg-primary-500/20 transition-all duration-200 font-body text-sm font-medium"
            >
              <FiExternalLink size={14} /> Live Demo
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}