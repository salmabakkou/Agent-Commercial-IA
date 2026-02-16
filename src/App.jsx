import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, ShoppingBag, MessageCircle, Package, LayoutDashboard, Menu, X } from 'lucide-react';
import { translations } from './services/api';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Chat from './pages/Chat';
import Tracking from './pages/Tracking';
import Admin from './pages/Admin';
import './App.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppContent() {
  const [lang, setLang] = useState('fr');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  const location = useLocation();
  useEffect(() => { setMobileOpen(false); }, [location]);

  const navItems = [
    { path: '/', label: t.nav.home, icon: <HomeIcon size={16} /> },
    { path: '/catalog', label: t.nav.catalog, icon: <ShoppingBag size={16} /> },
    { path: '/chat', label: t.nav.chat, icon: <MessageCircle size={16} /> },
    { path: '/tracking', label: t.nav.tracking, icon: <Package size={16} /> },
    { path: '/admin', label: t.nav.admin, icon: <LayoutDashboard size={16} /> },
  ];

  return (
    <div className="app-layout" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">🏪</div>
            <span>Souk<span className="gradient-text">AI</span></span>
          </Link>

          <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
            <Link to="/chat" className="navbar-cta">
              <MessageCircle size={14} />
              {t.nav.chat}
            </Link>
            <div className="navbar-lang">
              {['FR', 'EN', 'AR'].map(l => (
                <button
                  key={l}
                  className={`lang-btn ${lang === l.toLowerCase() ? 'active' : ''}`}
                  onClick={() => setLang(l.toLowerCase())}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="app-main">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home t={t} lang={lang} />} />
          <Route path="/catalog" element={<Catalog t={t} lang={lang} />} />
          <Route path="/chat" element={<Chat t={t} lang={lang} />} />
          <Route path="/tracking" element={<Tracking t={t} lang={lang} />} />
          <Route path="/admin" element={<Admin t={t} lang={lang} />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span>🏪</span>
            <span>Souk<span className="gradient-text">AI</span></span>
          </div>
          <div className="footer-links">
            <Link to="/catalog">{t.nav.catalog}</Link>
            <Link to="/chat">{t.nav.chat}</Link>
            <Link to="/tracking">{t.nav.tracking}</Link>
          </div>
          <p className="footer-copy">
            © 2024 SoukAI. {lang === 'ar' ? 'جميع الحقوق محفوظة' : lang === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
