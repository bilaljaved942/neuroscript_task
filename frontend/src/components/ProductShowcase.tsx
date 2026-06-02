import React, { useState } from 'react';

interface ProductShowcaseProps {
  images: string[];
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const fallbackImages = [
    "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
  ];

  const activeImageList = images && images.length > 0 ? images : fallbackImages;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % activeImageList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + activeImageList.length) % activeImageList.length);
  };

  return (
    <div className="product-showcase-container animate-fade-in">
      {/* 1. Main Large Product Image */}
      <div className="main-image-viewport">
        <img 
          src={activeImageList[activeIndex]} 
          alt={`No BS Deo main showcase view ${activeIndex + 1}`} 
          className="main-showcase-img"
        />

        {/* Pagination Dots */}
        <div className="showcase-dots">
          {activeImageList.map((_, idx) => (
            <span 
              key={idx} 
              className={`showcase-dot ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
            ></span>
          ))}
        </div>
      </div>

      {/* 2. Thumbnail List with Navigation arrows */}
      <div className="thumbnail-slider-row">
        <button 
          className="nav-arrow prev" 
          onClick={handlePrev}
          aria-label="Previous image"
        >
          ‹
        </button>

        <div className="thumbnails-wrapper">
          {activeImageList.map((imgUrl, idx) => (
            <div 
              key={idx} 
              className={`thumbnail-card-border ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              <img 
                src={imgUrl} 
                alt={`No BS Deo thumbnail ${idx + 1}`} 
                className="thumbnail-img"
              />
            </div>
          ))}
        </div>

        <button 
          className="nav-arrow next" 
          onClick={handleNext}
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      <style>{`
        .product-showcase-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: sticky;
          top: 40px;
        }

        /* Viewport */
        .main-image-viewport {
          position: relative;
          background-color: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          overflow: hidden;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .main-showcase-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .main-image-viewport:hover .main-showcase-img {
          transform: scale(1.03);
        }

        /* Dots pagination overlay */
        .showcase-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          background: rgba(255, 255, 255, 0.8);
          padding: 6px 12px;
          border-radius: 100px;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .showcase-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #CCCCCC;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .showcase-dot.active {
          background-color: var(--color-accent);
          transform: scale(1.2);
        }

        /* Thumbnails Row */
        .thumbnail-slider-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .nav-arrow {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #666666;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          transition: all var(--transition-fast);
        }

        .nav-arrow:hover {
          background-color: var(--color-accent-light);
          color: var(--color-accent);
          border-color: var(--color-accent);
        }

        .thumbnails-wrapper {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          flex: 1;
        }

        .thumbnail-card-border {
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-sm);
          overflow: hidden;
          aspect-ratio: 1 / 1;
          cursor: pointer;
          transition: all var(--transition-fast);
          padding: 2px;
          background-color: #FFFFFF;
        }

        .thumbnail-card-border:hover {
          border-color: #888888;
        }

        .thumbnail-card-border.active {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 2px rgba(58, 107, 92, 0.2);
        }

        .thumbnail-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};
