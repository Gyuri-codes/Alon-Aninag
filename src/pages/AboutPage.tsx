import React from 'react';
import { useResort } from '../context/ResortContext';
import { PageHeader } from '../components/PageHeader';
import { RESORT_INFO, RESORT_IMAGES } from '../data/resortData';
import { 
  Sparkles, 
  Waves, 
  Sun, 
  Heart, 
  ShieldCheck, 
  MapPin, 
  Users, 
  Check, 
  ArrowRight,
  Leaf,
  Compass
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo, t } = useResort();

  const brandPillars = [
    {
      title: t('pillar1Title', 'Warm Negrense Hospitality'),
      subtitle: t('pillar1Sub', 'Pag-amoma kag Pag-ulikid'),
      desc: t('pillar1Desc', 'Genuine, unhurried warmth from our local Sipalay team. Every guest is welcomed like family returning home to the sea.'),
      icon: Heart
    },
    {
      title: t('pillar2Title', 'Minimalist Wood & White Aesthetic'),
      subtitle: t('pillar2Sub', 'Calm & Restful Architecture'),
      desc: t('pillar2Desc', 'Natural teak and mahogany woods, breathable organic cotton, open sea-facing verandas, and clutter-free peaceful spaces.'),
      icon: Sparkles
    },
    {
      title: t('pillar3Title', 'Intimate 12-Room Exclusivity'),
      subtitle: t('pillar3Sub', 'Zero Overcrowding Guarantee'),
      desc: t('pillar3Desc', 'With only 12 boutique rooms, our shoreline and daybeds remain quiet, intimate, and deeply private even in peak season.'),
      icon: ShieldCheck
    },
    {
      title: t('pillar4Title', 'Sustainable Coastal Stewardship'),
      subtitle: t('pillar4Sub', 'Caring for Poblacion Bay'),
      desc: t('pillar4Desc', 'Coral-safe non-motorized watersports, ceramic refillable toiletries, locally grown farm ingredients, and beach cleanups.'),
      icon: Leaf
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <PageHeader 
        title={t('aboutTitle', 'Our Story & Soulful Concept')}
        subtitle={t('aboutSubtitle', 'Where the gentle rhythm of the sea meets warm Negrense hospitality on Poblacion Beach, Sipalay City.')}
        badge={t('aboutBadge', 'About Alon & Aninag Boutique Resort')}
        bgImage={RESORT_IMAGES.hero}
      />

      {/* 1. Meaning of Alon & Aninag */}
      <section className="py-20 bg-[#F8F5F2] dark:bg-[#0B131A] border-b border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-[#006D77] dark:text-[#83C5BE] border border-teal-200/60 dark:border-teal-800/60 text-xs font-bold uppercase tracking-widest">
                <Waves className="w-3.5 h-3.5 text-[#006D77] dark:text-[#83C5BE]" />
                <span>{t('aboutNameBadge', 'The Story of Our Name')}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-white tracking-tight leading-tight">
                {t('aboutNameTitle', 'Two Words. One Beachfront Sanctuary.')}
              </h2>

              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                {t('aboutAlon', 'In Hiligaynon and Tagalog, "Alon" means the ocean wave—the eternal ebb and flow of water that washes away the fatigue of city life and invites travelers to slow down and breathe.')}
              </p>

              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                {t('aboutAninag', '"Aninag" signifies gentle light, glimmer, and translucent reflection—like the golden sunset casting its radiant amber glow over Poblacion Bay, and the inner glow rekindled when the mind finally finds peace.')}
              </p>

              <div className="p-6 rounded-xl bg-white dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
                <div className="font-serif italic text-lg sm:text-xl text-[#006D77] dark:text-[#83C5BE]">
                  "{t('aboutMotto', 'Where Waves Rest and Souls Glow')}"
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                  {t('aboutMottoDesc', 'Our motto is a promise to every traveler who arrives in Sipalay: you are not just checking into a room; you are finding a restorative haven by the sea.')}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-3/4 rounded-xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-800">
                    <img 
                      src={RESORT_IMAGES.sunsetDeck} 
                      alt="Sunset Deck Alon Aninag" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 text-center">
                    <div className="font-serif text-2xl font-bold text-[#006D77] dark:text-[#83C5BE]">
                      {t('statRoomsTitle', '12 Rooms')}
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 font-semibold mt-0.5">
                      {t('statRoomsSub', 'Intimate Exclusivity')}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-center">
                    <div className="font-serif text-2xl font-bold text-[#E29578]">
                      {t('statMetersTitle', '0 Meters')}
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 font-semibold mt-0.5">
                      {t('statMetersSub', 'Direct Sand Walkout')}
                    </div>
                  </div>
                  <div className="aspect-3/4 rounded-xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-800">
                    <img 
                      src={RESORT_IMAGES.suite} 
                      alt="Boutique Suite Interior" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission */}
      <section className="py-20 bg-white dark:bg-[#0E1720] border-b border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#F8F5F2] dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <div className="text-xs uppercase tracking-widest font-bold text-[#006D77] dark:text-[#83C5BE] mb-2">
                {t('visionTitle', 'Our Vision')}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-white mb-4">
                {t('visionHeading', 'To Be the Preeminent Soulful Coastal Retreat of Western Visayas')}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                {t('visionText', 'To be recognized as the premier boutique beachfront destination in Sipalay City and the Negros Island Region—celebrated for harmonious architectural simplicity, deeply authentic Negrense hospitality, mindful guest experiences, and sustainable community empowerment.')}
              </p>
            </div>

            {/* Mission Card */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#F8F5F2] dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#E29578]/15 text-[#E29578] flex items-center justify-center mb-6">
                <Sun className="w-6 h-6" />
              </div>
              <div className="text-xs uppercase tracking-widest font-bold text-[#E29578] mb-2">
                {t('missionTitle', 'Our Mission')}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-white mb-4">
                {t('missionHeading', 'Crafting Unhurried Moments That Restore Body & Spirit')}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                {t('missionText', 'We are committed to delivering genuine, personalized hospitality through 12 intimate sea-facing rooms, curating innovative daytime experiences like the Aninag Dayglow paddle, showcasing local culinary heritage at our beachside cafe, and safeguarding our coastal waters for generations of travelers to come.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Brand Pillars */}
      <section className="py-20 bg-[#FAF7F2] dark:bg-[#0B131A] border-b border-[#E8DFC8] dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#006D77] dark:text-[#83C5BE]" />
              {t('pillarsBadge', 'Guiding Principles')}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-white tracking-tight mb-4">
              {t('pillarsHeading', 'The Four Pillars of Alon & Aninag')}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              {t('pillarsSub', 'Every detail—from the thread count of our organic cotton bedding to the design of our transparent kayaks—is shaped by these foundational commitments.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white dark:bg-[#131F2A] border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl font-medium text-stone-900 dark:text-white mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#006D77] dark:text-[#83C5BE] uppercase tracking-wider mb-3">
                      {pillar.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Destination Spotlight: Why Poblacion Beach, Sipalay City */}
      <section className="py-20 bg-[#F8F5F2] dark:bg-[#0B131A] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#E29578]" />
                <span>{t('sipalaySpotlightBadge', 'Destination Spotlight')}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-white font-normal">
                {t('sipalaySpotlightTitle', 'Why Poblacion Beach, Sipalay City?')}
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                {t('sipalaySpotlightP1', 'Often hailed as the "Jewel of Southern Negros", Sipalay is blessed with limestone karst hills reminiscent of Coron and El Nido, pristine diving waters, and emerald lagoons. Poblacion Beach offers the rare luxury of a calm, swimmable sandy bay right beside town conveniences.')}
              </p>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                {t('sipalaySpotlightP2', 'Unlike overdeveloped tourist destinations, Sipalay maintains its unhurried pace. Fishermen still launch wooden bancas at dawn, and sunsets paint the Sulu Sea in shades of lavender, gold, and peach without loud nightlife crowds.')}
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => navigateTo('rooms')}
                  className="px-6 py-3 bg-[#006D77] hover:bg-[#00555d] text-white text-xs sm:text-sm uppercase tracking-wider font-bold rounded-sm shadow-sm transition cursor-pointer"
                >
                  {t('gwRoomsAction', 'Explore Rooms')}
                </button>
                <button
                  onClick={() => navigateTo('booking')}
                  className="px-6 py-3 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs sm:text-sm uppercase tracking-wider font-semibold rounded-sm transition cursor-pointer"
                >
                  {t('gwBookingAction', 'Reserve Your Stay')}
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200 dark:border-stone-800 aspect-16/10">
                <img 
                  src={RESORT_IMAGES.hero} 
                  alt="Poblacion Beach, Sipalay City" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
