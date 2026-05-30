'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Grid, Image as ImageIcon, BookOpen, Mail, X } from 'lucide-react';

const navLinks = [
  { label: 'About Us', href: '#services', icon: Home },
  { label: 'Portfolio', href: '#portfolio', icon: Grid },
  { label: 'Gallery', href: '/images', icon: ImageIcon },
  { label: 'Blog', href: '/blog', icon: BookOpen },
  { label: 'Contact', href: '#contact', icon: Mail },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMenuOpen(false);
      if (pathname !== '/') {
        router.push('/' + href);
      } else {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <>
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
            onClick={(e) => {
              e.preventDefault();
              if (pathname !== '/') {
                router.push('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
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

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{
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

        {/* Global style overrides for responsive classes */}
        <style>{`
          @media (max-width: 1023px) {
            .desktop-nav {
              display: none !important;
            }
          }
          @media (min-width: 1024px) {
            .desktop-nav {
              display: flex !important;
            }
          }
        `}</style>
      </motion.header>

      {/* Floating Mobile Bottom Navigation */}
      <nav
        className="mobile-bottom-nav"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '1rem',
          right: '1rem',
          zIndex: 900,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 92, 42, 0.15)',
          borderRadius: '40px',
          boxShadow: '0 10px 30px rgba(212, 92, 42, 0.12)',
          padding: '0.75rem 1rem',
          display: 'none',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
          {/* Home option */}
          <button
            onClick={() => {
              if (pathname !== '/') {
                router.push('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              color: pathname === '/' && !menuOpen ? 'var(--primary-orange)' : 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <Home size={20} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Home</span>
          </button>

          {/* Portfolio option */}
          <button
            onClick={(e) => {
              if (pathname !== '/') {
                router.push('/#portfolio');
              } else {
                const target = document.querySelector('#portfolio');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <Grid size={20} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Portfolio</span>
          </button>

          {/* Gallery option */}
          <button
            onClick={() => router.push('/images')}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              color: pathname === '/images' ? 'var(--primary-orange)' : 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <ImageIcon size={20} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Gallery</span>
          </button>

          {/* Menu option */}
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              color: menuOpen ? 'var(--primary-orange)' : 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              width: '20px',
              alignItems: 'center',
              justifyContent: 'center',
              height: '20px'
            }}>
              <span style={{ width: '18px', height: '2px', background: 'currentColor', borderRadius: '1px' }} />
              <span style={{ width: '18px', height: '2px', background: 'currentColor', borderRadius: '1px' }} />
              <span style={{ width: '18px', height: '2px', background: 'currentColor', borderRadius: '1px' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>More</span>
          </button>
        </div>
      </nav>

      {/* Frosted Orange Full-Screen bottom-up Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: '100vh',
              background: 'linear-gradient(135deg, #D45C2A 0%, #F5A623 100%)',
              color: '#FFFFFF',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header Area */}
            <div style={{
              padding: '1.5rem 1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  color: '#D45C2A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                }}>
                  IS
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  ISHA <span style={{ fontWeight: 400, opacity: 0.9 }}>Menu</span>
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
              >
                <X size={22} strokeWidth={2.5} />
              </button>
            </div>

            {/* Grid Navigation Body */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '3rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                maxWidth: '600px',
                margin: '0 auto',
                width: '100%',
              }}>
                {navLinks.map((item) => {
                  const LinkIcon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleClick(e, item.href)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        aspectRatio: '1',
                        padding: '1rem 0.5rem',
                        borderRadius: '20px',
                        textDecoration: 'none',
                        background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                        border: isActive ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFFFFF',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <div style={{ marginBottom: '0.75rem' }}>
                        <LinkIcon size={32} strokeWidth={2} />
                      </div>
                      <span style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        textAlign: 'center',
                        lineHeight: 1.2
                      }}>
                        {item.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Bottom Footer Button */}
            <div style={{
              padding: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'center',
            }}>
              <a
                href="#contact"
                onClick={(e) => handleClick(e, '#contact')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  maxWidth: '450px',
                  padding: '1.1rem',
                  background: '#FFFFFF',
                  color: '#D45C2A',
                  borderRadius: '16px',
                  fontWeight: 800,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                  transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
              >
                Request Free Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS responsive selectors for bottom nav */}
      <style>{`
        @media (max-width: 1023px) {
          .mobile-bottom-nav {
            display: block !important;
          }
          body {
            padding-bottom: 5.5rem !important; /* Space for the floating bottom nav */
          }
        }
      `}</style>
    </>
  );
}
