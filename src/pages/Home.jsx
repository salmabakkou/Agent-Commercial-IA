import { Link } from 'react-router-dom';
import { MessageCircle, ShoppingBag, Sparkles, Truck, Star, ArrowRight, Globe } from 'lucide-react';
import { products, formatPrice } from '../services/api';

export default function Home({ t, lang }) {
    const h = t.home;

    const features = [
        { icon: <MessageCircle size={28} />, title: h.feature1_title, desc: h.feature1_desc, color: '#fbbf24' },
        { icon: <Sparkles size={28} />, title: h.feature2_title, desc: h.feature2_desc, color: '#f87171' },
        { icon: <Truck size={28} />, title: h.feature3_title, desc: h.feature3_desc, color: '#60a5fa' },
    ];

    const stats = [
        { value: '350+', label: h.stats_products },
        { value: '120+', label: h.stats_artisans },
        { value: '45+', label: h.stats_countries },
        { value: '98%', label: h.stats_satisfaction },
    ];

    const featuredProducts = products.slice(0, 3);

    return (
        <div className="home-page">
            {/* Hero */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-pattern" />
                    <div className="hero-glow" />
                </div>
                <div className="hero-content page-container">
                    <div className="hero-text animate-fade-in-up">
                        <div className="hero-badge">
                            <Globe size={14} />
                            <span>{lang === 'ar' ? 'FR • EN • عربي' : 'FR • EN • AR'}</span>
                        </div>
                        <h1 className="hero-title font-display">
                            {h.hero_title}
                            <br />
                            <span className="gradient-text-accent">{h.hero_title2}</span>
                        </h1>
                        <p className="hero-subtitle">{h.hero_subtitle}</p>
                        <div className="hero-actions">
                            <Link to="/chat" className="btn-primary">
                                <MessageCircle size={18} />
                                {h.cta_chat}
                            </Link>
                            <Link to="/catalog" className="btn-secondary">
                                <ShoppingBag size={18} />
                                {h.cta_catalog}
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats stagger">
                        {stats.map((stat, i) => (
                            <div key={i} className="stat-card glass animate-fade-in-up">
                                <span className="stat-value gradient-text">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features-section page-container">
                <div className="features-grid stagger">
                    {features.map((feat, i) => (
                        <div key={i} className="feature-card card animate-fade-in-up">
                            <div className="feature-icon" style={{ color: feat.color, background: `${feat.color}15` }}>
                                {feat.icon}
                            </div>
                            <h3 className="feature-title">{feat.title}</h3>
                            <p className="feature-desc">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section page-container">
                <div className="section-header animate-fade-in-up">
                    <h2 className="section-title font-display">
                        {lang === 'ar' ? 'منتجات مميزة' : lang === 'en' ? 'Featured Products' : 'Produits Vedettes'}
                    </h2>
                    <Link to="/catalog" className="section-link">
                        {lang === 'ar' ? 'عرض الكل' : lang === 'en' ? 'View All' : 'Voir tout'}
                        <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="featured-grid stagger">
                    {featuredProducts.map((product, i) => (
                        <div key={product.id} className="product-card card animate-fade-in-up">
                            <div className="product-image-wrap">
                                <img src={product.image} alt={product.name} className="product-image" />
                                <div className="product-badge">{product.origin}</div>
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">
                                    {lang === 'ar' ? product.nameAr : lang === 'en' ? product.nameEn : product.name}
                                </h3>
                                <div className="product-rating">
                                    <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                                    <span>{product.rating}</span>
                                    <span className="rating-count">({product.reviews})</span>
                                </div>
                                <div className="product-pricing">
                                    <span className="product-price gradient-text">{formatPrice(product.price)}</span>
                                    {product.originalPrice > product.price && (
                                        <span className="product-original-price">{formatPrice(product.originalPrice)}</span>
                                    )}
                                </div>
                                <Link to="/chat" className="btn-negotiate">
                                    <MessageCircle size={14} />
                                    {t.catalog.negotiate}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-section page-container">
                <div className="cta-banner glass animate-fade-in-up">
                    <div className="cta-content">
                        <h2 className="cta-title font-display">
                            {lang === 'ar' ? '🕌 جرب التفاوض الآن!' : lang === 'en' ? '🕌 Try Negotiating Now!' : '🕌 Essayez la Négociation !'}
                        </h2>
                        <p className="cta-desc">
                            {lang === 'ar'
                                ? 'وكيلنا الذكي ينتظرك. تحدث باللغة التي تفضلها واحصل على أفضل الأسعار!'
                                : lang === 'en'
                                    ? "Our AI agent is waiting for you. Speak in your preferred language and get the best prices!"
                                    : "Notre agent IA vous attend. Parlez dans la langue de votre choix et obtenez les meilleurs prix !"}
                        </p>
                    </div>
                    <Link to="/chat" className="btn-primary cta-btn">
                        <MessageCircle size={18} />
                        {h.cta_chat}
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            <style>{`
        .home-page {
          padding-bottom: 2rem;
        }

        /* Hero */
        .hero {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(245, 158, 11, 0.06) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .hero-glow {
          position: absolute;
          top: -20%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 4rem;
          padding-top: 4rem;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: var(--radius-full);
          color: var(--color-primary-400);
          font-size: 0.8rem;
          font-weight: 500;
          width: fit-content;
          margin-bottom: 1rem;
        }
        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
        }
        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          max-width: 560px;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .stat-card {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .stat-value {
          font-size: 2rem;
          font-weight: 800;
        }
        .stat-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        /* Features */
        .features-section {
          padding: 5rem 2rem;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .feature-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .feature-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .feature-title {
          font-size: 1.15rem;
          font-weight: 600;
        }
        .feature-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        /* Featured */
        .featured-section {
          padding: 2rem 2rem 5rem;
        }
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }
        .section-title {
          font-size: 2rem;
        }
        .section-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--color-primary-400);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: gap var(--transition-fast);
        }
        .section-link:hover {
          gap: 10px;
        }
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .product-card {
          overflow: hidden;
        }
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        .product-image-wrap {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }
        .product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 4px 12px;
          background: rgba(15, 14, 13, 0.7);
          backdrop-filter: blur(8px);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          color: var(--color-primary-300);
          font-weight: 500;
        }
        .product-info {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .product-name {
          font-size: 1.05rem;
          font-weight: 600;
        }
        .product-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .rating-count {
          color: var(--text-muted);
        }
        .product-pricing {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .product-price {
          font-size: 1.2rem;
          font-weight: 700;
        }
        .product-original-price {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-decoration: line-through;
        }
        .btn-negotiate {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: var(--radius-full);
          color: var(--color-primary-400);
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          transition: all var(--transition-fast);
          width: fit-content;
          margin-top: 4px;
        }
        .btn-negotiate:hover {
          background: rgba(245, 158, 11, 0.2);
        }

        /* CTA Banner */
        .cta-section {
          padding: 2rem 2rem 4rem;
        }
        .cta-banner {
          padding: 3rem;
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(248, 113, 113, 0.05));
          border: 1px solid rgba(245, 158, 11, 0.12);
        }
        .cta-title {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }
        .cta-desc {
          color: var(--text-secondary);
          font-size: 1rem;
          max-width: 500px;
        }
        .cta-btn {
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .hero {
            min-height: auto;
            padding: 4rem 0 2rem;
          }
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          .cta-banner {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }
          .cta-desc {
            max-width: 100%;
          }
        }
      `}</style>
        </div>
    );
}
