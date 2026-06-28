import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'
import { useScrollTop } from '../hooks/useScrollTop'

export default function ScrollToTopButton() {
  const { showButton, scrollToTop } = useScrollTop()

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-xl bg-primary-500 text-dark-900 flex items-center justify-center shadow-lg shadow-primary-500/30 hover:bg-primary-400 hover:-translate-y-1 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowUp size={18} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
