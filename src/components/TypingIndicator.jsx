import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Typing indicator with bouncing dots animation
 */
export default function TypingIndicator() {
  const dotsRef = useRef([])

  useEffect(() => {
    if (!dotsRef.current.length) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const tl = gsap.timeline({ repeat: -1 })
    dotsRef.current.forEach((dot, i) => {
      tl.to(
        dot,
        {
          y: -6,
          duration: 0.2,
          ease: 'power2.out',
        },
        i * 0.15
      ).to(
        dot,
        {
          y: 0,
          duration: 0.2,
          ease: 'power2.in',
        },
        i * 0.15 + 0.2
      )
    })
    tl.timeScale(1.2)

    return () => tl.kill()
  }, [])

  return (
    <div className="flex justify-start">
      <div className="px-4 py-3 bg-white border border-amber-200 rounded-2xl rounded-bl-md shadow-sm flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className="w-2 h-2 bg-amber-500 rounded-full"
          />
        ))}
      </div>
    </div>
  )
}
