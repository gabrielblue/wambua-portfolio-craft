import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, ExternalLink, Github, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Project3D {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
}

const Portfolio3DViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const projects: Project3D[] = [
    {
      id: '1',
      title: 'Alumni Android App',
      description: 'A comprehensive mobile application built with Kotlin for alumni networking, featuring real-time messaging, event management, and professional networking capabilities.',
      image: '/src/assets/alumni-android-mockup.jpg',
      technologies: ['Kotlin', 'Android', 'Firebase', 'Material Design'],
      githubUrl: 'https://github.com/gabrielblue/alumniandroid',
      category: 'Mobile Development'
    },
    {
      id: '2',
      title: 'Laravel Web Platform',
      description: 'Full-stack web application built with Laravel and PHP, featuring user authentication, admin dashboard, and responsive design with Bootstrap.',
      image: '/src/assets/laravel-project-mockup.jpg',
      technologies: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
      githubUrl: 'https://github.com/gabrielblue/Laravel-project',
      category: 'Web Development'
    },
    {
      id: '3',
      title: 'Node.js API Server',
      description: 'Robust backend API built with Node.js and Express, featuring user registration, authentication, and RESTful endpoints for modern web applications.',
      image: '/src/assets/nodejs-project-mockup.jpg',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      githubUrl: 'https://github.com/gabrielblue/Nodejs-',
      category: 'Backend Development'
    },
    {
      id: '4',
      title: 'Frontend Assignment',
      description: 'Responsive web development project showcasing modern HTML5 and CSS3 techniques, with focus on accessibility and cross-browser compatibility.',
      image: '/src/assets/assignment-project-mockup.jpg',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      githubUrl: 'https://github.com/gabrielblue/assingment',
      category: 'Frontend Development'
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const currentProject = projects[currentIndex];

  const get3DTransform = () => {
    const rotateX = (mousePosition.y - 0.5) * 10;
    const rotateY = (mousePosition.x - 0.5) * -10;
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  return (
    <div id="portfolio-3d" className="py-16 bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full animate-bounce" style={{ animationDuration: '8s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            3D Portfolio Viewer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my projects in an immersive 3D environment with interactive previews
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div 
            ref={containerRef}
            className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'h-[600px]'} rounded-2xl overflow-hidden`}
          >
            {/* Main 3D viewer */}
            <div className="relative h-full flex items-center justify-center p-8">
              <div 
                className="relative w-full max-w-4xl transition-transform duration-300 ease-out"
                style={{ transform: get3DTransform() }}
              >
                {/* Project image with 3D effect */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl transform scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-80 object-cover rounded-xl shadow-2xl border border-border/20"
                  />
                  
                  {/* Overlay with project info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        {currentProject.githubUrl && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => window.open(currentProject.githubUrl, '_blank')}
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </Button>
                        )}
                        {currentProject.liveUrl && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => window.open(currentProject.liveUrl, '_blank')}
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setIsFullscreen(!isFullscreen)}
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                        >
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 border-primary/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 border-primary/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Project counter */}
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm">
              {currentIndex + 1} / {projects.length}
            </div>
          </div>

          {/* Project details */}
          <div className="mt-8 bg-card rounded-xl p-6 shadow-lg border border-border/50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  {currentProject.title}
                </h3>
                <Badge variant="secondary" className="mb-3">
                  {currentProject.category}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Interactive Preview</span>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {currentProject.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {currentProject.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Project thumbnails */}
          <div className="flex justify-center gap-4 mt-8">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-20 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? 'ring-2 ring-primary scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio3DViewer;