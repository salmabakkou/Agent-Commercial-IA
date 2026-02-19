import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import TimelineStep from '../components/TimelineStep'

const steps = [
  { key: 'confirmed', label: 'Confirmée' },
  { key: 'processing', label: 'En traitement' },
  { key: 'shipped', label: 'Expédiée' },
  { key: 'delivered', label: 'Livrée' },
]

export default function OrderTrackingPage() {
  const [refNumber, setRefNumber] = useState('')
  const [email, setEmail] = useState('')
  const [currentStep, setCurrentStep] = useState(2) // 0-3 for demo
  const sectionRef = useRef(null)
  const progressLineRef = useRef(null)
  const successRef = useRef(null)

  useEffect(() => {
    if (!progressLineRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(progressLineRef.current, { scaleX: (currentStep + 1) / 4 })
      return
    }

    gsap.to(progressLineRef.current, {
      scaleX: (currentStep + 1) / 4,
      duration: 0.6,
      ease: 'power2.out',
      transformOrigin: 'left center',
    })
  }, [currentStep])

  useEffect(() => {
    const el = successRef.current
    if (currentStep !== 3 || !el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, scale: 1, clearProps: 'all' })
      return
    }

    const tween = gsap.fromTo(el, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' })
    return () => {
      tween.kill()
      gsap.set(el, { opacity: 1, scale: 1, clearProps: 'all' })
    }
  }, [currentStep])

  const handleSubmit = (e) => {
    e.preventDefault()
    setCurrentStep((s) => (s + 1) % 4)
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto" ref={sectionRef}>
        <h1 className="text-3xl md:text-4xl font-bold text-amber-950 mb-8 text-center">
          Suivi de commande
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-12 p-6 bg-white rounded-2xl border border-amber-100 shadow-sm"
        >
          <div>
            <label htmlFor="ref" className="block text-sm font-medium text-amber-900 mb-2">
              Référence de commande
            </label>
            <input
              id="ref"
              type="text"
              value={refNumber}
              onChange={(e) => setRefNumber(e.target.value)}
              placeholder="Ex: CMD-2024-001"
              className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors"
          >
            Suivre la commande
          </button>
        </form>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-8">
          <h2 className="font-bold text-amber-950 mb-6">État de la commande</h2>
          <div className="flex items-start justify-between gap-2">
            {steps.map((step, index) => (
              <TimelineStep
                key={step.key}
                step={step.key}
                label={step.label}
                index={index}
                isActive={index === currentStep}
                isCompleted={index < currentStep}
              />
            ))}
          </div>
          {/* Dynamic progress line (decorative) */}
          <div className="mt-4 h-1 bg-amber-100 rounded-full overflow-hidden">
            <div
              ref={progressLineRef}
              className="h-full bg-amber-500 rounded-full"
              style={{ width: '100%', transform: `scaleX(${(currentStep + 1) / 4})`, transformOrigin: 'left center' }}
            />
          </div>
        </div>

        {currentStep === 3 && (
          <div
            ref={successRef}
            className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center"
          >
            <p className="text-green-800 font-medium">✅ Commande livrée avec succès !</p>
          </div>
        )}
      </div>
    </main>
  )
}
