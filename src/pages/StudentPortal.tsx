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
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      {/* Glass Morphism Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/30 border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Leaf className="h-6 w-6 text-primary" />
                <Headphones className="h-3 w-3 text-primary absolute -top-0.5 -right-0.5" />
              </div>
              <div>
                <h1 className="font-semibold text-primary">UniHeal Dashboard</h1>
                <p className="text-xs text-muted-foreground">Student #{credentials.studentId}</p>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                onClick={() => scrollToSection('chat-section')}
                size="sm"
                className="gap-2"
              >
                <Headphones className="h-4 w-4" />
                Chat
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('assessment-section')}
                size="sm"
                className="gap-2"
              >
                <Brain className="h-4 w-4" />
                Assessment
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('resources-section')}
                size="sm"
                className="gap-2"
              >
                <Heart className="h-4 w-4" />
                Resources
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('calendar-section')}
                size="sm"
                className="gap-2"
              >
                <Activity className="h-4 w-4" />
                Calendar
              </Button>
            </div>

            <Button 
              variant="outline" 
              onClick={() => setIsLoggedIn(false)}
              size="sm"
              className="bg-white/20 border-white/30 hover:bg-white/30"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Chat Section */}
        <section id="chat-section" className="w-full">
          <ChatBot />
        </section>

        {/* Assessment Section */}
        <section id="assessment-section" className="grid lg:grid-cols-3 gap-6">
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

          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Mental Health Check
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setShowAssessment(true)}
                className="w-full gap-2"
                size="lg"
              >
                <Activity className="h-5 w-5" />
                Take Assessment
              </Button>
            </CardContent>
          </Card>

          <QuickResources />
        </section>

        {/* Resources Section */}
        <section id="resources-section" className="grid md:grid-cols-2 gap-8">
          <EmergencyResources />
          
          {/* Session Calendar */}
          <div id="calendar-section">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Activity className="h-6 w-6" />
                  Session Calendar
                </CardTitle>
                <CardDescription>
                  Your scheduled and completed counseling sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Activity className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Sessions Yet</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Book your first counseling session to get started
                    </p>
                    <Button 
                      onClick={() => window.location.href = '/booking'}
                      className="gap-2"
                    >
                      <Activity className="h-4 w-4" />
                      Book First Session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
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