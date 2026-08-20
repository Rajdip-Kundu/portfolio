import { useState, useEffect, useRef } from 'react'

const NAV_ITEMS = [
  { id: 'about',         label: 'About' },
  { id: 'education',     label: 'Education' },
  { id: 'internships',   label: 'Internships' },
  { id: 'projects',      label: 'Projects' },
  { id: 'skills',        label: 'Skills' },
  { id: 'coursework',    label: 'Coursework' },
  { id: 'engagements',   label: 'Engagements' },
  { id: 'achievements',  label: 'Achievements' },
  { id: 'extracurricular', label: 'Extracurricular' },
  { id: 'membership',    label: 'Membership' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact',       label: 'Contact' },
]

export default function Navigation({ visible }) {
  const [active, setActive]     = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const observerRef = useRef(null)

  // Scroll shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observerRef.current.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [visible])

  const handleClick = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-700
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
        ${scrolled
          ? 'bg-[rgba(8,12,20,0.96)] border-b border-[#1e2d3d] shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-heading font-bold text-sm text-[#38bdf8] tracking-widest uppercase hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
          aria-label="Scroll to top"
        >
          RK
        </button>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-0.5" role="list">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`
                  relative px-3 py-1.5 text-xs font-body font-medium tracking-wide
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded
                  ${active === item.id
                    ? 'text-[#38bdf8]'
                    : 'text-[#94a3b8] hover:text-[#f0f4f8]'
                  }
                `}
                aria-current={active === item.id ? 'location' : undefined}
              >
                {item.label}
                {active === item.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#38bdf8] rounded-full shadow-[0_0_6px_#38bdf8]" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-[#94a3b8] hover:text-[#f0f4f8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" />
                <line x1="18" y1="4" x2="4" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" />
                <line x1="3" y1="11" x2="19" y2="11" />
                <line x1="3" y1="16" x2="19" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`
          lg:hidden overflow-hidden transition-all duration-300
          bg-[rgba(8,12,20,0.98)] border-b border-[#1e2d3d]
          ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
        `}
        aria-hidden={!menuOpen}
      >
        <ul className="px-4 py-3 flex flex-col gap-1" role="list">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`
                  w-full text-left px-3 py-2.5 text-sm font-body rounded
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]
                  ${active === item.id
                    ? 'bg-[rgba(56,189,248,0.08)] text-[#38bdf8] border-l-2 border-[#38bdf8]'
                    : 'text-[#94a3b8] hover:text-[#f0f4f8] hover:bg-[rgba(255,255,255,0.03)]'
                  }
                `}
                aria-current={active === item.id ? 'location' : undefined}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
