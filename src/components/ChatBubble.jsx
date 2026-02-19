import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Chat message bubble with slide-in animation
 */
export default function ChatBubble({ message, isUser }) {
  const bubbleRef = useRef(null)

  useEffect(() => {
    const bubble = bubbleRef.current
    if (!bubble) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(bubble, { opacity: 1, x: 0, clearProps: 'all' })
      return
    }

    const dir = isUser ? 1 : -1
    const tween = gsap.fromTo(bubble, { opacity: 0, x: 40 * dir }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' })
    return () => {
      tween.kill()
      gsap.set(bubble, { opacity: 1, x: 0, clearProps: 'all' })
    }
  }, [message, isUser])

  return (
    <div
      ref={bubbleRef}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-amber-600 text-white rounded-br-md'
            : 'bg-white text-amber-900 border border-amber-200 rounded-bl-md shadow-sm'
        }`}
      >
        <p className="text-sm md:text-base">{message}</p>
      </div>
    </div>
  )
}
