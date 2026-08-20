import { useRef, useEffect, useState } from 'react'
import SectionWrapper from '../components/SectionWrapper'
import InternshipCard from '../components/InternshipCard'
import { internships } from '../content/internships'

export default function Internships() {
  const cardRefs = useRef([])
  const [visible, setVisible] = useState(internships.map(() => false))

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setVisible(internships.map(() => true)); return }

    const observers = internships.map((_, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisible(prev => {
                const next = [...prev]; next[i] = true; return next
              })
            }, i * 180)
            obs.disconnect()
          }
        },
        { threshold: 0.12 }
      )
      if (cardRefs.current[i]) obs.observe(cardRefs.current[i])
      return obs
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <SectionWrapper id="internships" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="mb-14 text-center">
        <span className="section-label">Research Internships</span>
        <h2 id="internships-heading" className="section-heading mt-3">
          Research Experience
        </h2>
        <p className="text-[#94a3b8] mt-4 max-w-xl mx-auto text-sm">
          Research internships under faculty at IIT Kharagpur, spanning additive manufacturing, 
          structural analysis, and aerospace guidance systems.
        </p>
      </div>

      <div className="space-y-10">
        {internships.map((internship, i) => (
          <div
            key={internship.id}
            ref={el => (cardRefs.current[i] = el)}
            style={{
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              opacity: visible[i] ? 1 : 0,
              transform: visible[i]
                ? 'translateX(0)'
                : i % 2 === 0 ? 'translateX(-40px)' : 'translateX(40px)',
            }}
          >
            <InternshipCard internship={internship} index={i} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
