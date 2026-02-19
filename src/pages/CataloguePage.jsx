import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import ProductGrid from '../components/ProductGrid'
import { allProducts } from '../data/mockProducts'

export default function CataloguePage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const searchRef = useRef(null)
  const filterRef = useRef(null)

  const categories = ['all', ...new Set(allProducts.map((p) => p.category))]
  const filtered = allProducts.filter((p) => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.category === filter
    return matchSearch && matchFilter
  })

  useEffect(() => {
    const search = searchRef.current
    const filter = filterRef.current
    if (!search || !filter) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set([search, filter], { opacity: 1, y: 0, clearProps: 'all' })
      return
    }

    const tl = gsap.timeline()
    tl.fromTo(search, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      .fromTo(filter, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')

    return () => {
      tl.kill()
      gsap.set([search, filter], { opacity: 1, y: 0, clearProps: 'all' })
    }
  }, [])

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-950 mb-8">Catalogue</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-10" ref={searchRef}>
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-amber-200 bg-white shadow-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
          />
          <div ref={filterRef} className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filter === cat
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                }`}
              >
                {cat === 'all' ? 'Tous' : cat}
              </button>
            ))}
          </div>
        </div>
        <ProductGrid products={filtered} />
      </div>
    </main>
  )
}
