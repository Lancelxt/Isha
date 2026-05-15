'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

const projects = [
  {
    category: 'LED Display',
    title: 'TechPark Mall Entrance',
    image: '🏢',
    readTime: '5 min read',
    description: 'Massive LED video wall installation at mall entrance'
  },
  {
    category: 'Neon Sign',
    title: 'Café Coffee Day Glow',
    image: '☕',
    readTime: '3 min read',
    description: 'Custom neon signage with brand colors'
  },
  {
    category: '3D Letters',
    title: 'Fashion Studio 3D',
    image: '👗',
    readTime: '4 min read',
    description: 'Illuminated 3D letter signage for boutique'
  },
  {
    category: 'Wayfinding',
    title: 'IT Park Navigation',
    image: '🏢',
    readTime: '6 min read',
    description: 'Complete wayfinding system installation'
  },
  {
    category: 'Acrylic Sign',
    title: 'Spa Resort Elegance',
    image: '🌿',
    readTime: '4 min read',
    description: 'Premium acrylic signage for luxury resort'
  },
  {
    category: 'Digital Display',
    title: 'Restaurant Menu Board',
    image: '🍽️',
    readTime: '3 min read',
    description: 'Interactive digital menu display system'
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        x: index % 2 === 0 ? -50 : 50,
        scale: 0.9
      }}
      animate={inView ? {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.34, 1.56, 0.64, 1]
        }
      } : {}}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="glass-card"
      style={{
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Image/Icon Area */}
      <div style={{
        height: '200px',
        background: 'linear-gradient(135deg, rgba(212,92,42,0.1) 0%, rgba(245,166,35,0.06) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Liquid Swipe Effect */}
        <motion.div
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(212,92,42,0.2), transparent)',
            zIndex: 1
          }}
        />
        
        <span style={{ fontSize: '4rem', opacity: 0.8 }}>{project.image}</span>

        {/* Category Badge */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          padding: '0.5rem 1rem',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '50px',
          fontSize: '0.75rem',
          color: '#D45C2A',
          fontWeight: 500,
          letterSpacing: '0.05em'
        }}>
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        {/* Title */}
        <h3 style={{
          fontSize: '1.25rem',
          color: 'var(--text-primary)',
          marginBottom: '0.75rem',
          fontWeight: 600
        }}>
          {project.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '1rem'
        }}>
          {project.description}
        </p>

        {/* Read Time & CTA */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-light)'
        }}>
          <span style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {project.readTime}
          </span>
          <motion.span
            whileHover={{ x: 5 }}
            style={{
              color: '#D45C2A',
              fontSize: '0.875rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            View
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.span>
        </div>
      </div>

      {/* Glow Effect on Hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 0%, rgba(212,92,42,0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
    </motion.div>
  );
}

export default function Projects({ id }: { id?: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <section id={id} className="section section-warm">
      <div className="container">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.6 } } : {}}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-badge">
            Our Work
          </span>
          <h2 style={{ marginBottom: '1rem' }}>
            Recent
            <br />
            <span className="glow-text">Projects</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Explore our latest signage installations and see how we bring brands to life.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6 } } : {}}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <button className="btn-secondary" style={{
            padding: '1rem 3rem',
            border: '2px solid #D45C2A',
            color: '#D45C2A',
            fontSize: '1rem',
            fontWeight: 600,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #D45C2A, #F5A623)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#D45C2A';
          }}
          >
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
}