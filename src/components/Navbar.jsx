import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Search, 
  GitMerge, 
  BookOpen, 
  Sparkles, 
  Menu, 
  X
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'explore', label: 'Explore', icon: Search },
  { id: 'connections', label: 'Connections', icon: GitMerge },
  { id: 'chapters', label: 'Chapters', icon: BookOpen },
  { id: 'story', label: 'Story', icon: Sparkles },
];

export default function Navbar({ activeTab, onSelectTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ESC key listener to close mobile menu
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (tabId) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="site-navbar" aria-label="Main Navigation">
      <div className="navbar-container">
        {/* Brand */}
        <button 
          type="button"
          className="navbar-brand-btn"
          onClick={() => handleNavClick('overview')}
          aria-label="LIFE//THREADS Home"
        >
          <div className="brand-gem">
            <span className="gem-dot"></span>
          </div>
          <div className="brand-title-wrap">
            <span className="brand-title">LIFE<span className="brand-slash">//</span>THREADS</span>
            <span className="brand-subtext">Your Life, In Receipts</span>
          </div>
        </button>

        {/* Desktop Tabs */}
        <div className="navbar-links" role="tablist">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                type="button"
                key={item.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${item.id}`}
                id={`tab-${item.id}`}
                className={`nav-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={16} className="nav-icon" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    className="nav-active-indicator"
                    layoutId="activeNavIndicator"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right pill / badge */}
        <div className="navbar-right">
          <div className="hackathon-tag" title="Frontend-only hackathon challenge">
            <span className="pulse-beacon"></span>
            <span className="tag-text">6H Frontend Hackathon</span>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mobile-menu-links">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <div className="mobile-nav-btn-left">
                      <Icon size={18} className="mobile-nav-icon" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <span className="mobile-active-dot"></span>}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
