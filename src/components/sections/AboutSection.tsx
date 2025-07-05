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
      : "opacity-0 translate-y-8";
  };

  return (
    <div id="about" className="px-4 sm:px-6 lg:px-10 bg-background py-12 sm:py-16" ref={sectionRef}>
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left Side: About Me Text with Animation */}
        <div 
          ref={aboutRef}
          className={`lg:w-1/2 flex flex-col gap-6 transition-all duration-700 ease-out ${getAnimationClass(0)}`}
        >
          <div className="relative">
            <h1 className="font-bold underline text-2xl sm:text-3xl text-center lg:text-left text-foreground">
              ABOUT ME.
            </h1>
            <div className="absolute -inset-2 bg-gradient-blue/10 rounded-lg -z-10 animate-pulse"></div>
          </div>
          <p className="text-gray-text text-base sm:text-lg leading-relaxed text-center lg:text-left">
            I design and build digital products. I'm a multi-disciplinary maker with over 5 years of experience across a wide range of design disciplines. As a web designer, my prowess in crafting digital landscapes is commendable. I have a keen eye for aesthetics and attention to detail that shines through in every project.
            <br /><br />
            My skill in translating clients' visions into reality is exceptional. My work remains cutting-edge and relevant, with a portfolio showcasing a diverse range of projects that highlight adaptability and innovation.
          </p>
        </div>

        {/* Right Side: Cards with Sequential Animation */}
        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Experience Card */}
          <div 
            ref={experienceRef}
            className={`flex flex-col gap-4 rounded-md shadow-card bg-card p-6 sm:p-8 transform transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-card-hover hover:scale-105 ${getAnimationClass(1)}`}
          >
            <div className="relative">
              <h1 className="text-xl sm:text-2xl font-bold text-card-foreground text-center">Experience</h1>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-blue rounded-full"></div>
            </div>
            <p className="text-gray-text text-center text-sm sm:text-base">
              2+ years<br />Frontend and Backend Development.
            </p>
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-blue flex items-center justify-center">
                <span className="text-white text-sm font-bold">2+</span>
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div 
            ref={educationRef}
            className={`flex flex-col gap-4 rounded-md shadow-card bg-card p-6 sm:p-8 transform transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-card-hover hover:scale-105 ${getAnimationClass(2)}`}
          >
            <div className="relative">
              <h1 className="text-xl sm:text-2xl font-bold text-card-foreground text-center">Education</h1>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-green rounded-full"></div>
            </div>
            <p className="text-gray-text text-center text-sm sm:text-base">
              Certificate in Software Development.<br />Diploma in Software Development.
            </p>
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-green flex items-center justify-center">
                <span className="text-white text-sm font-bold">🎓</span>
              </div>
            </div>
          </div>

          {/* Slogan Card */}
          <div 
            ref={sloganRef}
            className={`flex flex-col gap-4 rounded-md shadow-card bg-card p-6 sm:p-8 transform transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-card-hover hover:scale-105 sm:col-span-2 lg:col-span-1 ${getAnimationClass(3)}`}
          >
            <div className="relative">
              <h1 className="text-xl sm:text-2xl font-bold text-card-foreground text-center">My Slogan</h1>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-purple rounded-full"></div>
            </div>
            <p className="text-gray-text text-center text-sm sm:text-base leading-relaxed">
              Elevate Your Online Presence with<br />Our Unique Designs.
            </p>
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-purple flex items-center justify-center animate-bounce">
                <span className="text-white text-sm font-bold">✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;