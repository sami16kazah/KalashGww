"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  type?: "success" | "error" | "info";
}

const Modal = ({ isOpen, onClose, title, description, type = "success" }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#0F0F0F] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Glow Effect */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${type === 'error' ? 'from-red-500 to-red-900' : 'from-[#FF6B00] to-[#FF8533]'}`} />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className={`mb-6 p-4 rounded-full ${type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-[#FF6B00]/10 text-[#FF6B00]'}`}>
                {type === 'error' ? (
                  <AlertCircle size={32} />
                ) : (
                  <CheckCircle size={32} />
                )}
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {description}
              </p>

              <button
                onClick={onClose}
                className={`w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-lg ${
                  type === 'error' 
                    ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
                    : 'bg-[#FF6B00] hover:bg-[#FF8533] shadow-[#FF6B00]/20'
                }`}
              >
                {type === 'error' ? 'Close' : 'Continue'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
