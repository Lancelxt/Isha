"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";

const OrganicBlob = dynamic(() => import("@/components/3d/OrganicBlob"), {
  ssr: false,
  loading: () => null,
});

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] as const },
  },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
} as const;

export default function Hero() {
  return (
    <section
      className="section"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FFF8F4 0%, #FFFFFF 100%)",
        paddingTop: "6rem",
      }}
    >
      {/* 3D Blob Background (left side atmosphere) */}
      <div
        style={{
          position: "absolute",
          left: "-10%",
          top: "10%",
          width: "60%",
          height: "80%",
          zIndex: 0,
          opacity: 0.5,
        }}
      >
        <OrganicBlob />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flex: 1,
          minHeight: "80vh",
          paddingLeft: "clamp(2rem, 5vw, 6rem)",
          paddingRight: "2rem",
        }}
      >
        {/* Left Column — Text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{
            width: "100%",
            maxWidth: "600px", // Restricts text width on large screens
            paddingRight: "2rem",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} style={{ marginBottom: "1.5rem" }}>
            <span className="section-badge">
              Premium Signage Solutions in Chhattisgarh
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeUp}
            style={{
              marginBottom: "1.5rem",
              color: "var(--text-primary)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: 1.1,
            }}
          >
            Crafting <span className="glow-text">Memories</span>
            <br />
            in Signage
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              maxWidth: "520px",
              marginBottom: "2.5rem",
            }}
          >
            Transform your brand presence with stunning 3D signage, neon
            displays, LED signs, and cutting-edge sign solutions that leave
            lasting impressions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <button className="btn-primary">
              Get a Free Quote
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="btn-secondary">View Our Work</button>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border-light)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, #D45C2A, #F5A623)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginLeft: i > 1 ? "-8px" : 0,
                    border: "2px solid white",
                  }}
                >
                  {["A", "M", "K", "R"][i - 1]}
                </div>
              ))}
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                500+ Happy Clients
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  margin: 0,
                }}
              >
                Trusted by businesses across Chhattisgarh
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Column — Full-Height Abstract Art (Absolutely Positioned Full Bleed) */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          delay: 0.5,
          ease: [0.34, 1.56, 0.64, 1] as const,
        }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50vw", // Takes exactly half the screen width
          height: "100%",
          overflow: "hidden",
          zIndex: 5,
          display: "none", // Hide on mobile, show on tablet+ via CSS
        }}
        className="hero-right-bg"
      >
        <style>{`
          @media (max-width: 1023px) {
            .hero-right-bg {
              display: none !important;
            }
          }
          @media (min-width: 1024px) {
            .hero-right-bg {
              display: block !important;
            }
          }
        `}</style>
        {/* Full-bleed abstract image */}
        <Image
          src="/images/hero-abstract.jpg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />

        {/* Edge gradient overlay — fades into left text column */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #FFF8F4 0%, rgba(255,248,244,0.4) 20%, transparent 45%)",
          }}
        />

        {/* Bottom gradient for depth */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background:
              "linear-gradient(0deg, rgba(255,248,244,0.6) 0%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "20px",
            height: "32px",
            border: "2px solid rgba(212, 92, 42, 0.3)",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "3px",
              height: "7px",
              background: "#D45C2A",
              borderRadius: "2px",
              margin: "5px auto 0",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
