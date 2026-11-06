import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { DAYGLOW_EXPERIENCE_DATA, CURRENCY_RATES, RESORT_IMAGES } from '../data/resortData';
import { 
  Sparkles, 
  Waves, 
  Sun, 
  Coffee, 
  Camera, 
  ShieldCheck, 
  Check, 
  Clock, 
  ArrowRight, 
  Heart, 
  Share2, 
  Flame, 
  Sunset, 
  Compass, 
  Award, 
  Info, 
  ChevronRight, 
  X, 
  ExternalLink,
  Users,
  Anchor,
  Droplets
} from 'lucide-react';

interface DayglowExperienceSectionProps {
  onOpenBookingModal: (guestType?: 'overnight' | 'daypass') => void;
}

export const DayglowExperienceSection: React.FC<DayglowExperienceSectionProps> = ({
  onOpenBookingModal
}) => {
  const { currency, openBookingModal, addNotification } = useResort();

  const [activeFeatureTab, setActiveFeatureTab] = useState<number>(0);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number>(0);
  const [isCopiedHashtag, setIsCopiedHashtag] = useState<boolean>(false);
  const [isAcademicModalOpen, setIsAcademicModalOpen] = useState<boolean>(false);

  const rate = CURRENCY_RATES[currency]?.rateToPHP || 1;
  const symbol = CURRENCY_RATES[currency]?.symbol || '₱';

  const overnightPrice = Math.round(DAYGLOW_EXPERIENCE_DATA.pricing.overnight.pricePHP * rate);
  const dayPassPrice = Math.round(DAYGLOW_EXPERIENCE_DATA.pricing.dayPass.pricePHP * rate);

  const handleCopyHashtag = () => {
    navigator.clipboard.writeText('#DayglowAtAlon');
    setIsCopiedHashtag(true);
    addNotification('Hashtag Copied!', '#DayglowAtAlon copied to clipboard. Share your photos on Instagram and TikTok!', 'promo');
    setTimeout(() => setIsCopiedHashtag(false), 3000);
  };

  return (
    <section id="dayglow" className="py-16 sm:py-24 bg-[#FAF7F2] dark:bg-[#0B131A] relative overflow-hidden border-b border-stone-200 dark:border-stone-800 transition-colors">
      {/* Decorative background glow accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#83C5BE]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-[#FFDDD2]/20 dark:bg-[#FFDDD2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Product Announcement Ribbon */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006D77]/10 dark:bg-[#83C5BE]/15 text-[#006D77] dark:text-[#83C5BE] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E29578]" />
            <span>New Signature Hospitality Experience</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 dark:text-white tracking-tight leading-tight">
            The Aninag Dayglow & Paddle Experience
          </h2>
          
          <p className="font-serif italic text-xl sm:text-2xl text-[#006D77] dark:text-[#83C5BE] mt-3 font-normal">
            “Paddle. Relax. Capture the Glow.”
          </p>

          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed mt-4 max-w-2xl mx-auto">
            An all-inclusive daytime lifestyle experience crafted for overnight guests, young couples, barkadas, and day-trippers (ages 20–35). Glide across calm turquoise waters in clear kayaks, indulge in a floating Negrense tea and snack tray, and unwind on your reserved shaded beachfront daybed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => onOpenBookingModal('overnight')}
              className="px-6 py-3 bg-[#006D77] hover:bg-[#00555d] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Book Dayglow Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#dayglow-pricing"
              className="px-5 py-3 bg-white dark:bg-[#131F2A] hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs uppercase tracking-wider rounded-sm border border-stone-300 dark:border-stone-700 transition cursor-pointer"
            >
              View Pricing & Time Slots
            </a>

            <button
              onClick={() => setIsAcademicModalOpen(true)}
              className="px-4 py-3 bg-[#83C5BE]/20 hover:bg-[#83C5BE]/30 text-[#006D77] dark:text-[#83C5BE] font-semibold text-xs uppercase tracking-wider rounded-sm transition cursor-pointer flex items-center gap-1.5"
              title="View Strategic Management BSHM Concept Plan"
            >
              <Award className="w-3.5 h-3.5" />
              <span>BSHM Strategic Plan</span>
            </button>
          </div>
        </div>

        {/* Hero Feature Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20 sm:mb-24 bg-white dark:bg-[#131F2A] rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200 dark:border-stone-800 shadow-sm transition-colors">
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/10 shadow-md">
            <img
              src={RESORT_IMAGES.dayglow}
              alt="The Aninag Dayglow & Paddle Experience on crystal clear water"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md rounded-full text-xs font-bold text-[#006D77] dark:text-[#83C5BE] shadow-xs">
                #DayglowAtAlon Signature
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs uppercase tracking-widest text-[#83C5BE] font-semibold">
                Direct Beachfront Activity Zone • Poblacion Beach, Sipalay
              </p>
              <p className="font-serif text-lg sm:text-xl font-normal mt-0.5">
                Transparent Kayaks & Floating Negrense Tea Served on Calm Waters
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#006D77] dark:text-[#83C5BE]">
                Where Waves Rest and Souls Glow
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-white mt-1">
                Daytime Calm Reimagined for Young Travelers
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
                While Alon & Aninag is renowned for our magical sunset bonfire nights, our shoreline now shines just as brightly by day. We designed the Dayglow Experience to give aesthetic seekers a curated, uncrowded, and deeply relaxing morning and afternoon on the water.
              </p>
            </div>

            {/* Inclusions summary list */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300">
                  <strong>2-Hour Reserved Access:</strong> Photogenic transparent kayaks & SUP boards directly in front of the resort.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300">
                  <strong>Floating Negrense Tray:</strong> Artisan cold-brew lemongrass-pandan tea & fresh tropical snacks.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300">
                  <strong>Reserved Beachfront Daybed:</strong> Shaded woven canopy lounger with dedicated host care.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300">
                  <strong>Host Photo Assistance:</strong> High-resolution photos & video reels with complimentary dry bags.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold block">
                  Overnight Guest Special
                </span>
                <span className="font-serif text-2xl font-bold text-[#006D77] dark:text-[#83C5BE]">
                  {symbol}{overnightPrice.toLocaleString()}{' '}
                  <span className="text-xs font-sans font-normal text-stone-500 dark:text-stone-400">/ pair (2 guests)</span>
                </span>
              </div>

              <button
                onClick={() => onOpenBookingModal('overnight')}
                className="px-5 py-2.5 bg-[#006D77] hover:bg-[#00555d] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition cursor-pointer"
              >
                Reserve Slot
              </button>
            </div>
          </div>
        </div>

        {/* 3 Signature Features Grid */}
        <div className="mb-20 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006D77] dark:text-[#83C5BE]">
              Signature Elements
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-white mt-1">
              Three Pillars of the Dayglow Experience
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2">
              Every detail is calibrated for effortless aesthetic enjoyment, genuine comfort, and soulful rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DAYGLOW_EXPERIENCE_DATA.features.map((feature) => (
              <div 
                key={feature.id}
                className="bg-white dark:bg-[#131F2A] rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#006D77] text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-sm shadow-xs">
                      {feature.badge}
                    </span>
                  </div>

                  <div className="p-6">
                    <h4 className="font-serif text-xl font-normal text-stone-900 dark:text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs font-semibold text-[#006D77] dark:text-[#83C5BE] mb-3">
                      {feature.subtitle}
                    </p>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#006D77] dark:text-[#83C5BE]">
                    <span>Included in every pair booking</span>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Complete Coastal Journey Timeline: Dayglow -> Paddle -> Relax -> Sunset -> Bonfire */}
        <div className="mb-20 sm:mb-24 bg-gradient-to-br from-[#1A1A1A] to-stone-900 dark:from-[#111922] dark:to-stone-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#83C5BE] uppercase tracking-widest mb-2">
              <Sun className="w-4 h-4 text-[#E29578]" />
              <span>Full Day-to-Sunset Flow</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight">
              Dayglow → Paddle → Relax → Sunset → Bonfire
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
              At Alon & Aninag, your island escape flows harmoniously from morning calm waters to starry night firesides. Here is how your day unfolds:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DAYGLOW_EXPERIENCE_DATA.coastalJourney.map((step, idx) => (
              <div 
                key={idx}
                className="bg-stone-800/80 dark:bg-stone-900/80 backdrop-blur-sm p-6 rounded-2xl border border-stone-700/60 relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#83C5BE] tracking-widest block mb-2">
                    {step.phase}
                  </span>
                  <h4 className="font-serif text-lg font-normal text-white mb-1">
                    {step.title}
                  </h4>
                  <span className="inline-block text-[11px] text-[#E29578] font-semibold mb-3">
                    {step.time}
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Step Customer Experience Process */}
        <div className="mb-20 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006D77] dark:text-[#83C5BE]">
              Guest Experience Flow
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-white mt-1">
              Your 5-Step Dayglow Experience
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2">
              Seamless, effortless, and hosted with warm local care from booking to rinse-off.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {DAYGLOW_EXPERIENCE_DATA.processSteps.map((s) => (
              <div
                key={s.step}
                className="bg-white dark:bg-[#131F2A] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 relative shadow-xs flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#006D77]/10 dark:bg-[#83C5BE]/15 text-[#006D77] dark:text-[#83C5BE] flex items-center justify-center font-serif text-lg font-bold mb-3">
                    0{s.step}
                  </div>
                  <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-white mb-1.5">
                    {s.title}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section (Clean & High Converting) */}
        <div id="dayglow-pricing" className="mb-20 sm:mb-24 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006D77] dark:text-[#83C5BE]">
              Transparent Rates
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-white mt-1">
              Dayglow Experience Pricing
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2">
              All rates are per pair (2 guests) and include 2-hour clear kayak/SUP access, floating refreshments, reserved daybed, and dedicated host assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Overnight Resort Guest Card (Highlighted) */}
            <div className="bg-white dark:bg-[#131F2A] rounded-3xl p-8 border-2 border-[#006D77] dark:border-[#83C5BE] shadow-lg relative flex flex-col justify-between transition-colors">
              <div className="absolute -top-3.5 right-6 bg-[#006D77] dark:bg-[#83C5BE] text-white dark:text-stone-900 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
                Most Popular • Staying Guests
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#006D77] dark:text-[#83C5BE] block mb-1">
                  Resort Resident Add-on
                </span>
                <h4 className="font-serif text-2xl font-normal text-stone-900 dark:text-white">
                  Overnight Resort Guest
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Exclusive discounted add-on rate for guests staying at Alon & Aninag.
                </p>

                <div className="my-6 pb-6 border-b border-stone-200 dark:border-stone-700">
                  <span className="font-serif text-4xl font-bold text-[#006D77] dark:text-[#83C5BE]">
                    {symbol}{overnightPrice.toLocaleString()}
                  </span>
                  <span className="text-stone-500 dark:text-stone-400 text-xs font-sans ml-2">
                    / pair (2 guests) • 2-Hour Experience
                  </span>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                    Save ₱350 compared to non-staying day pass
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-stone-700 dark:text-stone-300 mb-8">
                  {DAYGLOW_EXPERIENCE_DATA.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenBookingModal('overnight')}
                className="w-full py-3.5 bg-[#006D77] hover:bg-[#00555d] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book Overnight Add-on (₱850)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Day Pass Guest Card */}
            <div className="bg-white dark:bg-[#131F2A] rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between transition-colors">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                  Day Visitors & Staycationers
                </span>
                <h4 className="font-serif text-2xl font-normal text-stone-900 dark:text-white">
                  Day Pass Visitor
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  For visitors from Bacolod, Kabankalan, Dumaguete & nearby areas.
                </p>

                <div className="my-6 pb-6 border-b border-stone-200 dark:border-stone-700">
                  <span className="font-serif text-4xl font-bold text-stone-900 dark:text-white">
                    {symbol}{dayPassPrice.toLocaleString()}
                  </span>
                  <span className="text-stone-500 dark:text-stone-400 text-xs font-sans ml-2">
                    / pair (2 guests) • 2-Hour Experience
                  </span>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                    Includes resort beachfront pass & shower facilities
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-stone-700 dark:text-stone-300 mb-8">
                  {DAYGLOW_EXPERIENCE_DATA.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-stone-400 dark:text-stone-500 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                  <div className="flex items-start gap-2.5 text-[#006D77] dark:text-[#83C5BE] font-semibold">
                    <Check className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE] shrink-0 mt-0.5" />
                    <span>Includes fresh water beach shower & locker facilities</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenBookingModal('daypass')}
                className="w-full py-3.5 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-bold uppercase tracking-wider rounded-sm transition shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Reserve Day Pass (₱1,200)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Time Slot Schedule Banner */}
          <div className="mt-10 bg-white dark:bg-[#131F2A] rounded-2xl p-6 border border-stone-200 dark:border-stone-800 max-w-4xl mx-auto shadow-xs transition-colors">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div>
                <h4 className="font-serif text-base font-bold text-stone-900 dark:text-white">
                  Pre-Scheduled Daily Time Slots
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Strictly capped at 4 pairs per slot to prevent overcrowding and ensure flawless water photos.
                </p>
              </div>

              <span className="text-xs font-semibold text-[#006D77] dark:text-[#83C5BE] bg-[#006D77]/10 dark:bg-[#83C5BE]/15 px-3 py-1 rounded-full">
                Advance Reservation Recommended
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DAYGLOW_EXPERIENCE_DATA.timeSlots.map((slot) => (
                <div key={slot.id} className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700/60">
                  <span className="font-bold text-xs text-stone-900 dark:text-white block">{slot.label}</span>
                  <span className="text-[11px] text-[#006D77] dark:text-[#83C5BE] font-medium block">{slot.name}</span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 block truncate">{slot.vibe}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Differentiation & Why Alon & Aninag Stands Apart */}
        <div className="mb-20 sm:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-[#131F2A] rounded-3xl p-8 sm:p-12 border border-stone-200 dark:border-stone-800 shadow-sm transition-colors">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006D77] dark:text-[#83C5BE]">
              Unmatched Distinction
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-white">
              Why Our Dayglow Cannot Be Replicated
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Competitors can purchase similar kayaks or boards, but they cannot replicate our genuine Negrense hospitality culture, our 20-room quiet beachfront sanctuary, and the seamless transition into the sunset bonfire.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006D77] dark:text-[#83C5BE] hover:underline cursor-pointer"
              >
                <span>Explore Overnight Rooms & Villas</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DAYGLOW_EXPERIENCE_DATA.differentiation.map((diff, i) => (
              <div key={i} className="p-5 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700/60">
                <h4 className="font-serif text-sm font-bold text-stone-900 dark:text-white mb-1">
                  {diff.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Campaign: #DayglowAtAlon */}
        <div className="mb-20 sm:mb-24 bg-gradient-to-r from-[#006D77] via-[#2A7F88] to-[#83C5BE] rounded-3xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                <Camera className="w-3.5 h-3.5 text-[#FFDDD2]" />
                <span>TikTok & Instagram Campaign</span>
              </div>
              
              <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight">
                Share Your Glow with #DayglowAtAlon
              </h3>
              
              <p className="text-xs sm:text-sm text-stone-100 leading-relaxed">
                Short-form video hooks, clear-kayak drone perspectives, and floating tea flat-lays. Tag <strong>@alon.aninag.sipalay</strong> with <strong>#DayglowAtAlon</strong>. Top featured content creators win a free 2-night stay!
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyHashtag}
                  className="px-4 py-2.5 bg-white text-[#006D77] rounded-full text-xs font-bold uppercase tracking-wider transition shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isCopiedHashtag ? 'Hashtag Copied! ✨' : 'Copy #DayglowAtAlon'}</span>
                </button>

                <a
                  href="#reviews"
                  className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                >
                  View Guest UGC Wall
                </a>
              </div>
            </div>

            {/* Micro visual cards */}
            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
                <span className="font-serif text-2xl font-bold block">150k+</span>
                <span className="text-[11px] text-stone-200">TikTok Views</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
                <span className="font-serif text-2xl font-bold block">100%</span>
                <span className="text-[11px] text-stone-200">Clear Kayak Views</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
                <span className="font-serif text-2xl font-bold block">₱850</span>
                <span className="text-[11px] text-stone-200">Affordable Rate</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
                <span className="font-serif text-2xl font-bold block">Zero</span>
                <span className="text-[11px] text-stone-200">Overcrowding</span>
              </div>
            </div>
          </div>
        </div>

        {/* Safety, Quality & Marine Care Commitment */}
        <div className="bg-white dark:bg-[#131F2A] rounded-3xl p-8 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xs transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-stone-100 dark:border-stone-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#006D77] dark:text-[#83C5BE]">
                Safety & Quality Assurance
              </span>
              <h3 className="font-serif text-2xl font-normal text-stone-900 dark:text-white mt-1">
                Our Water Safety & Equipment Commitment
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/50">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Certified Local Beach Hosts & Life Jackets Provided</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DAYGLOW_EXPERIENCE_DATA.safetyCommitment.map((safe, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900 dark:text-white">
                  <div className="w-2 h-2 rounded-full bg-[#006D77] dark:bg-[#83C5BE]" />
                  <span>{safe.title}</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pl-4">
                  {safe.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Academic Project Presentation Modal (BSHM - 4B Group 1) */}
      {isAcademicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="bg-white dark:bg-[#131F2A] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 relative transition-colors">
            <button
              onClick={() => setIsAcademicModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006D77]/10 dark:bg-[#83C5BE]/20 text-[#006D77] dark:text-[#83C5BE] text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              Academic Presentation
            </div>

            <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
              {DAYGLOW_EXPERIENCE_DATA.academicProjectInfo.title}
            </h3>

            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {DAYGLOW_EXPERIENCE_DATA.academicProjectInfo.course} • {DAYGLOW_EXPERIENCE_DATA.academicProjectInfo.program} • {DAYGLOW_EXPERIENCE_DATA.academicProjectInfo.activityType}
            </p>

            <div className="mt-6 space-y-4 text-xs text-stone-700 dark:text-stone-300">
              <div className="bg-stone-50 dark:bg-stone-800/80 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
                <h4 className="font-bold text-stone-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">
                  Project Authors (Group 1):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DAYGLOW_EXPERIENCE_DATA.academicProjectInfo.members.map((m, idx) => (
                    <div key={idx} className="p-2 bg-white dark:bg-stone-900/90 rounded-lg border border-stone-200 dark:border-stone-700">
                      <p className="font-bold text-stone-900 dark:text-white">{m.name}</p>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400">{m.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider text-[11px] mb-1">
                  Strategic Rationale:
                </h4>
                <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed">
                  {DAYGLOW_EXPERIENCE_DATA.academicProjectInfo.strategicRationale}
                </p>
              </div>

              <div className="bg-[#006D77]/5 dark:bg-[#83C5BE]/10 p-4 rounded-xl border border-[#006D77]/20 dark:border-[#83C5BE]/20">
                <h4 className="font-bold text-[#006D77] dark:text-[#83C5BE] uppercase tracking-wider text-[11px] mb-1">
                  Management Feasibility Decision:
                </h4>
                <p className="font-bold text-stone-900 dark:text-white">
                  {DAYGLOW_EXPERIENCE_DATA.academicProjectInfo.managementDecision}
                </p>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
                  Strong market alignment, capital efficiency utilizing natural beachfront assets, high ROI per guest pair, and direct synergy with the sunset bonfire brand identity.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end">
              <button
                onClick={() => setIsAcademicModalOpen(false)}
                className="px-6 py-2 bg-[#006D77] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Close Overview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
