import React from 'react';

interface HeaderProps {
  announcement: string;
  benefitsTop: string[];
  siteName: string;
  navigation: string[];
  adminOpen: boolean;
  onToggleAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  announcement,
  benefitsTop,
  siteName,
  navigation,
  adminOpen,
  onToggleAdmin
}) => {
  return (
    <header className="site-header">
      {/* 1. Black Top Announcement Bar */}
      {announcement && (
        <div className="announcement-banner">
          <p className="announcement-text">{announcement}</p>
        </div>
      )}

      {/* 2. Top row with 3 customer benefits */}
      {benefitsTop && benefitsTop.length > 0 && (
        <div className="benefits-top-bar">
          <div className="container benefits-container">
            {benefitsTop.map((benefit, idx) => (
              <span key={idx} className="benefit-item">{benefit}</span>
            ))}
          </div>
        </div>
      )}

      {/* 3. Main Brand Header with Search and Actions */}
      <div className="main-brand-header">
        <div className="container header-main-container">
          {/* Brand Logo */}
          <a href="#" className="brand-logo-group">
            <span className="brand-logo-text">{siteName || 'NATURAL HEROES'}</span>
            <span className="brand-logo-leaf">🌿</span>
          </a>

          {/* Search Input Bar */}
          <div className="header-search-bar">
            <input 
              type="text" 
              placeholder="Zoek naar product, inspiratie of antwoord..." 
              className="search-input" 
              readOnly 
            />
            <span className="search-icon">🔍</span>
          </div>

          {/* Header Action Icons */}
          <div className="header-action-group">
            {/* Admin toggle Button */}
            <button 
              className={`edit-toggle-badge ${adminOpen ? 'active' : ''}`}
              onClick={onToggleAdmin}
              title="Toggle Customizer Panel"
            >
              ⚙️ {adminOpen ? 'Sluit Edit' : 'Edit Content'}
            </button>

            {/* Profile */}
            <a href="#" className="header-icon-btn" aria-label="User profile">
              👤
            </a>
            {/* Wishlist */}
            <a href="#" className="header-icon-btn badge-container" aria-label="Wishlist items">
              ❤️ <span className="icon-badge">2</span>
            </a>
            {/* Cart */}
            <a href="#" className="header-icon-btn badge-container" aria-label="Shopping bag cart">
              👜 <span className="icon-badge">2</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4. Bottom Menu Navigation */}
      {navigation && navigation.length > 0 && (
        <nav className="bottom-navigation-menu">
          <div className="container nav-menu-container">
            {navigation.map((nav, idx) => (
              <a key={idx} href="#" className="nav-menu-link">
                {nav} <span className="nav-caret">▼</span>
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Breadcrumb row */}
      <div className="breadcrumb-bar">
        <div className="container">
          <p className="breadcrumb-text">🏠 &gt; Products &gt; Bath Bombs</p>
        </div>
      </div>

      <style>{`
        .site-header {
          background-color: #FFFFFF;
          border-bottom: 1px solid var(--border-color);
          width: 100%;
          z-index: 100;
        }

        /* Top black bar */
        .announcement-banner {
          background-color: #111111;
          color: #FFFFFF;
          text-align: center;
          padding: 8px 16px;
        }

        .announcement-text {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        /* 3 customer benefits bar */
        .benefits-top-bar {
          background-color: #F6F4F0;
          border-bottom: 1px solid var(--border-color);
          padding: 8px 0;
        }

        .benefits-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }

        .benefit-item {
          font-size: 11px;
          font-weight: 500;
          color: #444444;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        @media (max-width: 640px) {
          .benefits-container {
            justify-content: center;
          }
          .benefit-item:not(:first-child) {
            display: none;
          }
        }

        /* Main middle row */
        .main-brand-header {
          padding: 20px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .header-main-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .brand-logo-group {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .brand-logo-text {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 800;
          color: #111111;
          letter-spacing: -0.5px;
        }

        .brand-logo-leaf {
          font-size: 20px;
        }

        /* Search input bar */
        .header-search-bar {
          flex: 1;
          max-width: 480px;
          position: relative;
        }

        .search-input {
          width: 100%;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 10px 40px 10px 14px;
          background-color: #FAF9F6;
          font-family: var(--font-body);
          outline: none;
          font-size: 13px;
        }

        .search-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: #888888;
        }

        @media (max-width: 768px) {
          .header-search-bar {
            display: none;
          }
        }

        /* Action Icons */
        .header-action-group {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-icon-btn {
          font-size: 20px;
          text-decoration: none;
          color: #111111;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          transition: background-color var(--transition-fast);
        }

        .header-icon-btn:hover {
          background-color: #FAF8F5;
        }

        .badge-container {
          position: relative;
        }

        .icon-badge {
          position: absolute;
          top: 0;
          right: 0;
          background-color: var(--color-discount);
          color: #FFFFFF;
          font-size: 10px;
          font-weight: 700;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #FFFFFF;
        }

        .edit-toggle-badge {
          background-color: var(--color-accent);
          color: #FFFFFF;
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 10px rgba(58, 107, 92, 0.2);
          transition: all var(--transition-fast);
        }

        .edit-toggle-badge:hover {
          transform: translateY(-1px);
          opacity: 0.9;
        }

        .edit-toggle-badge.active {
          background-color: #111111;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        /* Bottom Menu Menu links */
        .bottom-navigation-menu {
          padding: 12px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .nav-menu-container {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        @media (max-width: 640px) {
          .nav-menu-container {
            gap: 20px;
          }
        }

        .nav-menu-link {
          text-decoration: none;
          color: #222222;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: color var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-menu-link:hover {
          color: var(--color-accent);
        }

        .nav-caret {
          font-size: 8px;
          color: #999999;
        }

        /* Breadcrumbs */
        .breadcrumb-bar {
          background-color: #FAF9F6;
          padding: 8px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .breadcrumb-text {
          font-size: 11px;
          color: #888888;
        }
      `}</style>
    </header>
  );
};
