import React, { useState, useEffect } from 'react';
import { SiteContent } from './types';
import { Header } from './components/Header';
import { ProductShowcase } from './components/ProductShowcase';
import { ProductForm } from './components/ProductForm';
import { Footer } from './components/Footer';

const DEFAULT_CONTENT: SiteContent = {
  announcement: "Nieuw: Lab in een doosje! Bekijk onze vernieuwde DIY Kits hier",
  benefitsTop: [
    "✓ Verzending gratis v.a. €35,-",
    "★★★★★ 9.4 / 10 van 8000+ reviews",
    "✓ Voor 23:30 besteld, volgende werkdag in huis"
  ],
  siteName: "NATURAL HEROES+",
  navigation: ["SHOP", "RECEPTEN", "INFORMATIE", "COMMUNITY", "OVER ONS"],
  product: {
    title: "No BS Deo",
    subtitle: "Eindelijk een natuurlijke deodorant waar je op kunt rekenen 🌿",
    reviews: {
      count: 85,
      stars: 5,
      rating: 4.8,
      questions: 10,
      users: "20m+"
    },
    bullets: [
      "Vrij van Aluminium, Alcohol, Baking Soda en Parfum",
      "Beschermt 24 uur",
      "Ook geurloos verkrijgbaar",
      "Gaat tenminste 1 maand mee bij dagelijks gebruik"
    ],
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ],
    volumes: [
      {
        id: "vol-30",
        name: "30 ml / Fresh Balance",
        price: 12.99,
        img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=100&q=80"
      },
      {
        id: "vol-50",
        name: "50 ml / Lavender Glow",
        price: 18.49,
        img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=100&q=80"
      },
      {
        id: "vol-15",
        name: "15 ml / Sensitive Mint",
        price: 8.99,
        img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=100&q=80"
      }
    ],
    subscriptionOptions: [
      {
        id: "sub-90",
        title: "90-Dag Abonnement",
        saveBadge: "BESPAAR 30%",
        bestValue: true,
        priceMonthly: 4.55,
        priceOriginal: 6.55,
        billingInfo: "Billed €273.00 every 12 weeks | €40.00/serving",
        features: [
          "Exclusive Access to 90 Day IM8 Transformation Program",
          "Maximum savings - lowest price per serving",
          "90-Day Money-Back Guarantee",
          "Share with family and friends",
          "Free Mystery Gift",
          "Free Daily Ultimate Mixer (US$18)",
          "Cancel or pause anytime",
          "Free Shipping to US, UK, CA, and most of EU and APAC"
        ],
        welcomeKitTitle: "Gratis Welcome Kit (Eerste order)",
        welcomeKitItems: [
          {
            name: "SHEA BUTTER [L]",
            price: "€5.99 Gratis",
            img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=100&q=80"
          },
          {
            name: "SHEA BUTTER [M]",
            price: "€5.99 Gratis",
            img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=100&q=80"
          },
          {
            name: "SHEA BUTTER [S]",
            price: "€5.99 Gratis",
            img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=100&q=80"
          },
          {
            name: "SHEA BUTTER [XS]",
            price: "€5.99 Gratis",
            img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=100&q=80"
          }
        ]
      },
      {
        id: "sub-reg",
        title: "Abonnement",
        saveBadge: "BESPAAR 10%",
        bestValue: false,
        priceMonthly: 5.85,
        priceOriginal: 6.50,
        billingInfo: "Billed monthly | Cancel anytime",
        features: [
          "10% savings on every delivery",
          "Cancel or pause anytime",
          "Free shipping in NL"
        ],
        welcomeKitTitle: "",
        welcomeKitItems: []
      },
      {
        id: "sub-one",
        title: "Eenmalig",
        saveBadge: "",
        bestValue: false,
        priceMonthly: 7.72,
        priceOriginal: 7.72,
        billingInfo: "One-time purchase",
        features: [
          "Standard delivery",
          "No subscription lock-in"
        ],
        welcomeKitTitle: "",
        welcomeKitItems: []
      }
    ],
    trustBadges: [
      { "label": "Natuurlijk", "sub": "100%", "icon": "🌿" },
      { "label": "Vegan", "sub": "VEGAN", "icon": "🌱" },
      { "label": "Plastic vrij", "sub": "Plastic vrij", "icon": "🚫" },
      { "label": "Aluminium vrij", "sub": "Aluminium vrij", "icon": "🛡️" }
    ],
    bottomChecklist: [
      "Gratis verzending vanaf €35,- naar NL, BE & DUI.",
      "Voor 23:30 besteld, morgen in huis.",
      "Klanten geven ons een 9.4 op Kiyoh",
      "Snel en persoonlijk geholpen door ons lieve team."
    ]
  }
};

const App: React.FC = () => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch page content on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/content');
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.statusText}`);
        }
        const data = await response.json();
        setContent(data);
      } catch (err: any) {
        console.warn('API connection failed, falling back to local dataset:', err);
        setContent(DEFAULT_CONTENT);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="app-loading-screen">
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Laden Natural Heroes Store...</p>
        </div>
        <style>{`
          .app-loading-screen {
            background-color: #FAF8F5;
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2A2A2A;
            font-family: 'Inter', sans-serif;
          }
          .loading-spinner-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(58, 107, 92, 0.1);
            border-radius: 50%;
            border-top-color: #3A6B5C;
            animation: spin 1s linear infinite;
          }
          .loading-text {
            font-size: 13px;
            font-weight: 600;
            color: #666666;
            letter-spacing: 0.5px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app-root-layout">
      {/* Navigation Header */}
      <Header 
        announcement={content.announcement}
        benefitsTop={content.benefitsTop}
        siteName={content.siteName} 
        navigation={content.navigation}
      />

      <main className="main-content-flow">
        <div className="container product-detail-layout">
          {/* Left Column: Media Showcase */}
          <ProductShowcase images={content.product.images} />

          {/* Right Column: E-commerce form */}
          <ProductForm product={content.product} />
        </div>
      </main>

      <Footer siteName={content.siteName} />

      <style>{`
        .app-root-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .main-content-flow {
          flex: 1;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default App;
