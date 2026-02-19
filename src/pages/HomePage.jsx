import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import HeroSection from '../components/HeroSection'
import ProductGrid from '../components/ProductGrid'
import { featuredProducts } from '../data/mockProducts'

export default function HomePage() {
  const featuredRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const featured = featuredRef.current
    const title = titleRef.current
    if (!featured || !title) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(title, { opacity: 1, y: 0, clearProps: 'all' })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: featured,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
    tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })

    ScrollTrigger.refresh()

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.trigger === featured && st.kill())
      gsap.set(title, { opacity: 1, y: 0, clearProps: 'all' })
    }
  }, [])

  return (
    <main>
      <HeroSection />
      <section ref={featuredRef} className="py-16 px-4 max-w-7xl mx-auto">
        <h2 ref={titleRef} className="text-2xl md:text-3xl font-bold text-amber-950 mb-10 text-center">
          Produits en vedette
        </h2>
        <ProductGrid products={featuredProducts} />
      </section>
    </main>
  )
}
