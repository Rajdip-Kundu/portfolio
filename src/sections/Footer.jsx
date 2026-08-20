import { profile } from '../content/profile'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative border-t border-[#1e2d3d] py-16 px-6"
      style={{ background: 'linear-gradient(180deg, #080c14 0%, #0a0f1a 100%)' }}
      aria-label="Contact and footer"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Top section — name + tagline */}
        <div className="text-center mb-12">
          <h2 id="contact-heading" className="font-heading font-bold text-3xl sm:text-4xl text-[#f0f4f8] mb-3">
            Let's Connect
          </h2>
          <p className="text-[#94a3b8] text-sm max-w-md mx-auto">
            Aerospace Engineering student at IIT Kharagpur.
            Open to research collaborations, internships, and technical discussions.
          </p>
        </div>

        {/* Contact cards — LinkedIn + Phone ONLY */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">

          {/* LinkedIn */}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex items-center gap-4 w-full sm:w-auto
              px-7 py-4 rounded-2xl border border-[#1e2d3d]
              hover:border-[rgba(56,189,248,0.4)] hover:bg-[rgba(56,189,248,0.04)]
              transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]
            "
            style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}
            aria-label="Visit Rajdip Kundu on LinkedIn"
          >
            {/* LinkedIn icon */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#38bdf8">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono text-[#4b6380] uppercase tracking-widest">LinkedIn</p>
              <p className="text-[#f0f4f8] text-sm font-medium group-hover:text-[#38bdf8] transition-colors">
                Rajdip Kundu
              </p>
              <p className="text-[#4b6380] text-xs font-mono truncate max-w-[200px]">
                linkedin.com/in/rajdip-kundu-60b728392
              </p>
            </div>
            <span className="ml-auto text-[#4b6380] group-hover:text-[#38bdf8] transition-colors text-lg">↗</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${profile.email}`}
            className="
              group flex items-center gap-4 w-full sm:w-auto
              px-7 py-4 rounded-2xl border border-[#1e2d3d]
              hover:border-[rgba(52,211,153,0.4)] hover:bg-[rgba(52,211,153,0.04)]
              transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399]
            "
            style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}
            aria-label="Email Rajdip Kundu"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono text-[#4b6380] uppercase tracking-widest">Email</p>
              <p className="text-[#f0f4f8] text-sm font-medium font-mono group-hover:text-[#34d399] transition-colors truncate max-w-[200px]">
                {profile.email}
              </p>
            </div>
            <span className="ml-auto text-[#4b6380] group-hover:text-[#34d399] transition-colors text-lg pl-2">↗</span>
          </a>

          {/* Phone */}
          <div
            className="flex items-center gap-4 w-full sm:w-auto px-7 py-4 rounded-2xl border border-[#1e2d3d]"
            style={{ background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)' }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-mono text-[#4b6380] uppercase tracking-widest">Phone</p>
              <p className="text-[#f0f4f8] text-sm font-medium font-mono">{profile.phone}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#1e2d3d]" />
          <span className="text-[#38bdf8] text-xs font-mono">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#1e2d3d]" />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-heading font-bold text-[#38bdf8] text-sm tracking-widest uppercase">
            Rajdip Kundu
          </p>
          <p className="text-[#4b6380] text-xs font-mono">
            © {CURRENT_YEAR} · Aerospace Engineering · IIT Kharagpur
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-mono text-[#4b6380] hover:text-[#38bdf8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded"
            aria-label="Back to top"
          >
            ↑ back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
