import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Work {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string;
  github_url?: string;
  live_url?: string;
  category: string;
  order_index: number;
  is_featured: boolean;
  is_active: boolean;
}

const WorksSection = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;

      setWorks(data || []);
    } catch (error) {
      console.error('Error fetching works:', error);
      toast({
        title: 'Error',
        description: 'Failed to load projects',
        variant: 'destructive'
      });
      
      // Fallback to static data
      setWorks([
        {
          id: '1',
          title: "Alumni Android App",
          description: "Mobile application built with Kotlin for alumni networking and communication",
          image_url: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800",
          tech_stack: "Kotlin",
          github_url: "https://github.com/gabrielblue/alumniandroid",
          category: "Mobile Development",
          order_index: 1,
          is_featured: true,
          is_active: true
        },
        {
          id: '2',
          title: "Laravel Web Application",
          description: "Full-stack web platform built with Laravel, PHP and Bootstrap",
          image_url: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800",
          tech_stack: "PHP, Laravel",
          github_url: "https://github.com/gabrielblue/Laravel-project",
          category: "Web Development",
          order_index: 2,
          is_featured: true,
          is_active: true
        },
        {
          id: '3',
          title: "Node.js Backend API",
          description: "Server-side application with Express.js and registration system",
          image_url: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
          tech_stack: "Node.js, JavaScript",
          github_url: "https://github.com/gabrielblue/Nodejs-",
          category: "Backend Development",
          order_index: 3,
          is_featured: false,
          is_active: true
        },
        {
          id: '4',
          title: "Frontend Assignment",
          description: "Responsive web development project showcasing HTML, CSS skills",
          image_url: "https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800",
          tech_stack: "HTML, CSS",
          github_url: "https://github.com/gabrielblue/assingment",
          category: "Frontend Development",
          order_index: 4,
          is_featured: false,
          is_active: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div id="works" className="py-12 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-3 items-center mb-12 sm:mb-16">
            <h1 className="font-bold underline text-2xl sm:text-3xl text-foreground">WORKS.</h1>
            <h1 className="text-2xl sm:text-3xl text-foreground font-semibold">Works & Projects</h1>
            <p className="w-full sm:w-3/4 lg:w-1/2 text-center text-gray-text text-sm sm:text-base">
              Loading projects...
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-card rounded-2xl overflow-hidden shadow-card">
                  <div className="aspect-video bg-muted"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          {works.map((work, index) => (
            <div 
              key={work.id}
              className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={work.image_url} 
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
                <div className="absolute top-2 right-2 bg-blue-primary text-white px-2 py-1 rounded-md text-xs font-medium">
                  {work.tech_stack}
                </div>
                {work.is_featured && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                  <h3 className="font-semibold text-lg mb-2">{work.title}</h3>
                  <p className="text-sm mb-4">{work.description}</p>
                  <div className="flex gap-2 justify-center">
                    {work.github_url && (
                      <a 
                        href={work.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-foreground px-4 py-2 rounded-md hover:bg-gray-100 transition-colors inline-block text-sm"
                      >
                        View on GitHub
                      </a>
                    )}
                    {work.live_url && (
                      <a 
                        href={work.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors inline-block text-sm"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
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