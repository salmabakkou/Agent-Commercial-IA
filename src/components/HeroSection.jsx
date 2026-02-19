import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Hero section with 3D perspective animations and Moroccan souk aesthetic
 */
export default function HeroSection() {
  const containerRef = useRef(null)
  const headlineRef = useRef(null)
  const subtitleRef = useRef(null)
  const cta1Ref = useRef(null)
  const cta2Ref = useRef(null)

  useEffect(() => {
    const headline = headlineRef.current
    const subtitle = subtitleRef.current
    const cta1 = cta1Ref.current
    const cta2 = cta2Ref.current
    if (!containerRef.current || !headline) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set([headline, subtitle, cta1, cta2], { opacity: 1, y: 0, rotateX: 0, clearProps: 'all' })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(headline, { opacity: 0, y: 60, rotateX: -15 }, { opacity: 1, y: 0, rotateX: 0, duration: 1 })
      .fromTo(subtitle, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .fromTo([cta1, cta2], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }, '-=0.4')

    return () => {
      tl.kill()
      gsap.set([headline, subtitle, cta1, cta2], { opacity: 1, y: 0, rotateX: 0, clearProps: 'all' })
    }
  }, [])

  // Hover scale effect for CTAs
  const handleCtaMouseEnter = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.25,
      ease: 'power2.out',
      force3D: true,
    })
  }
  const handleCtaMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/50 via-transparent to-amber-200/30 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-amber-950 mb-4 tracking-tight"
        >
          Bienvenue au{' '}
          <span className="text-amber-600 drop-shadow-sm">Souk AI</span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-amber-800/90 mb-10 max-w-2xl mx-auto"
        >
          Votre agent commercial intelligent. Découvrez des trésors artisanaux et négociez comme dans un souk marocain.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            ref={cta1Ref}
            to="/catalogue"
            onMouseEnter={handleCtaMouseEnter}
            onMouseLeave={handleCtaMouseLeave}
            className="px-8 py-4 bg-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-600/25 hover:bg-amber-700 transition-colors will-change-transform"
          >
            Commencer vos achats
          </Link>
          <Link
            ref={cta2Ref}
            to="/catalogue"
            onMouseEnter={handleCtaMouseEnter}
            onMouseLeave={handleCtaMouseLeave}
            className="px-8 py-4 bg-amber-100 text-amber-900 font-semibold rounded-xl border-2 border-amber-300 hover:bg-amber-200 transition-colors will-change-transform"
          >
            Parcourir les produits
          </Link>
        </div>
      </div>
    </section>
  )
}
