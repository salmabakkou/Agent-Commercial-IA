import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const stockConfig = {
  in_stock: { label: 'En stock', className: 'bg-green-100 text-green-800' },
  low_stock: { label: 'Stock faible', className: 'bg-amber-100 text-amber-800' },
  out_of_stock: { label: 'Rupture', className: 'bg-red-100 text-red-800' },
}

/**
 * Product card with 3D hover lift and shadow
 */
export default function ProductCard({ product, index = 0 }) {
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  const { label, className } = stockConfig[product.stockStatus] || stockConfig.in_stock

  useEffect(() => {
    if (!cardRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Hover: 3D lift + shadow grow
    const card = cardRef.current
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        rotateX: 5,
        rotateY: -3,
        boxShadow: '0 25px 50px -12px rgba(120, 53, 15, 0.25)',
        duration: 0.35,
        ease: 'power2.out',
        transformPerspective: 800,
        force3D: true,
      })
      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 0.35,
        ease: 'power2.out',
      })
    }
    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        rotateX: 0,
        rotateY: 0,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
        duration: 0.35,
        ease: 'power2.out',
      })
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.35,
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <article
      ref={cardRef}
      className="bg-white rounded-2xl overflow-hidden shadow-md border border-amber-100/50 group will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative h-52 overflow-hidden bg-amber-50">
        <img
          ref={imageRef}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        <span className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full ${className}`}>
          {label}
        </span>
      </div>
      <div className="p-4">
        <p className="text-amber-950 font-medium text-sm mb-1">{product.category}</p>
        <h3 className="font-semibold text-amber-900 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-amber-600 font-bold text-lg mb-4">{product.price} MAD</p>
        <button
          disabled={product.stockStatus === 'out_of_stock'}
          className={`w-full py-2.5 rounded-xl font-medium text-sm transition-colors ${
            product.stockStatus === 'out_of_stock'
              ? 'bg-amber-100 text-amber-500 cursor-not-allowed'
              : 'bg-amber-500 text-white hover:bg-amber-600'
          }`}
        >
          Demander à l'agent
        </button>
      </div>
    </article>
  )
}
