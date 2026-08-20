import { useState } from 'react'
import ImageWithFallback from './ImageWithFallback'

/**
 * ProjectCard — horizontal scrollable card
 * Shows main image, title, description, contributions, and tool chips.
 * Expandable to show more detail.
 */
export default function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)

  const accentColor = project.color || '#38bdf8'

  return (
    <article
      className={`
        card-hover relative rounded-2xl border border-[#1e2d3d] overflow-hidden
        flex flex-col
        w-[min(85vw,420px)] sm:w-[380px]
        cursor-pointer
      `}
      style={{ background: 'linear-gradient(160deg, #0d1117 0%, #111827 100%)' }}
      onClick={() => setExpanded(v => !v)}
      onKeyDown={e => e.key === 'Enter' && setExpanded(v => !v)}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
      aria-label={`${project.title} — click to ${expanded ? 'collapse' : 'expand'}`}
    >
      {/* Accent top border */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />

      {/* Image */}
      <ImageWithFallback
        src={project.images?.main}
        alt={`${project.title} main image`}
        label={`project-main.jpg`}
        folder={`images/projects/${project.id}/`}
        className="w-full h-48 flex-shrink-0"
      />

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category tag */}
        <span
          className="text-[10px] font-mono tracking-widest uppercase mb-2"
          style={{ color: accentColor }}
        >
          {project.category}
        </span>

        <h3 className="font-heading font-bold text-base text-[#f0f4f8] leading-snug mb-1">
          {project.title}
        </h3>
        <p className="text-[#4b6380] text-xs font-mono mb-3">{project.subtitle} · {project.period}</p>

        <p className="text-[#94a3b8] text-sm leading-relaxed line-clamp-3 mb-4">
          {project.description}
        </p>

        {/* Expanded content */}
        {expanded && (
          <div className="border-t border-[#1e2d3d] pt-4 mt-1 space-y-3">
            <div>
              <p className="text-xs font-mono text-[#4b6380] uppercase tracking-wider mb-2">Contributions</p>
              <ul className="space-y-1.5">
                {project.contributions.map((c, i) => (
                  <li key={i} className="flex gap-2 text-[#94a3b8] text-xs">
                    <span style={{ color: accentColor }} className="mt-0.5 flex-shrink-0">›</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tool chips */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
          {project.tools.map(tool => (
            <span key={tool} className="tool-chip">{tool}</span>
          ))}
        </div>

        {/* Expand hint */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1e2d3d]">
          <span className="text-[10px] font-mono text-[#4b6380]">
            {expanded ? '▲ collapse' : '▼ details'}
          </span>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-[10px] font-mono hover:opacity-70 transition-opacity"
              style={{ color: accentColor }}
              aria-label={`Open ${project.title} project link`}
            >
              ↗ view
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
