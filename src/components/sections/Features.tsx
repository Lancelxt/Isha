'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

const features = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="14" width="36" height="20" rx="2" />
        <path d="M6 20h36" />
        <path d="M14 28l4-4 4 4 4-4 4 4" />
      </svg>
    ),
    title: 'LED Signs',
    description: 'Vibrant, energy-efficient LED displays that shine bright 24/7. Perfect for storefronts and billboards.'
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4L4 16v16l20 12 20-12V16L24 4z" />
        <path d="M4 16l20 12 20-12" />
        <path d="M24 28v16" />
      </svg>
    ),
    title: 'Neon Signs',
    description: 'Classic neon glow with modern craftsmanship. Custom designs that capture attention effortlessly.'
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="32" height="32" rx="2" />
        <path d="M16 8V4" />
        <path d="M32 8V4" />
        <path d="M16 40v4" />
        <path d="M32 40v4" />
        <path d="M8 16h32" />
        <path d="M8 32h32" />
      </svg>
    ),
    title: 'Acrylic Signs',
    description: 'Sleek, modern acrylic signage with precision laser cutting. Crystal-clear finishes for premium look.'
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 40V20l20-16 20 16v20" />
        <path d="M14 40V28h20v12" />
        <path d="M24 8v8" />
        <path d="M18 36h12" />
      </svg>
    ),
    title: '3D Letters',
    description: ' dimensional letter signs with depth and dimension. Stand-out lettering that commands attention.'
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="18" />
        <path d="M24 6v6" />
        <path d="M24 36v6" />
        <path d="M6 24h6" />
        <path d="M36 24h6" />
        <path d="M10.9 10.9l4.2 4.2" />
        <path d="M32.9 32.9l4.2 4.2" />
        <path d="M10.9 37.1l4.2-4.2" />
        <path d="M32.9 15.1l4.2-4.2" />
      </svg>
    ),
    title: 'Wayfinding',
    description: 'Complete wayfinding systems for malls, offices, and institutions. Navigation made beautiful.'
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="40" height="32" rx="2" />
        <path d="M4 16h40" />
        <path d="M12 24h8" />
        <path d="M12 30h8" />
        <path d="M12 36h4" />
        <circle cx="32" cy="30" r="6" />
      </svg>
    ),
    title: 'Digital Displays',
    description: 'Interactive digital signage with dynamic content. Engage your audience with smart displays.'
  }
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={inView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: { 
          duration: 0.6, 
          delay: index * 0.1,
          ease: [0.34, 1.56, 0.64, 1]
        }
      } : {}}
      whileHover={{ 
        y: -12,
        transition: { duration: 0.3 }
      }}
      className="glass-card"
      style={{
        padding: '2.5rem',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        style={{
          width: '64px',
          height: '64px',
          marginBottom: '1.5rem',
          color: '#D45C2A'
        }}
      >
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
          {feature.icon.props.children}
        </svg>
      </motion.div>

      {/* Title */}
      <h3 style={{ 
        fontSize: '1.5rem', 
        marginBottom: '1rem', 
        color: 'var(--text-primary)'
      }}>
        {feature.title}
      </h3>

      {/* Description */}
      <p style={{ 
        fontSize: '1rem', 
        lineHeight: 1.7, 
        color: 'var(--text-secondary)' 
      }}>
        {feature.description}
      </p>

      {/* Learn More Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#D45C2A',
          fontSize: '0.875rem',
          fontWeight: 500
        }}
      >
        Learn more
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function Features({ id }: { id?: string }) {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <section id={id} className="section section-warm">
      <div className="container">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0, transition: { duration: 0.6 } } : {}}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-badge">
            Our Services
          </span>
          <h2 style={{ marginBottom: '1rem' }}>
            Everything You Need for
            <br />
            <span className="glow-text">Perfect Signage</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            From concept to installation, we provide end-to-end signage solutions 
            that bring your brand to life.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}