import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiCode } from 'react-icons/fi'
import { motion } from 'framer-motion'

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: FiGithub, href: 'https://github.com/Prasathb06', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/arun-prasath-b-846b9a254/', label: 'LinkedIn' },
  { icon: FiMail, href: 'mailto:arunprasathb045@gmail.com', label: 'Email' },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative mt-20 border-t border-white/5">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center">
                <span className="font-display font-bold text-primary-400 text-sm">AP</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                Arun<span className="text-primary-400">.</span>dev
              </span>
            </div>
            <p className="text-gray-500 font-body text-sm leading-relaxed">
              Junior Software Developer passionate about building scalable, beautiful web applications with clean code.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2 mt-1">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-9 h-9 rounded-xl glass border border-white/5 flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-500/30 transition-all duration-300"
                >
                  <s.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-primary-400 font-body text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-500/40 group-hover:bg-primary-400 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:arunprasathb045@gmail.com" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <FiMail size={13} className="text-primary-400" />
                </div>
                <span className="text-gray-500 font-body text-sm group-hover:text-primary-400 transition-colors">arunprasathb045@gmail.com</span>
              </a>
              <a href="https://github.com/Prasathb06" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <FiGithub size={13} className="text-primary-400" />
                </div>
                <span className="text-gray-500 font-body text-sm group-hover:text-primary-400 transition-colors">@Prasathb06</span>
              </a>
              <a href="https://www.linkedin.com/in/arun-prasath-b-846b9a254/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <FiLinkedin size={13} className="text-primary-400" />
                </div>
                <span className="text-gray-500 font-body text-sm group-hover:text-primary-400 transition-colors">Arun Prasath B</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-gray-600 text-xs font-body">
            <FiCode size={13} className="text-primary-500/60" />
            <span>© {new Date().getFullYear()} Arun Prasath B. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-xs font-body">
            <span>Built with React & Node.js</span>
            <span className="text-primary-500/40">•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-primary-400 transition-colors"
            >
              Back to top <FiArrowUp size={11} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}