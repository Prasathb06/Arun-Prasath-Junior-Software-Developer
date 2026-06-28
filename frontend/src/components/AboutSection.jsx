import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCode, FiServer, FiDatabase, FiBriefcase, FiBook, FiZap, FiGlobe, FiCoffee, FiDownload } from 'react-icons/fi'
import { FaRocket } from 'react-icons/fa'

const stats = [
  { label: 'Projects Completed', value: '6+', icon: FaRocket },
  { label: 'Technologies', value: '8+', icon: FiZap },
  { label: 'Open Source', value: '5+', icon: FiGlobe },
  { label: 'Coffee/Day', value: '∞', icon: FiCoffee },
]

const experience = [
  {
    type: 'work',
    title: 'Junior Software Developer',
    place: 'UFours IT Solution Private Limited',
    period: 'Mar 2026 – June 2026',
    desc: 'Gaining hands-on experience in junior software development using MySQL, Express.js, React.js, and Node.js. Assisting in design and development of web applications with clean, maintainable code. Collaborating with the team to implement REST APIs and integrate frontend/backend components.',
    icon: FiBriefcase,
  },
  {
    type: 'work',
    title: 'Talent Acquisition',
    place: 'Emayyam Infotech',
    period: 'Oct 2022 – Nov 2023',
    desc: 'Collaborated with US IT staffing companies and consultants. Maintained databases and platforms (LinkedIn, Dice, Monster) for data research. Coordinated interviews, assessments, and selection processes.',
    icon: FiBriefcase,
  },
  {
    type: 'edu',
    title: 'Master of Business Administration (MBA)',
    place: 'Karpagam Academy of Higher Education',
    period: 'Jun 2020 – Apr 2022',
    desc: 'Completed MBA with strong foundation in business management, organizational behavior, and strategic decision-making.',
    icon: FiBook,
  },
  {
    type: 'edu',
    title: 'Full-Stack Development Course',
    place: 'Edex Tech IT Solutions, Madurai',
    period: 'Dec 2023 – Aug 2024',
    desc: 'Intensive full-stack training covering React.js, Node.js, Express.js, MongoDB, REST APIs, and JWT Authentication.',
    icon: FiBook,
  },
]

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-primary-400 text-sm tracking-widest uppercase mb-3">Who I Am</p>
          <h2 className="section-title">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Passionate developer who loves turning ideas into elegant digital solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6 border border-white/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <FiCode className="text-primary-400" size={22} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-xl mb-3">Junior Software Developer</h3>
                  <p className="text-gray-400 font-body leading-relaxed">
                    I'm <span className="text-white font-semibold">Arun Prasath B</span>, a motivated Junior
                    Software Developer with expertise in JavaScript, React.js, Node.js, Express.js, and
                    MongoDB/MySQL. Experienced in building scalable, responsive, and user-friendly applications
                    through hands-on projects and professional training.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-white/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <FiServer className="text-primary-400" size={22} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg mb-2">What I Do</h3>
                  <ul className="text-gray-400 font-body space-y-1.5 text-sm">
                    <li className="flex items-center gap-2"><span className="text-primary-400">▸</span> Build responsive frontends with React & Tailwind CSS</li>
                    <li className="flex items-center gap-2"><span className="text-primary-400">▸</span> Design REST APIs with Node.js & Express</li>
                    <li className="flex items-center gap-2"><span className="text-primary-400">▸</span> Manage databases with MongoDB & MySQL</li>
                    <li className="flex items-center gap-2"><span className="text-primary-400">▸</span> Implement JWT Authentication & Role-based Access</li>
                    <li className="flex items-center gap-2"><span className="text-primary-400">▸</span> Deploy on Vercel, Render & MongoDB Atlas</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="glass rounded-xl p-4 border border-white/5 text-center hover:border-primary-500/20 transition-colors"
                >
                  <div className="text-2xl mb-1 text-primary-400 flex justify-center">
                    <stat.icon />
                  </div>
                  <div className="font-display font-bold text-2xl text-primary-400">{stat.value}</div>
                  <div className="text-gray-500 font-body text-xs mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Experience/Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-3"
          >
            <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-primary-500 rounded-full" />
              Experience & Education
            </h3>

            {experience.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.12 }}
                className="relative glass rounded-2xl p-5 border border-white/5 hover:border-primary-500/20 transition-all duration-300 group"
              >
                <div className="absolute top-5 right-5">
                  <span className={`tag text-xs ${item.type === 'work' ? 'bg-primary-500/10 text-primary-400 border-primary-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                    {item.type === 'work' ? (
                      <span className="inline-flex items-center gap-1"><FiBriefcase size={11} /> Work</span>
                    ) : (
                      <span className="inline-flex items-center gap-1"><FiBook size={11} /> Education</span>
                    )}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                    <item.icon className="text-primary-400" size={16} />
                  </div>
                  <div className="flex-1 pr-16">
                    <h4 className="font-display font-bold text-white text-sm">{item.title}</h4>
                    <p className="text-primary-400 font-body text-xs font-medium mt-0.5">{item.place}</p>
                    <p className="text-gray-600 font-mono text-xs mt-1 mb-2">{item.period}</p>
                    <p className="text-gray-400 font-body text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Download Resume */}
            <motion.a
              href="/resume/Arun_Prasath_Junior_Software_Developer.pdf.pdf"
              download
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl border border-dashed border-primary-500/30 text-primary-400 hover:bg-primary-500/5 hover:border-primary-500/60 transition-all duration-300 font-display font-semibold group"
            >
              <FiDownload size={18} />
              Download Full Resume
              <span className="text-xs text-gray-600 font-body font-normal group-hover:text-gray-400 transition-colors">PDF</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}