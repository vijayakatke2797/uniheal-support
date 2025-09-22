import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Calendar } from "lucide-react";
import mascotImage from "@/assets/uniheal-mascot.png";

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface ScreeningData {
  stress: number;
  anxiety: number;
  mood: number;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm Sprout, your mental health companion. I'm here to help you check in with yourself today. How are you feeling?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [currentStep, setCurrentStep] = useState<'greeting' | 'screening' | 'results'>('greeting');
  const [screeningData, setScreeningData] = useState<ScreeningData>({ stress: 0, anxiety: 0, mood: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showBooking, setShowBooking] = useState(false);

  const screeningQuestions = [
    { 
      category: 'stress' as keyof ScreeningData,
      question: "Over the past week, how often have you felt overwhelmed by academic pressure?",
      options: ["Not at all (0)", "Occasionally (1)", "Often (2)", "Almost constantly (3)"]
    },
    {
      category: 'anxiety' as keyof ScreeningData,
      question: "How often do you experience worry or nervousness about your future?",
      options: ["Rarely (0)", "Sometimes (1)", "Frequently (2)", "Almost always (3)"]
    },
    {
      category: 'mood' as keyof ScreeningData,
      question: "How would you rate your overall mood and energy levels lately?",
      options: ["Great - energetic and positive (0)", "Good - mostly stable (1)", "Low - feeling down often (2)", "Very low - persistent sadness (3)"]
    }
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
    
    // Start screening after initial greeting
    if (currentStep === 'greeting') {
      setTimeout(() => {
        addMessage("I'd like to ask you a few quick questions to better understand how you're doing. This will only take a minute.", 'bot');
        setTimeout(() => {
          setCurrentStep('screening');
          addMessage(screeningQuestions[0].question, 'bot');
        }, 1000);
      }, 1000);
    }
  };

  const handleQuestionResponse = (score: number) => {
    const currentQ = screeningQuestions[currentQuestion];
    setScreeningData(prev => ({ ...prev, [currentQ.category]: score }));
    
    addMessage(currentQ.options[score], 'user');
    
    if (currentQuestion < screeningQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        addMessage(screeningQuestions[currentQuestion + 1].question, 'bot');
      }, 1000);
    } else {
      // Calculate results
      setTimeout(() => {
        setCurrentStep('results');
        showResults();
      }, 1000);
    }
  };

  const showResults = () => {
    const totalScore = screeningData.stress + screeningData.anxiety + screeningData.mood;
    let resultMessage = "";
    let riskLevel = "";

    if (totalScore <= 3) {
      riskLevel = "Low";
      resultMessage = "Based on your responses, you seem to be managing well overall! It's great that you're checking in with yourself. Keep up the good self-care habits.";
    } else if (totalScore <= 6) {
      riskLevel = "Moderate";
      resultMessage = "I notice you might be experiencing some stress or challenges. This is completely normal for students. Consider some relaxation techniques or talking to someone you trust.";
    } else {
      riskLevel = "Higher";
      resultMessage = "Thank you for being honest about how you're feeling. It sounds like you're going through a tough time. Please know that support is available, and reaching out is a sign of strength.";
    }

    addMessage(`Assessment complete! Risk level: ${riskLevel}. ${resultMessage}`, 'bot');
    
    if (totalScore > 3) {
      setTimeout(() => {
        addMessage("Would you like me to help you book a counseling session? It's completely confidential and might be helpful.", 'bot');
        setShowBooking(true);
      }, 2000);
    }
  };

  const handleBooking = () => {
    addMessage("Yes, I'd like to book a session", 'user');
    setTimeout(() => {
      addMessage("Great! I'll connect you with our booking system. A counselor will reach out within 24 hours to schedule a session that works for you.", 'bot');
      setShowBooking(false);
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

        {currentStep === 'screening' && currentQuestion < screeningQuestions.length && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Quick responses:</p>
            <div className="grid grid-cols-1 gap-2">
              {screeningQuestions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuestionResponse(index)}
                  className="justify-start text-left h-auto p-3"
                >
                  {option}
                </Button>
              ))}
            </div>
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
            disabled={currentStep === 'screening'}
          />
          <Button 
            onClick={handleSendMessage} 
            size="sm" 
            disabled={!inputText.trim() || currentStep === 'screening'}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;