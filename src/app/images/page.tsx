import Header from '@/components/layout/Header';
import Footer from '@/components/sections/Footer';
import { fetchMedia } from '@/services/wordpress';
import GalleryView from './GalleryView';

export const metadata = {
  title: 'Visual Portfolio & Gallery | ISHA Signage Studio',
  description: 'Immerse yourself in our premium creative creations. Browse high-resolution captures of our LED signage, bespoke Neon lighting, acrylic architectural plates, and spatial wayfinding.',
};

// Curated high-fidelity fallback items representing ISHA Signage's real capabilities
const fallbackMedia = [
  {
    id: 101,
    title: 'Warm-Glowing Backlit LED Letters',
    category: 'LED SIGNAGE',
    source_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    caption: 'Dynamic 3D laser-cut brass letters with premium warm-tinted halo backlighting on concrete facade.'
  },
  {
    id: 102,
    title: 'Custom Curved Neon Light Sculpture',
    category: 'NEON SIGNS',
    source_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    caption: 'Bespoke hand-formed glass gas tubes creating vibrant typography for luxury retail branding.'
  },
  {
    id: 103,
    title: 'Glassmorphic Corporate Standoff Plate',
    category: 'ACRYLIC DISPLAY',
    source_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    caption: 'Laser-polished crystal acrylic plaque mounted with premium aluminum mechanical spacers.'
  },
  {
    id: 104,
    title: 'Monolithic Architectural Pylon Column',
    category: 'WAYFINDING',
    source_url: 'https://images.unsplash.com/photo-1507207611509-ec012433ff52?auto=format&fit=crop&w=800&q=80',
    caption: 'Sleek dark anthracite anodized metal wayfinding totem for corporate campuses and commercial spaces.'
  },
  {
    id: 105,
    title: 'Brushed Brass Boutique Storefront Plate',
    category: '3D LETTERS',
    source_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    caption: 'Solid CNC milled architectural brass lettering flush-mounted against elegant dark-grain walnut wood panels.'
  },
  {
    id: 106,
    title: 'High-Luminance Smart Digital Board',
    category: 'DIGITAL DISPLAY',
    source_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    caption: 'Ultra-thin high refresh rate electronic LED screen embedded in a weatherproof architectural housing.'
  }
];

export default async function GalleryPage() {
  // Fetch media from headless WordPress (defaults to localhost:8080)
  const mediaItems = await fetchMedia({ perPage: 30 });

  return (
    <>
      <Header />
      <main className="section-light gradient-mesh" style={{ minHeight: '100vh', paddingTop: '8.5rem' }}>
        <div className="container">
          
          {/* Portfolio Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-badge">VISUAL ARCHIVE</span>
            <h1 style={{ marginBottom: '1.25rem' }}>
              ISHA <span className="glow-text">Portfolio</span>
            </h1>
            <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-secondary)' }}>
              A curated collection of our spatial identity projects. Witness the synergy of premium materials, custom illumination, and flawless installation.
            </p>
          </div>

          {/* Interactive Dynamic Gallery View */}
          <GalleryView 
            mediaItems={mediaItems} 
            fallbackItems={fallbackMedia} 
          />

        </div>
      </main>
      <Footer />
    </>
  );
}
