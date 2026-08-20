import SectionWrapper from '../components/SectionWrapper'
import AchievementCard from '../components/AchievementCard'
import { achievements } from '../content/achievements'

export default function Achievements() {
  return (
    <SectionWrapper id="achievements" className="py-24 px-6 grid-overlay">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 text-center">
          <span className="section-label">Awards & Achievements</span>
          <h2 id="achievements-heading" className="section-heading mt-3">
            Academic Excellence
          </h2>
          <p className="text-[#94a3b8] mt-4 max-w-xl mx-auto text-sm">
            National-level competitive examination results demonstrating academic standing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, i) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
