import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn, Leaf, Headphones, Shield, Brain, Heart, Activity } from "lucide-react";
import ChatBot from "@/components/ChatBot";
import EmergencyResources from "@/components/EmergencyResources";
import QuickResources from "@/components/QuickResources";
import AssessmentModal from "@/components/AssessmentModal";

const StudentPortal = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ studentId: "", password: "" });
  const [showAssessment, setShowAssessment] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app, validate against backend
    if (credentials.studentId && credentials.password) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">UniHeal</span>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto space-y-8">
            {/* Login Card */}
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Student Portal</CardTitle>
                <CardDescription>
                  Sign in to access your personal mental health dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      type="text"
                      placeholder="Enter your student ID"
                      value={credentials.studentId}
                      onChange={(e) => setCredentials(prev => ({ ...prev, studentId: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In Securely
                  </Button>
                </form>

                <div className="mt-6 text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Forgot your password?{" "}
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Reset here
                    </Button>
                  </p>
                  <Badge variant="secondary" className="gap-1">
                    <Shield className="h-3 w-3" />
                    Secure & Confidential
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card className="bg-pastel-mint/50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">Your Privacy Matters</h4>
                    <p className="text-sm text-green-700">
                      All conversations and assessments are completely confidential. 
                      Your data is encrypted and never shared without your consent.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Resources */}
            <EmergencyResources />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Leaf className="h-6 w-6 text-primary" />
              <Headphones className="h-3 w-3 text-primary absolute -top-0.5 -right-0.5" />
            </div>
            <div>
              <h1 className="font-semibold text-primary">Student Dashboard</h1>
              <p className="text-xs text-muted-foreground">Welcome back, Student #{credentials.studentId}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsLoggedIn(false)}
            size="sm"
          >
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <ChatBot />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Welcome Card */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Welcome to Your Safe Space</CardTitle>
                <CardDescription>
                  Take a moment to check in with yourself. Sprout is here to listen and support you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="secondary" className="w-full justify-center py-2">
                    ✨ Confidential & Anonymous
                  </Badge>
                  <Badge variant="outline" className="w-full justify-center py-2">
                    🌱 Judgment-Free Zone
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Assessment */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Quick Assessment
                </CardTitle>
                <CardDescription>
                  Take a comprehensive mental health assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowAssessment(true)}
                    className="w-full gap-2"
                    variant="outline"
                  >
                    <Activity className="h-4 w-4" />
                    Start Assessment
                  </Button>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="space-y-1">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <Brain className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-xs text-muted-foreground">Academic</p>
                    </div>
                    <div className="space-y-1">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Heart className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-xs text-muted-foreground">Mood</p>
                    </div>
                    <div className="space-y-1">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <Shield className="h-4 w-4 text-red-600" />
                      </div>
                      <p className="text-xs text-muted-foreground">Safety</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Resources */}
            <QuickResources />

            {/* Emergency Resources */}
            <EmergencyResources />
          </div>
        </div>
      </main>
      
      <AssessmentModal 
        open={showAssessment}
        onOpenChange={setShowAssessment}
        onComplete={(result) => {
          console.log('Assessment completed:', result);
          // Could integrate with chatbot or show results
        }}
      />
    </div>
  );
};

export default StudentPortal;