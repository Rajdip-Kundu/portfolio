import SectionWrapper from '../components/SectionWrapper'
import { certifications } from '../content/certifications'

export default function Certifications() {
  return (
    <SectionWrapper id="certifications" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="mb-14 text-center">
        <span className="section-label">Certifications</span>
        <h2 id="certifications-heading" className="section-heading mt-3">
          Certifications & Credentials
        </h2>
      </div>

      {certifications.length === 0 ? (
        /* Empty state — section exists but no certifications yet */
        <div
          className="rounded-2xl border border-dashed border-[#1e2d3d] p-12 text-center"
          style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}
        >
          <div className="text-4xl mb-4 opacity-30">📄</div>
          <p className="text-[#4b6380] font-mono text-sm mb-2">No certifications added yet.</p>
          <p className="text-[#4b6380] text-xs max-w-sm mx-auto">
            To add certifications, open{' '}
            <code className="text-[#38bdf8]">src/content/certifications.js</code>{' '}
            and uncomment the example entry.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <article
              key={cert.id}
              className="card-hover rounded-2xl border border-[#1e2d3d] overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}
            >
              {/* Certificate image */}
              {cert.image && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={`${cert.name} certificate`}
                    className="w-full h-full object-cover object-top border-b border-[#1e2d3d]"
                  />
                </div>
              )}

              <div className="p-6">
                <span className="section-label mb-2 block">{cert.issuer}</span>
                <h3 className="font-heading font-semibold text-base text-[#f0f4f8] mb-1">{cert.name}</h3>
                <p className="text-[#4b6380] text-xs font-mono mb-3">{cert.date}</p>
                {cert.description && (
                  <p className="text-[#94a3b8] text-sm mb-4">{cert.description}</p>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#38bdf8] hover:opacity-70 transition-opacity"
                  >
                    ↗ Verify credential
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}
