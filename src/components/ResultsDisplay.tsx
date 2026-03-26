import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, ShieldAlert, RotateCcw } from 'lucide-react';

interface ResultsDisplayProps {
  score: number;
  confidence: number;
  explanation: string;
  imagePreview: string;
  onReset: () => void;
}

export default function ResultsDisplay({
  score,
  confidence,
  explanation,
  imagePreview,
  onReset,
}: ResultsDisplayProps) {
  const percentage = (score / 10) * 100;
  const circumference = 2 * Math.PI * 54;

  const getScoreColor = () => {
    if (score <= 3) return 'hsl(var(--success))';
    if (score <= 7) return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  const getLabel = () => {
    if (score <= 3) return 'Likely Real';
    if (score <= 7) return 'Possibly Edited';
    return 'Likely AI-Generated';
  };

  const getLabelIcon = () => {
    if (score <= 3) return <CheckCircle className="w-5 h-5" />;
    if (score <= 7) return <AlertTriangle className="w-5 h-5" />;
    return <ShieldAlert className="w-5 h-5" />;
  };

  const getTagLabel = () => {
    if (score <= 3) return 'Human-like';
    if (score <= 7) return 'Edited';
    return 'AI Generated';
  };

  const getScoreTextClass = () => {
    if (score <= 3) return 'text-success';
    if (score <= 7) return 'text-warning';
    return 'text-destructive';
  };

  const points = explanation
    .split(/\.\s+|\n/)
    .map((s) => s.trim().replace(/^[-•]\s*/, ''))
    .filter((s) => s.length > 5)
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto space-y-5"
    >
      <div className="grid md:grid-cols-2 gap-5">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card overflow-hidden"
        >
          <img
            src={imagePreview}
            alt="Analyzed"
            className="w-full h-64 md:h-full object-cover"
          />
        </motion.div>

        {/* Score */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="glass-card-elevated p-8 flex flex-col items-center justify-center gap-6"
        >
          {/* Tag */}
          <span className="tag-indicator">
            {getLabelIcon()}
            {getTagLabel()}
          </span>

          {/* Ring */}
          <div className="relative">
            <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60" cy="60" r="54" fill="none"
                className="stroke-muted"
                strokeWidth="6"
              />
              <motion.circle
                cx="60" cy="60" r="54" fill="none"
                stroke={getScoreColor()}
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - (circumference * percentage) / 100 }}
                transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className={`text-4xl font-bold ${getScoreTextClass()}`}
              >
                {score.toFixed(1)}
              </motion.span>
            </div>
          </div>

          {/* Label */}
          <div className={`flex items-center gap-2 font-semibold ${getScoreTextClass()}`}>
            {getLabelIcon()}
            <span>{getLabel()}</span>
          </div>

          {/* Confidence */}
          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Confidence</span>
              <span className="font-semibold text-foreground">{confidence}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))' }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Explanation */}
      {points.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 space-y-3"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Analysis Details
          </h3>
          <ul className="space-y-2.5">
            {points.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))' }}
                />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Reset */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onReset}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-glow py-4 text-sm font-semibold"
      >
        <RotateCcw className="w-4 h-4" />
        Analyze Another Image
      </motion.button>
    </motion.div>
  );
}
