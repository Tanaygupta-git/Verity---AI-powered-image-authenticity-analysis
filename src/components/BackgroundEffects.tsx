import { motion } from 'framer-motion';

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Primary blob */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="gradient-blob w-[500px] h-[500px] -top-40 -right-40 animate-pulse-glow"
        style={{ background: 'hsl(217 100% 65%)' }}
      />
      {/* Secondary blob */}
      <motion.div
        animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="gradient-blob w-[400px] h-[400px] -bottom-32 -left-32 animate-pulse-glow"
        style={{ background: 'hsl(255 60% 65%)', animationDelay: '2s' }}
      />
      {/* Gold accent blob */}
      <motion.div
        animate={{ x: [0, 20, -10, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="gradient-blob w-[250px] h-[250px] top-1/3 left-1/2 opacity-[0.08]"
        style={{ background: 'hsl(43 76% 52%)' }}
      />
    </div>
  );
}
