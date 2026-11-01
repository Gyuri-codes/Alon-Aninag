import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { PageHeader } from '../components/PageHeader';
import { 
  DAYGLOW_EXPERIENCE_DATA, 
  RESORT_IMAGES, 
  MENU_ITEMS, 
  ACTIVITIES_DATA 
} from '../data/resortData';
import { 
  Sparkles, 
  Waves, 
  Utensils, 
  Flame, 
  Heart, 
  Wifi, 
  Compass, 
  Clock, 
  Check, 
  Sun, 
  Wind, 
  Sunset, 
  ShieldCheck, 
  ArrowRight,
  Coffee,
  Wine
} from 'lucide-react';

interface AmenitiesPageProps {
  onOpenDayglowModal: (guestType?: 'overnight' | 'daypass') => void;
}

export const AmenitiesPage: React.FC<AmenitiesPageProps> = ({ onOpenDayglowModal }) => {
  const { formatPrice, navigateTo, t } = useResort();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>('Breakfast');

  const tabs = [
    { id: 'all', label: t('tabAllFeatures', 'All Features') },
    { id: 'dayglow', label: t('tabDayglowPaddle', 'Aninag Dayglow & Paddle ✨') },
    { id: 'dining', label: t('tabDiningSunsetBar', 'Dining & Sunset Bar') },
    { id: 'bonfire', label: t('tabNightlyBonfire', 'Nightly Soul Bonfire') },
    { id: 'wellness', label: t('tabWellnessHilot', 'Wellness & Hilot') },
    { id: 'facilities', label: t('tabResortFacilities', 'Resort Facilities') },
    { id: 'tours', label: t('tabIslandToursDesk', 'Island Tours Desk') }
  ];

  const filteredMenuItems = MENU_ITEMS.filter(item => item.category === activeMenuCategory);

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <PageHeader 
        title={t('amenitiesPageTitle', 'Features & Resort Amenities')}
        subtitle={t('amenitiesPageSubtitle', 'Slow down and savor unhurried moments: transparent kayak paddling, oceanview dining, starlit soul bonfires, and traditional Hilot wellness.')}
        badge={t('amenitiesPageBadge', 'Resort Facilities & Guest Experiences')}
        bgImage={RESORT_IMAGES.dayglow}
      />

      {/* 1. Quick Navigation Strip */}
      <section className="py-6 bg-white dark:bg-[#0E1720] border-b border-stone-200 dark:border-stone-800 sticky top-16 sm:top-20 z-30 backdrop-blur-md bg-white/95 dark:bg-[#0E1720]/95 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-sm text-xs sm:text-sm font-semibold uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#006D77] text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-[#131F2A] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Signature Innovation: Aninag Dayglow & Paddle Experience */}
      {(activeTab === 'all' || activeTab === 'dayglow') && (
        <section id="dayglow" className="py-20 bg-[#F8F5F2] dark:bg-[#0B131A] border-b border-stone-200 dark:border-stone-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E29578] text-white text-xs font-bold uppercase tracking-widest shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('homeDayglowBadge', 'Featured Daytime Innovation')}</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-white tracking-tight leading-tight">
                  {t('homeDayglowTitle', 'The Aninag Dayglow & Paddle Experience')}
                </h2>

                <p className="font-serif italic text-base sm:text-lg text-[#006D77] dark:text-[#83C5BE]">
                  "{t('homeDayglowTagline', 'Paddle. Relax. Capture the Glow.')}"
                </p>

                <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                  {t('homeDayglowDesc', 'A multi-sensory coastal journey designed for couples, barkadas, and aesthetic seekers. Glide atop calm turquoise waters in 100% transparent clear kayaks, followed by an artisanal floating woven bamboo tray loaded with cold-brew herbal teas, fresh mangoes, and native Negrense delicacies.')}
                </p>

                {/* Inclusions Grid */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                    {t('dayglowInclusionsTitle', "What's Included in Your 2-Hour Experience:")}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-300">
                    {DAYGLOW_EXPERIENCE_DATA.inclusions.slice(0, 6).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE] shrink-0" />
                        <span className="truncate">{t(inc, inc)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Booking Card */}
                <div className="p-6 rounded-xl bg-white dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                      {t('dayglowBadge', 'Signature Experience')}
                    </div>
                    <div className="font-serif text-2xl font-bold text-[#006D77] dark:text-[#83C5BE]">
                      ₱850 <span className="text-xs text-stone-400 font-normal">({t('overnightGuestsChip', 'Overnight Guests')})</span>
                    </div>
                    <div className="text-xs text-stone-500">
                      ₱1,200 ({t('dayVisitorsChip', 'Day Visitors')}) • {t('twoHourReservedChip', '2-Hour Reserved')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => onOpenDayglowModal('overnight')}
                      className="flex-1 sm:flex-none px-5 py-2.5 bg-[#006D77] hover:bg-[#00555d] text-white text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition cursor-pointer"
                    >
                      {t('btnBookDayglow', 'Book Dayglow Experience')}
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="aspect-16/10 rounded-2xl overflow-hidden shadow-xl border border-stone-200 dark:border-stone-800">
                  <img
                    src={RESORT_IMAGES.dayglow}
                    alt="Dayglow Paddle"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-16/10 rounded-xl overflow-hidden shadow-md border border-stone-200 dark:border-stone-800">
                    <img
                      src={RESORT_IMAGES.floatingTray}
                      alt="Floating Snack Tray"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-16/10 rounded-xl overflow-hidden shadow-md border border-stone-200 dark:border-stone-800">
                    <img
                      src={RESORT_IMAGES.sunsetPaddleKayak}
                      alt="Sunset Paddle"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Soul Beach Cafe & Sunset Bar */}
      {(activeTab === 'all' || activeTab === 'dining') && (
        <section id="dining" className="py-20 bg-white dark:bg-[#0E1720] border-b border-stone-200 dark:border-stone-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-[#006D77] dark:text-[#83C5BE] text-xs font-bold uppercase tracking-widest mb-2">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>{t('diningBadge', 'Local Flavors & Sunset Libations')}</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-white font-normal">
                  {t('diningMenuTitle', 'Soul Beach Cafe & Bar Menu')}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                  {t('diningHours', 'Serving Hours: 6:30 AM – 10:00 PM Daily')}
                </p>
              </div>

              {/* Menu Category Switcher */}
              <div className="flex items-center gap-2 bg-stone-100 dark:bg-[#131F2A] p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 overflow-x-auto no-scrollbar">
                {[
                  { id: 'Breakfast', label: t('catBreakfast', 'Breakfast') },
                  { id: 'Lunch', label: t('catLunch', 'Lunch') },
                  { id: 'Dinner', label: t('catDinner', 'Dinner') },
                  { id: 'Bar', label: t('catBar', 'Bar & Cocktails') }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveMenuCategory(c.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition cursor-pointer whitespace-nowrap ${
                      activeMenuCategory === c.id
                        ? 'bg-[#006D77] text-white shadow-xs'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenuItems.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl bg-[#F8F5F2] dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-serif text-lg font-medium text-stone-900 dark:text-white">
                        {item.name}
                      </h4>
                      <span className="font-serif text-base font-bold text-[#006D77] dark:text-[#83C5BE] shrink-0">
                        {formatPrice(item.pricePHP)}
                      </span>
                    </div>

                    {item.localName && (
                      <div className="text-[11px] font-semibold text-[#E29578] uppercase tracking-wider mb-2">
                        {item.localName}
                      </div>
                    )}

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-light mb-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-200 dark:border-stone-800">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-[#0E1720] text-stone-600 dark:text-stone-400 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Nightly Soul Bonfire & Stargazing */}
      {(activeTab === 'all' || activeTab === 'bonfire') && (
        <section id="bonfire" className="py-20 bg-[#FAF7F2] dark:bg-[#0B131A] border-b border-[#E8DFC8] dark:border-stone-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-xl aspect-16/10">
                <img
                  src={RESORT_IMAGES.bonfire}
                  alt="Nightly Soul Bonfire"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-[#E29578] text-xs font-bold uppercase tracking-widest">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{t('tabNightlyBonfire', 'Nightly Soul Bonfire')}</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-white font-normal">
                  {t('bonfireTitle', 'Nightly Soul Bonfire & Acoustic Hours')}
                </h2>

                <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                  {t('bonfireDesc', 'Every evening as the sun dips below the Sulu Sea, our team lights a beachside driftwood bonfire on the golden sand. Unwind to gentle acoustic Ilonggo rhythms, roast marshmallows, and gaze at unpolluted star-filled skies.')}
                </p>

                <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE]" />
                    <span>Every Evening from <strong>5:30 PM to 8:30 PM</strong> (Weather Permitting)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE]" />
                    <span>100% Complimentary for all staying resort guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE]" />
                    <span>Acoustic guitars & marshmallow roasting kits provided</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Wellness & Hilot Massage */}
      {(activeTab === 'all' || activeTab === 'wellness') && (
        <section id="wellness" className="py-20 bg-white dark:bg-[#0E1720] border-b border-stone-200 dark:border-stone-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-[#006D77] dark:text-[#83C5BE] text-xs font-bold uppercase tracking-widest">
                <Heart className="w-3.5 h-3.5 text-[#E29578]" />
                <span>{t('tabWellnessHilot', 'Wellness & Hilot')}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-white font-normal">
                {t('wellnessTitle', 'Traditional Negrense Hilot Healing')}
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                {t('wellnessDesc', 'Authentic Philippine therapeutic bodywork utilizing warm virgin coconut oil, heated banana leaves, and herbal compress to ease travel fatigue and restore energy balance.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'In-Room Hilot Healing Massage',
                  duration: '60 Minutes',
                  price: '₱650 / guest',
                  desc: 'Traditional pressure point therapy, soothing muscle tension and restoring energy flow in the privacy of your suite.'
                },
                {
                  title: 'Beachside Cabana Sunset Massage',
                  duration: '75 Minutes',
                  price: '₱850 / guest',
                  desc: 'Full-body relaxation under the shaded beach canopy with the natural ambient sound of gentle rolling waves.'
                },
                {
                  title: 'Morning Yoga & Breathwork Deck',
                  duration: 'Complimentary',
                  price: 'Free for Guests',
                  desc: 'Complimentary yoga mats and quiet sea-facing deck space for sunrise meditation, stretching, and mindfulness.'
                }
              ].map((well, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-[#F8F5F2] dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#006D77] dark:text-[#83C5BE]">
                      {well.duration}
                    </span>
                    <h4 className="font-serif text-xl font-medium text-stone-900 dark:text-white mt-1 mb-2">
                      {well.title}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-300 font-light leading-relaxed mb-4">
                      {well.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                    <span className="font-serif text-lg font-bold text-[#006D77] dark:text-[#83C5BE]">
                      {well.price}
                    </span>
                    <button
                      onClick={() => navigateTo('booking')}
                      className="text-xs font-bold text-[#006D77] dark:text-[#83C5BE] uppercase tracking-wider hover:underline"
                    >
                      Add to Stay →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Resort Facilities & Guest Services */}
      {(activeTab === 'all' || activeTab === 'facilities') && (
        <section id="facilities" className="py-20 bg-[#F8F5F2] dark:bg-[#0B131A] border-b border-stone-200 dark:border-stone-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-white font-normal mb-3">
                {t('tabResortFacilities', 'Complete Resort Facilities & Guest Services')}
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 font-light">
                {t('facilitiesStarlinkDesc', 'Modern essentials carefully engineered to keep your beach holiday seamless, connected, and trouble-free.')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: t('facilitiesStarlink', 'Starlink High-Speed Wi-Fi'), desc: t('facilitiesStarlinkDesc', '150+ Mbps satellite internet across all rooms, dining pavilion, and beachfront daybeds.'), icon: Wifi },
                { title: t('facilitiesGenerator', '24/7 Backup Generator'), desc: t('facilitiesGeneratorDesc', 'Automatic diesel power backup ensuring uninterrupted air-conditioning and lighting.'), icon: ShieldCheck },
                { title: 'Beach Rinse Shower Stations', desc: 'Freshwater outdoor bamboo showers directly along the beachfront walkout for rinsing off after paddling.', icon: Waves },
                { title: 'Scooter & Motorbike Rentals', desc: 'Reliable automatic scooters available for rent at reception to explore Sipalay’s scenic viewpoints and bays.', icon: Compass },
                { title: 'Complimentary Beach Gear', desc: 'Snorkel sets, life jackets, beach towels, and waterproof dry bags provided freely for resort guests.', icon: Check },
                { title: t('frontDesk247', '24/7 Concierge & Security'), desc: 'Round-the-clock front desk assistance, night security guards, and emergency local coordination.', icon: Heart }
              ].map((fac, idx) => {
                const Icon = fac.icon;
                return (
                  <div key={idx} className="p-6 rounded-xl bg-white dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-stone-900 dark:text-white mb-1">
                        {fac.title}
                      </h4>
                      <p className="text-xs text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                        {fac.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7. Island Excursions Desk */}
      {(activeTab === 'all' || activeTab === 'tours') && (
        <section id="tours" className="py-20 bg-white dark:bg-[#0E1720] transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-[#006D77] dark:text-[#83C5BE] text-xs font-bold uppercase tracking-widest mb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{t('tabIslandToursDesk', 'Island Tours Desk')}</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-white font-normal">
                  {t('activitiesHeading', 'Resort Experiences & Coastal Tours')}
                </h2>
              </div>
              <button
                onClick={() => navigateTo('contact')}
                className="px-5 py-2.5 bg-[#006D77] hover:bg-[#00555d] text-white text-xs uppercase tracking-wider font-bold rounded-sm shadow-sm transition cursor-pointer"
              >
                {t('bookActivity', 'Book Activity')}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ACTIVITIES_DATA.slice(0, 3).map((act) => (
                <div
                  key={act.id}
                  className="bg-[#F8F5F2] dark:bg-[#131F2A] rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between"
                >
                  <div className="aspect-16/10 overflow-hidden bg-stone-200">
                    <img src={act.image} alt={act.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#006D77] dark:text-[#83C5BE] mb-1">
                        {act.category} • {act.duration}
                      </div>
                      <h4 className="font-serif text-lg font-semibold text-stone-900 dark:text-white mb-2">
                        {act.title}
                      </h4>
                      <p className="text-xs text-stone-600 dark:text-stone-300 font-light leading-relaxed mb-4">
                        {act.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
                      <span className="font-serif text-base font-bold text-[#006D77] dark:text-[#83C5BE]">
                        {formatPrice(act.pricePHP)}
                      </span>
                      <button
                        onClick={() => navigateTo('contact')}
                        className="text-xs font-bold text-[#006D77] dark:text-[#83C5BE] uppercase tracking-wider hover:underline"
                      >
                        {t('bookActivity', 'Book Activity')} →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
