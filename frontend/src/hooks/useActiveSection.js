import { useState, useEffect } from 'react'

export const useActiveSection = (sections) => {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observers = []
    
    sections.forEach((section) => {
      const el = document.getElementById(section)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section)
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px -80px 0px' }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(obs => obs.disconnect())
  }, [sections])

  return activeSection
}
