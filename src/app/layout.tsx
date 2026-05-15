import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bricolage = localFont({
  src: [
    {
      path: "../../public/fonts/BricolageGrotesque-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/BricolageGrotesque-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ISHA Signage | Premium Signage Solutions in Mumbai",
  description: "Transform your brand presence with stunning 3D signage, neon displays, LED signs, and cutting-edge sign solutions. Get a free quote today!",
  keywords: ["signage", "LED signs", "neon signs", "3D letters", "acrylic signs", "Mumbai", "signage company"],
  authors: [{ name: "ISHA Signage" }],
  openGraph: {
    title: "ISHA Signage | Premium Signage Solutions",
    description: "Crafting memories in signage. Transform your brand with stunning 3D signs, LED displays, and neon signage.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body>{children}</body>
    </html>
  );
}
