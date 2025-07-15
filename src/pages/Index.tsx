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