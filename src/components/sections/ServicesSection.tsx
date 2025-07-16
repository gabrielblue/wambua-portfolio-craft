import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  order_index: number;
  is_active: boolean;
}

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;

      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: 'Error',
        description: 'Failed to load services',
        variant: 'destructive'
      });
      
      // Fallback to static data
      setServices([
        {
          id: '1',
          name: "HTML",
          description: "I deliver high-quality solutions for web development. To begin, understanding client requirements is crucial; effective communication helps tailor HTML code to meet specific needs.",
          gradient: "bg-gradient-purple",
          icon: "💻",
          order_index: 1,
          is_active: true
        },
        {
          id: '2',
          name: "CSS",
          description: "I craft visually appealing and responsive designs for websites. Assessing client preferences and branding guidelines ensures a personalized approach.",
          gradient: "bg-gradient-green",
          icon: "🎨",
          order_index: 2,
          is_active: true
        },
        {
          id: '3',
          name: "JavaScript",
          description: "I create dynamic and interactive web experiences tailored to clients' functional requirements, ensuring engaging and responsive interfaces.",
          gradient: "bg-gradient-pink",
          icon: "⚡",
          order_index: 3,
          is_active: true
        },
        {
          id: '4',
          name: "React",
          description: "I build scalable, component-based user interfaces using React, ensuring seamless and maintainable front-end solutions for complex applications.",
          gradient: "bg-gradient-blue",
          icon: "⚛️",
          order_index: 4,
          is_active: true
        },
        {
          id: '5',
          name: "Mobile App Development",
          description: "I develop cross-platform mobile applications that deliver a seamless user experience on iOS and Android devices, using modern frameworks and tools.",
          gradient: "bg-gradient-purple",
          icon: "📱",
          order_index: 5,
          is_active: true
        },
        {
          id: '6',
          name: "Laravel",
          description: "I use Laravel to build secure and efficient backend solutions for web applications, focusing on scalability, reliability, and rapid development.",
          gradient: "bg-gradient-orange",
          icon: "🛠️",
          order_index: 6,
          is_active: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div id="services" className="bg-background py-12 sm:py-20">
        <section className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h6 className="font-bold uppercase mb-2 underline text-2xl sm:text-3xl text-foreground">
              Services.
            </h6>
            <h3 className="font-semibold text-xl sm:text-2xl md:text-3xl mb-4 text-foreground">
              Services Provided?
            </h3>
            <p className="max-w-xl mx-auto text-gray-text text-sm sm:text-base">
              Loading services...
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-card rounded-lg p-6 shadow-card">
                  <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-1"></div>
                  <div className="h-3 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div id="services" className="bg-background py-12 sm:py-20">
      <section className="container mx-auto px-4 sm:px-6 relative">
        {/* Title and Description */}
        <div className="text-center mb-12 sm:mb-16">
          <h6 className="font-bold uppercase mb-2 underline text-2xl sm:text-3xl text-foreground">
            Services.
          </h6>
          <h3 className="font-semibold text-xl sm:text-2xl md:text-3xl mb-4 text-foreground">
            Services Provided?
          </h3>
          <p className="max-w-xl mx-auto text-gray-text text-sm sm:text-base">
            I offer a wide range of services to help you achieve your goals. Whether you need assistance with website design, marketing, or anything in between, we've got you covered. Here are some of the services we provide:
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="group relative p-6 rounded-lg shadow-card hover:shadow-card-hover bg-card text-center transition-all duration-500 ease-in-out transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-full ${service.gradient} flex items-center justify-center mx-auto transition-transform duration-300 transform group-hover:scale-110 text-2xl`}>
                {service.icon}
              </div>
              <div className="mt-7">
                <h3 className="text-lg font-medium hover:text-blue-primary transition-colors text-card-foreground mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-text text-sm sm:text-base leading-relaxed line-clamp-4">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;