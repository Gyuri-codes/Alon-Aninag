import React from 'react';
import { useResort } from '../context/ResortContext';
import { ChevronRight, Waves, Sparkles, MapPin } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  bgImage?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  bgImage
}) => {
  const { navigateTo, t } = useResort();
  const displayBadge = badge || t('resortBadgeDefault', 'Alon & Aninag • Sipalay City');

  return (
    <div className="relative bg-[#1A1A1A] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-stone-800">
      {/* Background Image / Overlay */}
      {bgImage ? (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transform transition duration-700"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      ) : null}
      
      {/* Subtle Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-[#006D77]/40 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#F8F5F2] dark:from-[#0B131A] to-transparent pointer-events-none opacity-20" />

      <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-400 mb-4 uppercase tracking-widest font-medium">
          <button 
            onClick={() => navigateTo('home')} 
            className="hover:text-[#83C5BE] transition cursor-pointer"
          >
            {t('breadcrumbHome', 'Home')}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
          <span className="text-[#83C5BE] font-semibold">{title}</span>
        </nav>

        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#83C5BE] text-[11px] font-bold uppercase tracking-widest mb-3.5 shadow-sm">
          <Sparkles className="w-3 h-3 text-[#E29578]" />
          <span>{displayBadge}</span>
        </div>

        {/* Page Main Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight mb-4 max-w-4xl leading-tight">
          {title}
        </h1>

        {/* Slogan / Subtitle */}
        <p className="text-sm sm:text-base text-stone-300 max-w-2xl font-light leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
