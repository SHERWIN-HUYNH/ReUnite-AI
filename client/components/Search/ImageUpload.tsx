'use client'
import { useRef, memo } from 'react'
import Image from 'next/image'
import { ImageUp, X, CheckCircle2 } from 'lucide-react'

interface ImageUploadProps {
  previewUrl: string;
  onFileChange: (file: File) => void;
  onClear: () => void;
}

const ImageUpload = memo(({ previewUrl, onFileChange, onClear }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="h-full flex items-center">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleFileSelect}
      />
      
      {!previewUrl ? (
        <label
          htmlFor="image-upload"
          className="w-full cursor-pointer group"
        >
          <div className="border-2 border-dashed border-indigo-300 dark:border-indigo-600 rounded-xl p-6
            bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-slate-700/50 dark:to-slate-700/50
            hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/80 dark:hover:bg-slate-700/80
            transition-all duration-300">
            
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                  <ImageUp className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  Upload Photo
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Click or drag to upload
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  JPG, PNG (Max 10MB)
                </p>
              </div>
            </div>
          </div>
        </label>
      ) : (
        <div className="w-full rounded-xl overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-800 border-2 border-green-300 dark:border-green-700 p-4">
          <div className="flex items-center gap-4">
            {/* Preview Image */}
            <div className="relative group/preview flex-shrink-0">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-white dark:border-slate-800 shadow-lg">
                <Image 
                  src={previewUrl} 
                  alt="Preview" 
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-lg">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            
            {/* Success Message */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-green-700 dark:text-green-400 truncate">
                  Photo uploaded
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                Ready to search with AI
              </p>
              <button
                type="button"
                onClick={onClear}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium transition-all shadow-sm hover:shadow border border-gray-200 dark:border-slate-600"
              >
                <X className="w-3 h-3" />
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
