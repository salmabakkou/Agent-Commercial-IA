import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/chat', label: 'Agent' },
  { to: '/suivi', label: 'Suivi' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const linksRef = useRef([])

  useEffect(() => {
    const nav = navRef.current
    const links = linksRef.current.filter(Boolean)
    if (!nav) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set([nav, ...links], { opacity: 1, y: 0, clearProps: 'all' })
      return
    }

    const tl = gsap.timeline()
    tl.fromTo(nav, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })
      .fromTo(links, { opacity: 0, y: -10 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: 'power2.out' }, '-=0.2')

    return () => {
      tl.kill()
      gsap.set([nav, ...links], { opacity: 1, y: 0, clearProps: 'all' })
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-amber-50/95 backdrop-blur-md border-b border-amber-200/50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          <Link
            to="/"
            className="text-xl font-bold text-amber-900 tracking-tight hover:text-amber-700 transition-colors"
          >
            🏺 Souk AI
          </Link>
          <ul className="flex gap-4 md:gap-8">
            {navLinks.map((link, i) => (
              <li key={link.to}>
                <Link
                  ref={(el) => (linksRef.current[i] = el)}
                  to={link.to}
                  className="text-amber-900/90 hover:text-amber-700 font-medium text-sm md:text-base transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
