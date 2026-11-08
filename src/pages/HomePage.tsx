import React from 'react';
import { useResort } from '../context/ResortContext';
import { Hero } from '../components/Hero';
import { RESORT_INFO, RESORT_IMAGES, DAYGLOW_EXPERIENCE_DATA, REVIEWS_DATA } from '../data/resortData';
import { 
  Bed, 
  Sparkles, 
  Image as ImageIcon, 
  Calendar, 
  MapPin, 
  Sun, 
  Compass, 
  ArrowRight, 
  Check, 
  Star, 
  Flame, 
  Coffee,
  Heart,
  ChevronRight
} from 'lucide-react';

interface HomePageProps {
  onOpenDayglowModal: (guestType?: 'overnight' | 'daypass') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenDayglowModal
}) => {
  const { navigateTo, weather, t } = useResort();

  const gatewayCards = [
    {
      id: 'rooms',
      title: t('gwRoomsTitle', 'Boutique Accommodations'),
      subtitle: t('gwRoomsSub', '20 Beachfront Rooms & 4 Standard Lofts'),
      desc: t('gwRoomsDesc', 'Wake up to the soft lull of waves. Handcrafted local wood, crisp organic linens, and private oceanfront verandas.'),
      image: RESORT_IMAGES.suite,
      icon: Bed,
      badge: t('gwRoomsBadge', '20 Beachfront Units • 4 Lofts (24 Total)'),
      actionText: t('gwRoomsAction', 'Explore Rooms')
    },
    {
      id: 'amenities',
      title: t('gwAmenitiesTitle', 'Features & Amenities'),
      subtitle: t('gwAmenitiesSub', 'From Dayglow Paddle to Soul Bonfires'),
      desc: t('gwAmenitiesDesc', 'Signature clear kayak rentals, floating Negrense snack trays, oceanview dining, sunset bonfires, and Hilot massage.'),
      image: RESORT_IMAGES.dayglow,
      icon: Sparkles,
      badge: t('gwAmenitiesBadge', 'Signature Experiences'),
      actionText: t('gwAmenitiesAction', 'View Amenities')
    },
    {
      id: 'gallery',
      title: t('gwGalleryTitle', 'Resort Visual Gallery'),
      subtitle: t('gwGallerySub', 'Photographs & Resort Highlights'),
      desc: t('gwGalleryDesc', 'Immerse yourself in our coastal aesthetics, golden hour glow over Poblacion Bay, and candid guest memories.'),
      image: RESORT_IMAGES.sunsetDeck,
      icon: ImageIcon,
      badge: t('gwGalleryBadge', 'High-Resolution Gallery'),
      actionText: t('gwGalleryAction', 'Browse Gallery')
    },
    {
      id: 'booking',
      title: t('gwBookingTitle', 'Reservations & Booking'),
      subtitle: t('gwBookingSub', 'Direct Booking with Instant Voucher'),
      desc: t('gwBookingDesc', 'Check live room availability, select curated travel add-ons, and secure your Sipalay beachfront getaway instantly.'),
      image: RESORT_IMAGES.bonfire,
      icon: Calendar,
      badge: t('gwBookingBadge', 'Best Rate Guarantee'),
      actionText: t('gwBookingAction', 'Reserve Your Stay')
    }
  ];

  const highlights = [
    t('hlDirectSand', '0-meter direct walkout to Poblacion Beach sand'),
    t('hl12Rooms', '20 intimate beachfront rooms + 4 standard lofts'),
    t('hlDayglow', 'Signature Dayglow Clear Kayak & Floating Tray'),
    t('hlBonfire', 'Nightly acoustic soul bonfires under the stars'),
    t('hlWifi', 'Complimentary high-speed Starlink Wi-Fi (150+ Mbps)'),
    t('hlHospitality', '100% locally sourced Negrense dining & hospitality')
  ];

  return (
    <div className="animate-fadeIn">
      {/* 1. Hero Section & Quick Availability Search */}
      <Hero 
        onOpenDayglowModal={onOpenDayglowModal}
      />

      {/* 2. Welcome Editorial & Resort Essence */}
      <section className="py-20 bg-[#F8F5F2] dark:bg-[#0B131A] border-b border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-[#006D77] dark:text-[#83C5BE] border border-teal-200/60 dark:border-teal-800/60 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('homePhilosophyBadge', 'The Alon & Aninag Philosophy')}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-white tracking-tight leading-tight">
                {t('homePhilosophyTitle', 'Where Waves Rest and Souls Glow')}
              </h2>

              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                {t('homeStoryP1', 'Nestled directly upon the soft golden shoreline of Poblacion Beach in Sipalay City, Alon & Aninag was born from a simple, soulful belief: true luxury is space, unhurried time, and the gentle rhythm of the sea.')}
              </p>

              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                {t('homeStoryP2', 'With 20 beachfront rooms and 4 standard lofts (24 total accommodations), our boutique retreat honors warm teak wood craftsmanship, crisp white natural linens, authentic Negrense warmth, and minimal ecological impact. Here, days begin with clear kayak glides across turquoise bay waters and culminate with soulful beachfront bonfires beneath starlit skies.')}
              </p>

              {/* Highlights Bullet List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                    <span className="w-4 h-4 rounded-full bg-[#006D77]/15 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Read More Link */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => navigateTo('about')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#006D77] hover:bg-[#00555d] text-white text-xs sm:text-sm uppercase tracking-wider font-bold rounded-sm shadow-sm transition cursor-pointer"
                >
                  <span>{t('btnReadStory', 'Read Our Full Story & Concept')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo('contact')}
                  className="inline-flex items-center gap-2 px-5 py-3 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs sm:text-sm uppercase tracking-wider font-semibold rounded-sm transition cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#006D77] dark:text-[#83C5BE]" />
                  <span>{t('btnGettingSipalay', 'Getting to Sipalay')}</span>
                </button>
              </div>
            </div>

            {/* Visual Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-stone-800">
                  <img
                    src={RESORT_IMAGES.hero}
                    alt="Alon Aninag Beachfront Sanctuary"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Overlaid Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-[#131F2A] p-5 rounded-xl shadow-xl border border-stone-200 dark:border-stone-800 max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E29578]/20 flex items-center justify-center text-[#E29578]">
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider">
                        {t('sunsetHourLabel', 'Sipalay Sunset Hour')}
                      </div>
                      <div className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                        {weather.sunsetTime} {t('dailyLabel', 'Daily')}
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2">
                    {t('sunsetHourDesc', 'Golden hour reflections on Poblacion Bay accompanied by gentle acoustic rhythms.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dedicated Page Gateways - Clean Navigation System */}
      <section className="py-20 bg-white dark:bg-[#0E1720] border-b border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-[#006D77] dark:text-[#83C5BE]" />
              {t('homeGatewaysBadge', 'Explore Every Feature on its Own Dedicated Page')}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-white tracking-tight mb-4">
              {t('homeGatewaysTitle', 'Your Complete Resort Journey')}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              {t('homeGatewaysSub', 'We have organized each aspect of Alon & Aninag into designated, focused pages. Click any section below or use the top menu to view individual layouts and details.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gatewayCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => navigateTo(card.id)}
                  className="group relative bg-[#F8F5F2] dark:bg-[#131F2A] rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
                >
                  {/* Card Image */}
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-200 dark:bg-stone-800">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-bold border border-white/20">
                      {card.badge}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center mb-3">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif text-xl font-medium text-stone-900 dark:text-white mb-1 group-hover:text-[#006D77] dark:group-hover:text-[#83C5BE] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#006D77] dark:text-[#83C5BE] mb-2 uppercase tracking-wider">
                        {card.subtitle}
                      </p>
                      <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between text-xs font-bold text-[#006D77] dark:text-[#83C5BE] uppercase tracking-wider">
                      <span>{card.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Signature Feature Spotlight: The Aninag Dayglow & Paddle Experience */}
      <section className="py-20 bg-[#FAF7F2] dark:bg-[#0B131A] border-b border-[#E8DFC8] dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#006D77] to-[#004E55] text-white rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden lg:block">
              <img
                src={RESORT_IMAGES.dayglow}
                alt="Clear Kayak Paddle"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[#FFDDD2] text-xs font-bold uppercase tracking-widest border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#E29578]" />
                <span>{t('homeDayglowBadge', 'Featured Daytime Innovation')}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
                {t('homeDayglowTitle', 'The Aninag Dayglow & Paddle Experience')}
              </h2>

              <p className="font-serif italic text-base sm:text-lg text-[#FFDDD2]">
                "{t('homeDayglowTagline', 'Paddle. Relax. Capture the Glow.')}"
              </p>

              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
                {t('homeDayglowDesc', 'Glide over Poblacion Bay in 100% transparent clear kayaks and stand-up paddleboards with perimeter glow, paired with an artisanal floating woven tray of Negrense cold-brew tea, fresh tropical fruits, and shaded beachfront daybed lounge.')}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="px-3 py-1.5 rounded-sm bg-white/20 backdrop-blur-md text-xs font-semibold text-white">
                  {t('overnightGuestsChip', '₱850 / pair (Overnight Guests)')}
                </span>
                <span className="px-3 py-1.5 rounded-sm bg-white/20 backdrop-blur-md text-xs font-semibold text-white">
                  {t('dayVisitorsChip', '₱1,200 / pair (Day Visitors)')}
                </span>
                <span className="px-3 py-1.5 rounded-sm bg-[#E29578] text-white text-xs font-bold uppercase tracking-wider">
                  {t('twoHourReservedChip', '2-Hour Reserved Experience')}
                </span>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenDayglowModal('overnight')}
                  className="px-6 py-3 bg-[#E29578] hover:bg-[#d07e60] text-white text-xs sm:text-sm uppercase tracking-wider font-bold rounded-sm shadow-md transition cursor-pointer"
                >
                  {t('btnBookDayglow', 'Book Dayglow Experience')}
                </button>
                <button
                  onClick={() => navigateTo('amenities')}
                  className="px-6 py-3 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs sm:text-sm uppercase tracking-wider font-semibold rounded-sm transition cursor-pointer"
                >
                  {t('btnViewAmenities', 'View All Features & Amenities')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Guest Testimonials & Reviews Preview */}
      <section className="py-20 bg-white dark:bg-[#0E1720] border-b border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-[#006D77] dark:text-[#83C5BE] text-xs font-bold uppercase tracking-widest mb-2">
                <Heart className="w-3 h-3 text-[#E29578]" />
                <span>{t('homeReviewsBadge', 'Guest Echoes & Memories')}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-white font-normal">
                {t('homeReviewsTitle', 'Loved by Travelers Seeking Soul & Serenity')}
              </h2>
            </div>
            <button
              onClick={() => navigateTo('booking')}
              className="px-5 py-2.5 bg-[#006D77] hover:bg-[#00555d] text-white text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition cursor-pointer"
            >
              {t('btnBookGetaway', 'Book Your Getaway')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS_DATA.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-xl bg-[#F8F5F2] dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-3 text-[#E29578]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <h4 className="font-serif text-base font-semibold text-stone-900 dark:text-white mb-2">
                    "{review.title}"
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                    "{review.comment}"
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800 dark:text-stone-200">{review.author}</span>
                  <span className="text-stone-400">{review.roomStayed || review.userType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Bottom Call to Action */}
      <section className="py-16 bg-[#006D77] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal mb-3 tracking-tight">
            {t('homeCtaTitle', 'Ready to Awaken Where the Waves Rest?')}
          </h2>
          <p className="text-sm sm:text-base text-teal-100 max-w-xl mx-auto mb-8 font-light">
            {t('homeCtaSub', 'Plan your intimate staycation, weekend getaway, or creative retreat on Poblacion Beach, Sipalay City.')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('booking')}
              className="px-7 py-3.5 bg-white text-[#006D77] hover:bg-stone-100 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-sm shadow-lg transition cursor-pointer"
            >
              {t('btnBookGuaranteed', 'Book Now • Best Rate Guaranteed')}
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3.5 bg-transparent hover:bg-white/10 border border-white/30 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-sm transition cursor-pointer"
            >
              {t('btnContactConcierge', 'Contact Front Desk Concierge')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
