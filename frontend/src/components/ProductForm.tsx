import React, { useState } from 'react';
import { ProductDetails, VolumeOption } from '../types';

interface ProductFormProps {
  product: ProductDetails;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const [selectedVolIdx, setSelectedVolIdx] = useState(0);
  const [selectedSubId, setSelectedSubId] = useState('sub-90');
  const [quantity, setQuantity] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!product) return null;

  // Extract selected option details
  const currentVolume: VolumeOption = product.volumes?.[selectedVolIdx] || {
    id: 'vol-default',
    name: '30 ml / Fresh Balance',
    price: 12.99,
    img: ''
  };

  // Dynamic price calculation
  // We align with figma screenshot numbers: 
  // 90-Dag Abonnement (sub-90): €7.72 checkout price.
  // Abonnement (sub-reg): €9.85 checkout price.
  // Eenmalig (sub-one): €12.99 (matching Volume price!).
  let unitPrice = currentVolume.price;
  if (selectedSubId === 'sub-90') {
    unitPrice = 7.72;
  } else if (selectedSubId === 'sub-reg') {
    unitPrice = 9.85;
  }

  const totalPrice = (unitPrice * quantity).toFixed(2);

  // Wholesale calculation block (matching screenshot)
  const exclBtw = (unitPrice / 1.15).toFixed(2); // assuming 15% btw

  return (
    <div className="product-form-container animate-fade-in">
      {/* 1. Review Summary */}
      {product.reviews && (
        <div className="product-reviews-row">
          <span className="reviews-meta-count">{product.reviews.count} reviews</span>
          <div className="reviews-stars">
            {Array.from({ length: product.reviews.stars }).map((_, i) => (
              <span key={i} className="star-icon">★</span>
            ))}
          </div>
          <span className="reviews-rating-value">{product.reviews.rating}</span>
          <span className="reviews-divider">|</span>
          <span className="reviews-questions-count">💬 {product.reviews.questions} vragen</span>
          <span className="reviews-divider">|</span>
          <span className="reviews-users-badge">{product.reviews.users} users</span>
        </div>
      )}

      {/* 2. Product Title & Subtitle */}
      <h1 className="product-title">{product.title || 'No BS Deo'}</h1>
      <p className="product-subtitle">{product.subtitle}</p>

      {/* 3. Bullet list benefits */}
      {product.bullets && product.bullets.length > 0 && (
        <ul className="product-bullets-list">
          {product.bullets.map((bullet, idx) => (
            <li key={idx} className="bullet-item">
              <span className="bullet-dot">•</span>
              <span className="bullet-text">{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {/* 4. Section 1: Kies je Inhoud (Volume Selector Dropdown) */}
      <div className="form-section-group">
        <h3 className="section-group-title">1. Kies je inhoud</h3>
        
        <div className="custom-dropdown-container">
          <div 
            className="dropdown-trigger-header" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="dropdown-trigger-details">
              {currentVolume.img && (
                <img 
                  src={currentVolume.img} 
                  alt={currentVolume.name} 
                  className="dropdown-trigger-img" 
                />
              )}
              <span className="dropdown-trigger-text">{currentVolume.name}</span>
            </div>
            <div className="dropdown-trigger-actions">
              <span className="dropdown-trigger-price">€ {currentVolume.price.toFixed(2)}</span>
              <span className="dropdown-trigger-caret">{dropdownOpen ? '▲' : '▼'}</span>
            </div>
          </div>

          {dropdownOpen && (
            <div className="dropdown-options-list">
              {product.volumes?.map((vol, idx) => (
                <div 
                  key={vol.id} 
                  className={`dropdown-option-item ${idx === selectedVolIdx ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedVolIdx(idx);
                    setDropdownOpen(false);
                  }}
                >
                  <div className="dropdown-option-details">
                    {vol.img && <img src={vol.img} alt={vol.name} className="dropdown-option-img" />}
                    <span className="dropdown-option-text">{vol.name}</span>
                  </div>
                  <span className="dropdown-option-price">€ {vol.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. Section 2: Kies je Type (Purchase Plan Selector Cards) */}
      <div className="form-section-group mt-6">
        <h3 className="section-group-title">2. Kies je type</h3>

        <div className="subscription-options-column">
          {product.subscriptionOptions?.map((opt) => {
            const isActive = opt.id === selectedSubId;
            return (
              <div 
                key={opt.id} 
                className={`subscription-option-card ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedSubId(opt.id)}
              >
                {/* Header card area */}
                <div className="sub-card-header">
                  <div className="sub-card-title-group">
                    <span className={`custom-radio-button ${isActive ? 'checked' : ''}`}></span>
                    <span className="sub-card-title">{opt.title}</span>
                    {opt.saveBadge && (
                      <span className="sub-save-badge">{opt.saveBadge}</span>
                    )}
                  </div>
                  <div className="sub-card-price-group">
                    {opt.bestValue && (
                      <span className="best-value-badge">BEST VALUE</span>
                    )}
                    <div className="price-labels-row">
                      <span className="price-monthly-value">€ {opt.priceMonthly.toFixed(2)}</span>
                      {opt.priceOriginal > opt.priceMonthly && (
                        <span className="price-original-value">€ {opt.priceOriginal.toFixed(2)}</span>
                      )}
                      <span className="price-monthly-suffix">/maand</span>
                    </div>
                  </div>
                </div>

                {/* Collapsible content (active card inclusions) */}
                {isActive && (
                  <div className="sub-card-body-inclusions animate-slide-up">
                    <p className="billing-info-text">{opt.billingInfo}</p>
                    
                    <div className="inclusions-divider"></div>
                    
                    <p className="inclusions-title">Inclusief</p>
                    <ul className="inclusions-list">
                      {opt.features?.map((feature, fIdx) => (
                        <li key={fIdx} className="inclusion-item">
                          <span className="inclusion-check">✓</span>
                          <span className="inclusion-text">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Welcome Kit Items */}
                    {opt.welcomeKitTitle && opt.welcomeKitItems?.length > 0 && (
                      <div className="welcome-kit-block mt-4">
                        <p className="welcome-kit-title">{opt.welcomeKitTitle}</p>
                        <div className="welcome-kit-grid">
                          {opt.welcomeKitItems.map((item, itemIdx) => (
                            <div key={itemIdx} className="welcome-kit-item-card">
                              <div className="welcome-img-wrapper">
                                <img src={item.img} alt={item.name} className="welcome-item-img" />
                                <span className="info-tooltip-badge">i</span>
                              </div>
                              <span className="welcome-item-name">{item.name}</span>
                              <span className="welcome-item-price">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Pricing Summary box (wholesale details) */}
      <div className="pricing-summary-block mt-6">
        <div className="summary-left-box">
          <div className="summary-price-incl">€ {totalPrice} vanaf incl. btw</div>
          <div className="summary-price-excl">€ {exclBtw} excl. btw</div>
        </div>
        <div className="summary-right-box">
          <span className="wholesale-badge-icon">👤</span>
          <div className="wholesale-badge-details">
            <span className="wholesale-badge-label">Logged in as a wholesale customer</span>
            <a href="#" className="wholesale-badge-action-link">Switch to a consumer account</a>
          </div>
        </div>
      </div>

      {/* 7. Quantity counter & Bestel nu button */}
      <div className="form-section-group mt-6">
        <h3 className="section-group-title">Aantal</h3>
        <div className="quantity-order-actions-row">
          <div className="quantity-counter-widget">
            <button 
              className="counter-btn minus" 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="counter-value">{quantity}</span>
            <button 
              className="counter-btn plus" 
              onClick={() => setQuantity(q => q + 1)}
            >
              +
            </button>
          </div>

          <button className="add-to-cart-primary-btn">
            Bestel nu! — € {totalPrice}
          </button>

          <button className="form-wishlist-heart-btn" aria-label="Add to wishlist">
            ❤️
          </button>
        </div>
      </div>

      {/* 8. Trust Badges row */}
      {product.trustBadges && product.trustBadges.length > 0 && (
        <div className="trust-badges-row mt-8">
          {product.trustBadges.map((badge, idx) => (
            <div key={idx} className="trust-badge-circle-card">
              <div className="trust-circle-outline">
                <span className="trust-icon">{badge.icon}</span>
                <span className="trust-sub">{badge.sub}</span>
              </div>
              <span className="trust-label">{badge.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* 9. Bottom trust Checklist */}
      {product.bottomChecklist && product.bottomChecklist.length > 0 && (
        <ul className="bottom-checklist-list mt-8">
          {product.bottomChecklist.map((check, idx) => (
            <li key={idx} className="bottom-check-item">
              <span className="check-icon">✓</span>
              <span className="check-text">{check}</span>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .product-form-container {
          background-color: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          padding: 40px 32px;
          box-shadow: 0 4px 30px rgba(0,0,0,0.01);
        }

        @media (max-width: 640px) {
          .product-form-container {
            padding: 24px 16px;
          }
        }

        .mt-4 { margin-top: 16px; }
        .mt-6 { margin-top: 24px; }
        .mt-8 { margin-top: 32px; }

        /* Review summary */
        .product-reviews-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .reviews-stars {
          color: #FFC107;
          display: flex;
          gap: 1px;
        }

        .reviews-rating-value {
          font-weight: 700;
          color: var(--text-main);
        }

        .reviews-divider {
          color: #D6D4CE;
        }

        .reviews-users-badge {
          background-color: var(--color-accent-light);
          color: var(--text-green);
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 100px;
          font-size: 10px;
        }

        /* Titles */
        .product-title {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 800;
          color: #111111;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .product-subtitle {
          font-size: 14px;
          color: #666666;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        /* Bullet benefits */
        .product-bullets-list {
          list-style: none;
          margin-bottom: 24px;
          background-color: #FAF9F6;
          border-radius: var(--border-radius-sm);
          padding: 16px;
          border: 1px dashed var(--border-color);
        }

        .bullet-item {
          display: flex;
          align-items: start;
          gap: 8px;
          font-size: 13px;
          color: #444444;
          margin-bottom: 8px;
        }

        .bullet-item:last-child {
          margin-bottom: 0;
        }

        .bullet-dot {
          color: var(--color-accent);
          font-weight: 800;
        }

        /* Kies je inhoud */
        .form-section-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .section-group-title {
          font-size: 14px;
          font-weight: 700;
          color: #111111;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .custom-dropdown-container {
          position: relative;
          width: 100%;
        }

        .dropdown-trigger-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          padding: 12px 16px;
          background-color: #FFFFFF;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .dropdown-trigger-header:hover {
          border-color: #888888;
        }

        .dropdown-trigger-details {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dropdown-trigger-img {
          width: 24px;
          height: 24px;
          border-radius: 2px;
          object-fit: cover;
          border: 1px solid #ECEAE5;
        }

        .dropdown-trigger-text {
          font-size: 14px;
          font-weight: 600;
          color: #222222;
        }

        .dropdown-trigger-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dropdown-trigger-price {
          font-size: 14px;
          font-weight: 700;
          color: #111111;
        }

        .dropdown-trigger-caret {
          font-size: 9px;
          color: #888888;
        }

        .dropdown-options-list {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          width: 100%;
          background-color: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          z-index: 20;
          overflow: hidden;
        }

        .dropdown-option-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }

        .dropdown-option-item:hover {
          background-color: #FAF8F5;
        }

        .dropdown-option-item.active {
          background-color: var(--color-accent-light);
        }

        .dropdown-option-details {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dropdown-option-img {
          width: 24px;
          height: 24px;
          border-radius: 2px;
          object-fit: cover;
        }

        .dropdown-option-text {
          font-size: 13px;
          font-weight: 500;
          color: #222222;
        }

        .dropdown-option-price {
          font-size: 13px;
          font-weight: 700;
          color: #111111;
        }

        /* Kies je type - Radio Plan Cards */
        .subscription-options-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .subscription-option-card {
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          overflow: hidden;
          background-color: #FFFFFF;
          cursor: pointer;
          transition: all var(--transition-fast);
          position: relative;
        }

        .subscription-option-card:hover {
          border-color: #A29E95;
        }

        .subscription-option-card.active {
          border-color: #111111;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
          background-color: #FCFBF9;
        }

        .sub-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          gap: 16px;
        }

        .sub-card-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .custom-radio-button {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background-color: #FFFFFF;
          display: inline-block;
          position: relative;
          transition: all var(--transition-fast);
        }

        .custom-radio-button.checked {
          border-color: #111111;
          border-width: 5px;
        }

        .sub-card-title {
          font-size: 14px;
          font-weight: 700;
          color: #111111;
        }

        .sub-save-badge {
          background-color: #FCEDE9;
          color: var(--text-discount);
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.3px;
        }

        .sub-card-price-group {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .best-value-badge {
          background-color: #111111;
          color: #FFFFFF;
          font-size: 9px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 2px;
          letter-spacing: 0.5px;
        }

        .price-labels-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .price-monthly-value {
          font-size: 16px;
          font-weight: 800;
          color: #111111;
        }

        .price-original-value {
          font-size: 12px;
          color: #999999;
          text-decoration: line-through;
        }

        .price-monthly-suffix {
          font-size: 11px;
          color: #777777;
        }

        /* Active Card Body Inclusions */
        .sub-card-body-inclusions {
          padding: 0 20px 20px 50px;
        }

        @media (max-width: 480px) {
          .sub-card-body-inclusions {
            padding-left: 20px;
          }
        }

        .billing-info-text {
          font-size: 11px;
          color: #888888;
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .inclusions-divider {
          height: 1px;
          background-color: var(--border-color);
          margin-bottom: 12px;
        }

        .inclusions-title {
          font-size: 11px;
          font-weight: 700;
          color: #111111;
          text-transform: uppercase;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }

        .inclusions-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .inclusion-item {
          display: flex;
          align-items: start;
          gap: 8px;
          font-size: 12px;
          color: #444444;
        }

        .inclusion-check {
          color: var(--color-accent);
          font-weight: 700;
        }

        /* Welcome Kit Grid */
        .welcome-kit-block {
          background-color: #FAF9F6;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          padding: 12px;
        }

        .welcome-kit-title {
          font-size: 12px;
          font-weight: 700;
          color: #111111;
          margin-bottom: 10px;
        }

        .welcome-kit-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }

        .welcome-kit-item-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .welcome-img-wrapper {
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 4px;
          overflow: hidden;
          background-color: #FFFFFF;
          border: 1px solid var(--border-color);
          position: relative;
        }

        .welcome-item-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .info-tooltip-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background-color: rgba(0,0,0,0.5);
          color: #FFFFFF;
          font-size: 7px;
          font-weight: 700;
          border-radius: 50%;
          width: 10px;
          height: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .welcome-item-name {
          font-size: 8px;
          font-weight: 600;
          color: #666666;
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }

        .welcome-item-price {
          font-size: 8px;
          font-weight: 700;
          color: var(--color-accent);
          margin-top: 1px;
        }

        /* Pricing Summary box (wholesale details) */
        .pricing-summary-block {
          background-color: #FAF8F5;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .summary-left-box {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .summary-price-incl {
          font-size: 16px;
          font-weight: 800;
          color: #111111;
        }

        .summary-price-excl {
          font-size: 12px;
          color: #777777;
        }

        .summary-right-box {
          display: flex;
          align-items: start;
          gap: 8px;
          max-width: 200px;
        }

        .wholesale-badge-icon {
          font-size: 16px;
        }

        .wholesale-badge-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .wholesale-badge-label {
          font-size: 10px;
          color: #666666;
          font-weight: 500;
          line-height: 1.3;
        }

        .wholesale-badge-action-link {
          font-size: 10px;
          font-weight: 700;
          color: #111111;
          text-decoration: underline;
        }

        /* Quantity & Add to Cart button */
        .quantity-order-actions-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .quantity-counter-widget {
          display: flex;
          align-items: center;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          background-color: #FFFFFF;
          height: 48px;
        }

        .counter-btn {
          width: 36px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 600;
          color: #666666;
          background: none;
          border: none;
        }

        .counter-btn:hover {
          color: #111111;
          background-color: #FAF8F5;
        }

        .counter-value {
          font-size: 14px;
          font-weight: 700;
          color: #111111;
          padding: 0 10px;
          min-width: 24px;
          text-align: center;
        }

        .add-to-cart-primary-btn {
          flex: 1;
          height: 48px;
          background-color: #111111;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 700;
          border-radius: var(--border-radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          transition: all var(--transition-fast);
        }

        .add-to-cart-primary-btn:hover {
          background-color: #222222;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }

        .add-to-cart-primary-btn:active {
          transform: translateY(1px);
        }

        .form-wishlist-heart-btn {
          width: 48px;
          height: 48px;
          background-color: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.02);
          transition: all var(--transition-fast);
        }

        .form-wishlist-heart-btn:hover {
          border-color: #888888;
        }

        /* Trust Badges */
        .trust-badges-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .trust-badge-circle-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 8px;
        }

        .trust-circle-outline {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid #CAC7BF;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #FFFFFF;
          position: relative;
        }

        .trust-icon {
          font-size: 16px;
        }

        .trust-sub {
          font-size: 7px;
          font-weight: 700;
          text-transform: uppercase;
          color: #777777;
          margin-top: 1px;
        }

        .trust-label {
          font-size: 11px;
          font-weight: 600;
          color: #555555;
        }

        /* Bottom trust checklist */
        .bottom-checklist-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid var(--border-color);
          padding-top: 24px;
        }

        .bottom-check-item {
          display: flex;
          align-items: start;
          gap: 8px;
          font-size: 12px;
          color: #444444;
        }

        .check-icon {
          color: var(--color-accent);
          font-weight: 700;
        }
        
        /* Mobile and Tablet Responsiveness Updates */
        @media (max-width: 600px) {
          .product-form-container {
            padding: 24px 16px;
          }
          
          .sub-card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .sub-card-price-group {
            align-items: flex-start;
            width: 100%;
            border-top: 1px dashed var(--border-color);
            padding-top: 10px;
          }
          
          .sub-card-body-inclusions {
            padding-left: 20px;
            padding-right: 12px;
          }
          
          .welcome-kit-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          
          .pricing-summary-block {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }
          
          .summary-right-box {
            max-width: 100%;
            border-top: 1px solid var(--border-color);
            padding-top: 12px;
          }
          
          .quantity-order-actions-row {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
          }
          
          .quantity-counter-widget {
            width: 90px;
            flex-shrink: 0;
          }
          
          .counter-btn {
            width: 28px;
          }
          
          .add-to-cart-primary-btn {
            flex: 1;
            min-width: 0;
          }
          
          .form-wishlist-heart-btn {
            width: 48px;
            height: 48px;
            flex-shrink: 0;
          }
          
          .trust-badges-row {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
};
