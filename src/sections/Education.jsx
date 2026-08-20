import SectionWrapper from '../components/SectionWrapper'
import TimelineItem from '../components/TimelineItem'
import { education } from '../content/education'

export default function Education() {
  return (
    <SectionWrapper id="education" className="py-24 px-6 grid-overlay">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14 text-center">
          <span className="section-label">Education</span>
          <h2 id="education-heading" className="section-heading mt-3">
            Academic Background
          </h2>
        </div>

        <div className="space-y-0">
          {education.map((entry, i) => (
            <TimelineItem
              key={entry.id}
              entry={entry}
              index={i}
              isLast={i === education.length - 1}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
