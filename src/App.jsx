import { useRef, useState, useCallback, lazy, Suspense, Component } from 'react'
import './styles/globals.css'

import Navigation      from './components/Navigation'
import Hero            from './sections/Hero'
import About           from './sections/About'
import Education       from './sections/Education'
import Internships     from './sections/Internships'
import Projects        from './sections/Projects'
import Skills          from './sections/Skills'
import Coursework      from './sections/Coursework'
import Engagements     from './sections/Engagements'
import Achievements    from './sections/Achievements'
import Extracurricular from './sections/Extracurricular'

import Certifications  from './sections/Certifications'
import Footer          from './sections/Footer'

// Lazy-load the heavy 3D scene
const RocketScene = lazy(() => import('./3d/RocketScene'))

/* ─── Error Boundary for Three.js / WebGL errors ────────── */
class RocketErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { crashed: false } }
  static getDerivedStateFromError() { return { crashed: true } }
  componentDidCatch(err) { console.warn('[RocketScene] WebGL/Three.js error — skipping 3D intro:', err) }
  render() {
    if (this.state.crashed) {
      // Immediately trigger portfolio reveal bypassing the 3D sequence
      if (this.props.onCrash) this.props.onCrash()
      return null
    }
    return this.props.children
  }
}

/* ─── Smoke overlay ─────────────────────────────────────── */
function SmokeOverlay({ opacity }) {
  if (opacity <= 0) return null
  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(160,180,200,0.7) 0%, rgba(80,100,130,0.5) 50%, rgba(8,12,20,0.3) 100%)',
        opacity,
        transition: 'opacity 0.2s',
      }}
      aria-hidden="true"
    />
  )
}

/* ─── Loading splash (while 3D loads) ─────────────────── */
function LoadingSplash() {
  return (
    <div className="fixed inset-0 z-50 bg-[#080c14] flex flex-col items-center justify-center">
      <div
        className="w-12 h-12 rounded-full border-2 border-[#1e2d3d] border-t-[#38bdf8] animate-spin mb-4"
        role="status"
        aria-label="Loading 3D scene"
      />
      <p className="text-[#4b6380] text-xs font-mono tracking-widest">INITIALISING</p>
    </div>
  )
}

/* ─── Reduced-motion portfolio (no 3D) ─────────────────── */
function ReducedMotionPortfolio() {
  return (
    <>
      <Navigation visible />
      <main>
        <div className="pt-20">
          <Hero revealProgress={1} />
          <PortfolioSections />
        </div>
      </main>
    </>
  )
}

/* ─── All portfolio sections in order ────────────────── */
function PortfolioSections() {
  return (
    <>
      <About />
      <Education />
      <Internships />
      <Projects />
      <Skills />
      <Coursework />
      <Engagements />
      <Achievements />
      <Extracurricular />

      <Certifications />
      <Footer />
    </>
  )
}

/* ─── Main App ──────────────────────────────────────────── */
export default function App() {
  // Check for reduced motion preference
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const phase          = useRef(0)    // live rocket phase 0→1
  const [revealProgress, setRevealProgress] = useState(0)
  const [navVisible, setNavVisible]         = useState(false)
  const [smokeOpacity, setSmokeOpacity]     = useState(0)
  const [portfolioVisible, setPortfolioVisible] = useState(false)

  const handleSequenceComplete = useCallback((progress) => {
    setRevealProgress(progress)

    // Smoke fills at start of portfolio reveal
    const smoke = progress < 0.3
      ? progress / 0.3
      : progress < 0.6
        ? 1 - (progress - 0.3) / 0.3
        : 0
    setSmokeOpacity(smoke * 0.6)

    if (progress > 0.25) setPortfolioVisible(true)
    if (progress > 0.4)  setNavVisible(true)
  }, [])

  const handleRocketCrash = useCallback(() => {
    // WebGL crashed — skip the 3D intro and reveal portfolio immediately
    setRevealProgress(1)
    setPortfolioVisible(true)
    setNavVisible(true)
    setSmokeOpacity(0)
  }, [])

  if (prefersReduced) return <ReducedMotionPortfolio />

  return (
    <>
      {/* 3D rocket canvas — fixed behind everything */}
      <div
        className="fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          // Fade canvas out once portfolio is visible
          opacity: portfolioVisible ? Math.max(0, 1 - revealProgress * 1.5) : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        <RocketErrorBoundary onCrash={handleRocketCrash}>
          <Suspense fallback={<LoadingSplash />}>
            <RocketScene phase={phase} onSequenceComplete={handleSequenceComplete} />
          </Suspense>
        </RocketErrorBoundary>
      </div>

      {/* Smoke transition overlay */}
      <SmokeOverlay opacity={smokeOpacity} />

      {/* Navigation */}
      <Navigation visible={navVisible} />

      {/* Skip to content for accessibility */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only fixed top-4 left-4 z-[100] px-4 py-2 bg-[#38bdf8] text-[#080c14] text-sm font-medium rounded focus-visible:outline-none"
      >
        Skip to content
      </a>

      {/* Portfolio — scrollable over canvas */}
      <main
        className="relative z-10"
        style={{
          opacity: portfolioVisible ? 1 : 0,
          transform: portfolioVisible ? 'none' : 'translateY(20px)',
          transition: 'opacity 1.2s ease, transform 1.2s ease',
          // Don't absorb pointer events until visible (let click-through to canvas)
          pointerEvents: portfolioVisible ? 'auto' : 'none',
        }}
      >
        {/* Hero with reveal animation driven by sequence progress */}
        <Hero revealProgress={revealProgress} />

        {/* All other sections */}
        <div
          style={{
            background: '#080c14',
          }}
        >
          <PortfolioSections />
        </div>
      </main>
    </>
  )
}
