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
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [hasStartedAnimation, setHasStartedAnimation] = useState(false);
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

      // Calculate when the timeline section is in view
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      
      // Start animation when section enters viewport
      const startOffset = viewportHeight * 0.7;
      const endOffset = viewportHeight * 0.1;

      if (containerTop <= startOffset && containerTop >= -containerHeight + endOffset) {
        if (!hasStartedAnimation) {
          setHasStartedAnimation(true);
        }

        // Calculate progress through the timeline section
        const totalScrollDistance = containerHeight - viewportHeight + startOffset + endOffset;
        const currentScrollDistance = Math.max(0, startOffset - containerTop);
        const progress = Math.min(1, currentScrollDistance / totalScrollDistance);
        
        setScrollProgress(progress);

        // Calculate which item should be active based on scroll progress
        const totalItems = timelineEvents.length;
        const itemProgress = progress * totalItems;
        const currentIndex = Math.min(Math.floor(itemProgress), totalItems - 1);
        setActiveIndex(currentIndex);

        // Check if animation is complete (all items have been shown)
        if (progress >= 0.95 && currentIndex >= totalItems - 1) {
          setIsAnimationComplete(true);
        }
      } else if (containerTop > startOffset) {
        // Reset animation when scrolling back up
        setHasStartedAnimation(false);
        setScrollProgress(0);
        setActiveIndex(0);
        setIsAnimationComplete(false);
      }
    };

    // Prevent scrolling past timeline until animation is complete
    const preventScroll = (e: WheelEvent) => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const isInTimelineSection = containerRect.top <= window.innerHeight * 0.7 && 
                                 containerRect.bottom >= window.innerHeight * 0.3;
      
      if (isInTimelineSection && !isAnimationComplete && e.deltaY > 0) {
        e.preventDefault();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', preventScroll, { passive: false });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', preventScroll);
    };
  }, [hasStartedAnimation, isAnimationComplete, timelineEvents.length]);

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
      case 'completed': return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 animate-pulse" />;
      case 'upcoming': return <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />;
      default: return <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />;
    }
  };

  const getItemTransform = (index: number) => {
    if (!hasStartedAnimation) {
      return {
        opacity: 0,
        transform: 'translateY(60px) scale(0.9)',
        zIndex: index
      };
    }

    const progress = scrollProgress * timelineEvents.length;
    const itemProgress = Math.max(0, Math.min(1, progress - index));
    
    if (itemProgress === 0) {
      return {
        opacity: 0,
        transform: 'translateY(60px) scale(0.9)',
        zIndex: index
      };
    }
    
    if (itemProgress < 1) {
      const easeOut = 1 - Math.pow(1 - itemProgress, 3);
      return {
        opacity: easeOut,
        transform: `translateY(${(1 - easeOut) * 60}px) scale(${0.9 + easeOut * 0.1})`,
        zIndex: timelineEvents.length - index
      };
    }
    
    // Item is fully visible, slight fade for completed items
    const overlapProgress = Math.max(0, progress - index - 1);
    const overlapEase = Math.min(1, overlapProgress * 0.5);
    
    return {
      opacity: Math.max(0.7, 1 - overlapEase * 0.3),
      transform: `translateY(${-overlapEase * 20}px) scale(${1 - overlapEase * 0.05})`,
      zIndex: timelineEvents.length - index - Math.floor(overlapEase * 5)
    };
  };

  return (
    <div 
      id="timeline" 
      ref={containerRef}
      className="min-h-[300vh] bg-background relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-4 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-full animate-bounce" style={{ animationDuration: '4s' }}></div>
      </div>

      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/20 py-4 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            Project Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Follow the journey of this portfolio's development from conception to deployment
          </p>
          
          {/* Progress indicator */}
          <div className="mt-4 sm:mt-6 max-w-xs sm:max-w-md mx-auto">
            <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${scrollProgress * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Start</span>
              <span>{Math.round(scrollProgress * 100)}%</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Animation status indicator */}
          {hasStartedAnimation && (
            <div className="mt-4 text-xs sm:text-sm text-muted-foreground">
              {isAnimationComplete ? (
                <span className="text-green-500 font-medium">✓ Timeline Complete - Continue Scrolling</span>
              ) : (
                <span className="animate-pulse">Scroll to reveal timeline...</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Timeline items container */}
      <div 
        ref={timelineRef}
        className="sticky top-20 sm:top-32 h-[calc(100vh-5rem)] sm:h-[calc(100vh-8rem)] flex items-center justify-center px-4 sm:px-6"
      >
        <div className="relative w-full max-w-xs sm:max-w-2xl lg:max-w-4xl">
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
                <div className="w-full max-w-sm sm:max-w-xl lg:max-w-2xl">
                  <div className="bg-card/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-border/50 hover:border-primary/30 transition-all duration-300">
                    {/* Timeline dot and content */}
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                      <div className="flex-shrink-0 relative mx-auto sm:mx-0">
                        <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${getCategoryColor(event.category)} p-0.5 shadow-lg`}>
                          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                            {getStatusIcon(event.status)}
                          </div>
                        </div>
                        {/* Glow effect */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getCategoryColor(event.category)} opacity-20 animate-pulse`}></div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-card-foreground mb-2 sm:mb-0">
                            {event.title}
                          </h3>
                          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base lg:text-lg">
                          {event.description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3">
                          <span className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r ${getCategoryColor(event.category)} text-white`}>
                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <GitBranch className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                            <span className="text-xs sm:text-sm text-muted-foreground capitalize">
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
      <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-border/50 z-50">
        <span className="text-xs sm:text-sm font-medium">
          {Math.min(activeIndex + 1, timelineEvents.length)} / {timelineEvents.length}
        </span>
      </div>

      {/* Scroll hint for mobile */}
      {hasStartedAnimation && !isAnimationComplete && (
        <div className="fixed bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-40 sm:hidden">
          <div className="bg-primary/90 text-primary-foreground px-3 py-2 rounded-full text-xs animate-bounce">
            Keep scrolling to reveal timeline
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTimeline;