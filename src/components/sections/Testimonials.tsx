"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "TechPark Mall",
    avatar: "RK",
    rating: 5,
    text: "ISHA transformed our entire mall signage with stunning LED displays. The quality and professionalism exceeded our expectations.",
  },
  {
    name: "Priya Sharma",
    company: "Café Coffee Day",
    avatar: "PS",
    rating: 5,
    text: "The neon signage for our new outlet is absolutely beautiful. ISHA understood our brand vision perfectly and delivered beyond what we imagined.",
  },
  {
    name: "Mohit Agarwal",
    company: "Electronics Hub",
    avatar: "MA",
    rating: 5,
    text: "Working with ISHA was a seamless experience. Their 3D letter signs have given our store a premium look that attracts customers instantly.",
  },
  {
    name: "Sneha Reddy",
    company: "Fashion Studio",
    avatar: "SR",
    rating: 5,
    text: "The acrylic signage we got for our boutique is elegant and sophisticated. ISHA team was professional, timely, and the result was perfect!",
  },
  {
    name: "Vikram Singh",
    company: "IT Park Office",
    avatar: "VS",
    rating: 5,
    text: "For our corporate office wayfinding system, ISHA delivered a solution that is both functional and aesthetically pleasing. Excellent!",
  },
  {
    name: "Anjali Patel",
    company: "HealthPlus Clinic",
    avatar: "AP",
    rating: 5,
    text: "Our clinic signage looks professional and welcoming. ISHA created the perfect blend of clarity and design. Highly recommend!",
  },
];

// Shuffle arrays for different rows
const row1 = [...testimonials, ...testimonials];

export default function Testimonials({ id }: { id?: string }) {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id={id}
      className="section section-warm"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "6rem 0", // Remove horizontal padding for full bleed marquee
        overflow: "hidden",
        position: "relative",
        background: "var(--bg-warm)",
      }}
    >
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-container {
          display: flex;
          gap: 1.5rem;
          width: max-content;
        }
        .marquee-container:hover {
          animation-play-state: paused !important;
        }
        .marquee-row-wrapper {
          position: relative;
          display: flex;
          overflow: hidden;
          padding: 1rem 0;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .testimonial-card-hover {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .testimonial-card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(212, 92, 42, 0.15);
          border-color: var(--primary-orange);
          z-index: 10;
        }
      `}</style>

      <div
        className="container"
        style={{ position: "relative", zIndex: 10, marginBottom: "3rem" }}
      >
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center" }}
        >
          <span className="section-badge">Client Stories</span>
          <h2
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", fontWeight: 800 }}
          >
            What Our Clients
            <br />
            <span className="glow-text">Say About Us</span>
          </h2>
        </motion.div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          position: "relative",
        }}
      >
        {/* Row 1 - Left */}
        <motion.div
          className="marquee-row-wrapper"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div
            className="marquee-container"
            style={{ animation: "marqueeLeft 40s linear infinite" }}
          >
            {row1.map((t, i) => (
              <MarqueeCard key={`r1-${i}`} testimonial={t} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MarqueeCard({ testimonial }: { testimonial: any }) {
  return (
    <div
      className="glass-card testimonial-card-hover"
      style={{
        width: "320px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        background: "rgba(255, 255, 255, 0.85)",
        border: "1px solid rgba(212, 92, 42, 0.08)",
        borderRadius: "24px",
        flexShrink: 0,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, var(--primary-orange) 0%, var(--accent-amber) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: "1rem",
            boxShadow: "0 4px 10px rgba(212, 92, 42, 0.2)",
            flexShrink: 0,
          }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <h4
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              margin: 0,
              color: "var(--text-primary)",
            }}
          >
            {testimonial.name}
          </h4>
          <p
            style={{
              fontSize: "0.85rem",
              margin: "0.15rem 0 0 0",
              color: "var(--text-muted)",
            }}
          >
            {testimonial.company}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "2px", marginBottom: "1rem" }}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="var(--primary-orange)"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      <p
        style={{
          fontSize: "0.95rem",
          lineHeight: 1.6,
          fontStyle: "italic",
          color: "var(--text-secondary)",
          margin: 0,
        }}
      >
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Decorative bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          width: "80%",
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, var(--primary-orange), transparent)",
          opacity: 0.15,
          borderRadius: "3px 3px 0 0",
        }}
      />
    </div>
  );
}
