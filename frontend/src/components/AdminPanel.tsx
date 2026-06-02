import React, { useState, useEffect } from 'react';
import { SiteContent } from '../types';

interface AdminPanelProps {
  content: SiteContent;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedContent: SiteContent) => Promise<boolean>;
  onReset: () => void;
}

type TabType = 'general' | 'product' | 'volumes' | 'subscription' | 'trust';

export const AdminPanel: React.FC<AdminPanelProps> = ({ content, isOpen, onClose, onSave, onReset }) => {
  const [edited, setEdited] = useState<SiteContent>(JSON.parse(JSON.stringify(content)));
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setEdited(JSON.parse(JSON.stringify(content)));
  }, [content]);

  if (!isOpen) return null;

  // General field change
  const handleGeneralChange = (key: keyof SiteContent, value: string) => {
    setEdited(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Product text field change
  const handleProductChange = (key: string, value: any) => {
    setEdited(prev => ({
      ...prev,
      product: {
        ...prev.product,
        [key]: value
      }
    }));
  };

  // Bullet point change
  const handleBulletChange = (idx: number, value: string) => {
    setEdited(prev => {
      const newBullets = [...prev.product.bullets];
      newBullets[idx] = value;
      return {
        ...prev,
        product: {
          ...prev.product,
          bullets: newBullets
        }
      };
    });
  };

  // Image URL change
  const handleImageChange = (idx: number, value: string) => {
    setEdited(prev => {
      const newImages = [...prev.product.images];
      newImages[idx] = value;
      return {
        ...prev,
        product: {
          ...prev.product,
          images: newImages
        }
      };
    });
  };

  // Volume change
  const handleVolumeChange = (idx: number, key: string, value: any) => {
    setEdited(prev => {
      const newVolumes = [...prev.product.volumes];
      newVolumes[idx] = {
        ...newVolumes[idx],
        [key]: value
      };
      return {
        ...prev,
        product: {
          ...prev.product,
          volumes: newVolumes
        }
      };
    });
  };

  // Subscription change
  const handleSubscriptionChange = (idx: number, key: string, value: any) => {
    setEdited(prev => {
      const newSubs = [...prev.product.subscriptionOptions];
      newSubs[idx] = {
        ...newSubs[idx],
        [key]: value
      };
      return {
        ...prev,
        product: {
          ...prev.product,
          subscriptionOptions: newSubs
        }
      };
    });
  };

  // Trust badge change
  const handleTrustBadgeChange = (idx: number, key: string, value: string) => {
    setEdited(prev => {
      const newBadges = [...prev.product.trustBadges];
      newBadges[idx] = {
        ...newBadges[idx],
        [key]: value
      };
      return {
        ...prev,
        product: {
          ...prev.product,
          trustBadges: newBadges
        }
      };
    });
  };

  // Bottom checklist change
  const handleChecklistChange = (idx: number, value: string) => {
    setEdited(prev => {
      const newChecklist = [...prev.product.bottomChecklist];
      newChecklist[idx] = value;
      return {
        ...prev,
        product: {
          ...prev.product,
          bottomChecklist: newChecklist
        }
      };
    });
  };

  const handleTriggerSave = async () => {
    setSaving(true);
    setSaveStatus('idle');
    try {
      const success = await onSave(edited);
      if (success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handleTriggerReset = () => {
    if (window.confirm('Restore standard defaults? All e-commerce edits will be lost.')) {
      onReset();
      setSaveStatus('idle');
    }
  };

  return (
    <div className="admin-drawer-overlay animate-fade-in" onClick={onClose}>
      <div className="admin-drawer-body" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <span className="drawer-sparkle">🌿</span>
            <h2 className="drawer-title">Natural Heroes Studio</h2>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="drawer-info-banner">
          <p>Instantly customize e-commerce products, dropdowns, subscriptions, images, and prices. Real-time updates active.</p>
        </div>

        {/* Editor tabs */}
        <div className="drawer-tabs">
          <button className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>General</button>
          <button className={`tab-btn ${activeTab === 'product' ? 'active' : ''}`} onClick={() => setActiveTab('product')}>Product</button>
          <button className={`tab-btn ${activeTab === 'volumes' ? 'active' : ''}`} onClick={() => setActiveTab('volumes')}>Volumes</button>
          <button className={`tab-btn ${activeTab === 'subscription' ? 'active' : ''}`} onClick={() => setActiveTab('subscription')}>Plans</button>
          <button className={`tab-btn ${activeTab === 'trust' ? 'active' : ''}`} onClick={() => setActiveTab('trust')}>Trust</button>
        </div>

        {/* Tab contents */}
        <div className="drawer-form-content">
          {activeTab === 'general' && (
            <div className="form-section">
              <div className="form-group">
                <label className="form-label">Announcement Top Banner</label>
                <textarea 
                  className="form-input textarea-short" 
                  value={edited.announcement || ''} 
                  onChange={(e) => handleGeneralChange('announcement', e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Store Brand Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={edited.siteName || ''} 
                  onChange={(e) => handleGeneralChange('siteName', e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Top benefits Checklist</label>
                {edited.benefitsTop?.map((b, idx) => (
                  <input 
                    key={idx}
                    type="text" 
                    className="form-input mt-1" 
                    value={b} 
                    onChange={(e) => {
                      const newB = [...edited.benefitsTop];
                      newB[idx] = e.target.value;
                      setEdited(prev => ({ ...prev, benefitsTop: newB }));
                    }} 
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'product' && (
            <div className="form-section">
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={edited.product?.title || ''} 
                  onChange={(e) => handleProductChange('title', e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Subtitle Description</label>
                <textarea 
                  className="form-input textarea" 
                  value={edited.product?.subtitle || ''} 
                  onChange={(e) => handleProductChange('subtitle', e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Benefits Checklist Bullets</label>
                {edited.product?.bullets?.map((bullet, idx) => (
                  <input 
                    key={idx}
                    type="text" 
                    className="form-input mt-1" 
                    value={bullet} 
                    onChange={(e) => handleBulletChange(idx, e.target.value)} 
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'volumes' && (
            <div className="form-section">
              <label className="form-label">Showcase Image Gallery URLs (4 images)</label>
              {edited.product?.images?.map((imgUrl, idx) => (
                <div key={idx} className="form-group mt-1">
                  <span className="tiny-label">Image #{idx + 1} URL</span>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={imgUrl} 
                    onChange={(e) => handleImageChange(idx, e.target.value)} 
                  />
                </div>
              ))}

              <div className="inclusions-divider mt-4"></div>

              <label className="form-label mt-4">Kies je Inhoud (Volumes)</label>
              {edited.product?.volumes?.map((vol, idx) => (
                <div key={vol.id} className="nested-form-block mt-2">
                  <div className="block-title">Volume Option #{idx + 1}</div>
                  <div className="form-group">
                    <span className="tiny-label">Label Name</span>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={vol.name} 
                      onChange={(e) => handleVolumeChange(idx, 'name', e.target.value)} 
                    />
                  </div>
                  <div className="form-row-2 mt-2">
                    <div className="form-group">
                      <span className="tiny-label">Price (€)</span>
                      <input 
                        type="number" 
                        step="0.01" 
                        className="form-input" 
                        value={vol.price} 
                        onChange={(e) => handleVolumeChange(idx, 'price', parseFloat(e.target.value) || 0)} 
                      />
                    </div>
                    <div className="form-group">
                      <span className="tiny-label">Thumbnail URL</span>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={vol.img} 
                        onChange={(e) => handleVolumeChange(idx, 'img', e.target.value)} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="form-section">
              {edited.product?.subscriptionOptions?.map((sub, idx) => (
                <div key={sub.id} className="nested-form-block">
                  <div className="block-title">{sub.title} Configuration</div>
                  <div className="form-group">
                    <span className="tiny-label">Plan Title</span>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={sub.title} 
                      onChange={(e) => handleSubscriptionChange(idx, 'title', e.target.value)} 
                    />
                  </div>
                  <div className="form-row-2 mt-2">
                    <div className="form-group">
                      <span className="tiny-label">Monthly Rate (€)</span>
                      <input 
                        type="number" 
                        step="0.01" 
                        className="form-input" 
                        value={sub.priceMonthly} 
                        onChange={(e) => handleSubscriptionChange(idx, 'priceMonthly', parseFloat(e.target.value) || 0)} 
                      />
                    </div>
                    <div className="form-group">
                      <span className="tiny-label">Original Price (€)</span>
                      <input 
                        type="number" 
                        step="0.01" 
                        className="form-input" 
                        value={sub.priceOriginal} 
                        onChange={(e) => handleSubscriptionChange(idx, 'priceOriginal', parseFloat(e.target.value) || 0)} 
                      />
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <span className="tiny-label">Save Badge Text</span>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={sub.saveBadge} 
                      onChange={(e) => handleSubscriptionChange(idx, 'saveBadge', e.target.value)} 
                    />
                  </div>
                  <div className="form-group mt-2">
                    <span className="tiny-label">Billing Detail Note</span>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={sub.billingInfo} 
                      onChange={(e) => handleSubscriptionChange(idx, 'billingInfo', e.target.value)} 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'trust' && (
            <div className="form-section">
              <label className="form-label">Trust Circles (4 circular badges)</label>
              {edited.product?.trustBadges?.map((badge, idx) => (
                <div key={idx} className="nested-form-block mt-2">
                  <div className="block-title">Trust Circle #{idx + 1}</div>
                  <div className="form-row-icon-title">
                    <div className="form-group icon">
                      <span className="tiny-label">Icon</span>
                      <input 
                        type="text" 
                        className="form-input text-center" 
                        value={badge.icon} 
                        onChange={(e) => handleTrustBadgeChange(idx, 'icon', e.target.value)} 
                      />
                    </div>
                    <div className="form-group title">
                      <span className="tiny-label">Subtext Badge</span>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={badge.sub} 
                        onChange={(e) => handleTrustBadgeChange(idx, 'sub', e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <span className="tiny-label">Label Description</span>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={badge.label} 
                      onChange={(e) => handleTrustBadgeChange(idx, 'label', e.target.value)} 
                    />
                  </div>
                </div>
              ))}

              <div className="inclusions-divider mt-4"></div>

              <label className="form-label mt-4">Bottom Shipping & Return Check list</label>
              {edited.product?.bottomChecklist?.map((check, idx) => (
                <input 
                  key={idx}
                  type="text" 
                  className="form-input mt-1" 
                  value={check} 
                  onChange={(e) => handleChecklistChange(idx, e.target.value)} 
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="drawer-footer">
          <button className="reset-all-btn" onClick={handleTriggerReset} disabled={saving}>
            Reset Defaults
          </button>
          
          <button 
            className={`save-all-btn ${saveStatus === 'success' ? 'success' : ''} ${saveStatus === 'error' ? 'error' : ''}`}
            onClick={handleTriggerSave}
            disabled={saving}
          >
            {saving ? (
              <span className="spinner-group">
                <span className="mini-spinner"></span>
                Saving...
              </span>
            ) : saveStatus === 'success' ? (
              'Saved Successfully ✓'
            ) : saveStatus === 'error' ? (
              'Save Failed ✗'
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>

      <style>{`
        .admin-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(17, 17, 17, 0.4);
          backdrop-filter: blur(2px);
          z-index: 200;
          display: flex;
          justify-content: flex-end;
        }

        .admin-drawer-body {
          width: 480px;
          height: 100vh;
          background: #FFFFFF;
          border-left: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          box-shadow: -5px 0 30px rgba(0,0,0,0.1);
          animation: slideInRight var(--transition-normal) forwards;
          position: relative;
        }

        @media (max-width: 520px) {
          .admin-drawer-body {
            width: 100vw;
          }
        }

        .drawer-header {
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #FAF8F5;
        }

        .drawer-title-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .drawer-sparkle {
          font-size: 20px;
        }

        .drawer-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          color: #111111;
        }

        .drawer-close-btn {
          background: none;
          border: none;
          color: #888888;
          font-size: 28px;
          cursor: pointer;
          line-height: 1;
          transition: color var(--transition-fast);
        }

        .drawer-close-btn:hover {
          color: #111111;
        }

        .drawer-info-banner {
          background: var(--color-accent-light);
          border-bottom: 1px solid rgba(58, 107, 92, 0.1);
          padding: 12px 24px;
        }

        .drawer-info-banner p {
          font-size: 11px;
          color: var(--color-accent);
          font-weight: 500;
          line-height: 1.4;
        }

        .drawer-tabs {
          display: flex;
          background: #FAF8F5;
          border-bottom: 1px solid var(--border-color);
          padding: 0 12px;
          overflow-x: auto;
        }

        .tab-btn {
          background: none;
          border: none;
          color: #666666;
          padding: 12px 14px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: all var(--transition-fast);
        }

        .tab-btn:hover {
          color: #111111;
        }

        .tab-btn.active {
          color: var(--color-accent);
          border-bottom-color: var(--color-accent);
        }

        .drawer-form-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          background-color: #FCFBF9;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group.mt-1 { margin-top: 4px; }
        .form-group.mt-2 { margin-top: 8px; }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-row-icon-title {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 12px;
        }

        .text-center {
          text-align: center;
        }

        .form-label {
          font-size: 11px;
          font-weight: 700;
          color: #111111;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .tiny-label {
          font-size: 10px;
          font-weight: 600;
          color: #777777;
        }

        .form-input {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          color: #222222;
          padding: 8px 12px;
          font-family: var(--font-body);
          font-size: 13px;
          transition: all var(--transition-fast);
          width: 100%;
          outline: none;
        }

        .form-input:focus {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 2px rgba(58, 107, 92, 0.1);
        }

        .form-input.textarea {
          min-height: 60px;
          resize: vertical;
        }

        .form-input.textarea-short {
          min-height: 40px;
          resize: vertical;
        }

        .nested-form-block {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          padding: 14px;
          position: relative;
        }

        .block-title {
          font-size: 11px;
          font-weight: 700;
          color: #111111;
          margin-bottom: 10px;
          border-bottom: 1px solid #F1EFEA;
          padding-bottom: 4px;
        }

        .inclusions-divider {
          height: 1px;
          background-color: var(--border-color);
        }

        .drawer-footer {
          padding: 16px 24px;
          border-top: 1px solid var(--border-color);
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 12px;
          background: #FAF8F5;
        }

        .reset-all-btn {
          background: none;
          border: 1px solid rgba(210, 122, 91, 0.3);
          color: var(--text-discount);
          padding: 10px;
          border-radius: var(--border-radius-sm);
          font-size: 13px;
          font-weight: 700;
          transition: all var(--transition-fast);
        }

        .reset-all-btn:hover {
          background: rgba(210, 122, 91, 0.05);
          border-color: var(--color-discount);
        }

        .save-all-btn {
          background-color: var(--color-accent);
          color: #FFFFFF;
          padding: 10px;
          border-radius: var(--border-radius-sm);
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
          box-shadow: 0 2px 8px rgba(58, 107, 92, 0.2);
        }

        .save-all-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .save-all-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .save-all-btn.success {
          background-color: #3A6B5C;
          box-shadow: 0 2px 8px rgba(58, 107, 92, 0.2);
        }

        .save-all-btn.error {
          background-color: #ef4444;
        }

        .spinner-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .mini-spinner {
          width: 12px;
          height: 12px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #FFFFFF;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
