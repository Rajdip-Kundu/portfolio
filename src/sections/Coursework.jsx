import SectionWrapper from '../components/SectionWrapper'
import { coursework } from '../content/coursework'

const CATEGORY_COLORS = {
  'Propulsion':       '#f97316',
  'Control Systems':  '#38bdf8',
  'Aerodynamics':     '#818cf8',
  'Computing':        '#34d399',
  'Design':           '#f59e0b',
  'Structures':       '#e879f9',
}

export default function Coursework() {
  return (
    <SectionWrapper id="coursework" className="py-24 px-6 grid-overlay">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 text-center">
          <span className="section-label">Coursework</span>
          <h2 id="coursework-heading" className="section-heading mt-3">
            Core Curriculum
          </h2>
          <p className="text-[#94a3b8] mt-4 max-w-xl mx-auto text-sm">
            Key aerospace and engineering courses at IIT Kharagpur.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coursework.map((course, i) => {
            const accentColor = CATEGORY_COLORS[course.category] || '#38bdf8'
            return (
              <div
                key={course.id}
                className="card-hover relative rounded-xl border border-[#1e2d3d] p-5 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)',
                  transitionDelay: `${i * 0.05}s`,
                }}
              >
                {/* Top color bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, ${accentColor}40, ${accentColor}, ${accentColor}40)` }}
                />

                {/* Icon */}
                <div className="text-2xl mb-3" role="img" aria-label={course.name}>{course.icon}</div>

                {/* Category label */}
                <span
                  className="text-[9px] font-mono tracking-widest uppercase"
                  style={{ color: accentColor }}
                >
                  {course.category}
                </span>

                {/* Course name */}
                <h3 className="font-heading font-semibold text-sm text-[#f0f4f8] mt-1 mb-2 leading-snug">
                  {course.name}
                </h3>

                {/* Description */}
                <p className="text-[#4b6380] text-xs leading-relaxed">
                  {course.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
