import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, MessageCircle, ShoppingCart, Filter, X } from 'lucide-react';
import { products, categories, formatPrice } from '../services/api';

export default function Catalog({ t, lang }) {
    const c = t.catalog;
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [showFilters, setShowFilters] = useState(false);

    const filteredProducts = useMemo(() => {
        let result = products;

        // Filter by category
        if (activeCategory !== 'all') {
            result = result.filter(p => p.category === activeCategory);
        }

        // Search
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.nameEn.toLowerCase().includes(q) ||
                p.nameAr.includes(q) ||
                p.origin.toLowerCase().includes(q) ||
                p.material.toLowerCase().includes(q)
            );
        }

        // Sort
        switch (sortBy) {
            case 'price-asc':
                result = [...result].sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result = [...result].sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result = [...result].sort((a, b) => b.rating - a.rating);
                break;
            case 'popular':
                result = [...result].sort((a, b) => b.reviews - a.reviews);
                break;
            default:
                break;
        }

        return result;
    }, [search, activeCategory, sortBy]);

    const getProductName = (p) => lang === 'ar' ? p.nameAr : lang === 'en' ? p.nameEn : p.name;
    const getProductDesc = (p) => lang === 'ar' ? p.descriptionAr : lang === 'en' ? p.descriptionEn : p.description;
    const getCategoryName = (cat) => lang === 'ar' ? cat.nameAr : lang === 'en' ? cat.nameEn : cat.name;

    const discount = (p) => Math.round((1 - p.price / p.originalPrice) * 100);

    return (
        <div className="catalog-page page">
            <div className="page-container">
                {/* Header */}
                <div className="catalog-header animate-fade-in-up">
                    <h1 className="catalog-title font-display">{c.title}</h1>
                    <p className="catalog-subtitle">{c.subtitle}</p>
                </div>

                {/* Search & Filters */}
                <div className="catalog-toolbar animate-fade-in-up">
                    <div className="search-bar glass">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder={c.search}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                            dir={lang === 'ar' ? 'rtl' : 'ltr'}
                        />
                        {search && (
                            <button className="search-clear" onClick={() => setSearch('')}>
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    <div className="toolbar-actions">
                        <button
                            className="filter-toggle-btn"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter size={16} />
                            Filters
                        </button>
                        <select
                            className="sort-select glass"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="default">{lang === 'ar' ? 'الترتيب' : lang === 'en' ? 'Sort by' : 'Trier par'}</option>
                            <option value="price-asc">{lang === 'ar' ? 'السعر ↑' : lang === 'en' ? 'Price ↑' : 'Prix ↑'}</option>
                            <option value="price-desc">{lang === 'ar' ? 'السعر ↓' : lang === 'en' ? 'Price ↓' : 'Prix ↓'}</option>
                            <option value="rating">{lang === 'ar' ? 'التقييم' : lang === 'en' ? 'Rating' : 'Note'}</option>
                            <option value="popular">{lang === 'ar' ? 'الأكثر شعبية' : lang === 'en' ? 'Popular' : 'Populaire'}</option>
                        </select>
                    </div>
                </div>

                {/* Categories */}
                <div className={`catalog-categories ${showFilters ? 'show' : ''} animate-fade-in-up`}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            <span className="category-icon">{cat.icon}</span>
                            {getCategoryName(cat)}
                        </button>
                    ))}
                </div>

                {/* Results count */}
                <div className="results-info animate-fade-in">
                    <span className="results-count">{filteredProducts.length}</span>
                    <span className="results-label">
                        {lang === 'ar' ? 'منتجات' : lang === 'en' ? 'products' : 'produits'}
                    </span>
                </div>

                {/* Product Grid */}
                <div className="catalog-grid stagger">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="catalog-card card animate-fade-in-up">
                            <div className="catalog-card-image-wrap">
                                <img src={product.image} alt={getProductName(product)} className="catalog-card-image" loading="lazy" />
                                {product.originalPrice > product.price && (
                                    <div className="discount-badge">-{discount(product)}%</div>
                                )}
                                <div className="card-overlay">
                                    <Link to="/chat" className="overlay-btn">
                                        <MessageCircle size={16} />
                                        {c.negotiate}
                                    </Link>
                                </div>
                            </div>
                            <div className="catalog-card-body">
                                <div className="card-origin">{product.origin}</div>
                                <h3 className="card-name">{getProductName(product)}</h3>
                                <p className="card-desc">{getProductDesc(product)}</p>
                                <div className="card-meta">
                                    <div className="card-rating">
                                        <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                                        <span>{product.rating}</span>
                                        <span className="rating-count">({product.reviews})</span>
                                    </div>
                                    <div className="card-stock">
                                        <span className={`stock-dot ${product.stock > 0 ? 'in' : 'out'}`} />
                                        {product.stock > 0 ? `${product.stock} ${c.in_stock}` : c.out_of_stock}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="card-pricing">
                                        <span className="card-price gradient-text">{formatPrice(product.price)}</span>
                                        {product.originalPrice > product.price && (
                                            <span className="card-original">{formatPrice(product.originalPrice)}</span>
                                        )}
                                    </div>
                                    <Link to="/chat" className="card-negotiate-btn">
                                        <MessageCircle size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="empty-state animate-fade-in-up">
                        <ShoppingCart size={48} />
                        <h3>{lang === 'ar' ? 'لم يتم العثور على منتجات' : lang === 'en' ? 'No products found' : 'Aucun produit trouvé'}</h3>
                        <p>{lang === 'ar' ? 'جرب كلمات بحث مختلفة' : lang === 'en' ? 'Try different search terms' : 'Essayez avec d\'autres termes'}</p>
                    </div>
                )}
            </div>

            <style>{`
        .catalog-page {
          padding-bottom: 4rem;
        }
        .catalog-header {
          text-align: center;
          padding: 3rem 0 2rem;
        }
        .catalog-title {
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: 0.5rem;
        }
        .catalog-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        /* Toolbar */
        .catalog-toolbar {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .search-bar {
          flex: 1;
          min-width: 250px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--radius-full);
        }
        .search-icon {
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-family: var(--font-sans);
        }
        .search-input::placeholder {
          color: var(--text-muted);
        }
        .search-clear {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          padding: 4px;
        }
        .toolbar-actions {
          display: flex;
          gap: 8px;
        }
        .filter-toggle-btn {
          display: none;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: var(--surface-card);
          color: var(--text-secondary);
          font-size: 0.85rem;
          cursor: pointer;
          font-family: var(--font-sans);
        }
        .sort-select {
          padding: 10px 16px;
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-family: var(--font-sans);
          cursor: pointer;
          appearance: none;
          min-width: 140px;
        }
        .sort-select option {
          background: var(--surface-card);
          color: var(--text-primary);
        }

        /* Categories */
        .catalog-categories {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .category-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: var(--surface-card);
          color: var(--text-secondary);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: var(--font-sans);
        }
        .category-chip:hover {
          border-color: var(--color-primary-500);
          color: var(--color-primary-400);
        }
        .category-chip.active {
          background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
          color: var(--color-neutral-900);
          border-color: transparent;
          font-weight: 600;
        }
        .category-icon {
          font-size: 1rem;
        }

        /* Results */
        .results-info {
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .results-count {
          color: var(--color-primary-400);
          font-weight: 700;
          font-size: 1.1rem;
        }

        /* Grid */
        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .catalog-card {
          overflow: hidden;
        }
        .catalog-card-image-wrap {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        .catalog-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }
        .catalog-card:hover .catalog-card-image {
          transform: scale(1.08);
        }
        .discount-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 10px;
          background: var(--color-accent-500);
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: var(--radius-full);
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 14, 13, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-base);
        }
        .catalog-card:hover .card-overlay {
          opacity: 1;
        }
        .overlay-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
          color: var(--color-neutral-900);
          border-radius: var(--radius-full);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          transition: transform var(--transition-fast);
        }
        .overlay-btn:hover {
          transform: scale(1.05);
        }

        .catalog-card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .card-origin {
          font-size: 0.75rem;
          color: var(--color-primary-400);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .card-name {
          font-size: 1.05rem;
          font-weight: 600;
        }
        .card-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
        }
        .card-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .card-stock {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .stock-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .stock-dot.in { background: #34d399; }
        .stock-dot.out { background: #f87171; }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .card-pricing {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .card-price {
          font-size: 1.15rem;
          font-weight: 700;
        }
        .card-original {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-decoration: line-through;
        }
        .card-negotiate-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary-400);
          text-decoration: none;
          transition: all var(--transition-fast);
        }
        .card-negotiate-btn:hover {
          background: rgba(245, 158, 11, 0.2);
          transform: scale(1.1);
        }

        /* Empty state */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .empty-state h3 {
          color: var(--text-secondary);
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .filter-toggle-btn {
            display: inline-flex;
          }
          .catalog-categories {
            display: none;
          }
          .catalog-categories.show {
            display: flex;
          }
          .catalog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
