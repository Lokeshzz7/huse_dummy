import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, X, Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  businessName: string;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, businessName }: DeleteConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md bg-theme-card border border-red-500/30 rounded-2xl p-6 shadow-2xl">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-red-500/10 rounded-full">
                  <AlertCircle className="w-12 h-12 text-red-500" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-theme-primary text-center mb-2">
                Delete Business?
              </h3>
              <p className="text-theme-tertiary text-center mb-6">
                Are you sure you want to delete <span className="font-semibold text-theme-primary">"{businessName}"</span>? 
                This action cannot be undone and will remove all associated data.
              </p>

              {/* Warning Box */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-400 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>All applications, analytics, and business data will be permanently deleted.</span>
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-theme-secondary text-theme-primary rounded-lg hover:bg-theme-tertiary transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
