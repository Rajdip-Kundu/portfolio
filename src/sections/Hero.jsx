import ImageWithFallback from '../components/ImageWithFallback'
import { profile } from '../content/profile'

/**
 * Hero section — appears after the rocket smoke clears.
 * Animated via opacity/transform driven by parent's revealProgress prop.
 */
export default function Hero({ revealProgress }) {
  const opacity   = Math.min(1, revealProgress * 2)
  const translateY = (1 - Math.min(1, revealProgress * 1.5)) * 30

  return (
    <div
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: 'opacity 0.1s, transform 0.1s',
      }}
      aria-label="Hero — Rajdip Kundu introduction"
    >
      {/* Radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(56,189,248,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />

      {/* Profile image */}
      <div className="relative mb-8 group">
        <div className="absolute inset-0 rounded-full animate-[glowPulse_3s_ease-in-out_infinite]" />
        <div
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 overflow-hidden"
          style={{ borderColor: 'rgba(56,189,248,0.4)', boxShadow: '0 0 40px rgba(56,189,248,0.2)' }}
        >
          <ImageWithFallback
            src="/images/profile/profile-main.jpg"
            alt="Rajdip Kundu — profile photograph"
            label="profile-main.jpg"
            folder="images/profile/"
            className="w-full h-full"
          />
        </div>
        {/* Status dot */}
        <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#38bdf8] border-2 border-[#080c14] shadow-[0_0_8px_#38bdf8]" />
      </div>

      {/* Name */}
      <div className="mb-2">
        <span className="section-label text-[11px]">Aerospace Engineer</span>
      </div>
      <h1 className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl text-[#f0f4f8] mb-4 glow-text">
        Rajdip Kundu
      </h1>

      {/* Tagline */}
      <p className="font-mono text-[#94a3b8] text-sm sm:text-base max-w-xl mb-3">
        B.Tech Aerospace Engineering · IIT Kharagpur · CGPA{' '}
        <span className="text-[#38bdf8] font-semibold">9.73</span>
      </p>

      {/* Keywords */}
      <p className="text-[#4b6380] text-xs font-mono tracking-widest uppercase mb-10">
        Research · Aircraft · Simulation · GNC
      </p>

      {/* CTA buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-7 py-3 rounded-xl font-body font-medium text-sm text-[#080c14] bg-[#38bdf8] hover:bg-[#7dd3fc] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c14]"
        >
          View Portfolio
        </button>
        <a
          href="https://www.linkedin.com/in/rajdip-kundu-60b728392"
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3 rounded-xl font-body font-medium text-sm text-[#38bdf8] border border-[#38bdf8] hover:bg-[rgba(56,189,248,0.08)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c14]"
        >
          LinkedIn ↗
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] font-mono text-[#4b6380] tracking-widest">SCROLL</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="5" y="1" width="6" height="12" rx="3" stroke="#1e2d3d" strokeWidth="1.5" />
          <circle cx="8" cy="5" r="1.5" fill="#38bdf8" className="animate-[float_1.5s_ease-in-out_infinite]" />
          <polyline points="4,18 8,22 12,18" stroke="#1e2d3d" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    </div>
  )
}
