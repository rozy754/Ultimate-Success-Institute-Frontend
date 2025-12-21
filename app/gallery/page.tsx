"use client"

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Add your library images here
const LIBRARY_IMAGES = [
  { url: '/camera.png', alt: 'Library View 1', caption: 'Camera view' },
  { url: '/coaching.jpeg', alt: 'Library View 2', caption: 'Coaching Classes' },
  { url: '/glass.png', alt: 'Library View 3', caption: 'Entrance' },
  { url: '/lab.jpeg', alt: 'Library View 4', caption: 'Computer Lab' },
  { url: '/parking.png', alt: 'Library View 5', caption: 'Parking Area' },
  { url: '/regseat.png', alt: 'Library View 6', caption: 'Regular Seats' },
  { url: '/ro.png', alt: 'Library View 6', caption: 'Pure Drinking Water' },
  { url: '/shelf.png', alt: 'Library View 6', caption: 'Lockers' },
  { url: '/special.jpeg', alt: 'Library View 6', caption: 'Special Seats' },
  { url: '/wali.jpeg', alt: 'Library View 6', caption: 'At Wali Complex' },


  // Add more images as needed
];

export default function LibraryGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? LIBRARY_IMAGES.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === LIBRARY_IMAGES.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground"> Institute Gallery</h1>
              <p className="text-muted-foreground mt-2">Explore our all facilities</p>
            </div>
            <Button variant="outline" asChild>
              <a href="/">← Back to Home</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LIBRARY_IMAGES.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3] bg-muted"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-semibold">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="max-w-6xl w-full">
            <img
              src={LIBRARY_IMAGES[selectedImage].url}
              alt={LIBRARY_IMAGES[selectedImage].alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4 text-lg">
              {LIBRARY_IMAGES[selectedImage].caption}
            </p>
            <p className="text-white/60 text-center mt-2">
              {selectedImage + 1} / {LIBRARY_IMAGES.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}