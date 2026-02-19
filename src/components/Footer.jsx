import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const footer = footerRef.current
    const content = contentRef.current
    if (!footer || !content) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(content, { opacity: 1, y: 0, clearProps: 'all' })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    })
    tl.fromTo(content, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })

    ScrollTrigger.refresh()

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.trigger === footer && st.kill())
      gsap.set(content, { opacity: 1, y: 0, clearProps: 'all' })
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="bg-amber-950 text-amber-100 mt-auto"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-amber-200 text-lg mb-3">Souk AI</h3>
            <p className="text-amber-200/80 text-sm">
              Votre agent commercial intelligent. Achetez comme dans un souk marocain, en ligne.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-amber-200 text-lg mb-3">Liens</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalogue" className="hover:text-amber-100 transition-colors">Catalogue</Link></li>
              <li><Link to="/chat" className="hover:text-amber-100 transition-colors">Parler à l'agent</Link></li>
              <li><Link to="/suivi" className="hover:text-amber-100 transition-colors">Suivi de commande</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-amber-200 text-lg mb-3">Contact</h3>
            <p className="text-amber-200/80 text-sm">
              Prêt à connecter avec n8n pour des commandes réelles.
            </p>
          </div>
        </div>
        <div className="border-t border-amber-800/50 mt-8 pt-6 text-center text-amber-300/70 text-sm">
          © {new Date().getFullYear()} Souk AI. Interface frontend prête pour n8n.
        </div>
      </div>
    </footer>
  )
}
