import SectionWrapper from '../components/SectionWrapper'
import ImageWithFallback from '../components/ImageWithFallback'
import { engagements } from '../content/engagements'

export default function Engagements() {
  return (
    <SectionWrapper id="engagements" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="mb-14 text-center">
        <span className="section-label">Engagements</span>
        <h2 id="engagements-heading" className="section-heading mt-3">
          Academic & Institutional Involvement
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {engagements.map((item, i) => (
          <article
            key={item.id}
            className="card-hover rounded-2xl border border-[#1e2d3d] overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #0d1117 0%, #111827 100%)' }}
          >
            {item.image && (
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                label={item.image.split('/').pop()}
                folder={`images/engagements/`}
                className={`h-40 w-full ${
                  item.id === 'ncc-air-wing' ? 'bg-[#f0f4f8]' :
                  item.id === 'dbf-main' ? 'bg-[#5baad4]' : 'bg-[#111111]'
                }`}
                imgClassName={item.id === 'ncc-air-wing' ? 'object-contain p-4' : 'object-contain'}
              />
            )}

            <div className="p-6">
              <span className="section-label mb-2 block">Engagement</span>
              <h3 className="font-heading font-bold text-base text-[#f0f4f8] mb-1">
                {item.title}
              </h3>
              <p className="text-[#38bdf8] text-xs font-medium mb-0.5">{item.role}</p>
              <p className="text-[#4b6380] text-xs font-mono mb-4">{item.period}</p>
              <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">
                {item.description.replace(/\n/g, ' ')}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map(tag => (
                  <span key={tag} className="tool-chip">{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  )
}
