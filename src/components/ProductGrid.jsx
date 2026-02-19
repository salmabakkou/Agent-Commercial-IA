import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from './ProductCard'

gsap.registerPlugin(ScrollTrigger)

/**
 * Responsive product grid with stagger reveal on scroll
 */
export default function ProductGrid({ products }) {
  const gridRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const grid = gridRef.current
    const cards = cardRefs.current.filter(Boolean)
    if (!grid || cards.length === 0) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
    tl.fromTo(cards, { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out' })

    ScrollTrigger.refresh()

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.trigger === grid && st.kill())
      gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' })
    }
  }, [products])

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {products.map((product, index) => (
        <div key={product.id} ref={(el) => (cardRefs.current[index] = el)}>
          <ProductCard product={product} index={index} />
        </div>
      ))}
    </div>
  )
}
