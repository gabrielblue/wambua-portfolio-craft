import { SEOHead } from "@/components/ui/seo-head";
import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WorksSection from "@/components/sections/WorksSection";
import ProjectTimeline from "@/components/sections/ProjectTimeline";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import Portfolio3DViewer from "@/components/sections/Portfolio3DViewer";
import GitHubHeatmap from "@/components/sections/GitHubHeatmap";
import SecurityAudit from "@/components/sections/SecurityAudit";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Gabriel Wambua - Full Stack Developer Portfolio"
        description="Professional full stack developer specializing in React, Node.js, and modern web technologies. View my projects, skills, and get in touch for your next development project."
        keywords="Gabriel Wambua, Full Stack Developer, React Developer, Node.js, Web Development, Portfolio, JavaScript, TypeScript"
      />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WorksSection />
      <ProjectTimeline />
      <TestimonialsCarousel />
      <Portfolio3DViewer />
      <GitHubHeatmap />
      <SecurityAudit />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;