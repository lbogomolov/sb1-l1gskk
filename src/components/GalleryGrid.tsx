import React from 'react';
import Masonry from 'react-masonry-css';
import { Trash2, ZoomIn } from 'lucide-react';
import type { GalleryItem } from '../types/gallery';

interface Props {
  items: GalleryItem[];
  onDelete: (id: string) => void;
  onView: (item: GalleryItem) => void;
}

const breakpointColumns = {
  default: 4,
  1536: 3,
  1280: 3,
  1024: 2,
  768: 2,
  640: 1,
};

export const GalleryGrid: React.FC<Props> = ({ items, onDelete, onView }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex -ml-4 w-auto"
      columnClassName="pl-4 bg-clip-padding"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="mb-4 break-inside-avoid"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden group relative">
            <div className="aspect-square overflow-hidden">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  {item.images.length} {item.images.length === 1 ? 'image' : 'images'}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onView(item)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ZoomIn className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Masonry>
  );
};