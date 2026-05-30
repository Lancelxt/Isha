'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';
import { Phone, Mail, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { Select } from '../ui/Select';

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

function RippleButton({ children, onClick, type = 'button', disabled = false }: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    onClick?.(e);
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      type={type}
      disabled={disabled}
      whileHover={disabled ? {} : { 
        scale: 1.02,
        boxShadow: '0 0 40px rgba(212, 92, 42, 0.5)'
      }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '1.2rem 2.8rem',
        background: disabled 
          ? 'var(--border-medium)' 
          : 'linear-gradient(135deg, #D45C2A 0%, #F5A623 100%)',
        color: '#FFFFFF',
        fontSize: '1.05rem',
        fontWeight: 600,
        border: 'none',
        borderRadius: '60px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        zIndex: 1,
        width: '100%',
        transition: 'opacity 0.3s ease',
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {/* Ripples */}
      {!disabled && ripples.map(ripple => (
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    </motion.div>
  );
}

const signageOptions = [
  { value: '3D LED Signage', label: '3D LED Backlit Signs' },
  { value: 'Neon Display', label: 'Custom Shaped Glass Neons' },
  { value: 'Acrylic Plate', label: 'Premium Corporate Acrylic Standoffs' },
  { value: 'Wayfinding Totem', label: 'Architectural Corridor Wayfindings' },
  { value: 'Storefront Sign', label: 'Laser Milled Brass Storefront Plaque' },
  { value: 'Bespoke Concept', label: 'Other Custom Creative Project' }
];

export default function CTA({ id }: { id?: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    signageType: '3D LED Signage',
    message: ''
  });

  const [status, setStatus] = useState<{
    submitting: boolean;
    success: boolean;
    error: string | null;
  }>({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus(prev => ({ ...prev, error: 'Please fill in Name, Email, and Message.' }));
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({
          name: '',
          email: '',
          phone: '',
          signageType: '3D LED Signage',
          message: ''
        });
      } else {
        setStatus({
          submitting: false,
          success: false,
          error: data.error || 'Submission failed. Please try again.'
        });
      }
    } catch (err: any) {
      console.error(err);
      setStatus({
        submitting: false,
        success: false,
        error: 'Network connection failed. Please retry.'
      });
    }
  };

  return (
    <section id={id} className="section" style={{
      background: 'linear-gradient(180deg, #FFF8F4 0%, #FFFFFF 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '7rem 2rem'
    }}>
      {/* Background Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(212,92,42,0.06) 0%, transparent 70%)',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        animation: 'morph 12s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '-25%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 70%)',
        borderRadius: '30% 70% 70% 30% / 60% 40% 60% 40%',
        animation: 'morph 10s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div 
          ref={ref}
          className="cta-grid"
          style={{
            textAlign: 'left'
          }}
        >
          {/* Left Column: Copy & Meta Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0, transition: { duration: 0.8 } } : {}}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', height: '100%', justifyContent: 'center' }}
          >
            <div>
              <span className="section-badge" style={{ marginBottom: '1.5rem' }}>
                LET&apos;S CREATE TOGETHER
              </span>
              <h2 style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
                fontWeight: 700
              }}>
                Ready to Transform
                <br />
                <span className="glow-text">Your Brand Space?</span>
              </h2>
              <p style={{
                fontSize: '1.15rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '520px'
              }}>
                Have an ambitious signage vision? Partner with Mumbai&apos;s premier Web3D signage developers. Share your project requirements and receive a comprehensive material proposal, visual wireframes, and pricing.
              </p>
            </div>

            {/* Quick Contacts */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              marginTop: '1.5rem',
            }}>
              {[
                { icon: <Phone size={20} style={{ color: 'var(--primary-orange)' }} />, label: 'Call Studio Inbox', value: '+91 98765 43210' },
                { icon: <Mail size={20} style={{ color: 'var(--primary-orange)' }} />, label: 'Write Proposal Mail', value: 'hello@ishasigns.com' },
                { icon: <MapPin size={20} style={{ color: 'var(--primary-orange)' }} />, label: 'Design Lab Location', value: 'Mumbai, Maharashtra, India' }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.1rem 1.5rem',
                    background: 'var(--glass-bg)',
                    borderRadius: '16px',
                    border: '1px solid var(--glass-border)',
                    boxShadow: 'var(--shadow-sm)',
                    maxWidth: '420px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</div>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.15rem' }}>
                      {item.label}
                    </p>
                    <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.975rem' }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Premium Interactive Glass Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } } : {}}
          >
            <div 
              className="glass-card"
              style={{
                padding: '2.5rem',
                borderRadius: '32px',
                border: '1px solid var(--glass-border)',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              {status.success ? (
                /* Celebratory Success Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '2rem 0' }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-orange)',
                    marginBottom: '1.5rem',
                  }}>
                    <CheckCircle2 size={64} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                    Proposal Received!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Thank you! Your architectural proposal has been captured directly inside our WordPress leads database and sent to our design panel. We will review your concepts and respond within 24 hours.
                  </p>
                  <button 
                    onClick={() => setStatus(prev => ({ ...prev, success: false }))}
                    className="btn-secondary"
                    style={{ padding: '0.8rem 2.2rem', borderRadius: '50px' }}
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                /* Main Interactive Form Fields */
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      Request Consultation
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      Fill in your specifications to obtain a complimentary visual design proposal.
                    </p>
                  </div>

                  {/* Name Input */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Full Name <span style={{ color: 'var(--primary-orange)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status.submitting}
                      style={{
                        padding: '0.9rem 1.1rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border-medium)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        background: '#FFFFFF',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-orange)';
                        e.target.style.boxShadow = '0 0 10px rgba(212, 92, 42, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border-medium)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Email & Phone grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    {/* Email */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Email Address <span style={{ color: 'var(--primary-orange)' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={status.submitting}
                        style={{
                          padding: '0.9rem 1.1rem',
                          borderRadius: '12px',
                          border: '1px solid var(--border-medium)',
                          fontSize: '0.95rem',
                          outline: 'none',
                          background: '#FFFFFF',
                          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'var(--primary-orange)';
                          e.target.style.boxShadow = '0 0 10px rgba(212, 92, 42, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'var(--border-medium)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    {/* Phone */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={status.submitting}
                        style={{
                          padding: '0.9rem 1.1rem',
                          borderRadius: '12px',
                          border: '1px solid var(--border-medium)',
                          fontSize: '0.95rem',
                          outline: 'none',
                          background: '#FFFFFF',
                          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'var(--primary-orange)';
                          e.target.style.boxShadow = '0 0 10px rgba(212, 92, 42, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'var(--border-medium)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Signage Interest Dropdown */}
                  <Select
                    label="Select Signage Interest"
                    name="signageType"
                    value={formData.signageType}
                    onChange={handleChange}
                    disabled={status.submitting}
                    options={signageOptions}
                    placeholder="Choose signage category..."
                  />

                  {/* Message Input */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Project Specifications & Scope <span style={{ color: 'var(--primary-orange)' }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Describe your design, sizing ideas, placement, and custom elements..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status.submitting}
                      style={{
                        padding: '0.9rem 1.1rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border-medium)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        background: '#FFFFFF',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        lineHeight: 1.5,
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-orange)';
                        e.target.style.boxShadow = '0 0 10px rgba(212, 92, 42, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border-medium)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Error Notification Alert banner */}
                  {status.error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        padding: '0.8rem 1.2rem',
                        background: '#FFF0F0',
                        border: '1px solid #FFC0C0',
                        borderRadius: '12px',
                        color: '#C03030',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <AlertCircle size={16} /> {status.error}
                      </span>
                    </motion.div>
                  )}

                  {/* Form Submission Button */}
                  <div style={{ marginTop: '0.5rem' }}>
                    <RippleButton 
                      type="submit" 
                      disabled={status.submitting}
                    >
                      {status.submitting ? (
                        <>
                          <span className="loading-spinner" /> Submitting Lead Proposal...
                        </>
                      ) : (
                        <>
                          <MagneticIcon /> Send Proposal Request
                        </>
                      )}
                    </RippleButton>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .cta-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4.5rem;
          align-items: start;
        }

        @media (min-width: 992px) {
          .cta-grid {
            grid-template-columns: 1.15fr 1fr;
          }
        }

        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #FFFFFF;
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </section>
  );
}