import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundEffects from '@/components/BackgroundEffects';
import ImageUpload from '@/components/ImageUpload';
import LoadingAnimation from '@/components/LoadingAnimation';
import ResultsDisplay from '@/components/ResultsDisplay';


type AppState = 'upload' | 'analyzing' | 'results';

interface AnalysisResult {
  score: number;
  confidence: number;
  explanation: string;
}

const Index = () => {
  const [state, setState] = useState<AppState>('upload');
  const [imagePreview, setImagePreview] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageSelect = async (file: File, preview: string) => {
    setImagePreview(preview);
    setState('analyzing');

    // Simulate AI analysis (replace with real API call)
    await new Promise((r) => setTimeout(r, 2500));

    const mockScore = parseFloat((Math.random() * 10).toFixed(1));
    setResult({
      score: mockScore,
      confidence: Math.floor(70 + Math.random() * 28),
      explanation:
        'The image exhibits consistent lighting patterns across all regions. Pixel-level analysis shows natural noise distribution. No signs of generative artifacts or splicing detected in metadata.',
    });
    setState('results');
  };

  const handleReset = () => {
    setState('upload');
    setImagePreview('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <BackgroundEffects />
      

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-16 pb-4 px-6 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Verity
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-md mx-auto font-light">
            AI-powered image authenticity analysis
          </p>
        </motion.header>

        {/* Main */}
        <main className="flex-1 flex items-start justify-center px-6 pt-10 pb-20">
          <AnimatePresence mode="wait">
            {state === 'upload' && <ImageUpload key="upload" onImageSelect={handleImageSelect} />}
            {state === 'analyzing' && <LoadingAnimation key="analyzing" />}
            {state === 'results' && result && (
              <ResultsDisplay
                key="results"
                score={result.score}
                confidence={result.confidence}
                explanation={result.explanation}
                imagePreview={imagePreview}
                onReset={handleReset}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Index;
