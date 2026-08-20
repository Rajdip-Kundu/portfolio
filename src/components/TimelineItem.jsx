/**
 * TimelineItem — for Education section
 */
export default function TimelineItem({ entry, index, isLast }) {
  return (
    <div className="relative flex gap-6 sm:gap-8">
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        {/* Dot */}
        <div
          className={`
            relative z-10 flex items-center justify-center rounded-full
            border transition-all duration-300
            ${entry.highlight
              ? 'w-5 h-5 bg-[#38bdf8] border-[#38bdf8] shadow-[0_0_16px_rgba(56,189,248,0.6)]'
              : 'w-4 h-4 bg-[#0d1117] border-[#1e2d3d]'
            }
          `}
        >
          {entry.highlight && (
            <span className="w-2 h-2 rounded-full bg-white opacity-80" />
          )}
        </div>
        {/* Line */}
        {!isLast && (
          <div className="flex-1 w-px bg-gradient-to-b from-[#1e2d3d] to-transparent mt-1" />
        )}
      </div>

      {/* Content */}
      <div className={`pb-10 flex-1 ${isLast ? 'pb-0' : ''}`}>
        <div
          className="card-hover rounded-xl border border-[#1e2d3d] p-5 sm:p-6"
          style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}
        >
          {/* Score badge */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <p className="section-label mb-1">{entry.scoreLabel}</p>
              <p
                className="font-heading font-bold text-2xl"
                style={{ color: entry.highlight ? '#38bdf8' : '#f0f4f8' }}
              >
                {entry.score}
              </p>
            </div>
            <span
              className="text-xs font-mono px-2.5 py-1 rounded-full border"
              style={{
                color: entry.highlight ? '#38bdf8' : '#94a3b8',
                borderColor: entry.highlight ? 'rgba(56,189,248,0.3)' : '#1e2d3d',
                background: entry.highlight ? 'rgba(56,189,248,0.08)' : 'transparent',
              }}
            >
              {entry.year}
            </span>
          </div>

          <h3 className="font-heading font-semibold text-lg text-[#f0f4f8] mb-1">
            {entry.degree}
          </h3>
          <p className="text-[#94a3b8] text-sm">{entry.institution}</p>
          <p className="text-[#4b6380] text-xs font-mono mt-0.5">{entry.location}</p>

          {entry.notes && (
            <p className="mt-3 text-sm text-[#94a3b8] border-t border-[#1e2d3d] pt-3">
              {entry.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
