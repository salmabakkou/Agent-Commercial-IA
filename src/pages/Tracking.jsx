import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, ChevronRight } from 'lucide-react';
import { mockOrders, statusLabels, formatPrice } from '../services/api';

export default function Tracking({ t, lang }) {
    const tr = t.tracking;
    const [searchQuery, setSearchQuery] = useState('');
    const [foundOrder, setFoundOrder] = useState(null);
    const [searched, setSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setIsLoading(true);
        setSearched(false);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1200));

        const order = mockOrders.find(o =>
            o.id.toLowerCase() === searchQuery.trim().toLowerCase()
        );
        setFoundOrder(order || null);
        setSearched(true);
        setIsLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    const getStatusLabel = (status) => {
        const s = statusLabels[status];
        return lang === 'ar' ? s.ar : lang === 'en' ? s.en : s.fr;
    };

    const statusSteps = ['pending', 'processing', 'shipped', 'delivered'];

    const getStepIcon = (step) => {
        switch (step) {
            case 'pending': return <Clock size={20} />;
            case 'processing': return <Package size={20} />;
            case 'shipped': return <Truck size={20} />;
            case 'delivered': return <CheckCircle size={20} />;
            default: return <Clock size={20} />;
        }
    };

    const currentStepIndex = foundOrder ? statusSteps.indexOf(foundOrder.status) : -1;

    return (
        <div className="tracking-page page">
            <div className="page-container">
                {/* Header */}
                <div className="tracking-header animate-fade-in-up">
                    <div className="tracking-header-icon">
                        <Package size={32} />
                    </div>
                    <h1 className="tracking-title font-display">{tr.title}</h1>
                    <p className="tracking-subtitle">{tr.subtitle}</p>
                </div>

                {/* Search */}
                <div className="tracking-search animate-fade-in-up">
                    <div className="tracking-search-bar glass">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            className="tracking-input"
                            placeholder={tr.search}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            dir={lang === 'ar' ? 'rtl' : 'ltr'}
                        />
                        <button
                            className="tracking-btn btn-primary"
                            onClick={handleSearch}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="spinner" />
                            ) : (
                                <>
                                    <Search size={16} />
                                    {tr.track}
                                </>
                            )}
                        </button>
                    </div>
                    <div className="tracking-hint">
                        {lang === 'ar'
                            ? 'جرب: CMD-2024-001, CMD-2024-002, CMD-2024-003, CMD-2024-004'
                            : lang === 'en'
                                ? 'Try: CMD-2024-001, CMD-2024-002, CMD-2024-003, CMD-2024-004'
                                : 'Essayez : CMD-2024-001, CMD-2024-002, CMD-2024-003, CMD-2024-004'}
                    </div>
                </div>

                {/* Results */}
                {searched && foundOrder && (
                    <div className="tracking-result animate-fade-in-up">
                        {/* Order Info */}
                        <div className="order-card glass">
                            <div className="order-header">
                                <div>
                                    <h2 className="order-id">{foundOrder.id}</h2>
                                    <p className="order-date">{new Date(foundOrder.date).toLocaleDateString(lang === 'ar' ? 'ar-MA' : lang === 'en' ? 'en-US' : 'fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <div
                                    className="order-status-badge"
                                    style={{ background: `${statusLabels[foundOrder.status].color}20`, color: statusLabels[foundOrder.status].color, border: `1px solid ${statusLabels[foundOrder.status].color}30` }}
                                >
                                    {getStatusLabel(foundOrder.status)}
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="order-timeline">
                                {statusSteps.map((step, i) => {
                                    const isCompleted = i <= currentStepIndex;
                                    const isCurrent = i === currentStepIndex;
                                    return (
                                        <div key={step} className={`timeline-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                                            <div className="timeline-icon-wrap">
                                                <div className="timeline-icon" style={isCompleted ? { background: statusLabels[step].color, color: '#0f0e0d' } : {}}>
                                                    {getStepIcon(step)}
                                                </div>
                                                {i < statusSteps.length - 1 && (
                                                    <div className={`timeline-line ${i < currentStepIndex ? 'filled' : ''}`} />
                                                )}
                                            </div>
                                            <span className="timeline-label">{getStatusLabel(step)}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Items */}
                            <div className="order-items">
                                <h3 className="order-section-title">{tr.items}</h3>
                                {foundOrder.items.map((item, i) => (
                                    <div key={i} className="order-item">
                                        <div className="order-item-info">
                                            <span className="order-item-name">{item.name}</span>
                                            <span className="order-item-qty">×{item.quantity}</span>
                                        </div>
                                        <span className="order-item-price">{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                                <div className="order-total">
                                    <span>{tr.total}</span>
                                    <span className="order-total-value gradient-text">{formatPrice(foundOrder.total)}</span>
                                </div>
                            </div>

                            {/* Customer */}
                            <div className="order-customer">
                                <MapPin size={16} />
                                <span>{foundOrder.customer.name} — {foundOrder.customer.city}</span>
                            </div>
                        </div>
                    </div>
                )}

                {searched && !foundOrder && (
                    <div className="tracking-empty animate-fade-in-up">
                        <Package size={48} />
                        <h3>{lang === 'ar' ? 'لم يتم العثور على الطلب' : lang === 'en' ? 'Order not found' : 'Commande introuvable'}</h3>
                        <p>{lang === 'ar' ? 'تحقق من رقم الطلب وحاول مرة أخرى' : lang === 'en' ? 'Check your order number and try again' : 'Vérifiez le numéro et réessayez'}</p>
                    </div>
                )}

                {/* All orders preview */}
                {!searched && (
                    <div className="orders-preview animate-fade-in-up">
                        <h3 className="preview-title">
                            {lang === 'ar' ? 'الطلبات الأخيرة (عرض تجريبي)' : lang === 'en' ? 'Recent Orders (Demo)' : 'Commandes Récentes (Démo)'}
                        </h3>
                        <div className="orders-list">
                            {mockOrders.map(order => (
                                <button
                                    key={order.id}
                                    className="order-preview-item glass"
                                    onClick={() => { setSearchQuery(order.id); }}
                                >
                                    <div className="order-preview-info">
                                        <span className="order-preview-id">{order.id}</span>
                                        <span className="order-preview-date">{order.date}</span>
                                    </div>
                                    <div
                                        className="order-preview-status"
                                        style={{ color: statusLabels[order.status].color }}
                                    >
                                        {getStatusLabel(order.status)}
                                    </div>
                                    <ChevronRight size={16} className="order-preview-arrow" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        .tracking-page {
          padding-bottom: 4rem;
          min-height: 100vh;
        }

        .tracking-header {
          text-align: center;
          padding: 3rem 0 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .tracking-header-icon {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-lg);
          background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700));
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-neutral-900);
          margin-bottom: 0.5rem;
        }
        .tracking-title {
          font-size: clamp(2rem, 4vw, 3rem);
        }
        .tracking-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        /* Search */
        .tracking-search {
          max-width: 700px;
          margin: 0 auto 2rem;
        }
        .tracking-search-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 8px 8px 16px;
          border-radius: var(--radius-full);
        }
        .tracking-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.95rem;
          font-family: var(--font-sans);
        }
        .tracking-input::placeholder {
          color: var(--text-muted);
        }
        .tracking-btn {
          flex-shrink: 0;
          border-radius: var(--radius-full);
          padding: 10px 20px;
        }
        .tracking-hint {
          text-align: center;
          margin-top: 8px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid transparent;
          border-top-color: var(--color-neutral-900);
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Result */
        .tracking-result {
          max-width: 700px;
          margin: 0 auto;
        }

        .order-card {
          border-radius: var(--radius-xl);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .order-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .order-id {
          font-size: 1.25rem;
          font-weight: 700;
          font-family: monospace;
        }
        .order-date {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .order-status-badge {
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
        }

        /* Timeline */
        .order-timeline {
          display: flex;
          justify-content: space-between;
        }
        .timeline-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1;
        }
        .timeline-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: center;
        }
        .timeline-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface-elevated);
          color: var(--text-muted);
          z-index: 1;
          transition: all var(--transition-base);
        }
        .timeline-step.current .timeline-icon {
          animation: pulse-glow 2s infinite;
        }
        .timeline-line {
          position: absolute;
          top: 50%;
          left: calc(50% + 22px);
          right: calc(-50% + 22px);
          height: 2px;
          background: var(--color-neutral-700);
          transform: translateY(-50%);
        }
        .timeline-line.filled {
          background: var(--color-primary-500);
        }
        .timeline-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-align: center;
        }
        .timeline-step.completed .timeline-label {
          color: var(--text-secondary);
        }
        .timeline-step.current .timeline-label {
          color: var(--color-primary-400);
          font-weight: 600;
        }

        /* Items */
        .order-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .order-section-title {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .order-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }
        .order-item-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .order-item-name {
          font-size: 0.9rem;
        }
        .order-item-qty {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .order-item-price {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .order-total {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          font-weight: 600;
        }
        .order-total-value {
          font-size: 1.25rem;
          font-weight: 800;
        }

        .order-customer {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        /* Empty */
        .tracking-empty {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .tracking-empty h3 { color: var(--text-secondary); }

        /* Preview */
        .orders-preview {
          max-width: 700px;
          margin: 0 auto;
        }
        .preview-title {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .order-preview-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
          width: 100%;
          text-align: left;
          font-family: var(--font-sans);
        }
        .order-preview-item:hover {
          background: var(--surface-card-hover);
          border-color: rgba(245, 158, 11, 0.15);
        }
        .order-preview-id {
          font-weight: 600;
          font-family: monospace;
          font-size: 0.9rem;
          color: var(--text-primary);
        }
        .order-preview-date {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-left: 1rem;
        }
        .order-preview-status {
          font-size: 0.8rem;
          font-weight: 600;
        }
        .order-preview-arrow {
          color: var(--text-muted);
        }

        @media (max-width: 640px) {
          .order-timeline {
            flex-direction: column;
            gap: 0;
          }
          .timeline-step {
            flex-direction: row;
            gap: 12px;
          }
          .timeline-icon-wrap {
            width: auto;
            flex-direction: column;
          }
          .timeline-line {
            position: relative;
            top: auto;
            left: auto;
            right: auto;
            width: 2px;
            height: 20px;
            transform: none;
          }
          .order-preview-date {
            display: none;
          }
        }
      `}</style>
        </div>
    );
}
