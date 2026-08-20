/**
 * AchievementCard — metric-first achievement display
 */
export default function AchievementCard({ achievement, index }) {
  return (
    <article
      className="card-hover relative rounded-2xl border border-[#1e2d3d] p-6 sm:p-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}
    >
      {/* Glow behind metric */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: achievement.color }}
      />

      {/* Icon */}
      <div className="text-3xl mb-4" role="img" aria-label={achievement.title}>
        {achievement.icon}
      </div>

      {/* Year tag */}
      <span className="text-[10px] font-mono text-[#4b6380] tracking-wider">{achievement.year}</span>

      {/* Title */}
      <h3 className="font-heading font-semibold text-lg text-[#f0f4f8] mt-1 mb-3">
        {achievement.title}
      </h3>

      {/* Big metric */}
      <div className="mb-4">
        <p
          className="font-heading font-bold text-3xl sm:text-4xl"
          style={{ color: achievement.color }}
        >
          {achievement.metric}
        </p>
        <p className="text-xs font-mono text-[#94a3b8] mt-0.5">{achievement.metricLabel}</p>
      </div>

      <p className="text-[#94a3b8] text-sm leading-relaxed">
        {achievement.description}
      </p>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${achievement.color}40, transparent)` }}
      />
    </article>
  )
}
