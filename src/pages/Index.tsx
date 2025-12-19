import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import ResumeUpload from "@/components/ResumeUpload";
import AnalysisResults from "@/components/AnalysisResults";

// Mock analysis results - in production, this would come from an AI backend
const generateMockResults = () => ({
  overallScore: Math.floor(Math.random() * 30) + 65, // 65-95
  sections: [
    {
      name: "Contact Information",
      score: Math.floor(Math.random() * 20) + 80,
      feedback: "Your contact information is clearly presented and easy to find.",
      suggestions: ["Consider adding a LinkedIn profile link"],
    },
    {
      name: "Work Experience",
      score: Math.floor(Math.random() * 30) + 60,
      feedback: "Good use of action verbs. Consider quantifying achievements more.",
      suggestions: [
        "Add specific metrics and numbers to show impact",
        "Use more industry-specific keywords",
      ],
    },
    {
      name: "Skills Section",
      score: Math.floor(Math.random() * 25) + 70,
      feedback: "Skills are well-organized but could be more targeted.",
      suggestions: [
        "Prioritize skills mentioned in job descriptions",
        "Add proficiency levels for technical skills",
      ],
    },
    {
      name: "Education",
      score: Math.floor(Math.random() * 15) + 85,
      feedback: "Education section is comprehensive and well-formatted.",
      suggestions: [],
    },
    {
      name: "ATS Compatibility",
      score: Math.floor(Math.random() * 25) + 65,
      feedback: "Good basic formatting but some improvements needed for ATS systems.",
      suggestions: [
        "Avoid using tables or complex formatting",
        "Use standard section headings",
        "Include more keywords from target job descriptions",
      ],
    },
    {
      name: "Overall Formatting",
      score: Math.floor(Math.random() * 20) + 75,
      feedback: "Clean layout with consistent formatting throughout.",
      suggestions: ["Ensure consistent font sizes", "Add more white space between sections"],
    },
  ],
  strengths: [
    "Clear and professional layout",
    "Strong action verbs in experience section",
    "Relevant skills highlighted prominently",
    "Education credentials well-presented",
  ],
  improvements: [
    "Add more quantifiable achievements",
    "Tailor keywords to specific job descriptions",
    "Include a professional summary section",
    "Expand on key accomplishments",
  ],
});

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<ReturnType<typeof generateMockResults> | null>(null);
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    const uploadSection = document.getElementById("upload-section");
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFileSelect = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    // Generate mock results
    const results = generateMockResults();
    setAnalysisResults(results);
    setIsAnalyzing(false);
    
    // Scroll to results
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnalysisResults(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {!analysisResults ? (
        <>
          <HeroSection onGetStarted={scrollToUpload} />
          <ResumeUpload onFileSelect={handleFileSelect} isAnalyzing={isAnalyzing} />
        </>
      ) : (
        <AnalysisResults results={analysisResults} onReset={handleReset} />
      )}
    </div>
  );
};

export default Index;
