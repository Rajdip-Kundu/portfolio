import SectionWrapper from '../components/SectionWrapper'
import ImageWithFallback from '../components/ImageWithFallback'
import { memberships } from '../content/memberships'

export default function Membership() {
  return (
    <SectionWrapper id="membership" className="py-24 px-6 grid-overlay">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14 text-center">
          <span className="section-label">Membership</span>
          <h2 id="membership-heading" className="section-heading mt-3">
            Organizations & Teams
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {memberships.map((m) => (
            <article
              key={m.id}
              className="card-hover rounded-2xl border border-[#1e2d3d] overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}
            >
              {m.image && (
                <ImageWithFallback
                  src={m.image}
                  alt={m.organization}
                  label={`${m.id}.jpg`}
                  folder="images/engagements/"
                  className="h-36 w-full"
                />
              )}

              <div className="p-6 sm:p-8">
                {/* Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-heading font-bold text-xs"
                    style={{
                      background: 'rgba(56,189,248,0.1)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56,189,248,0.2)',
                    }}
                  >
                    {m.badge}
                  </div>
                  <div>
                    <span className="section-label text-[9px]">{m.period}</span>
                    <p className="text-[#94a3b8] text-xs">{m.division}</p>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-[#f0f4f8] mb-1">{m.organization}</h3>
                <p className="text-[#38bdf8] text-sm font-medium mb-3">{m.rank}</p>
                <p className="text-[#94a3b8] text-sm leading-relaxed">
                  {m.description.replace(/\n/g, ' ')}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
