import SectionWrapper from '../components/SectionWrapper'
import { profile } from '../content/profile'

const HIGHLIGHTS = [
  { icon: '🚀', label: 'CGPA', value: '9.73 / 10', color: '#38bdf8' },
  { icon: '✈️', label: 'Degree', value: 'B.Tech Aerospace', color: '#818cf8' },
  { icon: '🏛️', label: 'Institute', value: 'IIT Kharagpur', color: '#34d399' },
  { icon: '🔬', label: 'Focus', value: 'Research & Design', color: '#f59e0b' },
]

export default function About() {
  return (
    <SectionWrapper id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="mb-14 text-center">
        <span className="section-label">About Me</span>
        <h2
          id="about-heading"
          className="section-heading mt-3"
        >
          Engineering Precision,<br className="hidden sm:block" /> Aerospace Vision
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Bio text */}
        <div className="space-y-5">
          {profile.about.split('\n').filter(p => p.trim()).map((para, i) => (
            <p key={i} className="text-[#94a3b8] text-base leading-relaxed">
              {para.trim()}
            </p>
          ))}

          {/* HUD decorative line */}
          <div className="pt-4 border-t border-[#1e2d3d] flex items-center gap-3">
            <span className="text-[10px] font-mono text-[#4b6380] tracking-widest">IIT KHARAGPUR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#1e2d3d] to-transparent" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_6px_#38bdf8]" />
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4">
          {HIGHLIGHTS.map(h => (
            <div
              key={h.label}
              className="card-hover rounded-xl border border-[#1e2d3d] p-5 text-center"
              style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}
            >
              <div className="text-2xl mb-2" role="img" aria-label={h.label}>{h.icon}</div>
              <p className="text-[10px] font-mono text-[#4b6380] tracking-widest uppercase mb-1">{h.label}</p>
              <p className="font-heading font-bold text-sm" style={{ color: h.color }}>{h.value}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
