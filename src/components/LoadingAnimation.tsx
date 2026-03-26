import { motion } from 'framer-motion';

export default function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center gap-8 py-20"
    >
      <div className="relative w-20 h-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <svg className="w-full h-full" viewBox="0 0 80 80">
            <circle
              cx="40" cy="40" r="34" fill="none"
              className="stroke-muted"
              strokeWidth="4"
            />
            <circle
              cx="40" cy="40" r="34" fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="70 144"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(217 100% 65%)" />
                <stop offset="100%" stopColor="hsl(255 60% 65%)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
        {/* Glow */}
        <div className="absolute inset-0 rounded-full opacity-20 blur-xl"
          style={{ background: 'linear-gradient(135deg, hsl(217 100% 65%), hsl(255 60% 65%))' }}
        />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-bold text-foreground">
          Analyzing image…
        </h3>
        <p className="text-sm text-muted-foreground">
          AI is evaluating authenticity
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1/2 h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, hsl(217 100% 65%), hsl(255 60% 65%))' }}
        />
      </div>
    </motion.div>
  );
}
