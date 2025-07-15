import { useState, useEffect } from "react";
import { Calendar, GitBranch, Star, GitCommit, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubStats {
  totalContributions: number;
  longestStreak: number;
  currentStreak: number;
  totalRepositories: number;
  totalStars: number;
  totalCommits: number;
}

const GitHubHeatmap = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [stats, setStats] = useState<GitHubStats>({
    totalContributions: 847,
    longestStreak: 23,
    currentStreak: 5,
    totalRepositories: 42,
    totalStars: 156,
    totalCommits: 1247
  });
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    // Generate mock contribution data for the last year
    const generateContributions = () => {
      const data: ContributionDay[] = [];
      const today = new Date();
      
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Generate realistic contribution patterns
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const baseChance = isWeekend ? 0.3 : 0.7;
        
        let count = 0;
        let level: 0 | 1 | 2 | 3 | 4 = 0;
        
        if (Math.random() < baseChance) {
          count = Math.floor(Math.random() * 15) + 1;
          if (count >= 12) level = 4;
          else if (count >= 8) level = 3;
          else if (count >= 4) level = 2;
          else level = 1;
        }
        
        data.push({
          date: date.toISOString().split('T')[0],
          count,
          level
        });
      }
      
      return data;
    };

    setContributions(generateContributions());
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-muted/30';
      case 1: return 'bg-green-200 dark:bg-green-900/50';
      case 2: return 'bg-green-300 dark:bg-green-800/70';
      case 3: return 'bg-green-400 dark:bg-green-700/80';
      case 4: return 'bg-green-500 dark:bg-green-600';
      default: return 'bg-muted/30';
    }
  };

  const getWeeksArray = () => {
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    
    contributions.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();
      
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      
      currentWeek.push(day);
      
      if (index === contributions.length - 1) {
        weeks.push(currentWeek);
      }
    });
    
    return weeks;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const weeks = getWeeksArray();
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div id="github-activity" className="py-16 bg-muted/30 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-20 w-32 h-32 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full animate-bounce" style={{ animationDuration: '5s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            GitHub Activity Heatmap
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A visual representation of my coding activity and contribution patterns over the past year
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <GitCommit className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stats.totalContributions}</div>
                <div className="text-xs text-muted-foreground">Contributions</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <TrendingUp className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stats.longestStreak}</div>
                <div className="text-xs text-muted-foreground">Longest Streak</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <Calendar className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stats.currentStreak}</div>
                <div className="text-xs text-muted-foreground">Current Streak</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <GitBranch className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stats.totalRepositories}</div>
                <div className="text-xs text-muted-foreground">Repositories</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stats.totalStars}</div>
                <div className="text-xs text-muted-foreground">Stars Earned</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <GitCommit className="h-6 w-6 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stats.totalCommits}</div>
                <div className="text-xs text-muted-foreground">Total Commits</div>
              </CardContent>
            </Card>
          </div>

          {/* Heatmap */}
          <Card className="p-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Contribution Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Month labels */}
                  <div className="flex mb-2 text-xs text-muted-foreground">
                    <div className="w-8"></div>
                    {monthLabels.map((month, index) => (
                      <div key={month} className="flex-1 text-center" style={{ minWidth: '60px' }}>
                        {month}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex">
                    {/* Day labels */}
                    <div className="flex flex-col text-xs text-muted-foreground mr-2">
                      {dayLabels.map((day, index) => (
                        <div key={day} className="h-3 flex items-center" style={{ marginBottom: '2px' }}>
                          {index % 2 === 1 ? day : ''}
                        </div>
                      ))}
                    </div>
                    
                    {/* Heatmap grid */}
                    <div className="flex gap-1">
                      {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                          {Array.from({ length: 7 }, (_, dayIndex) => {
                            const day = week.find(d => new Date(d.date).getDay() === dayIndex);
                            return (
                              <div
                                key={`${weekIndex}-${dayIndex}`}
                                className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:scale-125 ${
                                  day ? getLevelColor(day.level) : 'bg-muted/30'
                                }`}
                                onMouseEnter={() => day && setSelectedDay(day)}
                                onMouseLeave={() => setSelectedDay(null)}
                                title={day ? `${day.count} contributions on ${formatDate(day.date)}` : ''}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                    <span>Less</span>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
                        />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>
              
              {/* Selected day info */}
              {selectedDay && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium">
                    {selectedDay.count} contributions on {formatDate(selectedDay.date)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Activity level: {selectedDay.level}/4
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <GitCommit className="h-4 w-4 text-green-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Pushed 5 commits to portfolio-website</div>
                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                  </div>
                  <Badge variant="secondary">React</Badge>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Starred typescript-eslint/typescript-eslint</div>
                    <div className="text-xs text-muted-foreground">1 day ago</div>
                  </div>
                  <Badge variant="secondary">TypeScript</Badge>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <GitBranch className="h-4 w-4 text-blue-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Created new repository: mobile-app-template</div>
                    <div className="text-xs text-muted-foreground">3 days ago</div>
                  </div>
                  <Badge variant="secondary">Kotlin</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GitHubHeatmap;