import { motion } from 'framer-motion';
import verityLogo from '@/assets/verity-logo.png';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ backdropFilter: 'blur(16px)', background: 'hsl(240 10% 4% / 0.6)' }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={verityLogo} alt="Verity" width={36} height={36} />
          <span className="text-lg font-bold tracking-tight text-foreground">Verity</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors duration-300">How it Works</a>
          <a href="#" className="hover:text-foreground transition-colors duration-300">API</a>
          <a href="#" className="btn-glow !px-5 !py-2 !text-xs">Get Started</a>
        </div>
      </div>
    </motion.nav>
  );
}
