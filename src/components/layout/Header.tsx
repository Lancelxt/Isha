'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'About Us', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as const }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '0.75rem 2rem' : '1.25rem 2rem',
        background: scrolled
          ? 'rgba(255, 255, 255, 0.85)'
          : 'rgba(255, 255, 255, 0)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(0, 0, 0, 0)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
          }}
        >
          <span style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #D45C2A 0%, #F5A623 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            fontWeight: 700,
            color: '#FFFFFF',
          }}>
            IS
          </span>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}>
            ISHA <span style={{ color: '#D45C2A', fontWeight: 400 }}>Signage</span>
          </span>
        </a>

        {/* Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
        }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                position: 'relative',
                padding: '0.25rem 0',
                transition: 'color 0.3s ease',
                letterSpacing: '0.01em',
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#D45C2A'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            style={{
              padding: '0.6rem 1.5rem',
              background: 'linear-gradient(135deg, #D45C2A 0%, #F5A623 100%)',
              color: '#FFFFFF',
              borderRadius: '50px',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(212, 92, 42, 0.25)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(212, 92, 42, 0.35)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 92, 42, 0.25)';
            }}
          >
            Get a Quote
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
