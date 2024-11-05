import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from '../types/gallery';

interface Props {
  item: GalleryItem | null;
  onClose: () => void;
}

export const ViewModal: React.FC<Props> = ({ item, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!item) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-6xl mx-4">
        <div className="relative aspect-[16/9]">
          <img
            src={item.images[currentImageIndex]}
            alt={`${item.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-contain"
          />
          
          {item.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/75 rounded-full text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/75 rounded-full text-white"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        <div className="mt-4 text-white">
          <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
          <p className="text-gray-300">{item.description}</p>
          <div className="mt-4 flex gap-2">
            {item.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};