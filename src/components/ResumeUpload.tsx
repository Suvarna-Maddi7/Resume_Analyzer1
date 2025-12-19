import { useCallback, useState } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ResumeUploadProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

const ResumeUpload = ({ onFileSelect, isAnalyzing }: ResumeUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, DOCX, or TXT file.",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <section id="upload-section" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Upload Your Resume
            </h2>
            <p className="text-muted-foreground">
              Drag and drop your resume or click to browse. We support PDF, DOC, DOCX, and TXT files.
            </p>
          </div>

          {/* Upload area */}
          <div
            className={`relative border-2 border-dashed rounded-2xl p-10 transition-all duration-300 ${
              dragActive
                ? "border-primary bg-primary/5 scale-[1.02]"
                : selectedFile
                ? "border-success bg-success/5"
                : "border-border hover:border-primary/50 hover:bg-secondary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!selectedFile ? (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <Upload className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-lg font-medium text-foreground mb-2">
                  {dragActive ? "Drop your resume here" : "Drag & drop your resume here"}
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  or click the button below to browse
                </p>
                <label>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileInput}
                  />
                  <Button variant="outline" size="lg" asChild>
                    <span className="cursor-pointer">
                      <FileText className="w-5 h-5 mr-2" />
                      Browse Files
                    </span>
                  </Button>
                </label>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Analyze button */}
          {selectedFile && (
            <div className="mt-8 text-center animate-fade-up">
              <Button
                variant="hero"
                size="xl"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="min-w-[200px]"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </div>
          )}

          {/* File type hints */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['PDF', 'DOC', 'DOCX', 'TXT'].map((type) => (
              <span
                key={type}
                className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeUpload;
