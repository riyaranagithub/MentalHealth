'use client';
import { HeroSection } from '../components/homepage/HeroSection';
import { FeaturesSection } from '../components/homepage/FeaturesSection';
import { TestimonialsSection } from '../components/homepage/TestimonialsSection';
import { CTASection } from '../components/homepage/CTASection';
import { Footer } from '../components/homepage/Footer';


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
  
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
