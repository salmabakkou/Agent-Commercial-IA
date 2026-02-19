import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Cart summary panel with slide-from-right animation
 */
export default function CartSidebar({ isOpen, items = [], onClose }) {
  const panelRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!panelRef.current || !overlayRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(panelRef.current, { x: 0 })
      gsap.set(overlayRef.current, { opacity: isOpen ? 1 : 0 })
      return
    }

    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.2 })
      gsap.to(panelRef.current, {
        x: 0,
        duration: 0.35,
        ease: 'power2.out',
      })
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 })
      gsap.to(panelRef.current, {
        x: '100%',
        duration: 0.35,
        ease: 'power2.in',
      })
    }
  }, [isOpen])

  const total = items.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0)

  return (
    <>
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 z-40 lg:hidden"
        style={{ opacity: 0, pointerEvents: isOpen ? 'auto' : 'none' }}
      />
      <aside
        ref={panelRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-amber-100 shadow-xl z-50 flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="p-4 border-b border-amber-100 flex justify-between items-center">
          <h3 className="font-bold text-amber-950">Panier</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-amber-50 text-amber-700"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-amber-600 text-sm">Votre panier est vide.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 p-2 rounded-lg bg-amber-50/50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-amber-900 text-sm truncate">{item.name}</p>
                    <p className="text-amber-600 text-sm">
                      {item.price} MAD × {item.quantity || 1}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-4 border-t border-amber-100">
          <div className="flex justify-between font-bold text-amber-950 mb-4">
            <span>Total</span>
            <span>{total} MAD</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Passer commande
          </button>
        </div>
      </aside>
    </>
  )
}
