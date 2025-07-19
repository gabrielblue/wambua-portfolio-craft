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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [hasStartedAnimation, setHasStartedAnimation] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Start animation when section enters viewport
      const startOffset = viewportHeight * 0.8;

      if (containerRect.top <= startOffset && containerRect.bottom >= 0) {
        if (!hasStartedAnimation) {
          setHasStartedAnimation(true);
          // Start the timeline progression
          startTimelineProgression();
        }
      } else if (containerRect.top > startOffset) {
        // Reset when scrolling back up
        setHasStartedAnimation(false);
        setCurrentIndex(0);
        setIsAnimationComplete(false);
      }
    };

    // Prevent scrolling past timeline until animation is complete
    const preventScroll = (e: WheelEvent) => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const isInTimelineSection = containerRect.top <= window.innerHeight * 0.2 && 
                                 containerRect.bottom >= window.innerHeight * 0.8;
      
      if (isInTimelineSection && !isAnimationComplete && e.deltaY > 0) {
        e.preventDefault();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', preventScroll, { passive: false });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', preventScroll);
    };
  }, [hasStartedAnimation, isAnimationComplete]);

  const startTimelineProgression = () => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < timelineEvents.length - 1) {
        index++;
        setCurrentIndex(index);
      } else {
        clearInterval(interval);
        // Add a small delay before allowing scroll
        setTimeout(() => {
          setIsAnimationComplete(true);
        }, 1000);
      }
    }, 2000); // 2 seconds per slide
  };

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

  const currentEvent = timelineEvents[currentIndex];

  return (
    <div 
      id="timeline" 
      ref={containerRef}
      className="h-screen bg-background relative overflow-hidden flex flex-col"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-full animate-bounce" style={{ animationDuration: '4s' }}></div>
      </div>

      {/* Header section */}
      <div className="flex-shrink-0 pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Project Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Follow the journey of this portfolio's development from conception to deployment
          </p>
          
          {/* Progress indicator */}
          <div className="max-w-md mx-auto mb-4">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentIndex + 1) / timelineEvents.length * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>Start</span>
              <span>{Math.round((currentIndex + 1) / timelineEvents.length * 100)}%</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Status indicator */}
          <div className="text-sm text-muted-foreground">
            {hasStartedAnimation ? (
              isAnimationComplete ? (
                <span className="text-green-500 font-medium">✓ Timeline Complete - Continue Scrolling</span>
              ) : (
                <span className="animate-pulse">Timeline in progress...</span>
              )
            ) : (
              <span>Scroll down to start the timeline</span>
            )}
          </div>
        </div>
      </div>

      {/* Main timeline content - centered */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-4xl">
          {hasStartedAnimation && (
            <div 
              className="transform transition-all duration-700 ease-out"
              style={{
                opacity: hasStartedAnimation ? 1 : 0,
                transform: hasStartedAnimation ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.95)'
              }}
            >
              {/* Timeline card */}
              <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 mx-auto max-w-3xl">
                <div className="flex flex-col lg:flex-row items-start gap-6">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 relative mx-auto lg:mx-0">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getCategoryColor(currentEvent.category)} p-0.5 shadow-lg`}>
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                        {getStatusIcon(currentEvent.status)}
                      </div>
                    </div>
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getCategoryColor(currentEvent.category)} opacity-20 animate-pulse`}></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <h3 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-2 lg:mb-0">
                        {currentEvent.title}
                      </h3>
                      <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(currentEvent.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                      {currentEvent.description}
                    </p>

                    <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium text-white ${getCategoryBadgeColor(currentEvent.category)}`}>
                        {currentEvent.category.charAt(0).toUpperCase() + currentEvent.category.slice(1)}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground capitalize">
                          {currentEvent.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Item counter - fixed position */}
      <div className="absolute bottom-8 right-8 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50 shadow-lg">
        <span className="text-sm font-medium">
          {currentIndex + 1} / {timelineEvents.length}
        </span>
      </div>

      {/* Mobile scroll hint */}
      {hasStartedAnimation && !isAnimationComplete && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 lg:hidden">
          <div className="bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm">
            Timeline in progress...
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTimeline;