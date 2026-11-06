import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { RESORT_IMAGES, RESORT_INFO, ROOMS_DATA } from '../data/resortData';
import { 
  Calendar, 
  Users, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Wifi, 
  Flame, 
  Coffee, 
  ArrowRight,
  CheckCircle2,
  Sunset,
  Presentation
} from 'lucide-react';

export const Hero: React.FC<{
  onOpenDayglowModal?: (guestType?: 'overnight' | 'daypass') => void;
}> = ({ onOpenDayglowModal }) => {
  const { openBookingModal, formatPrice, t, openPresentation } = useResort();

  // Booking widget form state
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(todayStr);
  const [checkOut, setCheckOut] = useState<string>(tomorrowStr);
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [selectedRoomCategory, setSelectedRoomCategory] = useState<string>('all');
  const [promoCode, setPromoCode] = useState<string>('SOULSUNSET');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetRoom = selectedRoomCategory !== 'all' 
      ? ROOMS_DATA.find(r => r.category.toLowerCase() === selectedRoomCategory.toLowerCase())?.id 
      : ROOMS_DATA[0].id;
    openBookingModal(targetRoom);
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden">
      {/* Background Hero Image with refined Professional Polish ocean teal gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={RESORT_IMAGES.hero}
          alt="Alon Aninag Boutique Beach Resort in Poblacion Beach, Sipalay City at sunset"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-subtle-pan"
        />
        {/* Ocean Teal Radial & Linear Polish Gradients */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0, 50, 55, 0.85) 0%, rgba(0, 109, 119, 0.65) 50%, rgba(0, 109, 119, 0.35) 100%)'
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#1A1A1A] via-transparent to-black/40" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-white/15 backdrop-blur-md border border-white/25 text-stone-200 text-xs font-semibold mb-5 shadow-xs uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#E29578] animate-pulse" />
            <MapPin className="w-3.5 h-3.5 text-[#83C5BE]" />
            <span>Poblacion Beach • Sipalay City, Negros Occidental</span>
          </div>

          {/* Core Tagline & Main Title - Professional Polish Archetype */}
          <p className="text-xs sm:text-sm uppercase tracking-[0.5em] text-[#83C5BE] font-semibold mb-3">
            {t('heroSubtitle', 'Boutique Beach Resort')}
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] mb-6 font-normal">
            {t('heroTitle', 'Where Waves Rest and Souls Glow')}
          </h1>

          <p className="text-sm sm:text-base text-stone-200 max-w-2xl font-light leading-relaxed mb-8">
            {t('heroDescription', 'An intimate 20-room beachfront retreat on the golden sands of Poblacion Beach. Warm wood & white aesthetics, peaceful sunsets, soul bonfires, and genuine Negrense hospitality.')}
          </p>

          {/* New Product Promotional Card: The Aninag Dayglow & Paddle Experience */}
          <div className="mb-8 p-4 sm:p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white max-w-2xl shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E29578] text-white text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                {t('dayglowBadge', 'New Daytime Experience')}
              </span>
              <span className="text-[11px] text-[#83C5BE] font-semibold">
                ₱850/pair (Overnight) • ₱1,200/pair (Day Pass)
              </span>
            </div>

            <h2 className="font-serif text-lg sm:text-xl font-normal text-white">
              {t('dayglowTitle', 'The Aninag Dayglow & Paddle Experience')}
            </h2>

            <p className="font-serif italic text-sm text-[#FFDDD2] mt-0.5 font-light">
              "{t('dayglowTagline', 'Paddle. Relax. Capture the Glow.')}"
            </p>

            <p className="text-xs text-stone-200 mt-2 leading-relaxed">
              {t('dayglowDesc', 'Transparent kayaks, stand-up paddleboards, aesthetic floating Negrense cold-brew tea and snack tray, and reserved beachfront daybed. "Where Waves Rest and Souls Glow."')}
            </p>

            {/* Requested CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 mt-4 pt-3 border-t border-white/15">
              <button
                type="button"
                onClick={() => {
                  if (onOpenDayglowModal) {
                    onOpenDayglowModal('overnight');
                  } else {
                    const el = document.getElementById('dayglow');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-4 py-2 bg-[#006D77] hover:bg-[#00555d] text-white rounded-sm text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <span>{t('bookDayglow', 'Book Dayglow Experience')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => openPresentation(1)}
                className="px-3.5 py-2 bg-gradient-to-r from-teal-700/80 to-[#006D77] hover:from-teal-600 hover:to-[#00555d] text-white border border-teal-400/40 rounded-sm text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                title="View 12-Slide Resort Presentation Mode"
              >
                <Presentation className="w-3.5 h-3.5 text-[#83C5BE]" />
                <span>Presentation (12 Slides)</span>
              </button>

              <a
                href="#dayglow"
                className="px-3.5 py-2 bg-white/20 hover:bg-white/30 text-white rounded-sm text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
              >
                {t('viewPackage', 'View Package')}
              </a>

              <button
                type="button"
                onClick={() => openBookingModal()}
                className="px-3.5 py-2 bg-transparent hover:bg-white/10 text-[#FFDDD2] border border-white/25 rounded-sm text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
              >
                {t('bookYourStay', 'Book Your Stay')}
              </button>
            </div>
          </div>

          {/* Quick Price & Value Chips */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-200 mb-8 font-medium">
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#E29578]" />
              {t('roomsFrom', 'Rooms from')} <strong className="text-[#83C5BE] font-bold">{formatPrice(1800)}</strong> / {t('night', 'night')}
            </span>
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/15">
              <Sunset className="w-3.5 h-3.5 text-[#E29578]" />
              {t('sunsetDeckBonfires', 'Sunset Deck & Night Bonfires')}
            </span>
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/15">
              <Wifi className="w-3.5 h-3.5 text-[#83C5BE]" />
              {t('starlinkWifi', 'Starlink 150+ Mbps Wi-Fi')}
            </span>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => openBookingModal()}
              className="px-7 py-3.5 rounded-sm bg-[#006D77] hover:bg-[#00555d] text-white font-bold text-xs sm:text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl transition cursor-pointer flex items-center gap-2"
            >
              <span>{t('bookNow', 'Book Now')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Interactive Booking Bar at the base of Hero */}
      <div className="relative z-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-8 -mt-6 sm:-mt-10 w-full">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white dark:bg-[#131F2A] rounded-xl p-4 sm:p-6 shadow-2xl border border-stone-200 dark:border-stone-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-center transition-colors"
        >
          {/* Check-In Date */}
          <div className="space-y-1 sm:pr-3 sm:border-r border-stone-200 dark:border-stone-700">
            <label className="block text-[10px] font-bold text-stone-400 dark:text-stone-400 uppercase tracking-widest">
              {t('checkIn', 'Check-In')}
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE] absolute left-2 pointer-events-none" />
              <input
                type="date"
                min={todayStr}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full pl-8 pr-2 py-2 text-xs sm:text-sm font-semibold bg-transparent border-0 text-stone-800 dark:text-stone-100 focus:ring-0 focus:outline-hidden"
                required
              />
            </div>
          </div>

          {/* Check-Out Date */}
          <div className="space-y-1 sm:pr-3 sm:border-r border-stone-200 dark:border-stone-700">
            <label className="block text-[10px] font-bold text-stone-400 dark:text-stone-400 uppercase tracking-widest">
              {t('checkOut', 'Check-Out')}
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE] absolute left-2 pointer-events-none" />
              <input
                type="date"
                min={checkIn || todayStr}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full pl-8 pr-2 py-2 text-xs sm:text-sm font-semibold bg-transparent border-0 text-stone-800 dark:text-stone-100 focus:ring-0 focus:outline-hidden"
                required
              />
            </div>
          </div>

          {/* Guests Count */}
          <div className="space-y-1 sm:pr-3 sm:border-r border-stone-200 dark:border-stone-700">
            <label className="block text-[10px] font-bold text-stone-400 dark:text-stone-400 uppercase tracking-widest">
              {t('guests', 'Guests')}
            </label>
            <div className="relative flex items-center">
              <Users className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE] absolute left-2 pointer-events-none" />
              <select
                value={`${adults}-${childrenCount}`}
                onChange={(e) => {
                  const [a, c] = e.target.value.split('-').map(Number);
                  setAdults(a);
                  setChildrenCount(c);
                }}
                className="w-full pl-8 pr-2 py-2 text-xs sm:text-sm font-semibold bg-transparent border-0 text-stone-800 dark:text-stone-100 focus:ring-0 focus:outline-hidden cursor-pointer"
              >
                <option value="1-0" className="dark:bg-[#131F2A] dark:text-stone-100">1 Adult (Solo)</option>
                <option value="2-0" className="dark:bg-[#131F2A] dark:text-stone-100">2 Adults (Couple)</option>
                <option value="2-1" className="dark:bg-[#131F2A] dark:text-stone-100">2 Adults, 1 Child</option>
                <option value="2-2" className="dark:bg-[#131F2A] dark:text-stone-100">2 Adults, 2 Children</option>
                <option value="4-0" className="dark:bg-[#131F2A] dark:text-stone-100">4 Adults (Group)</option>
                <option value="5-0" className="dark:bg-[#131F2A] dark:text-stone-100">5 Adults (Barkada Loft)</option>
              </select>
            </div>
          </div>

          {/* Room Category & Promo Code */}
          <div className="space-y-1 sm:pr-3 lg:border-r border-stone-200 dark:border-stone-700">
            <label className="block text-[10px] font-bold text-stone-400 dark:text-stone-400 uppercase tracking-widest flex justify-between">
              <span>{t('roomCategory', 'Room Category')}</span>
              <span className="text-[#E29578] font-bold">SOULSUNSET</span>
            </label>
            <select
              value={selectedRoomCategory}
              onChange={(e) => setSelectedRoomCategory(e.target.value)}
              className="w-full px-2 py-2 text-xs sm:text-sm font-semibold bg-transparent border-0 text-stone-800 dark:text-stone-100 focus:ring-0 focus:outline-hidden cursor-pointer"
            >
              <option value="all" className="dark:bg-[#131F2A] dark:text-stone-100">{t('allRooms', 'All 20 Beachfront Rooms')}</option>
              <option value="villa" className="dark:bg-[#131F2A] dark:text-stone-100">Aninag Master Villa (₱3,200)</option>
              <option value="suite" className="dark:bg-[#131F2A] dark:text-stone-100">Alon Cozy Suite (₱2,600)</option>
              <option value="loft" className="dark:bg-[#131F2A] dark:text-stone-100">Barkada Glow Loft (₱3,500)</option>
              <option value="deluxe" className="dark:bg-[#131F2A] dark:text-stone-100">Soul Deluxe Queen (₱1,800)</option>
            </select>
          </div>

          {/* Search Button - Professional Polish Coral CTA */}
          <div className="sm:col-span-2 lg:col-span-1 pt-1 sm:pt-4 lg:pt-0">
            <button
              type="submit"
              className="w-full bg-[#E29578] hover:bg-[#d68568] text-white py-3 sm:py-3.5 px-4 sm:px-6 rounded-md font-bold uppercase text-xs sm:text-sm tracking-wider whitespace-nowrap shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('checkAvailability', 'Check Availability')}</span>
            </button>
          </div>
        </form>

        {/* Real-time Availability Alert Banner */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-3.5 sm:px-4 py-2.5 rounded-lg bg-white/95 dark:bg-[#131F2A]/95 backdrop-blur border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300 shadow-sm transition-colors">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#006D77] dark:bg-[#83C5BE] animate-ping" />
            <span className="font-semibold text-stone-900 dark:text-white">{t('liveAvailability', 'Live Availability')}:</span>
            <span className="truncate">{t('roomsAvailableNote', '5 of 20 rooms available for upcoming dates.')}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] text-stone-500 dark:text-stone-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#006D77] dark:text-[#83C5BE]" /> {t('freeCancellation', 'Free Cancellation 48h Prior')}
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E29578]" /> {t('bestRateGuarantee', 'Direct Booking Best Rate Guarantee')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
