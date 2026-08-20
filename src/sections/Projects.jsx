import { useRef } from 'react'
import SectionWrapper from '../components/SectionWrapper'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../content/projects'

export default function Projects() {
  const scrollRef = useRef(null)

  const scrollBy = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 400, behavior: 'smooth' })
    }
  }

  return (
    <SectionWrapper id="projects" className="py-24 grid-overlay">
      {/* Heading */}
      <div className="mb-14 text-center px-6">
        <span className="section-label">Projects</span>
        <h2 id="projects-heading" className="section-heading mt-3">
          Technical Projects
        </h2>
        <p className="text-[#94a3b8] mt-4 max-w-xl mx-auto text-sm">
          Aircraft design, geospatial analysis, and structural simulation work — click any card to expand details.
        </p>
      </div>

      {/* Scroll arrows (desktop) */}
      <div className="flex items-center justify-end gap-2 px-6 mb-4 max-w-7xl mx-auto">
        <button
          onClick={() => scrollBy(-1)}
          className="w-9 h-9 rounded-full border border-[#1e2d3d] flex items-center justify-center text-[#94a3b8] hover:border-[#38bdf8] hover:text-[#38bdf8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
          aria-label="Scroll projects left"
        >
          ←
        </button>
        <button
          onClick={() => scrollBy(1)}
          className="w-9 h-9 rounded-full border border-[#1e2d3d] flex items-center justify-center text-[#94a3b8] hover:border-[#38bdf8] hover:text-[#38bdf8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
          aria-label="Scroll projects right"
        >
          →
        </button>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="h-scroll-container px-6 max-w-7xl mx-auto"
        role="list"
        aria-label="Project cards"
      >
        {projects.map((project, i) => (
          <div key={project.id} role="listitem">
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <p className="text-center mt-4 text-[10px] font-mono text-[#4b6380]">
        ← swipe or use arrows →
      </p>
    </SectionWrapper>
  )
}
