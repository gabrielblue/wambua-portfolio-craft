import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="home" className="min-h-screen bg-background relative flex flex-col pt-16 sm:pt-20 lg:pt-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-blue/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-purple/5 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-green/10 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
      </div>
      
      {/* Profile Section */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center py-8 sm:py-12 lg:py-24 px-4 sm:px-6">
        
        {/* Profile Text */}
        <div className="text-center lg:text-left lg:w-1/2 mb-8 lg:mb-0 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight transform transition-all duration-1000 hover:scale-105 hover:text-primary">
            A SOFTWARE DEVELOPER.
          </h1>
          <div className="bg-card p-4 sm:p-6 mt-6 rounded-md shadow-card max-w-lg mx-auto lg:mx-0 transform transition-all duration-500 hover:scale-105 hover:shadow-card-hover group">
            <h2 className="text-2xl sm:text-3xl font-semibold text-card-foreground mb-4 group-hover:text-primary transition-colors duration-300">I'm Gabriel Wambua</h2>
            <p className="text-gray-text mb-6 text-sm sm:text-base leading-relaxed group-hover:text-foreground transition-colors duration-300">
              With a certificate of experience in web design and development. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quo provident, facere minus temporibus veniam nostrum reprehenderit nihil?
            </p>
            <Button 
              onClick={scrollToContact}
              variant="secondary"
              className="w-full sm:w-auto transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1 group-hover:bg-primary group-hover:text-white"
            >
              Book Me
            </Button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center lg:w-1/2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="relative group">
            <img 
              src="/lovable-uploads/ae4433c6-0075-40ab-9f71-f662228b2478.png" 
              alt="Gabriel Wambua - Software Developer" 
              className="rounded-lg shadow-card-hover w-48 sm:w-60 lg:w-80 h-auto transition-all duration-500 hover:scale-110 hover:rotate-2 group-hover:shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
            <div className="absolute -inset-4 bg-gradient-blue/10 rounded-xl opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500 -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;