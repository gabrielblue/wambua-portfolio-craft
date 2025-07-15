import { useState } from "react";
import { Shield, CheckCircle, AlertTriangle, XCircle, Lock, Eye, Zap, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SecurityCheck {
  id: string;
  name: string;
  description: string;
  status: 'passed' | 'warning' | 'failed';
  score: number;
  details: string;
  category: 'authentication' | 'encryption' | 'network' | 'data' | 'infrastructure';
}

interface SecurityMetric {
  label: string;
  value: number;
  maxValue: number;
  status: 'good' | 'warning' | 'critical';
}

const SecurityAudit = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const securityChecks: SecurityCheck[] = [
    {
      id: '1',
      name: 'HTTPS Enforcement',
      description: 'All connections are encrypted using TLS 1.3',
      status: 'passed',
      score: 100,
      details: 'Strong SSL/TLS configuration with HSTS enabled',
      category: 'encryption'
    },
    {
      id: '2',
      name: 'Authentication Security',
      description: 'Secure user authentication implementation',
      status: 'passed',
      score: 95,
      details: 'JWT tokens with proper expiration and refresh mechanism',
      category: 'authentication'
    },
    {
      id: '3',
      name: 'Data Validation',
      description: 'Input validation and sanitization',
      status: 'passed',
      score: 90,
      details: 'Comprehensive input validation on both client and server',
      category: 'data'
    },
    {
      id: '4',
      name: 'CORS Configuration',
      description: 'Cross-Origin Resource Sharing settings',
      status: 'warning',
      score: 75,
      details: 'CORS configured but could be more restrictive',
      category: 'network'
    },
    {
      id: '5',
      name: 'Database Security',
      description: 'Database access and query protection',
      status: 'passed',
      score: 88,
      details: 'Row Level Security enabled with proper policies',
      category: 'data'
    },
    {
      id: '6',
      name: 'Content Security Policy',
      description: 'CSP headers for XSS protection',
      status: 'warning',
      score: 70,
      details: 'Basic CSP implemented, could be enhanced',
      category: 'network'
    },
    {
      id: '7',
      name: 'Dependency Scanning',
      description: 'Third-party package vulnerability check',
      status: 'passed',
      score: 92,
      details: 'No critical vulnerabilities found in dependencies',
      category: 'infrastructure'
    },
    {
      id: '8',
      name: 'Rate Limiting',
      description: 'API rate limiting and DDoS protection',
      status: 'failed',
      score: 45,
      details: 'Rate limiting not implemented for all endpoints',
      category: 'network'
    }
  ];

  const securityMetrics: SecurityMetric[] = [
    { label: 'Overall Security Score', value: 82, maxValue: 100, status: 'good' },
    { label: 'Vulnerability Count', value: 2, maxValue: 10, status: 'good' },
    { label: 'Compliance Score', value: 78, maxValue: 100, status: 'warning' },
    { label: 'Response Time', value: 145, maxValue: 500, status: 'good' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <CheckCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication': return <Lock className="h-4 w-4" />;
      case 'encryption': return <Shield className="h-4 w-4" />;
      case 'network': return <Globe className="h-4 w-4" />;
      case 'data': return <Eye className="h-4 w-4" />;
      case 'infrastructure': return <Zap className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'warning': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'failed': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const filteredChecks = selectedCategory === 'all' 
    ? securityChecks 
    : securityChecks.filter(check => check.category === selectedCategory);

  const categories = ['all', 'authentication', 'encryption', 'network', 'data', 'infrastructure'];

  const overallScore = Math.round(securityChecks.reduce((acc, check) => acc + check.score, 0) / securityChecks.length);

  return (
    <div id="security-audit" className="py-16 bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full animate-bounce" style={{ animationDuration: '7s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Security Audit Results
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive security analysis and vulnerability assessment of the portfolio application
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Overall security score */}
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-12 w-12 text-primary mr-4" />
                <div>
                  <div className="text-4xl font-bold text-foreground">{overallScore}%</div>
                  <div className="text-muted-foreground">Overall Security Score</div>
                </div>
              </div>
              <Progress value={overallScore} className="w-full max-w-md mx-auto" />
              <div className="mt-4 text-sm text-muted-foreground">
                {overallScore >= 90 ? 'Excellent security posture' : 
                 overallScore >= 75 ? 'Good security with room for improvement' : 
                 'Security improvements needed'}
              </div>
            </CardContent>
          </Card>

          {/* Security metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {securityMetrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${getMetricColor(metric.status)}`}>
                    {metric.label.includes('Time') ? `${metric.value}ms` : metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{metric.label}</div>
                  <Progress 
                    value={(metric.value / metric.maxValue) * 100} 
                    className="h-2"
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  {category !== 'all' && getCategoryIcon(category)}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
              </button>
            ))}
          </div>

          {/* Security checks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredChecks.map((check) => (
              <Card key={check.id} className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(check.category)}
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {check.name}
                      </CardTitle>
                    </div>
                    {getStatusIcon(check.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-3">
                    {check.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`${getStatusColor(check.status)} border`}>
                      {check.status.charAt(0).toUpperCase() + check.status.slice(1)}
                    </Badge>
                    <div className="text-sm font-medium">
                      Score: {check.score}/100
                    </div>
                  </div>
                  
                  <Progress value={check.score} className="mb-3" />
                  
                  <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                    {check.details}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Security recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Security Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">Implement Rate Limiting</div>
                    <div className="text-sm text-muted-foreground">
                      Add rate limiting to all API endpoints to prevent abuse and DDoS attacks.
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">Enhance Content Security Policy</div>
                    <div className="text-sm text-muted-foreground">
                      Strengthen CSP headers to provide better protection against XSS attacks.
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">Regular Security Updates</div>
                    <div className="text-sm text-muted-foreground">
                      Continue monitoring and updating dependencies to maintain security posture.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecurityAudit;