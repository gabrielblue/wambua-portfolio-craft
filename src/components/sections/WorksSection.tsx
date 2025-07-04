import alumniMockup from "@/assets/alumni-android-mockup.jpg";
import laravelMockup from "@/assets/laravel-project-mockup.jpg";
import nodejsMockup from "@/assets/nodejs-project-mockup.jpg";
import assignmentMockup from "@/assets/assignment-project-mockup.jpg";

const WorksSection = () => {
  const projects = [
    {
      title: "Alumni Android App",
      description: "Mobile application built with Kotlin for alumni networking and communication",
      image: alumniMockup,
      link: "https://github.com/gabrielblue/alumniandroid",
      tech: "Kotlin"
    },
    {
      title: "Laravel Web Application",
      description: "Full-stack web platform built with Laravel, PHP and Bootstrap",
      image: laravelMockup,
      link: "https://github.com/gabrielblue/Laravel-project",
      tech: "PHP, Laravel"
    },
    {
      title: "Node.js Backend API",
      description: "Server-side application with Express.js and registration system",
      image: nodejsMockup,
      link: "https://github.com/gabrielblue/Nodejs-",
      tech: "Node.js, JavaScript"
    },
    {
      title: "Frontend Assignment",
      description: "Responsive web development project showcasing HTML, CSS skills",
      image: assignmentMockup,
      link: "https://github.com/gabrielblue/assingment",
      tech: "HTML, CSS"
    }
  ];

  return (
    <div id="works" className="py-12 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col gap-3 items-center mb-12 sm:mb-16">
          <h1 className="font-bold underline text-2xl sm:text-3xl text-foreground">WORKS.</h1>
          <h1 className="text-2xl sm:text-3xl text-foreground font-semibold">Works & Projects</h1>
          <p className="w-full sm:w-3/4 lg:w-1/2 text-center text-gray-text text-sm sm:text-base">
            I help designers, small agencies, and businesses bring their ideas to life. Powered by Figma, VS Code, and coffee, I turn your requirements into well-designed websites.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-blue-primary text-white px-2 py-1 rounded-md text-xs font-medium">
                  {project.tech}
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                  <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm mb-4">{project.description}</p>
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-foreground px-4 py-2 rounded-md hover:bg-gray-100 transition-colors inline-block"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorksSection;