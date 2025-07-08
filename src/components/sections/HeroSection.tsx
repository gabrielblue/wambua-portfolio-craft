import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="home" className="min-h-screen bg-background relative flex flex-col pt-16 sm:pt-20 lg:pt-24">
      {/* Profile Section */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center py-8 sm:py-12 lg:py-24 px-4 sm:px-6">
        
        {/* Profile Text */}
        <div className="text-center lg:text-left lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            A SOFTWARE DEVELOPER.
          </h1>
          <div className="bg-card p-4 sm:p-6 mt-6 rounded-md shadow-card max-w-lg mx-auto lg:mx-0">
            <h2 className="text-2xl sm:text-3xl font-semibold text-card-foreground mb-4">I'm Gabriel Wambua</h2>
            <p className="text-gray-text mb-6 text-sm sm:text-base leading-relaxed">
              With a certificate of experience in web design and development. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quo provident, facere minus temporibus veniam nostrum reprehenderit nihil?
            </p>
            <Button 
              onClick={scrollToContact}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Book Me
            </Button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center lg:w-1/2">
          <img 
            src="/lovable-uploads/ae4433c6-0075-40ab-9f71-f662228b2478.png" 
            alt="Gabriel Wambua - Software Developer" 
            className="rounded-lg shadow-card-hover w-48 sm:w-60 lg:w-80 h-auto transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;