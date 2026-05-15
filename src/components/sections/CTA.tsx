'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';

function RippleButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 0 40px rgba(212, 92, 42, 0.5)'
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '1.25rem 3rem',
        background: 'linear-gradient(135deg, #D45C2A 0%, #F5A623 100%)',
        color: '#FFFFFF',
        fontSize: '1.125rem',
        fontWeight: 600,
        border: 'none',
        borderRadius: '60px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 1
      }}
    >
      {/* Ripples */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: -1
          }}
        >
          <motion.span
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: ripple.x,
              top: ripple.y,
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.6)',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </span>
      ))}
      
      {/* Button Content */}
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 1 }}>
        {children}
      </span>
    </motion.button>
  );
}

function MagneticIcon() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!iconRef.current) return;
    const rect = iconRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={iconRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    </motion.div>
  );
}

export default function CTA({ id }: { id?: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <section id={id} className="section" style={{
      background: 'linear-gradient(180deg, #FFF8F4 0%, #FFFFFF 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-20%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(212,92,42,0.1) 0%, transparent 70%)',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        animation: 'morph 12s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)',
        borderRadius: '30% 70% 70% 30% / 60% 40% 60% 40%',
        animation: 'morph 10s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Main CTA Content */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.8 } } : {}}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { 
              opacity: 1, 
              scale: 1,
              transition: { delay: 0.2, duration: 0.5 }
            } : {}}
            style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: '#FDE6D4',
              border: '1px solid rgba(212, 92, 42, 0.25)',
              borderRadius: '50px',
              fontSize: '0.875rem',
              color: '#D45C2A',
              marginBottom: '2rem'
            }}
          >
            Let&apos;s Create Together
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.3, duration: 0.6 }
            } : {}}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              lineHeight: 1.2
            }}
          >
            Ready to Transform
            <br />
            <span className="glow-text">Your Brand?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.4, duration: 0.6 }
            } : {}}
            style={{
              maxWidth: '600px',
              margin: '0 auto 3rem',
              fontSize: '1.25rem',
              color: 'var(--text-secondary)'
            }}
          >
            Get a free consultation and quote for your signage project. 
            Our team is ready to bring your vision to life.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.5, duration: 0.6 }
            } : {}}
            style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <RippleButton>
              <MagneticIcon />
              Get Free Quote
            </RippleButton>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '1.25rem 3rem',
                background: 'transparent',
                border: '2px solid var(--border-medium)',
                borderRadius: '60px',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '1.125rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#D45C2A';
                e.currentTarget.style.color = '#D45C2A';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-medium)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              View Portfolio
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { 
            opacity: 1,
            transition: { delay: 0.8, duration: 0.6 }
          } : {}}
          style={{
            marginTop: '5rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap'
          }}
        >
          {[
            { icon: '📞', text: '+91 98765 43210', label: 'Call Us' },
            { icon: '✉️', text: 'hello@ishasigns.com', label: 'Email Us' },
            { icon: '📍', text: 'Mumbai, India', label: 'Visit Us' }
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.5rem',
                background: 'rgba(0,0,0,0.03)',
                borderRadius: '12px',
                border: '1px solid var(--border-light)'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>{item.label}</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{item.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
      `}</style>
    </section>
  );
}