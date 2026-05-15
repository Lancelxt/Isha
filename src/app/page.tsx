import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Stats from '@/components/sections/Stats';
import Testimonials from '@/components/sections/Testimonials';
import Projects from '@/components/sections/Projects';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features id="services" />
      <Stats id="stats" />
      <Testimonials id="testimonials" />
      <Projects id="portfolio" />
      <CTA id="contact" />
      <Footer />
    </main>
  );
}
