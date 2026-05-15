'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer style={{
      background: '#FFFFFF',
      padding: '2rem 2rem',
      borderTop: '1px solid var(--border-light)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          {/* Brand & Slogan */}
          <div style={{ flex: '1 1 300px' }}>
            <h3 style={{
              fontSize: '1.5rem',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D45C2A 0%, #F5A623 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#FFFFFF'
              }}>
                IS
              </span>
              ISHA
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
              Premium signage solutions. Crafting memories since 2011.
            </p>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {['📘', '📸', '🐦', 'in'].map((social, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {social}
              </motion.a>
            ))}
          </div>

          {/* Contact - Phone & Email Only */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.25rem',
            textAlign: 'right',
            flex: '1 1 auto'
          }}>
            <a href="tel:+919876543210" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
              +91 98765 43210
            </a>
            <a href="mailto:hello@ishasigns.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>
              hello@ishasigns.com
            </a>
          </div>
        </div>

        {/* Bottom Bar - Ultra Thin */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>
            © 2026 ISHA Signage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
