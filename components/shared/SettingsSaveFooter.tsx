'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface SettingsSaveFooterProps {
  isLoading: boolean;
  isModified: boolean;
  onSave: () => void;
  saveText?: string;
}

export function SettingsSaveFooter({ 
  isLoading, 
  isModified, 
  onSave, 
  saveText = "Guardar Cambios" 
}: SettingsSaveFooterProps) {
  if (!isModified) return null;

  return (
    <div className="sticky bottom-0 left-0 right-0 mt-6 py-4 bg-background/80 backdrop-blur-sm z-10 flex justify-center">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          onClick={onSave}
          disabled={isLoading || !isModified}
          size="lg"
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md px-6 font-medium text-neutral-50 transition-all duration-300 hover:scale-105"
        >
          <span className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-purple-600 to-indigo-600 transition-all duration-300 group-hover:bottom-full"></span>
          <span className="relative"> {isLoading ? 'Guardando...' : saveText}</span>
        </Button>
      </motion.div>
    </div>
  );
} 