import { useRef, useEffect, useState } from 'react'

/**
 * SectionWrapper
 * Adds intersection-observer entrance animation to any section.
 * Respects prefers-reduced-motion.
 */
export default function SectionWrapper({ id, children, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setVisible(true); return }

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={`
        transition-all duration-700
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${className}
      `}
      aria-labelledby={`${id}-heading`}
    >
      {children}
    </section>
  )
}
