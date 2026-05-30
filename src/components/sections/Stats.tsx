'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState, useRef } from 'react';

const stats = [
  { value: 2500, suffix: '+', label: 'Projects Completed' },
  { value: 500, suffix: '+', label: 'Happy Clients' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Team Members' },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const duration = 2000;

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [inView, value]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
      animate={inView ? {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.15,
          ease: [0.34, 1.56, 0.64, 1]
        }
      } : {}}
      style={{
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      {/* Number */}
      <motion.div
        initial={{ scale: 0.5 }}
        animate={inView ? {
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: index * 0.15 + 0.3
          }
        } : {}}
        style={{
          fontSize: 'clamp(3rem, 6vw, 4.5rem)',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #D45C2A 0%, #F5A623 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          marginBottom: '1rem'
        }}
      >
        <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
      </motion.div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? {
          opacity: 1,
          y: 0,
          transition: { delay: index * 0.15 + 0.5, duration: 0.5 }
        } : {}}
        style={{
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          fontWeight: 500
        }}
      >
        {stat.label}
      </motion.p>
    </motion.div>
  );
}

export default function Stats({ id }: { id?: string }) {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <section id={id} className="section gradient-mesh" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(212,92,42,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0, transition: { duration: 0.6 } } : {}}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-badge">
            Our Impact
          </span>
          <h2 style={{ marginBottom: '1rem' }}>
            Numbers That Speak
            <br />
            <span className="glow-text">For Themselves</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={headerInView ? {
            scaleX: 1,
            transition: { duration: 1, delay: 0.5 }
          } : {}}
          style={{
            width: '200px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #D45C2A, transparent)',
            margin: '4rem auto 0'
          }}
        />
      </div>
    </section>
  );
}