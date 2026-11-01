import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { PageHeader } from '../components/PageHeader';
import { RESORT_IMAGES, SOCIAL_POSTS } from '../data/resortData';
import { 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  Volume2, 
  VolumeX, 
  Heart, 
  Eye,
  Camera
} from 'lucide-react';

interface GalleryPhoto {
  id: string;
  title: string;
  category: 'rooms' | 'sunset' | 'dayglow' | 'dining' | 'bonfire';
  categoryLabel: string;
  image: string;
  caption: string;
}

export const GalleryPage: React.FC = () => {
  const { navigateTo } = useResort();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [tourHotspot, setTourHotspot] = useState<'deck' | 'beach' | 'villa' | 'lounge'>('deck');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const photos: GalleryPhoto[] = [
    {
      id: 'p-1',
      title: 'Golden Hour on Poblacion Shoreline',
      category: 'sunset',
      categoryLabel: 'Beachfront & Sunset',
      image: RESORT_IMAGES.hero,
      caption: 'Alon & Aninag Boutique Resort bathed in the radiant golden reflections of the Sulu Sea sunset.'
    },
    {
      id: 'p-2',
      title: 'The Aninag Dayglow Clear Kayak Experience',
      category: 'dayglow',
      categoryLabel: 'Dayglow & Kayaks',
      image: RESORT_IMAGES.dayglow,
      caption: '100% transparent kayak gliding effortlessly over shallow, tranquil Poblacion Bay waters.'
    },
    {
      id: 'p-3',
      title: 'Aninag Sunset Master Villa Interior',
      category: 'rooms',
      categoryLabel: 'Rooms & Suites',
      image: RESORT_IMAGES.suite,
      caption: 'Handcrafted teak wood headboards, clean minimalist lines, and direct oceanfront balcony view.'
    },
    {
      id: 'p-4',
      title: 'Artisanal Floating Negrense Snack Tray',
      category: 'dayglow',
      categoryLabel: 'Dayglow & Kayaks',
      image: RESORT_IMAGES.floatingTray,
      caption: 'Woven bamboo floating tray served with cold-brew lemongrass-pandan tea and native Negrense delicacies.'
    },
    {
      id: 'p-5',
      title: 'Sunset Viewing Deck & Acoustic Dining',
      category: 'dining',
      categoryLabel: 'Dining & Soul Bar',
      image: RESORT_IMAGES.sunsetDeck,
      caption: 'Warm bistro ambient lights, rattan canopies, and gentle sea breezes at dusk.'
    },
    {
      id: 'p-6',
      title: 'Beachfront Soul Bonfire Under the Stars',
      category: 'bonfire',
      categoryLabel: 'Nighttime Bonfire',
      image: RESORT_IMAGES.bonfire,
      caption: 'Nightly gathering around the driftwood ember pit for toasted marshmallows and acoustic songs.'
    },
    {
      id: 'p-7',
      title: 'Fresh Charcoal-Grilled Catch & Cocktails',
      category: 'dining',
      categoryLabel: 'Dining & Soul Bar',
      image: RESORT_IMAGES.dining,
      caption: 'Locally caught Sipalay seafood grilled over coconut charcoal and paired with signature coolers.'
    },
    {
      id: 'p-8',
      title: 'Stand-Up Paddleboard Sunset Glide',
      category: 'dayglow',
      categoryLabel: 'Dayglow & Kayaks',
      image: RESORT_IMAGES.sunsetPaddleKayak,
      caption: 'Paddling gently into the glowing horizon during our signature late afternoon session.'
    },
    {
      id: 'p-9',
      title: 'Tinagong Dagat Islet Labyrinth',
      category: 'sunset',
      categoryLabel: 'Beachfront & Sunset',
      image: RESORT_IMAGES.islets,
      caption: 'Emerald saltwater lagoons and limestone hanging bridges just 18 minutes from our resort.'
    },
    {
      id: 'p-10',
      title: 'Pure Golden Sand Walkout',
      category: 'sunset',
      categoryLabel: 'Beachfront & Sunset',
      image: RESORT_IMAGES.beachDay,
      caption: 'Soft, golden sand immediately greeting your feet right outside your private room veranda.'
    },
    {
      id: 'p-11',
      title: 'Marine Sanctuary Snorkeling in Sipalay',
      category: 'dayglow',
      categoryLabel: 'Dayglow & Kayaks',
      image: RESORT_IMAGES.diving,
      caption: 'Vibrant living coral gardens and tropical marine life flourishing in nearby Campomanes Bay.'
    },
    {
      id: 'p-12',
      title: 'Coastal Cottage Aesthetics',
      category: 'rooms',
      categoryLabel: 'Rooms & Suites',
      image: RESORT_IMAGES.cottage,
      caption: 'Thoughtful native architectural touches celebrating the natural materials of Negros Occidental.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'rooms', label: 'Rooms & Suites' },
    { id: 'sunset', label: 'Beachfront & Sunsets' },
    { id: 'dayglow', label: 'Dayglow & Kayaks' },
    { id: 'dining', label: 'Dining & Bar' },
    { id: 'bonfire', label: 'Night Bonfire' }
  ];

  const filteredPhotos = photos.filter(
    p => activeCategory === 'all' || p.category === activeCategory
  );

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const tourSpots = {
    deck: {
      name: 'Sunset Viewing Deck',
      desc: 'Perched 3 meters above the shoreline with uninterrupted panoramic views of Poblacion Bay.',
      image: RESORT_IMAGES.sunsetDeck
    },
    beach: {
      name: 'Poblacion Beach Frontage',
      desc: '0-meter sand walkout where transparent kayaks and daybeds rest on golden sands.',
      image: RESORT_IMAGES.hero
    },
    villa: {
      name: 'Aninag Master Villa Veranda',
      desc: 'Private wooden terrace with handwoven hammock facing the setting sun.',
      image: RESORT_IMAGES.suite
    },
    lounge: {
      name: 'Driftwood Bonfire Pit',
      desc: 'Gathering circle for evening acoustic jamming and warm Negrense hot chocolate.',
      image: RESORT_IMAGES.bonfire
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <PageHeader 
        title="Resort Visual Gallery"
        subtitle="Step into our coastal haven through authentic photography capturing golden hours, clear kayaks, intimate suites, and soulful beach memories."
        badge="Photography & 360° Visual Tours"
        bgImage={RESORT_IMAGES.sunsetDeck}
      />

      {/* 1. Category Filter Buttons */}
      <section className="py-8 bg-white dark:bg-[#0E1720] border-b border-stone-200 dark:border-stone-800 sticky top-16 sm:top-20 z-30 backdrop-blur-md bg-white/95 dark:bg-[#0E1720]/95 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-sm text-xs sm:text-sm font-semibold uppercase tracking-wider transition cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#006D77] text-white shadow-sm'
                      : 'bg-stone-100 dark:bg-[#131F2A] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-stone-500 dark:text-stone-400 font-medium hidden sm:block">
              {filteredPhotos.length} high-resolution photographs
            </div>
          </div>
        </div>
      </section>

      {/* 2. Photo Gallery Grid */}
      <section className="py-16 bg-[#F8F5F2] dark:bg-[#0B131A] border-b border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => openLightbox(index)}
                className="group relative rounded-xl overflow-hidden bg-white dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Photo Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-200 dark:bg-stone-800">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-bold border border-white/20">
                    {photo.categoryLabel}
                  </div>

                  {/* Hover Overlay Icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-4">
                  <h3 className="font-serif text-base font-semibold text-stone-900 dark:text-white group-hover:text-[#006D77] dark:group-hover:text-[#83C5BE] transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 font-light">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 360° Virtual Tour Section */}
      <section className="py-20 bg-white dark:bg-[#0E1720] border-b border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-[#006D77] dark:text-[#83C5BE] text-xs font-bold uppercase tracking-widest mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Virtual Experience</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-white tracking-tight mb-4">
              Explore Alon & Aninag in 360°
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light">
              Click the hotspots below to experience panoramic viewpoints across the resort before your arrival.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl relative bg-stone-900">
            {/* Viewport Frame */}
            <div className="relative aspect-16/9 sm:aspect-21/9 overflow-hidden">
              <img
                src={tourSpots[tourHotspot].image}
                alt={tourSpots[tourHotspot].name}
                className="w-full h-full object-cover transition-all duration-700 scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

              {/* Top View Title & Audio */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold border border-white/20">
                  <Compass className="w-3.5 h-3.5 text-[#83C5BE] animate-spin-slow" />
                  <span>360° Viewing: {tourSpots[tourHotspot].name}</span>
                </div>

                <button
                  onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                  className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20 cursor-pointer hover:bg-black/80 transition"
                  title="Toggle coastal ocean breeze audio"
                >
                  {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 text-[#83C5BE]" /> : <VolumeX className="w-3.5 h-3.5 text-stone-400" />}
                  <span className="hidden sm:inline">{isAudioPlaying ? 'Ocean Waves: Active' : 'Sound: Off'}</span>
                </button>
              </div>

              {/* Bottom Hotspot Description */}
              <div className="absolute bottom-6 left-6 right-6 text-white max-w-xl">
                <h3 className="font-serif text-xl sm:text-2xl font-normal mb-1">
                  {tourSpots[tourHotspot].name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-light">
                  {tourSpots[tourHotspot].desc}
                </p>
              </div>
            </div>

            {/* Hotspot Switcher Buttons */}
            <div className="bg-stone-950 p-4 border-t border-stone-800 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-stone-400 font-bold uppercase tracking-wider mr-2 hidden sm:inline">
                Jump to Viewpoint:
              </span>
              {[
                { id: 'deck', label: '🌅 Sunset Deck' },
                { id: 'beach', label: '🏖️ Poblacion Beach Shore' },
                { id: 'villa', label: '🛏️ Master Villa Veranda' },
                { id: 'lounge', label: '🔥 Evening Bonfire Circle' }
              ].map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setTourHotspot(spot.id as any)}
                  className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                    tourHotspot === spot.id
                      ? 'bg-[#006D77] text-white shadow-sm'
                      : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  {spot.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Guest UGC Polaroids */}
      <section className="py-20 bg-[#F8F5F2] dark:bg-[#0B131A] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-[#006D77] dark:text-[#83C5BE] text-xs font-bold uppercase tracking-widest mb-2">
                <Camera className="w-3 h-3 text-[#E29578]" />
                <span>#GlowAtAlon Moments</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-white font-normal">
                Captured by Guests & Travelers
              </h2>
            </div>
            <button
              onClick={() => navigateTo('booking')}
              className="px-6 py-3 bg-[#006D77] hover:bg-[#00555d] text-white text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition cursor-pointer"
            >
              Plan Your Sipalay Trip
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SOCIAL_POSTS.slice(0, 4).map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-[#131F2A] p-3 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-stone-200 mb-3">
                  <img src={post.image} alt={post.userName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-stone-900 dark:text-white mb-1">
                    <span>{post.userName}</span>
                    <span className="flex items-center gap-1 text-[#E29578]">
                      <Heart className="w-3 h-3 fill-current" />
                      <span>{post.likes}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 font-light line-clamp-2">
                    {post.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Lightbox Card */}
          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <div className="relative max-h-[70vh] rounded-lg overflow-hidden shadow-2xl">
              <img
                src={filteredPhotos[activeLightboxIndex].image}
                alt={filteredPhotos[activeLightboxIndex].title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            {/* Caption & Counter */}
            <div className="mt-4 text-center text-white max-w-xl space-y-1">
              <div className="text-[11px] text-[#83C5BE] font-bold uppercase tracking-widest">
                {filteredPhotos[activeLightboxIndex].categoryLabel} • {activeLightboxIndex + 1} of {filteredPhotos.length}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal">
                {filteredPhotos[activeLightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                {filteredPhotos[activeLightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
