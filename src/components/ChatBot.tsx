import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Calendar, Brain } from "lucide-react";
import mascotImage from "@/assets/sprout-mascot.png";
import AssessmentModal from "./AssessmentModal";

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface AssessmentResult {
  academicStress: number;
  moodMotivation: number;
  suicidalRisk: number;
  totalScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  recommendations: string[];
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm Sprout, your mental health companion. I'm here to listen and support you. What's on your mind today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [conversationCount, setConversationCount] = useState(0);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  const conversationPrompts = [
    "That sounds challenging. Can you tell me more about what's been going on?",
    "I hear you. It's completely normal to feel this way sometimes. What's been the most difficult part?",
    "Thank you for sharing that with me. How long have you been feeling this way?",
    "I appreciate your openness. What usually helps you when you're going through tough times?",
    "It sounds like you're dealing with a lot right now. Have you been able to talk to anyone else about this?"
  ];

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    addMessage(inputText, 'user');
    setInputText("");
    setConversationCount(prev => prev + 1);
    
    // Continue conversation for several exchanges before offering assessment
    setTimeout(() => {
      if (conversationCount < 4) {
        // Continue conversation
        const randomPrompt = conversationPrompts[Math.floor(Math.random() * conversationPrompts.length)];
        addMessage(randomPrompt, 'bot');
      } else if (conversationCount === 4) {
        // Offer assessment after meaningful conversation
        addMessage("You've been really open with me, and I appreciate that. To better understand how you're doing and provide more personalized support, would you be interested in taking a quick mental health assessment? It covers areas like academic stress, mood, and overall wellbeing.", 'bot');
        setTimeout(() => {
          addMessage("The assessment is completely private and will help me give you better tips and resources.", 'bot');
        }, 2000);
      } else {
        // Provide supportive responses
        const supportiveResponses = [
          "I'm here to listen. How are you feeling right now about everything we've discussed?",
          "It sounds like you're being really thoughtful about your mental health. That's a positive step.",
          "Remember, it's okay to have difficult days. What matters is that you're reaching out and being aware of how you feel."
        ];
        const randomResponse = supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
        addMessage(randomResponse, 'bot');
      }
    }, 1000);
  };

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setAssessmentResult(result);
    setShowAssessment(false);
    
    setTimeout(() => {
      let responseMessage = "";
      let recommendations = "";
      
      if (result.riskLevel === 'Critical') {
        responseMessage = "I'm very concerned about what the assessment shows. Your safety is the most important thing right now. Please know that you're not alone and there are people who want to help you.";
        recommendations = "I strongly encourage you to reach out for immediate support. Would you like me to connect you with emergency resources or help you book an urgent counseling session?";
        setShowBooking(true);
      } else if (result.riskLevel === 'High') {
        responseMessage = "The assessment shows you're experiencing significant stress. Thank you for being honest - that takes courage.";
        recommendations = "I'd recommend talking to a counselor who can provide personalized strategies. Would you like me to help you book a session?";
        setShowBooking(true);
      } else if (result.riskLevel === 'Moderate') {
        responseMessage = "The assessment shows some areas where you might benefit from additional support. This is very common among students.";
        recommendations = "Here are some strategies that might help: practice stress management techniques, maintain regular sleep, and consider talking to someone you trust. Would you like to explore counseling options?";
      } else {
        responseMessage = "Great news! The assessment shows you're managing well overall. It's wonderful that you're being proactive about your mental health.";
        recommendations = "Keep up the good self-care habits you have in place. Continue to check in with yourself regularly and maintain your support networks.";
      }
      
      addMessage(`Assessment complete! Risk level: ${result.riskLevel}. ${responseMessage}`, 'bot');
      
      setTimeout(() => {
        addMessage(recommendations, 'bot');
        
        // Add specific tips based on scores
        setTimeout(() => {
          const tips = result.recommendations.slice(0, 2);
          addMessage(`Here are some specific tips for you: ${tips.join(', ')}.`, 'bot');
        }, 2000);
      }, 1500);
    }, 1000);
  };

  const handleTakeAssessment = () => {
    addMessage("I'd like to take the assessment", 'user');
    setTimeout(() => {
      addMessage("Perfect! I'm opening our comprehensive mental health assessment for you. It will cover academic stress, mood & motivation, and safety questions. Take your time with each section.", 'bot');
      setShowAssessment(true);
    }, 1000);
  };

  const handleBooking = () => {
    addMessage("Yes, I'd like to book a session", 'user');
    setTimeout(() => {
      addMessage("Great! I'll redirect you to our booking system where you can choose your preferred date and time.", 'bot');
      setShowBooking(false);
      // Redirect to booking page
      setTimeout(() => {
        window.location.href = '/booking';
      }, 1500);
    }, 1000);
  };

  return (
    <Card className="h-[600px] flex flex-col bg-gradient-card shadow-soft">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <img src={mascotImage} alt="Sprout - UniHeal Mascot" className="w-10 h-10" />
          <div>
            <CardTitle className="text-primary">Chat with Sprout</CardTitle>
            <CardDescription>Your friendly mental health companion</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="flex-1 overflow-y-auto space-y-3 bg-muted/30 rounded-lg p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background border shadow-sm'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="flex items-center gap-2 mb-2">
                    <img src={mascotImage} alt="Sprout" className="w-5 h-5" />
                    <Badge variant="secondary" className="text-xs">Sprout</Badge>
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {conversationCount >= 4 && !assessmentResult && (
          <div className="space-y-2">
            <Button onClick={handleTakeAssessment} className="w-full gap-2">
              <Brain className="h-4 w-4" />
              Take Mental Health Assessment
            </Button>
          </div>
        )}

        {showBooking && (
          <div className="space-y-2">
            <Button onClick={handleBooking} className="w-full gap-2">
              <Calendar className="h-4 w-4" />
              Book a Counseling Session
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowBooking(false)} 
              className="w-full"
            >
              Not right now
            </Button>
          </div>
        )}

        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            size="sm" 
            disabled={!inputText.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <AssessmentModal 
          open={showAssessment}
          onOpenChange={setShowAssessment}
          onComplete={handleAssessmentComplete}
        />
      </CardContent>
    </Card>
  );
};

export default ChatBot;