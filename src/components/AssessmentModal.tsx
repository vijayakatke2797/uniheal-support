import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Brain, Heart, Shield } from "lucide-react";

interface AssessmentResult {
  academicStress: number;
  moodMotivation: number;
  suicidalRisk: number;
  totalScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  recommendations: string[];
}

interface AssessmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (result: AssessmentResult) => void;
}

const AssessmentModal = ({ open, onOpenChange, onComplete }: AssessmentModalProps) => {
  const [currentModule, setCurrentModule] = useState<'start' | 'academic' | 'mood' | 'safety' | 'results'>('start');
  const [scores, setScores] = useState({
    academicStress: 0,
    moodMotivation: 0,
    suicidalRisk: 0
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const academicQuestions = [
    {
      question: "How often do you feel overwhelmed by academic workload?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
      question: "How much pressure do you feel about your grades?",
      options: ["No pressure", "Little pressure", "Moderate pressure", "High pressure", "Extreme pressure"]
    },
    {
      question: "How do you feel about competition with other students?",
      options: ["Not competitive", "Mildly competitive", "Moderately competitive", "Highly competitive", "Extremely stressed by competition"]
    },
    {
      question: "How often do you worry about disappointing others with your performance?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Constantly"]
    }
  ];

  const moodQuestions = [
    {
      question: "How would you describe your energy levels lately?",
      options: ["Very high", "High", "Normal", "Low", "Very low"]
    },
    {
      question: "How often do you feel motivated to complete tasks?",
      options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
    },
    {
      question: "How often do you experience feelings of guilt or shame?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
      question: "How intense is your fear of failure?",
      options: ["No fear", "Slight fear", "Moderate fear", "Strong fear", "Overwhelming fear"]
    }
  ];

  const safetyQuestions = [
    {
      question: "In the past two weeks, have you had thoughts that you would be better off dead?",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    },
    {
      question: "Have you had thoughts of hurting yourself in some way?",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
    }
  ];

  const getCurrentQuestions = () => {
    switch (currentModule) {
      case 'academic': return academicQuestions;
      case 'mood': return moodQuestions;
      case 'safety': return safetyQuestions;
      default: return [];
    }
  };

  const handleAnswer = (score: number) => {
    const questions = getCurrentQuestions();
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Module complete, update scores
      const moduleScore = Math.round((score + 1) * questions.length / questions.length);
      setScores(prev => ({
        ...prev,
        [currentModule === 'academic' ? 'academicStress' : 
         currentModule === 'mood' ? 'moodMotivation' : 'suicidalRisk']: moduleScore
      }));
      
      // Move to next module
      if (currentModule === 'academic') {
        setCurrentModule('mood');
        setCurrentQuestion(0);
      } else if (currentModule === 'mood') {
        setCurrentModule('safety');
        setCurrentQuestion(0);
      } else {
        calculateResults();
      }
    }
  };

  const calculateResults = () => {
    const totalScore = scores.academicStress + scores.moodMotivation + (scores.suicidalRisk * 2);
    let riskLevel: AssessmentResult['riskLevel'] = 'Low';
    let recommendations: string[] = [];

    if (scores.suicidalRisk >= 2) {
      riskLevel = 'Critical';
      recommendations = [
        "Immediate professional support is recommended",
        "Contact emergency services or crisis hotline",
        "Reach out to a trusted friend or family member",
        "Consider urgent counseling appointment"
      ];
    } else if (totalScore >= 12) {
      riskLevel = 'High';
      recommendations = [
        "Consider scheduling a counseling session",
        "Practice stress management techniques",
        "Maintain regular sleep and exercise routine",
        "Connect with friends and family for support"
      ];
    } else if (totalScore >= 8) {
      riskLevel = 'Moderate';
      recommendations = [
        "Try relaxation techniques and mindfulness",
        "Consider talking to someone you trust",
        "Maintain healthy study-life balance",
        "Use campus wellness resources"
      ];
    } else {
      recommendations = [
        "Continue current positive coping strategies",
        "Maintain regular self-care routine",
        "Stay connected with support network",
        "Keep monitoring your mental health"
      ];
    }

    const result: AssessmentResult = {
      academicStress: scores.academicStress,
      moodMotivation: scores.moodMotivation,
      suicidalRisk: scores.suicidalRisk,
      totalScore,
      riskLevel,
      recommendations
    };

    setCurrentModule('results');
    onComplete(result);
  };

  const handleStartModule = (module: 'academic' | 'mood' | 'safety') => {
    setCurrentModule(module);
    setCurrentQuestion(0);
  };

  const handleClose = () => {
    setCurrentModule('start');
    setCurrentQuestion(0);
    setScores({ academicStress: 0, moodMotivation: 0, suicidalRisk: 0 });
    onOpenChange(false);
  };

  const renderStartScreen = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Mental Health Assessment</h3>
        <p className="text-muted-foreground">
          This comprehensive assessment will help evaluate your current mental health status across key areas.
        </p>
      </div>
      
      <div className="space-y-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStartModule('academic')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Brain className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-base">Academic Stress</CardTitle>
                <p className="text-sm text-muted-foreground">Exam pressure, competition, grades</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStartModule('mood')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-base">Mood & Motivation</CardTitle>
                <p className="text-sm text-muted-foreground">Energy, guilt, fear of failure</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStartModule('safety')}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-base">Safety Check</CardTitle>
                <p className="text-sm text-muted-foreground">Suicidal thoughts and self-harm</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <Button onClick={() => handleStartModule('academic')} className="w-full">
        Start Complete Assessment
      </Button>
    </div>
  );

  const renderQuestion = () => {
    const questions = getCurrentQuestions();
    const question = questions[currentQuestion];
    const moduleNames = {
      academic: 'Academic Stress',
      mood: 'Mood & Motivation', 
      safety: 'Safety Check'
    };
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{moduleNames[currentModule as keyof typeof moduleNames]}</Badge>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">{question.question}</h3>
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleAnswer(index)}
                className="w-full justify-start text-left h-auto p-4 hover:bg-muted/50"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Mental Health Assessment
          </DialogTitle>
          <DialogDescription>
            A comprehensive evaluation to understand your current mental health status
          </DialogDescription>
        </DialogHeader>

        {currentModule === 'start' && renderStartScreen()}
        {(['academic', 'mood', 'safety'].includes(currentModule)) && renderQuestion()}
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentModal;