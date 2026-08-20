import SectionWrapper from '../components/SectionWrapper'
import { skillGroups } from '../content/skills'

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="mb-14 text-center">
        <span className="section-label">Skills & Expertise</span>
        <h2 id="skills-heading" className="section-heading mt-3">
          Technical Toolkit
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillGroups.map(group => (
          <div
            key={group.id}
            className="rounded-2xl border border-[#1e2d3d] p-6 sm:p-8"
            style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}
          >
            {/* Group header */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-mono font-bold"
                style={{ background: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)' }}
              >
                {group.icon}
              </span>
              <div>
                <p className="section-label">{group.label}</p>
              </div>
            </div>

            {/* Skill chips */}
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map(skill => (
                <span
                  key={skill.name}
                  className="skill-chip"
                >
                  <span className="text-sm" role="img" aria-hidden="true">{skill.icon}</span>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Note about no percentages */}
      <p className="text-center mt-8 text-[10px] font-mono text-[#4b6380]">
        Skills are listed without artificial percentages. Proficiency is demonstrated through projects and research.
      </p>
    </SectionWrapper>
  )
}
