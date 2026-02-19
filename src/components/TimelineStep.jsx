import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Single timeline step with progressive animation
 */
export default function TimelineStep({ step, label, isActive, isCompleted, index }) {
  const dotRef = useRef(null)
  const lineRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (!dotRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(dotRef.current, {
        scale: isActive || isCompleted ? 1.2 : 1,
        backgroundColor: isCompleted ? '#22c55e' : isActive ? '#d97706' : '#fde68a',
      })
      return
    }

    if (isCompleted || isActive) {
      gsap.to(dotRef.current, {
        scale: 1.2,
        backgroundColor: isCompleted ? '#22c55e' : '#d97706',
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
      })
      if (lineRef.current && isCompleted) {
        gsap.to(lineRef.current, {
          scaleX: 1,
          duration: 0.5,
          ease: 'power2.out',
          transformOrigin: 'left center',
        })
      }
    }
  }, [isActive, isCompleted])

  return (
    <div className="flex flex-col items-center flex-1">
      <div className="flex items-center w-full">
        <div
          ref={dotRef}
          className={`w-4 h-4 rounded-full flex-shrink-0 transition-colors ${
            isCompleted ? 'bg-green-500' : isActive ? 'bg-amber-600' : 'bg-amber-200'
          }`}
        />
        {index < 3 && (
          <div className="flex-1 h-1 mx-1 rounded overflow-hidden bg-amber-200">
            <div
              ref={lineRef}
              className="h-full bg-amber-500 rounded"
              style={{
                width: '100%',
                transform: isCompleted ? 'scaleX(1)' : isActive ? 'scaleX(0.5)' : 'scaleX(0)',
                transformOrigin: 'left center',
              }}
            />
          </div>
        )}
      </div>
      <p
        ref={labelRef}
        className={`mt-2 text-sm font-medium ${
          isActive ? 'text-amber-900' : isCompleted ? 'text-green-700' : 'text-amber-500'
        }`}
      >
        {label}
      </p>
    </div>
  )
}
