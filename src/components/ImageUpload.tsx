import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File, preview: string) => void;
}

export default function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) onImageSelect(file, event.target.result as string);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) processFile(e.target.files[0]);
  }, [processFile]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg mx-auto"
    >
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`glass-card-elevated p-14 text-center transition-all duration-400 cursor-pointer group ${
          isDragging
            ? 'border-primary/60 shadow-[0_0_40px_-8px_hsl(var(--primary)/0.3)]'
            : 'hover:border-muted-foreground/20 hover:shadow-[0_0_30px_-8px_hsl(var(--primary)/0.15)]'
        }`}
      >
        <div className="flex flex-col items-center gap-7">
          <motion.div
            animate={isDragging ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-18 h-18 rounded-2xl bg-muted/60 flex items-center justify-center w-[72px] h-[72px]"
          >
            {isDragging ? (
              <ImageIcon className="w-8 h-8 text-primary" />
            ) : (
              <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            )}
          </motion.div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">
              {isDragging ? 'Drop your image' : 'Upload an Image'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to browse
            </p>
          </div>

          <label className="cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-glow"
            >
              Analyze Image
            </motion.div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>

          <p className="text-xs text-muted-foreground/50">
            JPG, PNG, WEBP — up to 10MB
          </p>
        </div>
      </div>
    </motion.div>
  );
}
