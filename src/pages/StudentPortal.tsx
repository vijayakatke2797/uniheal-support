import { useState, useEffect } from "react";
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

  // Check for session persistence on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('uniheal-session');
    if (savedSession) {
      const { studentId, timestamp } = JSON.parse(savedSession);
      // Session valid for 24 hours
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        setCredentials({ studentId, password: "****" });
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('uniheal-session');
      }
    }
  }, []);
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
      // Save session for persistence
      localStorage.setItem('uniheal-session', JSON.stringify({
        studentId: credentials.studentId,
        timestamp: Date.now()
      }));
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('uniheal-session');
    setCredentials({ studentId: "", password: "" });
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
              onClick={handleSignOut}
              size="sm"
              className="bg-white/20 border-white/30 hover:bg-white/30"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        {/* Chat Section with Welcome Card on Right */}
        <section id="chat-section" className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3 relative z-10">
            <ChatBot />
          </div>
          
          {/* Welcome Card - Right Side */}
          <div className="lg:col-span-1 relative z-20">
            <Card className="bg-gradient-card shadow-card h-fit sticky top-20 animate-float">
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
          </div>
        </section>

        {/* Mental Health Assessment Section */}
        <section id="assessment-section" className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-3 mb-4">
              <Brain className="h-8 w-8 text-primary" />
              Mental Health Assessment
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take a confidential assessment to understand your mental health and get personalized recommendations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-card shadow-card hover-scale animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                  Anxiety Assessment
                </CardTitle>
                <CardDescription>
                  Evaluate your anxiety levels and triggers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowAssessment(true)}
                  className="w-full gap-2"
                  variant="outline"
                >
                  <Activity className="h-4 w-4" />
                  Start Test (5 min)
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card hover-scale animate-fade-in delay-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-green-500" />
                  Depression Screening
                </CardTitle>
                <CardDescription>
                  Check your mood and emotional wellbeing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowAssessment(true)}
                  className="w-full gap-2"
                  variant="outline"
                >
                  <Activity className="h-4 w-4" />
                  Start Test (7 min)
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card hover-scale animate-fade-in delay-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-500" />
                  Stress Evaluation
                </CardTitle>
                <CardDescription>
                  Assess your stress patterns and coping
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowAssessment(true)}
                  className="w-full gap-2"
                  variant="outline"
                >
                  <Activity className="h-4 w-4" />
                  Start Test (4 min)
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources-section" className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-primary" />
              Healing Resources
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Instant relief tools and techniques for stress, anxiety, and emotional support
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-card shadow-card hover-scale animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-blue-500" />
                  Breathing Exercises
                </CardTitle>
                <CardDescription>
                  Guided breathing techniques for instant calm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Headphones className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <Button className="w-full gap-2" variant="outline">
                  <Headphones className="h-4 w-4" />
                  Start Breathing
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card hover-scale animate-fade-in delay-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  Relaxation Videos
                </CardTitle>
                <CardDescription>
                  Calming videos and meditation guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <Button className="w-full gap-2" variant="outline">
                  <Activity className="h-4 w-4" />
                  Watch Videos
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card hover-scale animate-fade-in delay-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  Quick Tips
                </CardTitle>
                <CardDescription>
                  Daily mental health tips and strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
                <Button className="w-full gap-2" variant="outline">
                  <Brain className="h-4 w-4" />
                  Get Tips
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Emergency & Feedback Section */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-1">
            <EmergencyResources />
          </div>
          
          <div className="md:col-span-2">
            <Card className="bg-gradient-card shadow-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Student Feedback
                </CardTitle>
                <CardDescription>
                  See how UniHeal has helped other students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Card className="bg-white/50 hover-scale animate-fade-in">
                    <CardContent className="pt-4">
                      <p className="text-sm italic mb-2">"The chatbot really helped me during my exam stress. Available 24/7!"</p>
                      <p className="text-xs text-muted-foreground">- Anonymous Student, Engineering</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/50 hover-scale animate-fade-in delay-100">
                    <CardContent className="pt-4">
                      <p className="text-sm italic mb-2">"Assessment helped me understand my anxiety patterns better."</p>
                      <p className="text-xs text-muted-foreground">- Anonymous Student, Medicine</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/50 hover-scale animate-fade-in delay-200">
                    <CardContent className="pt-4">
                      <p className="text-sm italic mb-2">"Booking counseling sessions was so easy and confidential."</p>
                      <p className="text-xs text-muted-foreground">- Anonymous Student, Arts</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Calendar & Booking Section */}
        <section id="calendar-section" className="grid md:grid-cols-2 gap-6">
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
                {/* Mock session data - in real app, this would come from backend */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Individual Counseling</p>
                      <p className="text-xs text-muted-foreground">Tomorrow, 2:00 PM</p>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Group Therapy</p>
                      <p className="text-xs text-muted-foreground">Last Week</p>
                    </div>
                    <Badge className="bg-green-500">Completed</Badge>
                  </div>
                </div>
                
                <div className="text-center py-4">
                  <Button 
                    onClick={() => navigate('/booking')}
                    className="gap-2"
                  >
                    <Activity className="h-4 w-4" />
                    Book New Session
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Book Session Quick Card */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Heart className="h-6 w-6" />
                Quick Booking
              </CardTitle>
              <CardDescription>
                Schedule your next counseling session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="hover-scale">
                    Individual
                  </Button>
                  <Button variant="outline" size="sm" className="hover-scale">
                    Group
                  </Button>
                  <Button variant="outline" size="sm" className="hover-scale">
                    Emergency
                  </Button>
                  <Button variant="outline" size="sm" className="hover-scale">
                    Follow-up
                  </Button>
                </div>
                
                <div className="text-center">
                  <Button 
                    onClick={() => navigate('/booking')}
                    className="w-full gap-2"
                    size="lg"
                  >
                    <Activity className="h-5 w-5" />
                    Open Full Booking
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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