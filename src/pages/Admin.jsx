import { useState, useMemo } from 'react';
import { DollarSign, ShoppingCart, Package, MessageSquare, TrendingUp, Users, Search, Eye } from 'lucide-react';
import { mockOrders, products, statusLabels, formatPrice } from '../services/api';

export default function Admin({ t, lang }) {
    const a = t.admin;
    const [activeTab, setActiveTab] = useState('overview');
    const [orderFilter, setOrderFilter] = useState('all');

    const getStatusLabel = (status) => {
        const s = statusLabels[status];
        return lang === 'ar' ? s.ar : lang === 'en' ? s.en : s.fr;
    };

    // Stats
    const totalRevenue = useMemo(() => mockOrders.reduce((sum, o) => sum + o.total, 0), []);
    const totalOrders = mockOrders.length;
    const totalProducts = products.length;
    const totalConversations = 48;

    const stats = [
        { icon: <DollarSign size={22} />, label: a.total_revenue, value: formatPrice(totalRevenue), trend: '+12%', color: '#34d399' },
        { icon: <ShoppingCart size={22} />, label: a.total_orders, value: totalOrders, trend: '+5%', color: '#60a5fa' },
        { icon: <Package size={22} />, label: a.total_products, value: totalProducts, trend: '+2', color: '#fbbf24' },
        { icon: <MessageSquare size={22} />, label: a.conversations, value: totalConversations, trend: '+18%', color: '#a78bfa' },
    ];

    const filteredOrders = orderFilter === 'all'
        ? mockOrders
        : mockOrders.filter(o => o.status === orderFilter);

    // Revenue chart data (mock)
    const chartData = [
        { month: 'Sep', value: 3200 },
        { month: 'Oct', value: 4100 },
        { month: 'Nov', value: 3800 },
        { month: 'Dec', value: 5600 },
        { month: 'Jan', value: 4900 },
        { month: 'Feb', value: 6200 },
    ];
    const maxValue = Math.max(...chartData.map(d => d.value));

    return (
        <div className="admin-page page">
            <div className="page-container">
                {/* Header */}
                <div className="admin-header animate-fade-in-up">
                    <div>
                        <h1 className="admin-title font-display">{a.title}</h1>
                        <p className="admin-subtitle">{a.subtitle}</p>
                    </div>
                    <div className="admin-tabs">
                        {['overview', 'orders', 'products'].map(tab => (
                            <button
                                key={tab}
                                className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab === 'overview' ? (lang === 'ar' ? 'نظرة عامة' : lang === 'en' ? 'Overview' : 'Aperçu')
                                    : tab === 'orders' ? (lang === 'ar' ? 'الطلبات' : lang === 'en' ? 'Orders' : 'Commandes')
                                        : (lang === 'ar' ? 'المنتجات' : lang === 'en' ? 'Products' : 'Produits')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="admin-stats stagger">
                    {stats.map((stat, i) => (
                        <div key={i} className="stat-card-admin glass animate-fade-in-up">
                            <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}15` }}>
                                {stat.icon}
                            </div>
                            <div className="stat-info">
                                <span className="stat-label-admin">{stat.label}</span>
                                <span className="stat-value-admin">{stat.value}</span>
                            </div>
                            <div className="stat-trend" style={{ color: stat.color }}>
                                <TrendingUp size={14} />
                                {stat.trend}
                            </div>
                        </div>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <>
                        {/* Chart */}
                        <div className="admin-chart glass animate-fade-in-up">
                            <h3 className="chart-title">
                                {lang === 'ar' ? 'تطور الإيرادات' : lang === 'en' ? 'Revenue Trend' : 'Évolution des Revenus'}
                            </h3>
                            <div className="chart-container">
                                {chartData.map((d, i) => (
                                    <div key={i} className="chart-bar-wrapper">
                                        <div className="chart-bar-bg">
                                            <div
                                                className="chart-bar"
                                                style={{ height: `${(d.value / maxValue) * 100}%` }}
                                            >
                                                <span className="chart-bar-value">{formatPrice(d.value)}</span>
                                            </div>
                                        </div>
                                        <span className="chart-bar-label">{d.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent orders */}
                        <div className="admin-orders-section glass animate-fade-in-up">
                            <div className="orders-section-header">
                                <h3 className="orders-section-title">{a.recent_orders}</h3>
                            </div>
                            <div className="orders-table-wrap">
                                <table className="orders-table">
                                    <thead>
                                        <tr>
                                            <th>{a.customer}</th>
                                            <th>{t.tracking.order_id}</th>
                                            <th>{a.city}</th>
                                            <th>{t.tracking.status}</th>
                                            <th>{t.tracking.total}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockOrders.map(order => (
                                            <tr key={order.id}>
                                                <td>
                                                    <div className="customer-cell">
                                                        <div className="customer-avatar">
                                                            <Users size={14} />
                                                        </div>
                                                        <div>
                                                            <span className="customer-name">{order.customer.name}</span>
                                                            <span className="customer-email">{order.customer.email}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><code className="order-code">{order.id}</code></td>
                                                <td>{order.customer.city}</td>
                                                <td>
                                                    <span
                                                        className="order-status-pill"
                                                        style={{ color: statusLabels[order.status].color, background: `${statusLabels[order.status].color}15`, border: `1px solid ${statusLabels[order.status].color}30` }}
                                                    >
                                                        {getStatusLabel(order.status)}
                                                    </span>
                                                </td>
                                                <td className="order-total-cell">{formatPrice(order.total)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'orders' && (
                    <div className="admin-orders-tab animate-fade-in-up">
                        <div className="orders-filter-bar">
                            {['all', 'pending', 'processing', 'shipped', 'delivered'].map(status => (
                                <button
                                    key={status}
                                    className={`filter-chip ${orderFilter === status ? 'active' : ''}`}
                                    onClick={() => setOrderFilter(status)}
                                    style={orderFilter === status && status !== 'all' ? {
                                        background: `${statusLabels[status]?.color}20`,
                                        borderColor: `${statusLabels[status]?.color}40`,
                                        color: statusLabels[status]?.color,
                                    } : {}}
                                >
                                    {status === 'all'
                                        ? (lang === 'ar' ? 'الكل' : lang === 'en' ? 'All' : 'Tous')
                                        : getStatusLabel(status)}
                                </button>
                            ))}
                        </div>
                        <div className="orders-cards">
                            {filteredOrders.map(order => (
                                <div key={order.id} className="order-card-admin glass">
                                    <div className="order-card-header">
                                        <code className="order-code">{order.id}</code>
                                        <span
                                            className="order-status-pill"
                                            style={{ color: statusLabels[order.status].color, background: `${statusLabels[order.status].color}15` }}
                                        >
                                            {getStatusLabel(order.status)}
                                        </span>
                                    </div>
                                    <div className="order-card-customer">
                                        <Users size={14} />
                                        {order.customer.name} · {order.customer.city}
                                    </div>
                                    <div className="order-card-items">
                                        {order.items.map((item, i) => (
                                            <div key={i} className="order-card-item">
                                                <span>{item.name}</span>
                                                <span>×{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="order-card-total">
                                        <span>{t.tracking.total}</span>
                                        <span className="gradient-text" style={{ fontWeight: 700 }}>{formatPrice(order.total)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="admin-products-tab animate-fade-in-up">
                        <div className="products-table-wrap glass">
                            <table className="products-table">
                                <thead>
                                    <tr>
                                        <th>{lang === 'ar' ? 'المنتج' : lang === 'en' ? 'Product' : 'Produit'}</th>
                                        <th>{lang === 'ar' ? 'الأصل' : lang === 'en' ? 'Origin' : 'Origine'}</th>
                                        <th>{lang === 'ar' ? 'السعر' : lang === 'en' ? 'Price' : 'Prix'}</th>
                                        <th>{lang === 'ar' ? 'المخزون' : lang === 'en' ? 'Stock' : 'Stock'}</th>
                                        <th>{lang === 'ar' ? 'التقييم' : lang === 'en' ? 'Rating' : 'Note'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id}>
                                            <td>
                                                <div className="product-cell">
                                                    <img src={p.image} alt={p.name} className="product-thumb" />
                                                    <span className="product-cell-name">
                                                        {lang === 'ar' ? p.nameAr : lang === 'en' ? p.nameEn : p.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>{p.origin}</td>
                                            <td>{formatPrice(p.price)}</td>
                                            <td>
                                                <span className={`stock-indicator ${p.stock > 10 ? 'high' : p.stock > 5 ? 'medium' : 'low'}`}>
                                                    {p.stock}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="rating-cell">⭐ {p.rating}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        .admin-page {
          padding-bottom: 4rem;
          min-height: 100vh;
        }

        .admin-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 3rem 0 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .admin-title {
          font-size: clamp(2rem, 4vw, 3rem);
        }
        .admin-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
        }
        .admin-tabs {
          display: flex;
          gap: 4px;
          background: var(--surface-card);
          border-radius: var(--radius-full);
          padding: 4px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .admin-tab {
          padding: 8px 18px;
          border-radius: var(--radius-full);
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: var(--font-sans);
        }
        .admin-tab.active {
          background: var(--color-primary-500);
          color: var(--color-neutral-900);
          font-weight: 600;
        }
        .admin-tab:hover:not(.active) {
          color: var(--text-primary);
        }

        /* Stats */
        .admin-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .stat-card-admin {
          padding: 1.25rem;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .stat-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .stat-label-admin {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .stat-value-admin {
          font-size: 1.4rem;
          font-weight: 800;
        }
        .stat-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        /* Chart */
        .admin-chart {
          border-radius: var(--radius-xl);
          padding: 2rem;
          margin-bottom: 2rem;
        }
        .chart-title {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        .chart-container {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          height: 200px;
        }
        .chart-bar-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          height: 100%;
        }
        .chart-bar-bg {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .chart-bar {
          width: 100%;
          max-width: 60px;
          background: linear-gradient(to top, var(--color-primary-600), var(--color-primary-400));
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
          position: relative;
          transition: height 0.6s ease-out;
          min-height: 20px;
        }
        .chart-bar:hover {
          opacity: 0.85;
        }
        .chart-bar-value {
          position: absolute;
          top: -24px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.65rem;
          color: var(--text-muted);
          white-space: nowrap;
          opacity: 0;
          transition: opacity var(--transition-fast);
        }
        .chart-bar:hover .chart-bar-value {
          opacity: 1;
        }
        .chart-bar-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Orders Section */
        .admin-orders-section {
          border-radius: var(--radius-xl);
          padding: 2rem;
        }
        .orders-section-header {
          margin-bottom: 1.5rem;
        }
        .orders-section-title {
          font-size: 1rem;
          color: var(--text-secondary);
        }
        .orders-table-wrap {
          overflow-x: auto;
        }
        .orders-table,
        .products-table {
          width: 100%;
          border-collapse: collapse;
        }
        .orders-table th,
        .products-table th {
          text-align: left;
          padding: 10px 12px;
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .orders-table td,
        .products-table td {
          padding: 14px 12px;
          font-size: 0.9rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
        }
        .orders-table tr:hover td,
        .products-table tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }

        .customer-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .customer-avatar {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: rgba(245, 158, 11, 0.1);
          color: var(--color-primary-400);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .customer-name {
          display: block;
          font-weight: 500;
          color: var(--text-primary);
          font-size: 0.85rem;
        }
        .customer-email {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .order-code {
          font-size: 0.8rem;
          padding: 3px 8px;
          background: var(--surface-elevated);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }
        .order-status-pill {
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .order-total-cell {
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Orders tab */
        .orders-filter-bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .filter-chip {
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: var(--surface-card);
          color: var(--text-secondary);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: var(--font-sans);
        }
        .filter-chip.active {
          font-weight: 600;
        }
        .filter-chip:hover:not(.active) {
          border-color: rgba(255, 255, 255, 0.15);
        }

        .orders-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1rem;
        }
        .order-card-admin {
          padding: 1.25rem;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .order-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .order-card-customer {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .order-card-items {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .order-card-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .order-card-total {
          display: flex;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        /* Products tab */
        .admin-products-tab {
          margin-top: 1rem;
        }
        .products-table-wrap {
          border-radius: var(--radius-xl);
          padding: 1.5rem;
          overflow-x: auto;
        }
        .product-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .product-thumb {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          object-fit: cover;
        }
        .product-cell-name {
          font-weight: 500;
          color: var(--text-primary);
          font-size: 0.85rem;
        }
        .stock-indicator {
          padding: 3px 10px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
        }
        .stock-indicator.high { color: #34d399; background: rgba(52, 211, 153, 0.1); }
        .stock-indicator.medium { color: #fbbf24; background: rgba(251, 191, 36, 0.1); }
        .stock-indicator.low { color: #f87171; background: rgba(248, 113, 113, 0.1); }
        .rating-cell {
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .admin-header {
            flex-direction: column;
          }
          .admin-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
        </div>
    );
}
