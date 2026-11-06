import React, { useState } from 'react';
import { RESORT_IMAGES } from '../data/resortData';
import { 
  Sparkles, 
  Eye, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Resort' | 'Rooms' | 'Sunset & Bonfire' | 'Dining' | 'Sipalay';
  image: string;
  caption: string;
}

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isOceanAudioPlaying, setIsOceanAudioPlaying] = useState<boolean>(false);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'Golden Hour at Poblacion Beach',
      category: 'Resort',
      image: RESORT_IMAGES.hero,
      caption: 'Alon Aninag Boutique Resort nestled along the warm sands of Poblacion Beach at sunset.'
    },
    {
      id: 'g-2',
      title: 'Aninag Master Villa Oceanfront Suite',
      category: 'Rooms',
      image: RESORT_IMAGES.suite,
      caption: 'Minimalist wood & white aesthetic interiors facing the panoramic Sipalay sea.'
    },
    {
      id: 'g-3',
      title: 'Sunset Viewing Deck & Acoustic Dining',
      category: 'Sunset & Bonfire',
      image: RESORT_IMAGES.sunsetDeck,
      caption: 'Warm bistro lights, craft cocktails, and gentle ocean breezes at twilight.'
    },
    {
      id: 'g-4',
      title: 'Authentic Negrense Beachfront Feast',
      category: 'Dining',
      image: RESORT_IMAGES.dining,
      caption: 'Grilled local blue marlin, charcoal chicken inasal, and fresh Guimaras mangoes.'
    },
    {
      id: 'g-5',
      title: 'Soul Night Campfire & Acoustic Bonfire',
      category: 'Sunset & Bonfire',
      image: RESORT_IMAGES.bonfire,
      caption: 'Gathering around the glowing driftwood fire under a starry tropical sky.'
    },
    {
      id: 'g-6',
      title: 'Tinagong Dagat Hidden Lagoons & Bridges',
      category: 'Sipalay',
      image: RESORT_IMAGES.islets,
      caption: 'Emerald waters and wooden footbridges connecting limestone islets in Sipalay.'
    },
    {
      id: 'g-7',
      title: 'Aninag Clear Kayak & Floating Tray Experience',
      category: 'Resort',
      image: RESORT_IMAGES.dayglow,
      caption: 'Pristine transparent kayak paddle and aesthetic floating Negrense refreshment tray over calm turquoise waters.'
    },
    {
      id: 'g-8',
      title: 'Sunset Stand-Up Paddleboard & Clear Kayak Shack',
      category: 'Sunset & Bonfire',
      image: RESORT_IMAGES.sunsetPaddleKayak,
      caption: 'Rustic beachfront wooden shack, illuminated clear kayaks, and colorful SUP boards on the golden sands of Poblacion at twilight.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos (8)' },
    { id: 'Resort', label: 'Resort & Grounds' },
    { id: 'Rooms', label: 'Rooms & Villas' },
    { id: 'Sunset & Bonfire', label: 'Sunset & Bonfires' },
    { id: 'Dining', label: 'Negrense Dining' },
    { id: 'Sipalay', label: 'Sipalay Attractions' }
  ];

  const filteredItems = galleryItems.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );

  // Synthesize gentle ocean wave sound using Web Audio API
  const toggleOceanSound = () => {
    if (!isOceanAudioPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          // Generate pink/white noise buffer for ocean surf
          const bufferSize = ctx.sampleRate * 2;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          let lastOut = 0.0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (lastOut + 0.02 * white) / 1.02;
            lastOut = data[i];
            data[i] *= 0.15;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          noise.loop = true;

          // Gentle low-pass filter
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(350, ctx.currentTime);

          noise.connect(filter);
          filter.connect(ctx.destination);
          noise.start();
          (window as any)._oceanNoiseSource = noise;
          (window as any)._oceanAudioCtx = ctx;
        }
      } catch {
        // Fallback gracefully
      }
      setIsOceanAudioPlaying(true);
    } else {
      if ((window as any)._oceanNoiseSource) {
        try {
          (window as any)._oceanNoiseSource.stop();
          (window as any)._oceanAudioCtx?.close();
        } catch {}
      }
      setIsOceanAudioPlaying(false);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-[#0B131A] border-b border-[#E8DFC8] dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADFCB] dark:bg-stone-800 text-[#5C4E3F] dark:text-stone-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C88A32] dark:text-[#E4A853]" />
              Visual Sanctuary
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241D] dark:text-white tracking-tight mb-2">
              Resort Visual Gallery
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5A48] dark:text-stone-300">
              Wood & white aesthetics, warm golden lights, and the soulful ambiance of Poblacion Beach.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleOceanSound}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition cursor-pointer border ${
                isOceanAudioPlaying
                  ? 'bg-[#508991] text-white border-[#508991] animate-pulse'
                  : 'bg-[#FAF7F2] dark:bg-stone-800 text-[#4A3E31] dark:text-stone-300 border-[#DDD0B9] dark:border-stone-700 hover:bg-[#F3EDE2] dark:hover:bg-stone-700'
              }`}
              title="Toggle Ambient Sipalay Ocean Surf Sound"
            >
              {isOceanAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#8C7B68] dark:text-stone-400" />}
              <span>{isOceanAudioPlaying ? 'Ocean Sound: ON' : 'Play Ambient Waves'}</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#C88A32] text-white shadow-xs'
                  : 'bg-[#FAF7F2] dark:bg-[#131F2A] border border-[#DDD0B9] dark:border-stone-700 text-[#5C4E3F] dark:text-stone-300 hover:bg-[#F0E7D8] dark:hover:bg-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-square bg-[#EADFCB] dark:bg-stone-800 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold text-[#E4A853] mb-1">
                  {item.category}
                </span>
                <h4 className="font-serif text-sm font-bold leading-tight mb-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-white/80 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() => setSelectedPhotoIndex(prev => (prev! > 0 ? prev! - 1 : filteredItems.length - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => setSelectedPhotoIndex(prev => (prev! < filteredItems.length - 1 ? prev! + 1 : 0))}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full text-center">
            <img
              src={filteredItems[selectedPhotoIndex].image}
              alt={filteredItems[selectedPhotoIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto mx-auto rounded-2xl shadow-2xl object-contain"
            />
            <div className="mt-4 text-white">
              <span className="text-xs font-bold text-[#E4A853] uppercase">
                {filteredItems[selectedPhotoIndex].category}
              </span>
              <h3 className="font-serif text-xl font-bold mt-1">
                {filteredItems[selectedPhotoIndex].title}
              </h3>
              <p className="text-xs text-white/80 max-w-xl mx-auto mt-1">
                {filteredItems[selectedPhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
