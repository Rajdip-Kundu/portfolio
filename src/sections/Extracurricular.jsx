import SectionWrapper from '../components/SectionWrapper'
import { extracurricular } from '../content/extracurricular'

export default function Extracurricular() {
  return (
    <SectionWrapper id="extracurricular" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="mb-14 text-center">
        <span className="section-label">Extracurricular</span>
        <h2 id="extracurricular-heading" className="section-heading mt-3">
          Beyond the Lab
        </h2>
        <p className="text-[#94a3b8] mt-4 max-w-lg mx-auto text-sm">
          Engineering sharpens analytical thinking. These activities keep it balanced.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {extracurricular.map((item) => (
          <article
            key={item.id}
            className="card-hover rounded-2xl border border-[#1e2d3d] p-8 text-center flex flex-col items-center h-full"
            style={{ background: 'linear-gradient(160deg, #0d1117 0%, #111827 100%)' }}
          >
            <div className="text-4xl mb-4" role="img" aria-label={item.title}>{item.emoji}</div>
            <h3 className="font-heading font-semibold text-lg text-[#f0f4f8] mb-3">
              {item.title}
            </h3>
            <p className="text-[#94a3b8] text-sm leading-relaxed">
              {item.description.replace(/\n/g, ' ')}
            </p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  )
}
