import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import userProfileImage from "@/assets/user-profile.jpg";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full bg-blue-light py-3 shadow-lg fixed top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        {/* Brand and Name */}
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl font-bold text-foreground">Gabriel Wambua.</span>
        </div>
        
        {/* Navigation Links - Desktop */}
        <ul className="hidden md:flex space-x-6 text-gray-text font-semibold uppercase text-sm">
          <li>
            <button 
              onClick={() => scrollToSection('home')} 
              className="hover:text-foreground transition-colors"
            >
              Homepage
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('about')} 
              className="hover:text-foreground transition-colors"
            >
              About Me
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('services')} 
              className="hover:text-foreground transition-colors"
            >
              Services
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('works')} 
              className="hover:text-foreground transition-colors"
            >
              Works
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Profile Picture */}
        <div className="hidden md:block">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
            <AvatarImage src={userProfileImage} alt="Gabriel Wambua" />
            <AvatarFallback>GW</AvatarFallback>
          </Avatar>
        </div>

        {/* Hamburger Menu - Mobile */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-foreground hover:text-gray-text transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-light border-t border-gray-light">
          {/* Profile Picture in Mobile Menu */}
          <div className="flex justify-center py-3 border-b border-gray-light">
            <Avatar className="h-12 w-12">
              <AvatarImage src={userProfileImage} alt="Gabriel Wambua" />
              <AvatarFallback>GW</AvatarFallback>
            </Avatar>
          </div>
          <ul className="flex flex-col py-4 px-6 space-y-3">
            <li>
              <button 
                onClick={() => scrollToSection('home')} 
                className="block text-gray-text hover:text-foreground font-semibold uppercase text-sm transition-colors"
              >
                Homepage
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('about')} 
                className="block text-gray-text hover:text-foreground font-semibold uppercase text-sm transition-colors"
              >
                About Me
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('services')} 
                className="block text-gray-text hover:text-foreground font-semibold uppercase text-sm transition-colors"
              >
                Services
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('works')} 
                className="block text-gray-text hover:text-foreground font-semibold uppercase text-sm transition-colors"
              >
                Works
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block text-gray-text hover:text-foreground font-semibold uppercase text-sm transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;