import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Upload, 
  File, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Music,
  FileCode,
  Archive,
  Check,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

interface AttachmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (files: File[]) => void;
}

export function AttachmentModal({ isOpen, onClose, onSend }: AttachmentModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith('image/')) return ImageIcon;
    if (type.startsWith('video/')) return Video;
    if (type.startsWith('audio/')) return Music;
    if (type.includes('pdf') || type.includes('document')) return FileText;
    if (type.includes('zip') || type.includes('rar')) return Archive;
    if (type.includes('code') || type.includes('text')) return FileCode;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one file');
      return;
    }

    setIsUploading(true);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSend(selectedFiles);
    toast.success(`${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} sent successfully!`);
    setSelectedFiles([]);
    setIsUploading(false);
    onClose();
  };

  const handleClose = () => {
    if (!isUploading) {
      setSelectedFiles([]);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-[101]"
          >
            <div className="bg-[#0F0F0F] border border-purple-500/20 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Upload className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-white text-xl font-bold">Send Attachment</h2>
                      <p className="text-gray-400 text-sm">Upload files to send in your message</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    disabled={isUploading}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Drop Zone */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-xl p-8 mb-6 transition-all ${
                    isDragging
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50'
                  }`}
                >
                  <div className="text-center">
                    <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-purple-400' : 'text-gray-500'}`} />
                    <p className="text-white font-medium mb-2">
                      {isDragging ? 'Drop files here' : 'Drag and drop files here'}
                    </p>
                    <p className="text-gray-400 text-sm mb-4">or</p>
                    <label className="inline-block">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                        disabled={isUploading}
                      />
                      <span className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium cursor-pointer hover:shadow-lg transition-all inline-block">
                        Browse Files
                      </span>
                    </label>
                    <p className="text-gray-500 text-xs mt-3">
                      Max file size: 10MB • Supported: Images, Videos, Documents, Archives
                    </p>
                  </div>
                </div>

                {/* Selected Files */}
                {selectedFiles.length > 0 && (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <File className="w-4 h-4" />
                      Selected Files ({selectedFiles.length})
                    </h3>
                    {selectedFiles.map((file, index) => {
                      const Icon = getFileIcon(file);
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-purple-500/20">
                            <Icon className="w-5 h-5 text-purple-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">{file.name}</p>
                            <p className="text-gray-500 text-xs">{formatFileSize(file.size)}</p>
                          </div>
                          {!isUploading && (
                            <button
                              onClick={() => removeFile(index)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-purple-500/20 bg-[#0A0A0A]">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-gray-400 text-sm">
                    {selectedFiles.length > 0
                      ? `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected`
                      : 'No files selected'}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleClose}
                      disabled={isUploading}
                      className="px-6 py-2.5 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSend}
                      disabled={selectedFiles.length === 0 || isUploading}
                      className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Send Files
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
