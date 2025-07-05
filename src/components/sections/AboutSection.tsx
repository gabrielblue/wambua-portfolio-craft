import { useEffect, useRef, useState } from "react";

const AboutSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const index = parseInt(target.dataset.index || "0");
            
            // Staggered animation with delays
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, index * 200);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    const elements = [aboutRef.current, experienceRef.current, educationRef.current, sloganRef.current];
    elements.forEach((el, index) => {
      if (el) {
        el.dataset.index = index.toString();
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = (index: number) => {
    return visibleItems.includes(index) 
      ? "opacity-100 translate-y-0" 
      : "opacity-30 translate-y-4";
  };

  return (
    <div id="about" className="px-4 sm:px-6 lg:px-10 bg-background py-16 sm:py-24" ref={sectionRef}>
      <div className="container mx-auto">
        {/* Main About Me Section - Similar to "Why Humanoid" */}
        <div 
          ref={aboutRef}
          className={`relative rounded-2xl bg-gradient-blue p-8 sm:p-12 lg:p-16 mb-12 sm:mb-16 transition-all duration-1000 ease-out ${getAnimationClass(0)}`}
        >
          <div className="absolute inset-0 bg-gradient-blue opacity-90 rounded-2xl"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8">
              About Me
            </h1>
            <p className="text-white/90 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto">
              I design and build digital products that bring visions to life. 
              With over 2+ years of experience across frontend and backend development, 
              I create cutting-edge solutions that blend innovation with exceptional user experiences.
            </p>
          </div>
          <div className="absolute -inset-1 bg-gradient-blue opacity-20 rounded-2xl blur-xl -z-10"></div>
        </div>

        {/* Cards Section with Sequential Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Experience Card */}
          <div 
            ref={experienceRef}
            className={`group relative overflow-hidden rounded-2xl bg-card shadow-card p-8 transform transition-all duration-1000 ease-out hover:-translate-y-3 hover:shadow-card-hover ${getAnimationClass(1)}`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-blue"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl font-bold">2+</span>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Experience</h3>
              <p className="text-gray-text text-base leading-relaxed">
                2+ years of professional development experience in frontend and backend technologies, 
                creating scalable and user-focused applications.
              </p>
            </div>
          </div>

          {/* Education Card */}
          <div 
            ref={educationRef}
            className={`group relative overflow-hidden rounded-2xl bg-card shadow-card p-8 transform transition-all duration-1000 ease-out hover:-translate-y-3 hover:shadow-card-hover ${getAnimationClass(2)}`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-green"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-green flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">🎓</span>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Education</h3>
              <p className="text-gray-text text-base leading-relaxed">
                Certificate and Diploma in Software Development, 
                providing a strong foundation in programming principles and modern development practices.
              </p>
            </div>
          </div>

          {/* Philosophy Card */}
          <div 
            ref={sloganRef}
            className={`group relative overflow-hidden rounded-2xl bg-card shadow-card p-8 transform transition-all duration-1000 ease-out hover:-translate-y-3 hover:shadow-card-hover md:col-span-2 lg:col-span-1 ${getAnimationClass(3)}`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-purple"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-purple flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 animate-pulse">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Philosophy</h3>
              <p className="text-gray-text text-base leading-relaxed">
                "Elevate Your Online Presence with Unique Designs" - 
                Every project is an opportunity to create something extraordinary and impactful.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;