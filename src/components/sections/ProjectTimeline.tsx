import { useState, useEffect, useRef } from "react";
import { Calendar, Clock, CheckCircle, Circle, GitBranch } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  category: 'development' | 'design' | 'deployment' | 'planning';
}

const ProjectTimeline = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      title: 'Project Planning & Research',
      description: 'Initial project scope definition, technology stack selection, and user research.',
      date: '2024-01-15',
      status: 'completed',
      category: 'planning'
    },
    {
      id: '2',
      title: 'UI/UX Design Phase',
      description: 'Created wireframes, mockups, and interactive prototypes for the portfolio.',
      date: '2024-02-01',
      status: 'completed',
      category: 'design'
    },
    {
      id: '3',
      title: 'Frontend Development',
      description: 'Built responsive components using React, TypeScript, and Tailwind CSS.',
      date: '2024-02-20',
      status: 'completed',
      category: 'development'
    },
    {
      id: '4',
      title: 'Backend Integration',
      description: 'Implemented Supabase for database management and real-time features.',
      date: '2024-03-10',
      status: 'in-progress',
      category: 'development'
    },
    {
      id: '5',
      title: 'Advanced Features',
      description: 'Adding 3D portfolio viewer, GitHub integration, and security audits.',
      date: '2024-03-25',
      status: 'in-progress',
      category: 'development'
    },
    {
      id: '6',
      title: 'Testing & Optimization',
      description: 'Performance optimization, cross-browser testing, and bug fixes.',
      date: '2024-04-05',
      status: 'upcoming',
      category: 'development'
    },
    {
      id: '7',
      title: 'Deployment & Launch',
      description: 'Final deployment to production and project launch.',
      date: '2024-04-15',
      status: 'upcoming',
      category: 'deployment'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !timelineRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = container.offsetHeight;
      const scrollableHeight = sectionHeight - viewportHeight;

      let progress = 0;

      if (containerRect.top <= 0 && containerRect.bottom >= viewportHeight) {
        progress = Math.abs(containerRect.top) / scrollableHeight;
        progress = Math.max(0, Math.min(1, progress));
      } else if (containerRect.top < 0 && containerRect.bottom < viewportHeight) {
        progress = 1;
      }

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'planning': return 'from-purple-500 to-indigo-500';
      case 'design': return 'from-pink-500 to-rose-500';
      case 'development': return 'from-blue-500 to-cyan-500';
      case 'deployment': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'planning': return 'bg-purple-500';
      case 'design': return 'bg-pink-500';
      case 'development': return 'bg-blue-500';
      case 'deployment': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />;
      case 'upcoming': return <Circle className="h-5 w-5 text-gray-400" />;
      default: return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const timelineHeight = timelineEvents.length * 100;

  return (
    <div
      id="timeline"
      ref={containerRef}
      className="relative bg-background"
      style={{ height: `${timelineHeight}vh` }}
    >
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-full animate-bounce" style={{ animationDuration: '4s' }}></div>
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/20 py-4">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Project Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Follow the journey of this portfolio's development from conception to deployment
          </p>
        </div>
      </div>

      {/* Timeline cards */}
      <div
        ref={timelineRef}
        className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-6"
      >
        <div className="w-full max-w-4xl relative">
          <div className="relative">
            {timelineEvents.map((event, index) => {
              const itemProgress = scrollProgress * timelineEvents.length;
              const cardProgress = Math.max(0, Math.min(1, itemProgress - index));
              const translateY = (1 - cardProgress) * 50;
              const scale = 0.95 + (cardProgress * 0.05);
              const zIndex = index;

              return (
                <div
                  key={event.id}
                  className="absolute inset-0 transition-all duration-300 ease-out"
                  style={{
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    zIndex,
                  }}
                >
                  <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl border border-border/50 hover:border-primary/30 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row items-start gap-6">
                      <div className="flex-shrink-0 relative mx-auto lg:mx-0">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getCategoryColor(event.category)} p-0.5 shadow-lg`}>
                          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                            {getStatusIcon(event.status)}
                          </div>
                        </div>
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getCategoryColor(event.category)} opacity-20 animate-pulse`}></div>
                      </div>

                      <div className="flex-1 text-center lg:text-left">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                          <h3 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-2 lg:mb-0">
                            {event.title}
                          </h3>
                          <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                          {event.description}
                        </p>

                        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-4">
                          <span className={`px-4 py-2 rounded-full text-sm font-medium text-white ${getCategoryBadgeColor(event.category)}`}>
                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                          </span>

                          <div className="flex items-center gap-2">
                            <GitBranch className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground capitalize">
                              {event.status.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="fixed bottom-8 left-8 bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm z-20 animate-bounce">
        Scroll to explore timeline
      </div>
    </div>
  );
};

export default ProjectTimeline;