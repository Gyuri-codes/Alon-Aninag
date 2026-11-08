import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { PageHeader } from '../components/PageHeader';
import { ROOMS_DATA, RESORT_IMAGES } from '../data/resortData';
import { Room } from '../types';
import { 
  Bed, 
  Users, 
  Maximize, 
  Wifi, 
  Eye, 
  Check, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Coffee, 
  ShieldCheck, 
  ChevronRight,
  X,
  Star
} from 'lucide-react';

export const RoomsPage: React.FC = () => {
  const { formatPrice, navigateTo, searchQuery, t } = useResort();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedRoomModal, setSelectedRoomModal] = useState<Room | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const categories = [
    { id: 'all', label: t('allAccommodationsTab', 'All Accommodations (24)'), count: 24 },
    { id: 'beachfront', label: t('allRoomsTab', 'All 20 Beachfront Rooms'), count: 20 },
    { id: 'Villa', label: t('villasTab', 'Sunset Master Villas'), count: 6 },
    { id: 'Suite', label: t('suitesTab', 'Oceanfront Suites'), count: 8 },
    { id: 'Deluxe', label: t('deluxeTab', 'Soul Deluxe Rooms'), count: 6 },
    { id: 'Loft', label: t('loftsTab', 'Barkada Lofts — 4 Standard Rooms'), count: 4 }
  ];

  const filteredRooms = ROOMS_DATA.filter((room) => {
    let matchesCategory = true;
    if (activeCategory === 'all') {
      matchesCategory = true;
    } else if (activeCategory === 'beachfront') {
      matchesCategory = room.roomClassification === 'Beachfront';
    } else if (activeCategory === 'Loft' || activeCategory === 'Standard') {
      matchesCategory = room.roomClassification === 'Standard' || room.category === 'Standard' || room.category === 'Loft';
    } else {
      matchesCategory = room.category === activeCategory;
    }

    const matchesSearch = !searchQuery || 
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleBookRoom = (roomId: string) => {
    navigateTo('booking', { roomId });
  };

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <PageHeader 
        title={t('roomsPageTitle', 'Boutique Accommodations')}
        subtitle={t('roomsPageSubtitle', '20 intimate sea-facing beachfront sanctuaries and 4 standard loft accommodations crafted with warm natural wood, crisp white linens, and direct access to Poblacion Beach.')}
        badge={t('roomsPageBadge', '20 Beachfront Rooms • 4 Standard Rooms (24 Total Units)')}
        bgImage={RESORT_IMAGES.suite}
      />

      {/* 1. Category Filter Strip */}
      <section className="py-8 bg-white dark:bg-[#0E1720] border-b border-stone-200 dark:border-stone-800 sticky top-16 sm:top-20 z-30 backdrop-blur-md bg-white/95 dark:bg-[#0E1720]/95 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-sm text-xs sm:text-sm font-semibold uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
                    activeCategory === cat.id
                      ? 'bg-[#006D77] text-white shadow-sm'
                      : 'bg-stone-100 dark:bg-[#131F2A] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat.id ? 'bg-white/25 text-white' : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="text-xs text-stone-500 dark:text-stone-400 font-medium hidden sm:block">
              {activeCategory === 'beachfront' ? (
                <>
                  {t('showingBeachfrontRooms', 'Showing')} <strong>3 {t('beachfrontCategories', 'beachfront categories')}</strong> ({t('beachfrontUnitsTotal', '20 units total')})
                </>
              ) : activeCategory === 'Loft' || activeCategory === 'Standard' ? (
                <>
                  {t('showingStandardRooms', 'Showing')} <strong>{t('loftsTab', 'Barkada Lofts — 4 Standard Rooms')}</strong>
                </>
              ) : (
                <>
                  {t('showingRooms', 'Showing')} <strong>{filteredRooms.length} {t('categoriesLabel', 'categories')}</strong> ({t('totalUnitsDesc', '24 units: 20 beachfront + 4 standard')})
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Rooms Showcase Grid */}
      <section className="py-16 bg-[#F8F5F2] dark:bg-[#0B131A] border-b border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white dark:bg-[#131F2A] rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with View Badge */}
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* View Type Badge */}
                  <div className="absolute top-4 left-4 bg-black/65 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-sm font-medium flex items-center gap-1.5 border border-white/20 uppercase tracking-wider">
                    <Eye className="w-3.5 h-3.5 text-[#83C5BE]" />
                    <span>{t(room.view, room.view)}</span>
                  </div>

                  {/* Available Units Badge */}
                  <div className="absolute top-4 right-4 bg-[#E29578] text-white text-[11px] px-3 py-1 rounded-sm font-bold uppercase tracking-wider shadow-sm">
                    {room.availableUnits} / {room.totalUnits} {t('unitsAvailable', 'Units Available')}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header & Category */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#006D77] dark:text-[#83C5BE]">
                        {room.displayCategory || (room.category === 'Standard' || room.category === 'Loft' ? 'Barkada Lofts — 4 Standard Rooms' : `${room.category} • Beachfront`)}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{room.rating}</span>
                        <span className="text-stone-400 font-normal">({room.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-white mb-2">
                      {room.name}
                    </h3>

                    <p className="font-serif italic text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-4">
                      "{room.tagline}"
                    </p>

                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light mb-6">
                      {room.description}
                    </p>

                    {/* Room Specs Bar */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-lg bg-stone-50 dark:bg-[#0E1720] border border-stone-200 dark:border-stone-800 mb-6 text-xs text-stone-700 dark:text-stone-300">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE] shrink-0" />
                        <span>{t('upToGuests', 'Up to')} {room.capacity.maxTotal} {t('guestsCount', 'Guests')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE] shrink-0" />
                        <span className="truncate">{room.bedType}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE] shrink-0" />
                        <span>{room.sizeSqM} {t('sqMeters', 'sq.m')}</span>
                      </div>
                    </div>

                    {/* Signature Inclusions */}
                    <div className="space-y-2 mb-6">
                      <div className="text-[11px] uppercase tracking-wider font-bold text-stone-500 dark:text-stone-400">
                        {t('inclusionsHighlights', 'Inclusions & Highlights:')}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {room.features.slice(0, 4).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 font-light">
                            <Check className="w-3.5 h-3.5 text-[#006D77] dark:text-[#83C5BE] shrink-0" />
                            <span className="truncate">{t(feat, feat)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                        {t('startingFrom', 'Starting from')}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-[#006D77] dark:text-[#83C5BE]">
                          {formatPrice(room.pricePHP)}
                        </span>
                        <span className="text-xs text-stone-500 dark:text-stone-400">{t('perNightLabel', '/ night')}</span>
                      </div>
                      <div className="text-[10px] text-stone-400">
                        {t('includesBreakfast', 'Includes breakfast for 2 & high-speed Wi-Fi')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => setSelectedRoomModal(room)}
                        className="flex-1 sm:flex-none px-4 py-2.5 border border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs uppercase tracking-wider font-semibold rounded-sm transition cursor-pointer"
                      >
                        {t('viewRoomDetailsBtn', 'View Details')}
                      </button>
                      <button
                        onClick={() => handleBookRoom(room.id)}
                        className="flex-1 sm:flex-none px-5 py-2.5 bg-[#006D77] hover:bg-[#00555d] text-white text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{t('reserveNowBtn', 'Reserve Now')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Inclusions Standard Across All 20 Rooms */}
      <section className="py-20 bg-white dark:bg-[#0E1720] border-b border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-white font-normal mb-3">
              {t('inclusionsHighlights', 'Inclusions & Highlights:')}
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 font-light">
              {t('heroDescription', 'An intimate 20-room beachfront retreat on the golden sands of Poblacion Beach.')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { icon: Coffee, title: t('catBreakfast', 'Breakfast'), desc: t('includesBreakfast', 'Includes breakfast for 2') },
              { icon: Wifi, title: t('facilitiesStarlink', 'Starlink Wi-Fi'), desc: '150+ Mbps' },
              { icon: Bed, title: t('pillar2Title', 'Organic Bedding'), desc: '300-thread count' },
              { icon: ShieldCheck, title: t('facilitiesGenerator', '24/7 Security & Power'), desc: 'Generator standby' },
              { icon: Sparkles, title: t('wellnessTitle', 'Artisan Bath Essentials'), desc: 'Virgin coconut oil' },
              { icon: Eye, title: t('statMetersSub', 'Direct Sand Walkout'), desc: '0-meter step out' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-5 rounded-xl bg-[#F8F5F2] dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-stone-900 dark:text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Full Resort Buyout Banner */}
      <section className="py-16 bg-[#006D77] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[#FFDDD2] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#E29578]" />
            <span>{t('dayglowBadge', 'Signature Sipalay Coastal Experience')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight">
            {t('buyoutTitle', 'Planning a Family Reunion, Wedding, or Group Retreat?')}
          </h2>
          <p className="text-sm sm:text-base text-teal-100 max-w-2xl mx-auto font-light leading-relaxed">
            {t('buyoutDesc', 'Reserve all 24 rooms of Alon & Aninag (20 beachfront sanctuaries + 4 standard lofts) for complete resort exclusivity. Accommodate up to 60 guests with dedicated beachfront staff, private dining, and customized acoustic bonfires.')}
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 bg-white text-[#006D77] hover:bg-stone-100 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-sm shadow-md transition cursor-pointer"
            >
              {t('inquireBuyoutBtn', 'Inquire Exclusive Buyout')}
            </button>
          </div>
        </div>
      </section>

      {/* Room Details Modal */}
      {selectedRoomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-[#131F2A] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 dark:border-stone-800 shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white/95 dark:bg-[#131F2A]/95 backdrop-blur-md p-4 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#006D77] dark:text-[#83C5BE]">
                  {selectedRoomModal.category} • {t(selectedRoomModal.view, selectedRoomModal.view)}
                </span>
                <h3 className="font-serif text-2xl font-normal text-stone-900 dark:text-white">
                  {selectedRoomModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRoomModal(null)}
                className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Photo Showcase */}
              <div className="space-y-2">
                <div className="aspect-16/10 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={selectedRoomModal.images[activeImageIndex] || selectedRoomModal.images[0]}
                    alt={selectedRoomModal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {selectedRoomModal.images.length > 1 && (
                  <div className="flex gap-2">
                    {selectedRoomModal.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`w-20 aspect-16/10 rounded-md overflow-hidden border-2 cursor-pointer ${
                          activeImageIndex === i ? 'border-[#006D77]' : 'border-transparent opacity-60'
                        }`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Full Description */}
              <div>
                <h4 className="font-serif text-base font-semibold text-stone-900 dark:text-white mb-2">
                  {t('modalRoomOverview', 'Room Overview')}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                  {selectedRoomModal.description}
                </p>
              </div>

              {/* Full Features List */}
              <div>
                <h4 className="font-serif text-base font-semibold text-stone-900 dark:text-white mb-2">
                  {t('modalFeatures', 'Key Features')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 dark:text-stone-300">
                  {selectedRoomModal.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE] shrink-0" />
                      <span>{t(f, f)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Booking CTA */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-stone-500 uppercase tracking-wider">{t('startingFrom', 'Starting from')}</div>
                  <div className="font-serif text-2xl font-bold text-[#006D77] dark:text-[#83C5BE]">
                    {formatPrice(selectedRoomModal.pricePHP)} <span className="text-xs text-stone-400 font-normal">{t('perNightLabel', '/ night')}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const id = selectedRoomModal.id;
                    setSelectedRoomModal(null);
                    handleBookRoom(id);
                  }}
                  className="px-6 py-3 bg-[#006D77] hover:bg-[#00555d] text-white text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition cursor-pointer"
                >
                  {t('reserveNowBtn', 'Reserve Now')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
