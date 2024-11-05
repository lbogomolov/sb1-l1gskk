import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { GalleryGrid } from './components/GalleryGrid';
import { UploadModal } from './components/UploadModal';
import { ViewModal } from './components/ViewModal';
import { getAllItems, addItem, deleteItem } from './lib/db';
import type { GalleryItem } from './types/gallery';

function App() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const loadedItems = await getAllItems();
    setItems(loadedItems.sort((a, b) => b.createdAt - a.createdAt));
  };

  const handleAddItem = async (data: { title: string; description: string; images: string[] }) => {
    const newItem: GalleryItem = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: Date.now(),
    };
    await addItem(newItem);
    await loadItems();
  };

  const handleDeleteItem = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteItem(id);
      await loadItems();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Images
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GalleryGrid
          items={items}
          onDelete={handleDeleteItem}
          onView={setSelectedItem}
        />
      </main>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={handleAddItem}
      />

      <ViewModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}

export default App;