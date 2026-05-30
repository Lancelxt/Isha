'use client';

import { useState } from 'react';
import { WPMedia } from '@/services/wordpress';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryViewProps {
  mediaItems: WPMedia[];
  fallbackItems: Array<{
    id: number;
    title: string;
    category: string;
    source_url: string;
    caption?: string;
  }>;
}

export default function GalleryView({ mediaItems, fallbackItems }: GalleryViewProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Determine which list to use (WordPress media or beautiful placeholders)
  const isUsingWordPress = mediaItems.length > 0;
  
  const displayItems = isUsingWordPress 
    ? mediaItems.map(item => ({
        id: item.id,
        title: item.title.rendered || 'ISHA Creation',
        category: item.mime_type.split('/')[1]?.toUpperCase() || 'SIGNAGE',
        source_url: item.source_url,
        caption: item.caption.rendered.replace(/<[^>]*>/g, '') || undefined
      }))
    : fallbackItems;

  // Extract unique categories for filter tabs
  const categories = ['All', ...Array.from(new Set(displayItems.map(item => item.category)))];

  // Filtered items
  const filteredItems = activeFilter === 'All'
    ? displayItems
    : displayItems.filter(item => item.category === activeFilter);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div>
      {/* Category Filter Tabs */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '3.5rem',
        }}
      >
        {categories.map((cat) => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '50px',
                border: '1px solid',
                borderColor: isActive ? 'var(--primary-orange)' : 'var(--border-medium)',
                background: isActive ? 'var(--primary-light)' : 'transparent',
                color: isActive ? 'var(--primary-orange)' : 'var(--text-secondary)',
                fontWeight: isActive ? '600' : '500',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--primary-orange)';
                  e.currentTarget.style.color = 'var(--primary-orange)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--border-medium)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Masonry / Grid Gallery */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '2.5rem',
        marginBottom: '6rem',
      }}>
        {filteredItems.map((item, index) => (
          <motion.div
            layout
            key={item.id}
            onClick={() => setSelectedImageIndex(index)}
            className="glass-card"
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              padding: '1rem',
              cursor: 'pointer',
            }}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: '1/1',
              marginBottom: '1rem',
              position: 'relative',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.source_url}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                top: '0.75rem',
                left: '0.75rem',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(5px)',
                color: 'var(--primary-orange)',
                padding: '0.35rem 0.85rem',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: 700,
                boxShadow: 'var(--shadow-sm)',
              }}>
                {item.category}
              </div>
            </div>

            <div style={{ padding: '0 0.5rem 0.5rem 0.5rem' }}>
              <h3 
                style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-primary)' }}
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              {item.caption && (
                <p 
                  style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.4 }}
                  dangerouslySetInnerHTML={{ __html: item.caption }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Pop-up Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(26, 26, 32, 0.95)',
              backdropFilter: 'blur(15px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '2.5rem',
                cursor: 'pointer',
                zIndex: 1010,
                lineHeight: 1,
              }}
            >
              ×
            </button>

            {/* Main Lightbox Frame */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1000px',
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  zIndex: 1010,
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#FFFFFF',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.3s',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                ‹
              </button>

              <motion.img
                key={selectedImageIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                src={filteredItems[selectedImageIndex].source_url}
                alt={filteredItems[selectedImageIndex].title}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxHeight: '100%',
                  maxWidth: 'calc(100% - 120px)',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                }}
              />

              {/* Next Button */}
              <button
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  zIndex: 1010,
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#FFFFFF',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.3s',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                ›
              </button>
            </div>

            {/* Info overlay below image */}
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                textAlign: 'center',
                color: '#FFFFFF',
                marginTop: '2rem',
                maxWidth: '600px',
              }}
            >
              <span style={{
                background: 'var(--primary-orange)',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.3rem 0.8rem',
                borderRadius: '50px',
                display: 'inline-block',
                marginBottom: '0.75rem',
              }}>
                {filteredItems[selectedImageIndex].category}
              </span>
              <h2 
                style={{ color: '#FFFFFF', fontSize: '1.75rem', marginBottom: '0.5rem', fontWeight: 600 }}
                dangerouslySetInnerHTML={{ __html: filteredItems[selectedImageIndex].title }}
              />
              {filteredItems[selectedImageIndex].caption && (
                <p 
                  style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.5 }}
                  dangerouslySetInnerHTML={{ __html: filteredItems[selectedImageIndex].caption }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
