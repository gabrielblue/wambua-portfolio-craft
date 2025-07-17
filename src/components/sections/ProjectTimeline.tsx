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
  const [activeIndex, setActiveIndex] = useState(0);
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
      const timeline = timelineRef.current;
      const containerRect = container.getBoundingClientRect();
      const timelineRect = timeline.getBoundingClientRect();

      // Calculate scroll progress within the timeline section
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const viewportHeight = window.innerHeight;

      // Start animation when section enters viewport
      const startOffset = viewportHeight * 0.8;
      const endOffset = viewportHeight * 0.2;

      if (containerTop <= startOffset && containerTop >= -containerHeight + endOffset) {
        // Calculate progress (0 to 1)
        const progress = Math.max(0, Math.min(1, (startOffset - containerTop) / (containerHeight - endOffset + startOffset)));
        setScrollProgress(progress);

        // Calculate which item should be active based on scroll progress
        const totalItems = timelineEvents.length;
        const currentIndex = Math.min(Math.floor(progress * totalItems), totalItems - 1);
        setActiveIndex(currentIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [timelineEvents.length]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'planning': return 'from-purple-500 to-indigo-500';
      case 'design': return 'from-pink-500 to-rose-500';
      case 'development': return 'from-blue-500 to-cyan-500';
      case 'deployment': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-slate-500';
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

  const getItemTransform = (index: number) => {
    const progress = scrollProgress * timelineEvents.length;
    const itemProgress = Math.max(0, Math.min(1, progress - index));
    
    if (itemProgress === 0) {
      return {
        opacity: 0,
        transform: 'translateY(100px) scale(0.8)',
        zIndex: index
      };
    }
    
    if (itemProgress < 1) {
      const easeOut = 1 - Math.pow(1 - itemProgress, 3);
      return {
        opacity: easeOut,
        transform: `translateY(${(1 - easeOut) * 100}px) scale(${0.8 + easeOut * 0.2})`,
        zIndex: timelineEvents.length - index
      };
    }
    
    // Item is fully visible, start moving it up and scaling down for overlap effect
    const overlapProgress = Math.max(0, progress - index - 1);
    const overlapEase = Math.min(1, overlapProgress * 2);
    
    return {
      opacity: Math.max(0.3, 1 - overlapProgress * 0.7),
      transform: `translateY(${-overlapEase * 50}px) scale(${1 - overlapEase * 0.1})`,
      zIndex: timelineEvents.length - index - Math.floor(overlapEase * 10)
    };
  };

  return (
    <div 
      id="timeline" 
      ref={containerRef}
      className="min-h-[400vh] bg-background relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-full animate-bounce" style={{ animationDuration: '4s' }}></div>
      </div>

      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20 py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Project Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow the journey of this portfolio's development from conception to deployment
          </p>
          
          {/* Progress indicator */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${scrollProgress * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Start</span>
              <span>{Math.round(scrollProgress * 100)}%</span>
              <span>Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline items container */}
      <div 
        ref={timelineRef}
        className="sticky top-32 h-[calc(100vh-8rem)] flex items-center justify-center px-4 sm:px-6"
      >
        <div className="relative w-full max-w-4xl">
          {timelineEvents.map((event, index) => {
            const itemStyle = getItemTransform(index);
            
            return (
              <div
                key={event.id}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: itemStyle.opacity,
                  transform: itemStyle.transform,
                  zIndex: itemStyle.zIndex,
                  transition: 'none' // Smooth scroll-driven animation
                }}
              >
                <div className="w-full max-w-2xl">
                  <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-border/50 hover:border-primary/30 transition-all duration-300">
                    {/* Timeline dot and line */}
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 relative">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getCategoryColor(event.category)} p-0.5 shadow-lg`}>
                          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                            {getStatusIcon(event.status)}
                          </div>
                        </div>
                        {/* Glow effect */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getCategoryColor(event.category)} opacity-20 animate-pulse`}></div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-2xl font-bold text-card-foreground">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                          {event.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${getCategoryColor(event.category)} text-white`}>
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Item counter */}
      <div className="fixed bottom-8 right-8 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50 z-50">
        <span className="text-sm font-medium">
          {Math.min(activeIndex + 1, timelineEvents.length)} / {timelineEvents.length}
        </span>
      </div>
    </div>
  );
};

export default ProjectTimeline;