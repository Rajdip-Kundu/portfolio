import ImageWithFallback from './ImageWithFallback'

/**
 * InternshipCard — staggered slide-in card for research internships
 */
export default function InternshipCard({ internship, index }) {
  const isEven = index % 2 === 0

  return (
    <article
      className={`
        card-hover relative rounded-2xl border border-[#1e2d3d] overflow-hidden
        transition-all duration-700
        grid grid-cols-1 lg:grid-cols-2
      `}
      style={{
        background: 'linear-gradient(135deg, #0d1117 0%, #111827 60%, #0d1117 100%)',
        transitionDelay: `${index * 0.15}s`,
      }}
    >
      {/* Left accent line */}
      <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-gradient-to-b from-transparent via-[#38bdf8] to-transparent opacity-40 rounded-full" />

      {/* Image — switches side on even/odd for variety on desktop */}
      <div className={`${isEven ? '' : 'lg:order-2'} relative`}>
        <ImageWithFallback
          src={internship.images?.main}
          alt={`${internship.supervisor} research`}
          label="research-main.jpg"
          folder={`images/internships/${internship.id}/`}
          className="h-56 lg:h-full min-h-[200px]"
        />
        {/* Gradient overlay on image */}
        <div
          className={`absolute inset-0 ${
            isEven
              ? 'bg-gradient-to-r from-transparent to-[#0d1117]'
              : 'bg-gradient-to-l from-transparent to-[#0d1117]'
          }`}
        />
      </div>

      {/* Content */}
      <div className={`${isEven ? '' : 'lg:order-1'} p-6 sm:p-8 flex flex-col justify-center`}>
        <span className="section-label mb-2">{internship.researchArea}</span>

        <h3 className="font-heading font-bold text-xl text-[#f0f4f8] mb-1">
          {internship.supervisor}
        </h3>
        <p className="text-[#38bdf8] text-sm font-medium mb-0.5">{internship.department}</p>
        <p className="text-[#4b6380] text-xs font-mono mb-4">
          {internship.institution} · {internship.period}
        </p>

        <p className="text-[#94a3b8] text-sm leading-relaxed mb-5">
          {internship.description.replace(/\n/g, ' ')}
        </p>

        {/* Tools */}
        <div className="flex flex-wrap gap-2 mb-4">
          {internship.tools.map(tool => (
            <span key={tool} className="tool-chip">{tool}</span>
          ))}
        </div>

        {/* Research tags */}
        <div className="flex flex-wrap gap-1.5">
          {internship.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] font-mono border"
              style={{ borderColor: 'rgba(56,189,248,0.15)', color: '#94a3b8' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {internship.link && (
          <a
            href={internship.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 self-start text-xs font-mono text-[#38bdf8] hover:opacity-70 transition-opacity"
          >
            ↗ View Research
          </a>
        )}
      </div>
    </article>
  )
}
