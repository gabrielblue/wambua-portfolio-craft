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
  const [activeIndex, setActiveIndex] = useState(0);
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
      
      // Calculate progress based on viewport position
      const startOffset = viewportHeight * 0.2; // Start animation when 20% into viewport
      const endOffset = viewportHeight * 0.8;   // End animation when 80% through viewport

      let progress = 0;
      let currentIndex = 0;

      if (containerRect.top <= startOffset && containerRect.bottom >= endOffset) {
        // Calculate progress within the visible area
        const visibleProgress = (startOffset - containerRect.top) / (containerRect.height - viewportHeight + startOffset - endOffset);
        progress = Math.max(0, Math.min(1, visibleProgress));
        
        // Calculate which card should be active
        currentIndex = Math.floor(progress * timelineEvents.length);
        currentIndex = Math.max(0, Math.min(timelineEvents.length - 1, currentIndex));
      } else if (containerRect.bottom < endOffset) {
        progress = Math.max(0, Math.min(1, progress));
        currentIndex = timelineEvents.length - 1;
      } else if (containerRect.top > startOffset) {
        progress = 1;
        currentIndex = timelineEvents.length - 1;
      }

      setScrollProgress(progress);
      setActiveIndex(currentIndex);
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
      style={{ height: `${Math.max(timelineHeight, 400)}vh` }}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-full animate-bounce" style={{ animationDuration: '4s' }}></div>
      </div>

      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/20 py-6 mb-12">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Project Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Follow the journey of this portfolio's development from conception to deployment
          </p>
          
          {/* Progress indicator */}
          <div className="mt-4 max-w-md mx-auto">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Step {activeIndex + 1}</span>
              <span>{timelineEvents.length} Steps</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((activeIndex + 1) / timelineEvents.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline cards */}
      <div
        ref={timelineRef}
        className="sticky top-32 h-[70vh] flex items-center justify-center px-4 sm:px-6 z-20"
      >
        <div className="w-full max-w-4xl relative">
          <div className="relative h-full flex items-center">
            {timelineEvents.map((event, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;
              const isFuture = index > activeIndex;
              
              let translateX = 0;
              let translateY = 0;
              let scale = 0.85;
              let opacity = 0.3;
              let zIndex = 1;
              
              if (isActive) {
                translateX = 0;
                translateY = 0;
                scale = 1;
                opacity = 1;
                zIndex = 10;
              } else if (isPast) {
                translateX = -100;
                translateY = -20;
                scale = 0.8;
                opacity = 0.4;
                zIndex = 5;
              } else if (isFuture) {
                translateX = 100;
                translateY = 20;
                scale = 0.8;
                opacity = 0.4;
                zIndex = 5;
              }

              return (
                <div
                  key={event.id}
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                >
                  <div className={`bg-card/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl border transition-all duration-700 ${
                    isActive ? 'border-primary/50 shadow-primary/20' : 'border-border/50'
                  }`}>
                    <div className="flex flex-col lg:flex-row items-start gap-6">
                      <div className="flex-shrink-0 relative mx-auto lg:mx-0">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getCategoryColor(event.category)} p-0.5 shadow-lg`}>
                          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                            {getStatusIcon(event.status)}
                          </div>
                        </div>
                        {isActive && (
                          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getCategoryColor(event.category)} opacity-20 animate-pulse`}></div>
                        )}
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

      {/* Navigation hints */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-background/90 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3 z-30">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Scroll to navigate timeline</span>
          <div className="flex gap-1">
            {timelineEvents.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;