import { useState } from 'react'
import { assetUrl } from '../utils/assetUrl'

/**
 * ImageWithFallback
 * Renders a real image if it loads, or a styled aerospace placeholder if it doesn't.
 * Never shows a broken-image icon.
 * Automatically prepends BASE_URL so images work on GitHub Pages /portfolio/ subpath.
 *
 * Props:
 *   src       — path to the image (e.g. /images/profile/profile-main.jpg)
 *   alt       — alt text
 *   label     — short description shown in placeholder (e.g. "profile-main.jpg")
 *   folder    — folder path shown in placeholder (e.g. "images/profile/")
 *   className — additional Tailwind classes
 *   imgClassName — additional classes on the <img> element (e.g. object-contain)
 *   style     — additional inline styles
 */
export default function ImageWithFallback({
  src,
  alt,
  label,
  folder,
  className = '',
  imgClassName = 'object-cover',
  style = {},
}) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Apply base URL prefix for production GitHub Pages deployment
  const resolvedSrc = assetUrl(src)

  if (!src || failed) {
    return (
      <div
        className={`relative overflow-hidden flex flex-col items-center justify-center ${className}`}
        style={{
          background: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)',
          border: '1px dashed rgba(56,189,248,0.2)',
          ...style,
        }}
        aria-label={alt}
        role="img"
      >
        {/* Corner decoration */}
        <span className="absolute top-2 left-2 text-[rgba(56,189,248,0.3)] text-xs font-mono">◰</span>
        <span className="absolute top-2 right-2 text-[rgba(56,189,248,0.3)] text-xs font-mono">◱</span>
        <span className="absolute bottom-2 left-2 text-[rgba(56,189,248,0.3)] text-xs font-mono">◳</span>
        <span className="absolute bottom-2 right-2 text-[rgba(56,189,248,0.3)] text-xs font-mono">◲</span>

        {/* Icon */}
        <svg
          className="mb-3 opacity-20"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21,15 16,10 5,21" />
        </svg>

        {/* Label text */}
        <p className="text-[10px] font-mono text-[rgba(56,189,248,0.4)] text-center leading-relaxed px-3">
          IMAGE REQUIRED
        </p>
        {folder && (
          <p className="text-[9px] font-mono text-[rgba(56,189,248,0.25)] text-center mt-1 px-3">
            {folder}
          </p>
        )}
        {label && (
          <p className="text-[9px] font-mono text-[rgba(56,189,248,0.35)] text-center mt-0.5 px-3 break-all">
            {label}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* Shimmer while loading */}
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: 'linear-gradient(135deg, #0d1117, #111827)' }}
        />
      )}
      <img
        src={resolvedSrc}
        alt={alt}
        onError={() => setFailed(true)}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
    </div>
  )
}
