"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#FFFFFF",
        padding: "2rem 2rem",
        borderTop: "1px solid var(--border-light)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {/* Brand & Slogan */}
          <div style={{ flex: "1 1 300px" }}>
            <h3
              style={{
                fontSize: "1.5rem",
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <img
                src="/logo.png"
                alt="ISHA Signage"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  objectFit: "contain",
                  background: "#FFFFFF",
                  padding: "2px",
                  border: "1px solid rgba(212, 92, 42, 0.15)",
                }}
              />
              ISHA
            </h3>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
                margin: 0,
              }}
            >
              Premium signage solutions. Crafting memories since 2011.
            </p>
          </div>

          {/* Social Links */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {[
              { icon: <Facebook size={16} />, href: "https://facebook.com" },
              { icon: <Instagram size={16} />, href: "https://instagram.com" },
              { icon: <Twitter size={16} />, href: "https://twitter.com" },
              { icon: <Linkedin size={16} />, href: "https://linkedin.com" },
            ].map((social, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.1, y: -2 }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.03)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "var(--primary-light)";
                  e.currentTarget.style.color = "var(--primary-orange)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.03)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Contact - Phone & Email Only */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              textAlign: "right",
              flex: "1 1 auto",
            }}
          >
            <a
              href="tel:+919876543210"
              style={{
                color: "var(--text-primary)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              +91 98765 43210
            </a>
            <a
              href="mailto:hello@ishasigns.com"
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              hello@ishasigns.com
            </a>
          </div>
        </div>

        {/* Bottom Bar - Ultra Thin */}
        <div
          style={{
            marginTop: "2rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border-light)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.75rem",
              margin: 0,
            }}
          >
            © 2026 ISHA Signage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
