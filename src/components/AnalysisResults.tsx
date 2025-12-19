import { CheckCircle2, AlertCircle, XCircle, TrendingUp, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface AnalysisSection {
  name: string;
  score: number;
  feedback: string;
  suggestions: string[];
}

interface AnalysisResultsProps {
  results: {
    overallScore: number;
    sections: AnalysisSection[];
    strengths: string[];
    improvements: string[];
  };
  onReset: () => void;
}

const ScoreCircle = ({ score }: { score: number }) => {
  const getScoreColor = () => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Needs Work";
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="80"
          cy="80"
          r="45"
          strokeWidth="10"
          fill="none"
          className="stroke-secondary"
        />
        <circle
          cx="80"
          cy="80"
          r="45"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          className={`${getScoreColor().replace('text-', 'stroke-')} transition-all duration-1000 ease-out`}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}</span>
        <span className="text-sm text-muted-foreground">{getScoreLabel()}</span>
      </div>
    </div>
  );
};

const SectionCard = ({ section }: { section: AnalysisSection }) => {
  const getProgressVariant = () => {
    if (section.score >= 80) return "success";
    if (section.score >= 60) return "default";
    if (section.score >= 40) return "warning";
    return "destructive";
  };

  const getIcon = () => {
    if (section.score >= 80) return <CheckCircle2 className="w-5 h-5 text-success" />;
    if (section.score >= 60) return <CheckCircle2 className="w-5 h-5 text-primary" />;
    if (section.score >= 40) return <AlertCircle className="w-5 h-5 text-warning" />;
    return <XCircle className="w-5 h-5 text-destructive" />;
  };

  return (
    <Card className="gradient-card border shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getIcon()}
            <CardTitle className="text-lg">{section.name}</CardTitle>
          </div>
          <span className="text-2xl font-bold text-foreground">{section.score}</span>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={section.score} variant={getProgressVariant()} className="mb-4" />
        <p className="text-sm text-muted-foreground mb-4">{section.feedback}</p>
        {section.suggestions.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Suggestions:</p>
            <ul className="space-y-1">
              {section.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Lightbulb className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const AnalysisResults = ({ results, onReset }: AnalysisResultsProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Your Resume Analysis
            </h2>
            <p className="text-muted-foreground">
              Here's a detailed breakdown of your resume performance
            </p>
          </div>

          {/* Overall Score */}
          <Card className="gradient-card border shadow-xl mb-10 animate-scale-in">
            <CardContent className="py-10">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1">
                  <ScoreCircle score={results.overallScore} />
                </div>
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-success" />
                      <h3 className="font-semibold text-foreground">Key Strengths</h3>
                    </div>
                    <ul className="space-y-2">
                      {results.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-warning" />
                      <h3 className="font-semibold text-foreground">Areas to Improve</h3>
                    </div>
                    <ul className="space-y-2">
                      {results.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section Breakdown */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {results.sections.map((section, index) => (
              <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <SectionCard section={section} />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="text-center animate-fade-up">
            <Button variant="outline" size="lg" onClick={onReset}>
              Analyze Another Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisResults;
