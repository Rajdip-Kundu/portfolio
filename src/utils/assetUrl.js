/**
 * Prepend Vite's BASE_URL to any root-relative path.
 * In dev  → BASE_URL is "/"         → no change
 * In prod → BASE_URL is "/portfolio/" → prepends /portfolio/
 *
 * Usage:
 *   import { assetUrl } from '../utils/assetUrl'
 *   <img src={assetUrl('/images/profile/profile-main.jpg')} />
 */
export function assetUrl(path) {
  if (!path) return path
  const base = import.meta.env.BASE_URL // ends with "/"
  // avoid double slash: strip leading "/" from path
  const stripped = path.startsWith('/') ? path.slice(1) : path
  return `${base}${stripped}`
}
