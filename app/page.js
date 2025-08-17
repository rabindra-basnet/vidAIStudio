import { ContactSection } from "./_pagecomponent/contact-section";
import { CTASection } from "./_pagecomponent/cta-section";
import { FAQSection } from "./_pagecomponent/faq-section";
import { FeaturesSection } from "./_pagecomponent/features-section";
import { Footer } from "./_pagecomponent/Footer";
import { GalleryShowcase } from "./_pagecomponent/gallery-showcase";
import { Header } from "./_pagecomponent/Header";
import { HeroSection } from "./_pagecomponent/hero-section";
import { PricingSection } from "./_pagecomponent/pricing-section";
import { ProcessSteps } from "./_pagecomponent/process-steps";
import { TestimonialsSection } from "./_pagecomponent/testimonials-section";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ProcessSteps />
      <GalleryShowcase />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  )
}
