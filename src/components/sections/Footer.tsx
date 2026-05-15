'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer style={{
      background: '#F8F6F4',
      padding: '4rem 2rem 2rem',
      borderTop: '1px solid var(--border-light)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Column */}
          <div>
            <h3 style={{
              fontSize: '2rem',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D45C2A 0%, #F5A623 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#FFFFFF'
              }}>
                IS
              </span>
              ISHA
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Premium signage solutions that transform your brand presence. 
              Crafting memories in signage since 2011.
            </p>
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['📘', '📸', '🐦', 'in'].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.125rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Home', 'About Us', 'Services', 'Portfolio', 'Blog', 'Contact'].map((link, i) => (
                <li key={i} style={{ marginBottom: '0.75rem' }}>
                  <a
                    href="#"
                    style={{
                      color: '#a0a0a0',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      fontSize: '0.95rem'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#D45C2A'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.125rem' }}>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['LED Signs', 'Neon Signs', 'Acrylic Signs', '3D Letters', 'Wayfinding', 'Digital Displays'].map((service, i) => (
                <li key={i} style={{ marginBottom: '0.75rem' }}>
                  <a
                    href="#"
                    style={{
                      color: '#a0a0a0',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      fontSize: '0.95rem'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#D45C2A'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.125rem' }}>Contact</h4>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 2 }}>
              <p>📞 +91 98765 43210</p>
              <p>✉️ hello@ishasigns.com</p>
              <p>📍 123 Signage Street, Mumbai, Maharashtra 400001</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            © 2026 ISHA Signage. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((link, i) => (
              <a
                key={i}
                href="#"
                style={{
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#D45C2A'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}