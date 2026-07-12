import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  SiReact, SiTailwindcss, SiJavascript, SiNodedotjs, SiExpress,
  SiMongodb, SiGit, SiGithub, SiHtml5, SiPostman, SiVercel, SiVite, SiJsonwebtokens, SiMysql
} from 'react-icons/si'
import { FiMonitor, FiServer, FiDatabase, FiTool, FiGlobe } from 'react-icons/fi'
import { DiCss3 as SiCss3 } from 'react-icons/di'

const skillCategories = [
  {
    title: 'Frontend',
    icon: FiMonitor,
    color: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/20',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' }
    ]
  },
  {
    title: 'Backend',
    icon: FiServer,
    color: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/20',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, color: '#A8B2D1' },
      { name: 'JWT Auth', icon: SiJsonwebtokens, color: '#FB015B' },
      { name: 'REST API', icon: FiGlobe, color: '#38BDF8' }
    ]
  },
  {
    title: 'Database',
    icon: FiDatabase,
    color: 'from-yellow-500/20 to-orange-500/20',
    border: 'border-yellow-500/20',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' }
    ]
  },
  {
    title: 'Tools',
    icon: FiTool,
    color: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/20',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#FFFFFF' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'Vercel', icon: SiVercel, color: '#FFFFFF' }
    ]
  }
]

const marqueeSkills = [
  ...skillCategories.flatMap((c) => c.skills),
  ...skillCategories.flatMap((c) => c.skills)
]

export default function SkillsSection() {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true
  })

  return (
    <section id="skills" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-mono text-primary-400 text-sm tracking-widest uppercase mb-3">
              What I Use
            </p>
            <h2 className="section-title">
              Tech <span className="text-gradient">Stack</span>
            </h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Technologies I use to build fast, scalable, and beautiful applications
            </p>
          </motion.div>
        </div>

        {/* Skill Categories */}
        <div className="grid sm:grid-cols-2 gap-6">
          {skillCategories.map((cat, catIdx) => {
            const CategoryIcon = cat.icon
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: catIdx * 0.12 }}
                whileHover={{ y: -5 }}
                className={`glass rounded-2xl p-6 border ${cat.border} hover:border-opacity-60 transition-all duration-300 group`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                    <CategoryIcon size={20} className="text-white" />
                  </div>
                  <h3 className="font-display font-bold text-white text-xl">{cat.title}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {cat.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.1 + skillIdx * 0.07 + 0.2 }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 cursor-default"
                    >
                      <skill.icon size={20} style={{ color: skill.color }} className="flex-shrink-0" />
                      <span className="font-body text-sm text-gray-300 font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 overflow-hidden"
        >
          <div className="flex gap-4 animate-scroll whitespace-nowrap">
            {marqueeSkills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm text-gray-400 font-mono flex-shrink-0"
              >
                <skill.icon size={14} style={{ color: skill.color }} />
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}