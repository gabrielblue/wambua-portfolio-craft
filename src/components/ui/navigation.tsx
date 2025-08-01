import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className={`w-full py-3 shadow-lg fixed top-0 z-50 transition-all duration-500 ease-in-out transform ${
      isScrolled 
        ? 'bg-blue-light/95 backdrop-blur-md py-2 shadow-xl border-b border-gray-light/20' 
        : 'bg-blue-light py-3'
    }`}>
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
          <div className="relative overflow-hidden rounded-lg">
            <div 
              className={`transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-6 ${
                isScrolled ? 'w-6 h-6' : 'w-8 h-8'
              } bg-gradient-blue rounded-lg flex items-center justify-center text-white font-bold text-sm`}
            >
              GW
            </div>
            <div className="absolute inset-0 bg-gradient-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          </div>
          <span className={`font-bold text-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-105 ${
            isScrolled ? 'text-lg' : 'text-lg sm:text-xl'
          }`}>
            Gabriel Wambua.
          </span>
        </div>
        
        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8 text-gray-text font-semibold uppercase text-sm">
            {['home', 'about', 'services', 'works', 'contact'].map((section, index) => (
              <li key={section} className="relative group">
                <button 
                  onClick={() => scrollToSection(section)} 
                  className="relative py-2 px-1 hover:text-foreground transition-all duration-300 hover:scale-105 transform"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {section === 'home' ? 'Homepage' : section === 'about' ? 'About Me' : section.charAt(0).toUpperCase() + section.slice(1)}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  <span className="absolute inset-0 bg-gradient-blue/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                </button>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>


        {/* Mobile Actions */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button 
            onClick={toggleMenu}
            className="relative p-2 text-foreground hover:text-primary transition-all duration-300 hover:scale-110 transform hover:rotate-12 group"
          >
            <div className="absolute inset-0 bg-gradient-blue/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isMenuOpen ? 
              <X size={24} className="transform rotate-180 transition-transform duration-300" /> : 
              <Menu size={24} className="group-hover:scale-110 transition-transform duration-300" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-t border-border/20 transition-all duration-300 ease-in-out transform ${
        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <ul className="flex flex-col py-4 px-6 space-y-2">
          {['home', 'about', 'services', 'works', 'contact'].map((section, index) => (
            <li key={section} className={`transition-all duration-300 transform ${
              isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
            }`} style={{ transitionDelay: `${index * 50}ms` }}>
              <button 
                onClick={() => scrollToSection(section)} 
                className="relative w-full text-left py-3 px-4 text-muted-foreground hover:text-foreground font-semibold uppercase text-sm transition-all duration-300 hover:scale-105 transform rounded-lg group"
              >
                <span className="relative z-10">
                  {section === 'home' ? 'Homepage' : section === 'about' ? 'About Me' : section.charAt(0).toUpperCase() + section.slice(1)}
                </span>
                <span className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-primary group-hover:h-8 transition-all duration-300 rounded-r-full"></span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;