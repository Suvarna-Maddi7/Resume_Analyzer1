import { Upload, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const features = [
    "AI-powered analysis",
    "ATS compatibility check",
    "Instant feedback",
    "Improvement suggestions",
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center gradient-hero overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Resume Analysis</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Get Your Resume{" "}
            <span className="text-gradient">Analyzed</span>{" "}
            in Seconds
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Upload your resume and receive instant, actionable feedback to improve your chances of landing your dream job.
          </p>

          {/* Features list */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="xl" onClick={onGetStarted} className="group">
              <Upload className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
              Upload Your Resume
            </Button>
            <Button variant="outline" size="xl">
              <FileText className="w-5 h-5" />
              See Sample Report
            </Button>
          </div>

          {/* Trust indicators */}
          <p className="mt-8 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: '0.5s' }}>
            Trusted by <span className="font-semibold text-foreground">50,000+</span> job seekers worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
