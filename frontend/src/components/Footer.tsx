import React from 'react';

interface FooterProps {
  siteName: string;
}

export const Footer: React.FC<FooterProps> = ({ siteName }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-brand-logo">🌿</span>
            <span className="footer-brand-name">{siteName || 'NATURAL HEROES'}</span>
          </div>
          <p className="footer-cms-notice">
            Edit all e-commerce copy, products, options, pricing, and images in real-time from the backend via <strong>/api/content</strong> or the built-in <strong>⚙️ Content Customizer Panel</strong>.
          </p>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            © {currentYear} {siteName || 'Natural Heroes Inc.'} Alle rechten voorbehouden.
          </p>
          <div className="footer-meta-links">
            <a href="#" className="footer-meta-link">Privacy Policy</a>
            <a href="#" className="footer-meta-link">Algemene Voorwaarden</a>
            <a href="#" className="footer-meta-link">Cookiebeleid</a>
            <a href="#" className="footer-meta-link">Disclaimer</a>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: #111111;
          color: #E2E2E2;
          padding: 60px 0 30px 0;
          border-top: 1px solid var(--border-color);
        }

        .footer-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
          border-bottom: 1px solid #333333;
          padding-bottom: 30px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-brand-logo {
          font-size: 24px;
        }

        .footer-brand-name {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: #FFFFFF;
        }

        .footer-cms-notice {
          font-size: 12px;
          color: #AAAAAA;
          max-width: 500px;
          line-height: 1.5;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .copyright-text {
          font-size: 12px;
          color: #888888;
        }

        .footer-meta-links {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .footer-meta-link {
          font-size: 12px;
          color: #888888;
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .footer-meta-link:hover {
          color: #FFFFFF;
        }

        @media (max-width: 768px) {
          .footer-top {
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-meta-links {
            gap: 12px;
          }
        }
      `}</style>
    </footer>
  );
};
