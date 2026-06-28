import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiDownload, FiArrowRight, FiMail, FiZap } from 'react-icons/fi'
import { FaRocket } from 'react-icons/fa'

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl" />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            {/* Status badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 text-sm font-body">
                <span className="glow-dot" />
                <span className="text-gray-400">Available for opportunities</span>
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-primary-400 font-mono text-sm tracking-widest uppercase">
                Hi, I'm
              </p>
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-none">
                <span className="text-white">Arun</span>
                <br />
                <span className="text-gradient">Prasath B</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-700 border border-white/5">
                <span className="font-mono text-primary-400 text-sm">{'<'}</span>
                <span className="font-display font-semibold text-white text-lg">Junior Software Developer</span>
                <span className="font-mono text-primary-400 text-sm">{'/>'}</span>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 font-body text-lg leading-relaxed max-w-lg"
            >
              I craft high-performance web applications with clean code and exceptional user experiences.
              Passionate about React, Node.js, and building scalable full-stack solutions.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary group">
                View Projects
                <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/resume/Arun_Prasath_Junior_Software_Developer.pdf.pdf" download className="btn-outline group">
                <FiDownload size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                Download CV
              </a>
              <a href="#contact" className="btn-outline group">
                <FiMail size={16} />
                Contact Me
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-2">
              <span className="text-gray-600 font-body text-sm">Connect:</span>
              <a
                href="https://github.com/Prasathb06"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/arun-prasath-b-846b9a254/overlay/contact-info/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <FiLinkedin size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right - Profile visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-primary-500/20 scale-110 animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-primary-500/10 scale-125" />

              {/* Profile image container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-primary-500/30 shadow-2xl shadow-primary-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-dark-800 flex items-center justify-center">
                  {/* Placeholder avatar */}
                  {/* <div className="flex flex-col items-center gap-3">
                    <div className="w-24 h-24 rounded-full bg-primary-500/20 border-2 border-primary-500/40 flex items-center justify-center">
                      <span className="font-display font-bold text-4xl text-primary-400">AP</span>
                    </div>
                    <span className="text-gray-500 text-sm font-body">Replace with your photo</span>
                    <span className="font-mono text-xs text-gray-600">src/assets/profile.jpg</span>
                  </div> */}
                  {/* Uncomment below and remove placeholder div when you have photo: */}
                  <img
                    src="/src/assets/Arun.jpeg"
                    alt="Arun Prasath B"
                    className="w-full h-full object-cover object-top"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl"><FiZap /></span>
                  <div>
                    <div className="text-xs text-gray-500 font-body">Experience</div>
                    <div className="font-display font-bold text-white text-sm">1+ Years</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl"><FaRocket /></span>
                  <div>
                    <div className="text-xs text-gray-500 font-body">Projects</div>
                    <div className="font-display font-bold text-white text-sm">10+ Built</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-gray-600 font-body text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-8 bg-gradient-to-b from-primary-500/50 to-transparent rounded-full"
          />
        </motion.div>
      </div>
    </section>
  )
}
