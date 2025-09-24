import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn, Leaf, Headphones, Shield, Brain, Heart, Activity, Calendar, Clock, CheckCircle, Plus } from "lucide-react";
import ChatBot from "@/components/ChatBot";
import EmergencyResources from "@/components/EmergencyResources";
import QuickResources from "@/components/QuickResources";
import AssessmentModal from "@/components/AssessmentModal";

const StudentPortal = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ studentId: "", password: "" });
  const [showAssessment, setShowAssessment] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    concerns: "",
    urgency: "normal"
  });
  const [sessions, setSessions] = useState([
    { id: 1, date: "2024-01-15", time: "10:00 AM", status: "pending", counselor: "Dr. Smith" },
    { id: 2, date: "2024-01-08", time: "02:00 PM", status: "completed", counselor: "Dr. Johnson" },
  ]);

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

  // Helper functions
  const getQuickDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Skip weekends
        dates.push({
          value: date.toISOString().split('T')[0],
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        });
      }
      
      if (dates.length === 3) break;
    }
    
    return dates;
  };

  const getQuickTimes = () => {
    return ["10:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"];
  };

  const handleQuickBooking = () => {
    const newSession = {
      id: sessions.length + 1,
      date: selectedDate,
      time: selectedTime,
      status: "pending" as const,
      counselor: "Dr. Wilson"
    };
    
    setSessions([...sessions, newSession]);
    setShowBookingModal(false);
    setSelectedDate("");
    setSelectedTime("");
    
    // Show success message or navigate
    alert("Session booked successfully!");
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
              <Button
                variant="ghost"
                onClick={() => setShowBookingModal(true)}
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Quick Book
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

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Chat Section with Welcome Card on Right */}
        <section id="chat-section" className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 relative">
            <ChatBot />
          </div>
          
          {/* Welcome Card - Right Side */}
          <div className="lg:col-span-1">
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
        <section id="assessment-section">
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
        <section id="resources-section">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-primary" />
              Healing Resources
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Instant relief tools and techniques for stress, anxiety, and emotional support
            </p>
          </div>
          
          <QuickResources />
        </section>

        {/* Emergency & Feedback Section */}
        <section className="grid md:grid-cols-3 gap-6">
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
                <div className="space-y-4">
                  <div className="grid gap-3">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover-scale animate-fade-in">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-blue-800">"UniHeal helped me manage my anxiety during finals week. The breathing exercises were a lifesaver!"</p>
                          <p className="text-sm text-blue-600 mt-1">- Sarah, Psychology Major</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200 hover-scale animate-fade-in delay-100">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-green-800">"The counseling sessions gave me tools to cope with stress. I feel so much better now."</p>
                          <p className="text-sm text-green-600 mt-1">- Mike, Engineering Student</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover-scale animate-fade-in delay-200">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-purple-800">"Having access to 24/7 support made all the difference in my mental health journey."</p>
                          <p className="text-sm text-purple-600 mt-1">- Alex, Business Student</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Calendar & Booking Section */}
        <section id="calendar-section" className="grid lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                My Sessions
              </CardTitle>
              <CardDescription>
                Track your upcoming and past counseling sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessions.map((session) => (
                  <div 
                    key={session.id} 
                    className={`p-4 rounded-lg border ${
                      session.status === 'pending' 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-green-50 border-green-200'
                    } hover-scale animate-fade-in`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">
                          {new Date(session.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">{session.time} - {session.counselor}</p>
                      </div>
                      <Badge 
                        variant={session.status === 'pending' ? 'secondary' : 'default'}
                        className={session.status === 'completed' ? 'bg-green-500' : ''}
                      >
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                <div className="text-center pt-4">
                  <Button 
                    onClick={() => setShowBookingModal(true)}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Book New Session
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Booking */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Activity className="h-6 w-6" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Fast access to common mental health resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover-scale p-4 h-auto flex flex-col gap-2"
                    onClick={() => setShowBookingModal(true)}
                  >
                    <Calendar className="h-5 w-5" />
                    <span className="text-xs">Book Session</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover-scale p-4 h-auto flex flex-col gap-2"
                    onClick={() => scrollToSection('resources-section')}
                  >
                    <Heart className="h-5 w-5" />
                    <span className="text-xs">Resources</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover-scale p-4 h-auto flex flex-col gap-2"
                    onClick={() => setShowAssessment(true)}
                  >
                    <Brain className="h-5 w-5" />
                    <span className="text-xs">Assessment</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover-scale p-4 h-auto flex flex-col gap-2"
                    onClick={() => scrollToSection('chat-section')}
                  >
                    <Headphones className="h-5 w-5" />
                    <span className="text-xs">Chat Support</span>
                  </Button>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium mb-1">Crisis Support Available</p>
                  <p className="text-xs text-muted-foreground">24/7 emergency mental health assistance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      {/* Quick Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Quick Book Session
            </DialogTitle>
            <DialogDescription>
              Schedule your counseling session quickly and easily
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Quick Date Selection */}
            <div>
              <Label className="text-base font-medium mb-3 block">Available This Week</Label>
              <div className="grid grid-cols-3 gap-3">
                {getQuickDates().map((date) => (
                  <Button
                    key={date.value}
                    variant={selectedDate === date.value ? "default" : "outline"}
                    onClick={() => setSelectedDate(date.value)}
                    className="h-auto p-3 flex flex-col"
                  >
                    <span className="text-xs font-medium">{date.day}</span>
                    <span className="text-sm">{date.date}</span>
                  </Button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div>
                <Label className="text-base font-medium mb-3 block">Available Times</Label>
                <div className="grid grid-cols-4 gap-2">
                  {getQuickTimes().map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      size="sm"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {selectedDate && selectedTime && (
              <div className="bg-primary/10 p-4 rounded-lg">
                <h4 className="font-medium text-primary mb-2">Session Confirmed</h4>
                <p className="text-sm text-primary/80">
                  {selectedDate} at {selectedTime}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowBookingModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleQuickBooking}
                disabled={!selectedDate || !selectedTime}
                className="flex-1"
              >
                Book Session
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <AssessmentModal 
        open={showAssessment}
        onOpenChange={setShowAssessment}
        onComplete={(result) => {
          console.log('Assessment completed:', result);
        }}
      />
    </div>
  );
};

export default StudentPortal;