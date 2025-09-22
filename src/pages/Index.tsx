import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Users, Shield, BarChart3, Heart, Leaf, Headphones } from "lucide-react";
import EmergencyResources from "@/components/EmergencyResources";
import mascotImage from "@/assets/sprout-mascot.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Leaf className="h-8 w-8 text-primary" />
              <Headphones className="h-4 w-4 text-primary absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">UniHeal</h1>
              <p className="text-xs text-muted-foreground">Mental Health Support Platform</p>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Heart className="h-3 w-3" />
            Safe Space
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12">
        {/* Hero Section */}
        <section className="text-center py-16 mb-16">
          <div className="flex justify-center mb-8">
            <img 
              src={mascotImage} 
              alt="Sprout - UniHeal Mascot" 
              className="w-32 h-32 drop-shadow-lg"
            />
          </div>
          
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Your Mental Health
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Matters Here
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            UniHeal provides a safe, supportive environment where students can access mental health resources, 
            connect with counselors, and find the support they deserve.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/student')}
              className="gap-2 shadow-hover hover:shadow-hover transition-all"
            >
              <Users className="h-5 w-5" />
              Login as Student
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => alert('Counselor portal coming soon!')}
              className="gap-2"
            >
              <Heart className="h-5 w-5" />
              Login as Counselor
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/admin')}
              className="gap-2"
            >
              <BarChart3 className="h-5 w-5" />
              Login as Admin
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-pastel-mint rounded-lg flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-green-700" />
              </div>
              <CardTitle>Anonymous Support</CardTitle>
              <CardDescription>
                Get help without judgment. Your privacy and confidentiality are our top priorities.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-pastel-lavender rounded-lg flex items-center justify-center mb-3">
                <Heart className="h-6 w-6 text-purple-700" />
              </div>
              <CardTitle>24/7 Resources</CardTitle>
              <CardDescription>
                Access mental health tools, resources, and emergency support whenever you need it.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-pastel-pink rounded-lg flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-pink-700" />
              </div>
              <CardTitle>Professional Care</CardTitle>
              <CardDescription>
                Connect with licensed counselors who understand the unique challenges of student life.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Mission Statement */}
        <section className="text-center py-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-primary">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Every student deserves access to mental health support. UniHeal breaks down barriers by providing 
              accessible, confidential, and comprehensive mental health resources tailored specifically for 
              university students navigating academic, social, and personal challenges.
            </p>
            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Students Helped</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Confidential</div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Resources */}
        <section className="max-w-2xl mx-auto">
          <EmergencyResources />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="font-semibold text-primary">UniHeal</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Supporting student mental health, one conversation at a time.
          </p>
          <p className="text-xs text-muted-foreground">
            © 2024 UniHeal. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;