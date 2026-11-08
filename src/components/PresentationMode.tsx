import React, { useState, useEffect, useCallback } from 'react';
import { useResort } from '../context/ResortContext';
import { RESORT_IMAGES, RESORT_INFO } from '../data/resortData';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  FileText,
  Users,
  Compass,
  Sparkles,
  PieChart as PieIcon,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Sun,
  Flame,
  Coffee,
  Clock,
  HeartHandshake,
  Activity,
  Sliders,
  Play
} from 'lucide-react';

interface PresentationModeProps {
  onClose?: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({ onClose }) => {
  const { currentSlide, setSlide, nextSlide, prevSlide, closePresentation, openBookingModal } = useResort();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSlideDrawerOpen, setIsSlideDrawerOpen] = useState(false);
  
  // Interactive State for Slide 05 (Org Chart)
  const [selectedStaffRole, setSelectedStaffRole] = useState<string>('manager');

  // Interactive State for Slide 09 (Budget Allocation Donut Chart)
  const [activeBudgetId, setActiveBudgetId] = useState<number>(0);

  // Interactive State for Slide 10 (90-Day Implementation Timeline)
  const [activePhase, setActivePhase] = useState<number>(1);

  // Interactive State for Slide 11 (Financial Feasibility Calculator)
  const [simOccupancy, setSimOccupancy] = useState<number>(75);
  const [simADR, setSimADR] = useState<number>(3500);
  const [simDayglowPerDay, setSimDayglowPerDay] = useState<number>(5);

  const totalSlides = 12;

  // Handle Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation: Left/Right arrows, Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        if (isFullscreen && document.fullscreenElement) {
          // let browser exit fullscreen
        } else {
          handleClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, nextSlide, prevSlide]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      closePresentation();
    }
  };

  // High-Resolution Scenic Backgrounds matching each slide's theme
  const slideBackgrounds: Record<number, string> = {
    1: RESORT_IMAGES.hero,
    2: RESORT_IMAGES.suite,
    3: RESORT_IMAGES.islets,
    4: RESORT_IMAGES.cottage,
    5: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=85',
    6: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1920&q=85',
    7: RESORT_IMAGES.sunsetPaddleKayak || RESORT_IMAGES.dayglow,
    8: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=85',
    9: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1920&q=85',
    10: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
    11: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=85',
    12: RESORT_IMAGES.bonfire || RESORT_IMAGES.sunsetDeck
  };

  const slideTitles = [
    'Title & Portfolio Introduction',
    'Executive Summary & Strategic Rationale',
    'Business Opportunity & Market Analysis',
    'Resort Concept & Guest Experience',
    'Organizational Structure & Workforce Architecture',
    'Human Resource Management & Inclusion',
    'The Aninag Dayglow & Product Innovation',
    'Marketing, Distribution & Competitive Strategy',
    'PHP 500,000 Launch Budget Allocation',
    '90-Day Implementation & Launch Timeline',
    'Financial Feasibility & Target KPIs',
    'Conclusion & Investor Decision Recommendation'
  ];

  // Budget Allocation Data for Slide 09
  const budgetItems = [
    {
      id: 0,
      title: 'Sales & Digital Launch Marketing',
      amount: 170000,
      percentage: 34,
      color: '#006D77',
      description: 'Mobile booking engine SEO, TikTok/IG viral creator campaigns (#DayglowAtAlon), regional B2B roadshows, and launch collateral.'
    },
    {
      id: 1,
      title: 'Operational Contingency Reserve',
      amount: 150000,
      percentage: 30,
      color: '#E29578',
      description: 'Prudent working capital liquidity buffer covering unforeseen operational overheads and weather contingencies.'
    },
    {
      id: 2,
      title: 'Comprehensive 30-Day Onboarding',
      amount: 60000,
      percentage: 12,
      color: '#83C5BE',
      description: 'Intensive 4-week hospitality curriculum, technical PMS simulations, emergency response, and Negrense gastronomy masterclasses.'
    },
    {
      id: 3,
      title: 'Diversity, Equity & Inclusion (DEI)',
      amount: 50000,
      percentage: 10,
      color: '#FFDDD2',
      description: 'Local Sipalay community integration workshops, cross-cultural empathy training, and barrier-free hospitality certifications.'
    },
    {
      id: 4,
      title: 'Recruitment, Sourcing & Vetting',
      amount: 40000,
      percentage: 8,
      color: '#4D908E',
      description: 'Competency-based talent acquisition across Negros Occidental targeting passionate local hospitality leaders.'
    },
    {
      id: 5,
      title: 'Team Collective NPS Rewards Pool',
      amount: 30000,
      percentage: 6,
      color: '#F4A261',
      description: 'Merit-based collective quarterly bonus fund (PHP 2,000/staff when guest Net Promoter Score exceeds 85).'
    }
  ];

  // Financial calculations for Slide 11
  const calculatedRoomRev = 24 * (simOccupancy / 100) * simADR * 30;
  const calculatedDayglowRev = simDayglowPerDay * 850 * 30;
  const calculatedTotalMonthlyRev = calculatedRoomRev + calculatedDayglowRev;

  return (
    <div className="fixed inset-0 z-50 bg-[#0A1014] text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Dynamic Background Image with Readability Vignette Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none transition-all duration-700 ease-in-out">
        <img
          src={slideBackgrounds[currentSlide] || RESORT_IMAGES.hero}
          alt={`Slide ${currentSlide} visual background`}
          className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.08] transition-all duration-700 transform scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1014] via-[#0A1014]/65 to-[#0A1014]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,16,20,0.8)_100%)]" />
      </div>

      {/* Top Presentation Header Bar */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-black/40 backdrop-blur-md border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white text-xs font-semibold uppercase tracking-wider transition border border-white/15 cursor-pointer"
            title="Return to Resort Website (Esc)"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Return to Resort</span>
          </button>

          <div className="h-4 w-px bg-white/20 hidden sm:block" />

          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs text-[#83C5BE] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E29578] animate-ping" />
              BSHM Operational Launch Plan
            </span>
            <h1 className="text-xs sm:text-sm font-medium text-white truncate max-w-xs sm:max-w-md">
              Slide {String(currentSlide).padStart(2, '0')}: {slideTitles[currentSlide - 1]}
            </h1>
          </div>
        </div>

        {/* Action Controls: Slide Index, Slide Drawer Toggle, Fullscreen Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-1 text-xs text-stone-300 font-mono bg-white/10 px-2.5 py-1 rounded border border-white/15">
            <span className="text-[#83C5BE] font-bold">{String(currentSlide).padStart(2, '0')}</span>
            <span className="text-stone-500">/</span>
            <span>{String(totalSlides).padStart(2, '0')}</span>
          </div>

          <button
            onClick={() => setIsSlideDrawerOpen(!isSlideDrawerOpen)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-xs text-stone-200 transition border border-white/15 cursor-pointer"
            title="All 12 Slides Overview"
          >
            <Layers className="w-3.5 h-3.5 text-[#83C5BE]" />
            <span className="hidden sm:inline">Slide Index</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 sm:p-2 rounded-sm bg-white/10 hover:bg-white/20 text-stone-200 transition border border-white/15 cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen (F11)'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleClose}
            className="p-1.5 sm:p-2 rounded-sm bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 hover:text-white transition border border-rose-500/30 cursor-pointer"
            title="Close Presentation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Slide Progress Bar */}
      <div className="relative z-20 w-full h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-[#006D77] via-[#83C5BE] to-[#E29578] transition-all duration-300 ease-out"
          style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
        />
      </div>

      {/* Main Slide Presentation Stage (Occupies Full Viewport Height) */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 flex flex-col justify-center overflow-y-auto custom-scrollbar">
        {/* =========================================================================
            SLIDE 01: TITLE & BUSINESS INTRODUCTION
           ========================================================================= */}
        {currentSlide === 1 && (
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center animate-fadeIn py-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#83C5BE] text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#E29578]" />
              <span>BSHM Strategic Management • Final Operational Portfolio</span>
            </div>

            <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-stone-300 font-semibold mb-2">
              Operational Launch Plan & Workforce Strategy
            </p>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight leading-tight mb-4 drop-shadow-md">
              ALON & ANINAG
            </h1>

            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#83C5BE] to-transparent mb-4" />

            <h2 className="font-serif italic text-lg sm:text-2xl text-[#FFDDD2] font-light mb-6">
              "Where Waves Rest and Souls Glow"
            </h2>

            <p className="text-sm sm:text-base text-stone-200 max-w-2xl font-light leading-relaxed mb-8">
              A 20-Room Eco-Refined Boutique Beach Resort at Poblacion Beach, Sipalay City, Negros Occidental. Bridging the gap between budget backpackers and high-priced luxury retreats through aesthetic minimalism, authentic Negrense culture, and intentional daytime guest experiences.
            </p>

            {/* Proposal Key Highlights Pill Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mb-8">
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-left">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">Resort Scale</span>
                <span className="text-base sm:text-lg font-serif font-bold text-white">20 Eco-Rooms</span>
                <span className="text-[11px] text-[#83C5BE] block mt-0.5">0-meter sand walkout</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-left">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">Location</span>
                <span className="text-base sm:text-lg font-serif font-bold text-white">Poblacion Beach</span>
                <span className="text-[11px] text-[#83C5BE] block mt-0.5">Sipalay City, Negros Occ.</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-left">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">Launch Capital</span>
                <span className="text-base sm:text-lg font-serif font-bold text-white">₱500,000</span>
                <span className="text-[11px] text-[#E29578] block mt-0.5">Simulated Human Capital</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-left">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">Team Size</span>
                <span className="text-base sm:text-lg font-serif font-bold text-white">10 Members</span>
                <span className="text-[11px] text-[#83C5BE] block mt-0.5">Local Negrense workforce</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={nextSlide}
                className="px-6 py-2.5 rounded-sm bg-[#006D77] hover:bg-[#00555d] text-white text-xs sm:text-sm uppercase tracking-wider font-bold transition shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Begin Presentation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 02: EXECUTIVE SUMMARY & STRATEGIC RATIONALE
           ========================================================================= */}
        {currentSlide === 2 && (
          <div className="w-full max-w-5xl mx-auto flex flex-col justify-center animate-fadeIn py-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#83C5BE] font-bold mb-1">
              <span>Slide 02</span>
              <span>•</span>
              <span>Strategic Overview</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal mb-4">
              Executive Summary & Capital Deployment Scope
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="w-8 h-8 rounded-lg bg-[#006D77] flex items-center justify-center text-white mb-3">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1.5">Boutique Market Positioning</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Alon & Aninag addresses the chronic gap in Sipalay's hospitality landscape: rustic hostels lack design polish and modern comforts, while five-star private resorts demand prohibitive ADRs (₱6,000+).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="w-8 h-8 rounded-lg bg-[#E29578] flex items-center justify-center text-white mb-3">
                  <DollarSign className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1.5">Capital Boundary Rule</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  The <strong>PHP 500,000</strong> launch fund is strictly dedicated to <em>human capital, 30-day onboarding, diversity workshops, brand marketing, and contingency reserves</em>. Physical land and fixed real estate are independently capitalized.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="w-8 h-8 rounded-lg bg-[#83C5BE] flex items-center justify-center text-[#0A1014] mb-3">
                  <CheckCircle2 className="w-4 h-4 text-[#006D77]" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1.5">Final Strategic Verdict</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Unanimous <strong>"GO ROLLOUT"</strong> recommendation. Fulfills modern travelers' desire for slow, photogenic, nature-grounded coastal retreats while ensuring a lean 10-person high-retention operating team.
                </p>
              </div>
            </div>

            {/* Detailed Strategic Callout Banner */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#006D77]/40 via-teal-950/40 to-black/60 border border-teal-500/30 text-stone-200 text-xs sm:text-sm leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-white text-sm mb-1.5">
                <ShieldCheck className="w-4 h-4 text-[#83C5BE]" />
                <span>Strategic Rationale for the 20-Room Scale</span>
              </div>
              <p className="text-stone-300">
                "Monetizes daytime beachfront real estate for a 20-room boutique resort without capital-intensive structural expansions. By creating an experiential daytime draw—The Aninag Dayglow & Paddle Experience—we capture external visitor foot traffic, expand ancillary food & beverage revenues, and maintain a high 75% average annual occupancy."
              </p>
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 03: BUSINESS OPPORTUNITY & TARGET MARKET ANALYSIS
           ========================================================================= */}
        {currentSlide === 3 && (
          <div className="w-full max-w-5xl mx-auto flex flex-col justify-center animate-fadeIn py-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#83C5BE] font-bold mb-1">
              <span>Slide 03</span>
              <span>•</span>
              <span>Market Intelligence</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal mb-3">
              Business Opportunity & Target Market Audit
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              {/* Target Customer Segment 1 */}
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E29578] text-white text-[10px] font-bold uppercase tracking-wider">
                    Primary Segment (70%)
                  </span>
                  <span className="text-xs text-[#83C5BE] font-mono">Ages 20–35</span>
                </div>
                <h3 className="font-bold text-base text-white mb-1">Aesthetic Seekers & Barkadas</h3>
                <p className="text-xs text-stone-300 leading-relaxed mb-3">
                  Young professionals, creative remote workers, couples, and friendship barkadas from Bacolod, Iloilo, Dumaguete, and Cebu seeking photogenic, calming weekend escapes.
                </p>
                <div className="space-y-1.5 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#83C5BE] shrink-0" />
                    <span>Values warm wood & white aesthetic minimalism and beachfront sunset dining.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#83C5BE] shrink-0" />
                    <span>Active content creators seeking shareable #DayglowAtAlon experiences.</span>
                  </div>
                </div>
              </div>

              {/* Target Customer Segment 2 */}
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#006D77] text-white text-[10px] font-bold uppercase tracking-wider">
                    Secondary Segment (30%)
                  </span>
                  <span className="text-xs text-[#83C5BE] font-mono">Corporate & Family</span>
                </div>
                <h3 className="font-bold text-base text-white mb-1">Regional Corporate Offsites & MICE</h3>
                <p className="text-xs text-stone-300 leading-relaxed mb-3">
                  Western Visayas regional banks, BPOs, university academic retreats, and intimate destination milestones seeking purposeful team bonding and quiet relaxation.
                </p>
                <div className="space-y-1.5 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#83C5BE] shrink-0" />
                    <span>Direct highway road access; no motorized boat transfer required.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#83C5BE] shrink-0" />
                    <span>Reliable high-speed fiber Wi-Fi + quiet sunset communal deck areas.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparative Market Matrix */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/15 text-xs">
              <div className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">
                Comparative Market Audit • Sipalay & Surrounding Coast
              </div>
              <div className="grid grid-cols-3 gap-2 text-[11px] sm:text-xs">
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="font-bold text-stone-300 block">Sugar Beach Lodges</span>
                  <p className="text-stone-400 mt-1">Requires outrigger boat crossing; inconsistent design; high transfer costs.</p>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="font-bold text-stone-300 block">Punta Bulata / Dauin</span>
                  <p className="text-stone-400 mt-1">Ultra-luxury rates (₱6k–₱12k/night); inaccessible for young regional travelers.</p>
                </div>
                <div className="p-2 rounded bg-teal-950/60 border border-teal-500/40">
                  <span className="font-bold text-[#83C5BE] block">Alon & Aninag Advantage</span>
                  <p className="text-stone-200 mt-1">Accessible Poblacion Beach road location, 24 accommodations at ₱3,500 ADR, curated daytime experiences.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 04: RESORT CONCEPT & GUEST EXPERIENCE ARCHITECTURE
           ========================================================================= */}
        {currentSlide === 4 && (
          <div className="w-full max-w-5xl mx-auto flex flex-col justify-center animate-fadeIn py-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#83C5BE] font-bold mb-1">
              <span>Slide 04</span>
              <span>•</span>
              <span>Concept & Experience</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal mb-3">
              Resort Concept & Guest Experience Architecture
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="w-8 h-8 rounded-lg bg-[#006D77] flex items-center justify-center text-white mb-2.5">
                  <Sun className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1">Wood & White Palette</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Clean lime-washed surfaces, sustainable bamboo, warm native rattan, and polished teakwood balancing modern luxury and raw tropical nature.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="w-8 h-8 rounded-lg bg-[#83C5BE] flex items-center justify-center text-[#0A1014] mb-2.5">
                  <Compass className="w-4 h-4 text-[#006D77]" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1">0-Meter Sand Walkout</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  All 24 accommodations feature direct sea views with zero seawall barrier. Guests step from their hardwood patio directly onto the golden sand of Poblacion Beach.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="w-8 h-8 rounded-lg bg-[#E29578] flex items-center justify-center text-white mb-2.5">
                  <Coffee className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1">Negrense Gastronomy</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Local Sipalay seafood grilled over coconut charcoal, fresh batuan-infused broth, artisanal native piaya, and cold-brew hibiscus herbal teas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="w-8 h-8 rounded-lg bg-[#FFDDD2] flex items-center justify-center text-[#0A1014] mb-2.5">
                  <Flame className="w-4 h-4 text-[#E29578]" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1">Soul Sunset Bonfires</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Nightly acoustic sunset rituals at the beachfront fire-pit with complimentary toasted native marshmallows and local herbal tea infusions.
                </p>
              </div>
            </div>

            {/* Universal Design Commitment */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-500/20 text-[#83C5BE] flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Universal Accessibility Commitment</h4>
                  <p className="text-stone-300 mt-0.5">
                    Zero-threshold entryways, gently sloped bamboo boardwalks across the sand, braille/tactile room signage, and fully accessible beachfront seating.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded bg-teal-900/50 text-[#83C5BE] border border-teal-700/50 font-mono text-[11px] shrink-0 font-bold">
                100% Inclusive Architecture
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 05: ORGANIZATIONAL STRUCTURE & WORKFORCE (INTERACTIVE ORG CHART)
           ========================================================================= */}
        {currentSlide === 5 && (
          <div className="w-full max-w-5xl mx-auto flex flex-col justify-center animate-fadeIn py-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#83C5BE] font-bold">
                <span>Slide 05</span>
                <span>•</span>
                <span>Organizational Structure</span>
              </div>
              <span className="text-[11px] text-stone-400 font-mono">Exactly 10 Selected Personnel</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal mb-3">
              10-Person Workforce Architecture
            </h2>

            {/* Interactive Tree View / Org Chart Cards */}
            <div className="space-y-3 mb-4">
              {/* Level 1: General Manager */}
              <div className="flex justify-center">
                <button
                  onClick={() => setSelectedStaffRole('manager')}
                  className={`w-full max-w-md p-3 rounded-xl transition border text-left cursor-pointer ${
                    selectedStaffRole === 'manager'
                      ? 'bg-[#006D77] border-[#83C5BE] shadow-lg shadow-teal-950'
                      : 'bg-white/10 hover:bg-white/15 border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-300 font-bold">Resort Leadership (1x)</span>
                      <h3 className="font-bold text-sm text-white">General / Hotel Operations Manager</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-black/30 text-[#83C5BE] font-mono">Lead</span>
                  </div>
                </button>
              </div>

              {/* Level 2: 3 Department Leads */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedStaffRole('fo_lead')}
                  className={`p-3 rounded-xl transition border text-left cursor-pointer ${
                    selectedStaffRole === 'fo_lead'
                      ? 'bg-[#006D77] border-[#83C5BE] shadow-lg'
                      : 'bg-white/10 hover:bg-white/15 border-white/20'
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider text-stone-300 font-bold">Department Lead (1x)</span>
                  <h4 className="font-bold text-xs text-white">Front Office & Guest Experience</h4>
                  <p className="text-[11px] text-stone-300 mt-1">Supervises 2 Front Desk Associates</p>
                </button>

                <button
                  onClick={() => setSelectedStaffRole('hk_lead')}
                  className={`p-3 rounded-xl transition border text-left cursor-pointer ${
                    selectedStaffRole === 'hk_lead'
                      ? 'bg-[#006D77] border-[#83C5BE] shadow-lg'
                      : 'bg-white/10 hover:bg-white/15 border-white/20'
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider text-stone-300 font-bold">Department Lead (1x)</span>
                  <h4 className="font-bold text-xs text-white">Housekeeping & Sustainability</h4>
                  <p className="text-[11px] text-stone-300 mt-1">Supervises 2 Housekeeping Associates</p>
                </button>

                <button
                  onClick={() => setSelectedStaffRole('fb_lead')}
                  className={`p-3 rounded-xl transition border text-left cursor-pointer ${
                    selectedStaffRole === 'fb_lead'
                      ? 'bg-[#006D77] border-[#83C5BE] shadow-lg'
                      : 'bg-white/10 hover:bg-white/15 border-white/20'
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider text-stone-300 font-bold">Department Lead (1x)</span>
                  <h4 className="font-bold text-xs text-white">F&B & Dining Experience</h4>
                  <p className="text-[11px] text-stone-300 mt-1">Supervises Kitchen & Facilities</p>
                </button>
              </div>

              {/* Level 3: Frontline Associates (6 Members) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  onClick={() => setSelectedStaffRole('frontdesk')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition ${
                    selectedStaffRole === 'frontdesk' ? 'bg-[#E29578] border-white text-white' : 'bg-white/5 border-white/15 text-stone-300 hover:bg-white/10'
                  }`}
                >
                  <span className="block font-bold">2x Front Desk Associates</span>
                  <span className="text-[10px] opacity-80">24/7 Rotational shifts</span>
                </button>

                <button
                  onClick={() => setSelectedStaffRole('housekeeping')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition ${
                    selectedStaffRole === 'housekeeping' ? 'bg-[#E29578] border-white text-white' : 'bg-white/5 border-white/15 text-stone-300 hover:bg-white/10'
                  }`}
                >
                  <span className="block font-bold">2x Housekeeping Staff</span>
                  <span className="text-[10px] opacity-80">Turnover for 24 accommodations</span>
                </button>

                <button
                  onClick={() => setSelectedStaffRole('kitchen')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition ${
                    selectedStaffRole === 'kitchen' ? 'bg-[#E29578] border-white text-white' : 'bg-white/5 border-white/15 text-stone-300 hover:bg-white/10'
                  }`}
                >
                  <span className="block font-bold">1x Dining Attendant</span>
                  <span className="text-[10px] opacity-80">Dayglow trays & breakfast</span>
                </button>

                <button
                  onClick={() => setSelectedStaffRole('maintenance')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition ${
                    selectedStaffRole === 'maintenance' ? 'bg-[#E29578] border-white text-white' : 'bg-white/5 border-white/15 text-stone-300 hover:bg-white/10'
                  }`}
                >
                  <span className="block font-bold">1x Maintenance Tech</span>
                  <span className="text-[10px] opacity-80">Solar, water & kayaks</span>
                </button>
              </div>
            </div>

            {/* Interactive Role Detail Inspector */}
            <div className="p-3.5 rounded-xl bg-black/50 border border-teal-500/30 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#83C5BE] font-bold block mb-1">
                Selected Role Responsibility & Scheduling Blueprint:
              </span>
              {selectedStaffRole === 'manager' && (
                <p className="text-stone-200 leading-relaxed">
                  <strong>Hotel Operations Manager:</strong> Directly accountable for guest Net Promoter Score (target ≥ 85), local government compliance, financial audits, staff welfare, and cross-departmental coordination. Works daytime peak shifts (8 AM–5 PM) with on-call crisis authority.
                </p>
              )}
              {selectedStaffRole === 'fo_lead' && (
                <p className="text-stone-200 leading-relaxed">
                  <strong>Front Office & Guest Experience Lead:</strong> Oversees check-in/out speeds (&lt; 3 minutes), concierge itineraries, direct booking engine inquiries, and manages the 2 Front Desk Associates across 3 rotational shifts.
                </p>
              )}
              {selectedStaffRole === 'hk_lead' && (
                <p className="text-stone-200 leading-relaxed">
                  <strong>Housekeeping & Sustainability Lead:</strong> Implements eco-friendly botanical cleaning agents, manages linen wash cycles for 20 beachfront rooms, conducts daily 50-point cleanliness audits, and supervises 2 attendants.
                </p>
              )}
              {selectedStaffRole === 'fb_lead' && (
                <p className="text-stone-200 leading-relaxed">
                  <strong>F&B / Kitchen Experience Lead:</strong> Curates authentic Negrense breakfast trays, oversees charcoal grill preparation for evening bonfires, and directs the prep of floating cold-brew tea trays for the Aninag Dayglow paddle sessions.
                </p>
              )}
              {selectedStaffRole === 'frontdesk' && (
                <p className="text-stone-200 leading-relaxed">
                  <strong>2x Front Desk Associates:</strong> Staffed on rotational day (6 AM–2 PM), swing (2 PM–10 PM), and on-call night shifts ensuring 24/7 guest safety, welcoming guests with local calamansi tea, and administering booking modifications.
                </p>
              )}
              {selectedStaffRole === 'housekeeping' && (
                <p className="text-stone-200 leading-relaxed">
                  <strong>2x Housekeeping & Laundry Attendants:</strong> Responsible for prompt turnaround of the 20 guest rooms between 11:00 AM and 2:00 PM, evening turndown service with aromatherapy spray, and daily beach sand grooming.
                </p>
              )}
              {selectedStaffRole === 'kitchen' && (
                <p className="text-stone-200 leading-relaxed">
                  <strong>1x Dining & Floating Tray Attendant:</strong> Prepares and assembles floating food trays, executes fresh tropical juice prep, and manages service at the open-air beachfront pavilion.
                </p>
              )}
              {selectedStaffRole === 'maintenance' && (
                <p className="text-stone-200 leading-relaxed">
                  <strong>1x Facilities & Maintenance Technician:</strong> Maintains water filtration, standby solar inverter batteries, beachfront LED lighting, and conducts pre-flight safety inspections on clear kayaks and paddleboards.
                </p>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 06: HUMAN RESOURCE MANAGEMENT, INCLUSION & CULTURE
           ========================================================================= */}
        {currentSlide === 6 && (
          <div className="w-full max-w-5xl mx-auto flex flex-col justify-center animate-fadeIn py-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#83C5BE] font-bold mb-1">
              <span>Slide 06</span>
              <span>•</span>
              <span>Human Resource Management</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal mb-3">
              HR Strategy, Inclusion & 30-Day Onboarding Plan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Pillar 1: Equal Opportunity Employer */}
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="w-8 h-8 rounded-lg bg-[#006D77] flex items-center justify-center text-white mb-2.5">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1">Local & Inclusive Hiring</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Equal Opportunity Employer (EOE). Explicitly recruits from Sipalay fisherfolk families, women re-entering the workforce, and LGBTQ+ community members with fair living wages above regional minimums.
                </p>
              </div>

              {/* Pillar 2: Situational Leadership */}
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="w-8 h-8 rounded-lg bg-[#83C5BE] flex items-center justify-center text-[#0A1014] mb-2.5">
                  <Activity className="w-4 h-4 text-[#006D77]" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1">Situational Leadership</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Adapts leadership style dynamically (Directing, Coaching, Supporting, Delegating) to foster personal confidence and empower staff to resolve guest issues autonomously up to ₱1,500.
                </p>
              </div>

              {/* Pillar 3: Collective Rewards */}
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="w-8 h-8 rounded-lg bg-[#E29578] flex items-center justify-center text-white mb-2.5">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1">Collective NPS Bonus</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Rejection of competitive individual commissions. All 10 staff share a quarterly <strong>₱30,000 Collective Bonus Pool</strong> (₱2,000/staff when quarterly NPS ≥ 85), cementing cross-departmental solidarity.
                </p>
              </div>
            </div>

            {/* 30-Day Onboarding Roadmap */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/15 text-xs">
              <div className="text-[10px] uppercase tracking-widest text-[#83C5BE] font-bold mb-2">
                Structured 30-Day Onboarding Curriculum
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <div className="p-2.5 rounded bg-white/5 border border-white/10">
                  <span className="font-bold text-[#83C5BE] block text-[11px]">Week 1: Foundations</span>
                  <p className="text-[11px] text-stone-300 mt-0.5">Resort brand philosophy, Sipalay cultural heritage, and guest empathy rituals.</p>
                </div>
                <div className="p-2.5 rounded bg-white/5 border border-white/10">
                  <span className="font-bold text-[#83C5BE] block text-[11px]">Week 2: Technical Skills</span>
                  <p className="text-[11px] text-stone-300 mt-0.5">PMS reservations mastery, water safety certification, and culinary prep drills.</p>
                </div>
                <div className="p-2.5 rounded bg-white/5 border border-white/10">
                  <span className="font-bold text-[#83C5BE] block text-[11px]">Week 3: Shadowing</span>
                  <p className="text-[11px] text-stone-300 mt-0.5">Live emergency simulations, situational problem solving, and cross-training.</p>
                </div>
                <div className="p-2.5 rounded bg-white/5 border border-white/10">
                  <span className="font-bold text-[#83C5BE] block text-[11px]">Week 4: Rehearsals</span>
                  <p className="text-[11px] text-stone-300 mt-0.5">Full dry-run dress rehearsals with VIP test guests and peer evaluation circles.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 07: PRODUCTS & THE ANINAG DAYGLOW EXPERIENCE
           ========================================================================= */}
        {currentSlide === 7 && (
          <div className="w-full max-w-5xl mx-auto flex flex-col justify-center animate-fadeIn py-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#83C5BE] font-bold mb-1">
              <span>Slide 07</span>
              <span>•</span>
              <span>Signature Product Innovation</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                The Aninag Dayglow & Paddle Experience
              </h2>
              <span className="px-3 py-1 rounded-full bg-[#E29578] text-white text-xs font-bold uppercase tracking-wider">
                Flagship Daytime Offer
              </span>
            </div>

            <p className="font-serif italic text-base text-[#FFDDD2] mb-4">
              "Paddle. Relax. Capture the Glow."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block mb-1">Asset Utilization</span>
                <h3 className="font-bold text-sm text-white mb-2">Daytime Bay Monetization</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Unlocks daytime monetization of the calm Poblacion Bay waters between 8:00 AM and 5:00 PM without requiring additional room construction.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block mb-1">Inclusions</span>
                <h3 className="font-bold text-sm text-white mb-2">Clear Kayak & Floating Tray</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  2-hour transparent kayak or stand-up paddleboard, floating Negrense cold-brew tea and artisanal snack tray, plus reserved beachfront daybed.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block mb-1">Dual Pricing Model</span>
                <h3 className="font-bold text-sm text-white mb-2">High-Margin Ancillary Stream</h3>
                <div className="mt-1 space-y-1 text-xs">
                  <div className="flex justify-between text-stone-200">
                    <span>Overnight Guests:</span>
                    <span className="font-bold text-[#83C5BE]">₱850 / pair</span>
                  </div>
                  <div className="flex justify-between text-stone-200">
                    <span>Day Visitors:</span>
                    <span className="font-bold text-[#E29578]">₱1,200 / pair</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Operational Time Slots */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/15 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#83C5BE]" />
                <span className="font-bold text-white">4 Curated Daily Time-Slots:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:w-auto text-center font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">08:00 AM (Morning Calm)</span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">10:30 AM (Sun Glow)</span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">02:00 PM (Afternoon Tide)</span>
                <span className="px-2.5 py-1 rounded bg-teal-900/60 text-[#83C5BE] border border-teal-500/40">04:30 PM (Golden Hour)</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 08: MARKETING & COMPETITIVE STRATEGY
           ========================================================================= */}
        {currentSlide === 8 && (
          <div className="w-full max-w-5xl mx-auto flex flex-col justify-center animate-fadeIn py-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#83C5BE] font-bold mb-1">
              <span>Slide 08</span>
              <span>•</span>
              <span>Go-To-Market Strategy</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal mb-3">
              Omni-Channel Marketing & Distribution Funnel
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="text-[10px] uppercase tracking-wider text-[#83C5BE] font-bold block mb-1">Awareness</span>
                <h3 className="font-bold text-sm text-white mb-1.5">Viral Creator & UGC Campaigns</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Collaborations with top Visayan travel creators spotlighting the clear kayak floating tray and golden sunsets (#DayglowAtAlon, #WhereWavesRest).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="text-[10px] uppercase tracking-wider text-[#E29578] font-bold block mb-1">Consideration</span>
                <h3 className="font-bold text-sm text-white mb-1.5">Direct Booking Engine First</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Mobile-optimized website with zero OTA commission drag. Direct bookers receive exclusive perks (complimentary sunset mocktail & 15% Dayglow voucher).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="text-[10px] uppercase tracking-wider text-[#FFDDD2] font-bold block mb-1">Conversion & B2B</span>
                <h3 className="font-bold text-sm text-white mb-1.5">Corporate & Offsite Retreats</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Tailored weekday packages for Bacolod and Dumaguete companies, banks, and academic groups filling Monday–Thursday occupancy gaps.
                </p>
              </div>
            </div>

            {/* Strategic Differentiation Callout */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/15 text-xs">
              <div className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">
                Distribution Policy & OTA Disintermediation
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="font-bold text-white block">Direct Booking Engine</span>
                  <span className="text-[11px] text-stone-400">Target 70% share • 0% commission expense</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="font-bold text-white block">Selective OTA Exposure</span>
                  <span className="text-[11px] text-stone-400">Target 30% share (Agoda/Booking.com) for international discovery</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="font-bold text-white block">Community Partnerships</span>
                  <span className="text-[11px] text-stone-400">Integrated Tinagong Dagat & sugar beach local boat tours</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 09: LAUNCH BUDGET ALLOCATION (INTERACTIVE SVG DONUT CHART)
           ========================================================================= */}
        {currentSlide === 9 && (
          <div className="w-full max-w-5xl mx-auto flex flex-col justify-center animate-fadeIn py-2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#83C5BE] font-bold">
                <span>Slide 09</span>
                <span>•</span>
                <span>Capital Deployment</span>
              </div>
              <span className="text-xs text-[#E29578] font-mono font-bold">Total Allocation: ₱500,000 (100%)</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal mb-3">
              PHP 500,000 Launch Operational Budget
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center mb-3">
              {/* Interactive SVG Donut Chart */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background Circle */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth="16" />
                    
                    {/* Dynamic Donut Segments */}
                    {(() => {
                      let accumulatedPercent = 0;
                      return budgetItems.map((item) => {
                        const strokeDasharray = `${item.percentage * 2.3876} 238.76`;
                        const strokeDashoffset = `-${accumulatedPercent * 2.3876}`;
                        accumulatedPercent += item.percentage;
                        const isSelected = activeBudgetId === item.id;
                        return (
                          <circle
                            key={item.id}
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            stroke={item.color}
                            strokeWidth={isSelected ? '19' : '16'}
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="cursor-pointer transition-all duration-300 hover:opacity-90"
                            onClick={() => setActiveBudgetId(item.id)}
                          />
                        );
                      });
                    })()}
                  </svg>
                  {/* Center Text inside Donut */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-[10px] uppercase text-stone-400 font-semibold tracking-wider">Selected</span>
                    <span className="text-lg sm:text-xl font-bold font-serif text-white">
                      {budgetItems[activeBudgetId].percentage}%
                    </span>
                    <span className="text-[11px] text-[#83C5BE] font-mono">
                      ₱{(budgetItems[activeBudgetId].amount).toLocaleString()}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-stone-400 mt-2">Click any segment or list item to view details</span>
              </div>

              {/* Budget Line Items Selector */}
              <div className="lg:col-span-7 space-y-1.5">
                {budgetItems.map((item) => {
                  const isSelected = activeBudgetId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveBudgetId(item.id)}
                      className={`w-full p-2.5 rounded-lg border text-left transition cursor-pointer flex items-center justify-between text-xs ${
                        isSelected
                          ? 'bg-white/15 border-[#83C5BE] shadow-md'
                          : 'bg-white/5 hover:bg-white/10 border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="font-semibold text-white">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-stone-300">₱{item.amount.toLocaleString()}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/40 text-[#83C5BE]">
                          {item.percentage}%
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Item Detail Description */}
            <div className="p-3 rounded-xl bg-black/40 border border-teal-500/30 text-xs text-stone-300">
              <strong className="text-white">{budgetItems[activeBudgetId].title}:</strong>{' '}
              {budgetItems[activeBudgetId].description}
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 10: 90-DAY IMPLEMENTATION & LAUNCH TIMELINE
           ========================================================================= */}
        {currentSlide === 10 && (
          <div className="w-full max-w-5xl mx-auto flex flex-col justify-center animate-fadeIn py-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#83C5BE] font-bold mb-1">
              <span>Slide 10</span>
              <span>•</span>
              <span>Execution Roadmap</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal mb-3">
              90-Day Implementation & Launch Timeline
            </h2>

            {/* Phase Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => setActivePhase(1)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  activePhase === 1
                    ? 'bg-[#006D77] border-[#83C5BE] shadow-lg'
                    : 'bg-white/10 hover:bg-white/15 border-white/20'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-stone-300 block">Days 1–30</span>
                <h3 className="font-bold text-xs sm:text-sm text-white">Phase 1: Foundation</h3>
                <span className="text-[10px] text-[#83C5BE] block mt-0.5">Recruitment & Setup</span>
              </button>

              <button
                onClick={() => setActivePhase(2)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  activePhase === 2
                    ? 'bg-[#006D77] border-[#83C5BE] shadow-lg'
                    : 'bg-white/10 hover:bg-white/15 border-white/20'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-stone-300 block">Days 31–60</span>
                <h3 className="font-bold text-xs sm:text-sm text-white">Phase 2: Soft Launch</h3>
                <span className="text-[10px] text-[#83C5BE] block mt-0.5">30-Day Onboarding</span>
              </button>

              <button
                onClick={() => setActivePhase(3)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  activePhase === 3
                    ? 'bg-[#006D77] border-[#83C5BE] shadow-lg'
                    : 'bg-white/10 hover:bg-white/15 border-white/20'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-stone-300 block">Days 61–90</span>
                <h3 className="font-bold text-xs sm:text-sm text-white">Phase 3: Grand Operations</h3>
                <span className="text-[10px] text-[#83C5BE] block mt-0.5">Commercial Rollout</span>
              </button>
            </div>

            {/* Phase Specific Milestones & Deliverables */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/15 text-xs">
              {activePhase === 1 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="font-bold text-sm text-[#83C5BE]">Phase 1 Deliverables: Organizational Foundation (Days 1–30)</span>
                    <span className="text-[11px] text-stone-400">Accountability: Hotel Operations Manager</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-300">
                    <div className="p-2.5 rounded bg-white/5 border border-white/10 space-y-1">
                      <span className="font-bold text-white block">Talent Sourcing & Onboarding Contracts</span>
                      <p className="text-[11px]">Finalize employment contracts for all 10 core personnel with full DEI guarantees and clear role definitions.</p>
                    </div>
                    <div className="p-2.5 rounded bg-white/5 border border-white/10 space-y-1">
                      <span className="font-bold text-white block">Dayglow Equipment Procurement</span>
                      <p className="text-[11px]">Procure commercial clear polycarbonate kayaks, stand-up paddleboards, and custom floating acrylic snack trays.</p>
                    </div>
                    <div className="p-2.5 rounded bg-white/5 border border-white/10 space-y-1">
                      <span className="font-bold text-white block">Digital PMS & Channel Setup</span>
                      <p className="text-[11px]">Configure cloud property management system, payment gateways (GCash/Maya/Cards), and mobile booking engine.</p>
                    </div>
                    <div className="p-2.5 rounded bg-white/5 border border-white/10 space-y-1">
                      <span className="font-bold text-white block">Local Government Permits</span>
                      <p className="text-[11px]">Complete DOT tourism accreditation, Sipalay City sanitary permits, and coastal bay activity approvals.</p>
                    </div>
                  </div>
                </div>
              )}

              {activePhase === 2 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="font-bold text-sm text-[#83C5BE]">Phase 2 Deliverables: Workforce Training & Soft Launch (Days 31–60)</span>
                    <span className="text-[11px] text-stone-400">Accountability: Department Leads & HR</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-300">
                    <div className="p-2.5 rounded bg-white/5 border border-white/10 space-y-1">
                      <span className="font-bold text-white block">Execution of 30-Day Onboarding</span>
                      <p className="text-[11px]">Immersive delivery of all 4 training modules: brand empathy, technical systems, water safety, and situational mock drills.</p>
                    </div>
                    <div className="p-2.5 rounded bg-white/5 border border-white/10 space-y-1">
                      <span className="font-bold text-white block">Soft Opening Stress Testing</span>
                      <p className="text-[11px]">Host invited community leaders, family, and travel influencers under live operational conditions across 8 rooms.</p>
                    </div>
                    <div className="p-2.5 rounded bg-white/5 border border-white/10 space-y-1">
                      <span className="font-bold text-white block">Trial Dayglow Sessions</span>
                      <p className="text-[11px]">Conduct 20 supervised floating tray paddle sessions to test wave safety, food temperature, and turnaround protocols.</p>
                    </div>
                    <div className="p-2.5 rounded bg-white/5 border border-white/10 space-y-1">
                      <span className="font-bold text-white block">Operational Gap Rectification</span>
                      <p className="text-[11px]">Synthesize daily feedback circles and adjust housekeeping workflows prior to commercial opening.</p>
                    </div>
                  </div>
                </div>
              )}

              {activePhase === 3 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="font-bold text-sm text-[#83C5BE]">Phase 3 Deliverables: Full Commercial Operations (Days 61–90)</span>
                    <span className="text-[11px] text-stone-400">Accountability: All 10 Team Members</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-300">
                    <div className="p-2.5 rounded bg-white/5 border border-white/10 space-y-1">
                      <span className="font-bold text-white block">Grand Public Commercial Launch</span>
                      <p className="text-[11px]">Open all 20 guest rooms to public paying reservations; activate paid digital marketing campaigns.</p>
                    </div>
                    <div className="p-2.5 rounded bg-white/5 border border-white/10 space-y-1">
                      <span className="font-bold text-white block">Aninag Dayglow Public Availability</span>
                      <p className="text-[11px]">Open day-pass bookings (₱1,200/pair) for non-staying guests to monetize bayfront daytime traffic.</p>
                    </div>
                    <div className="p-2.5 rounded bg-white/5 border border-white/10 space-y-1">
                      <span className="font-bold text-white block">First NPS Audit & Shared Bonus</span>
                      <p className="text-[11px]">Audit first 60 days of guest verified reviews. Disburse collective ₱30,000 reward pool upon meeting target score.</p>
                    </div>
                    <div className="p-2.5 rounded bg-white/5 border border-white/10 space-y-1">
                      <span className="font-bold text-white block">Sustainable Operating Rhythm</span>
                      <p className="text-[11px]">Transition leadership from direct supervision to situational delegation and long-term guest loyalty tracking.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 11: FINANCIAL FEASIBILITY & PERFORMANCE PROJECTIONS (INTERACTIVE CALCULATOR)
           ========================================================================= */}
        {currentSlide === 11 && (
          <div className="w-full max-w-5xl mx-auto flex flex-col justify-center animate-fadeIn py-2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#83C5BE] font-bold">
                <span>Slide 11</span>
                <span>•</span>
                <span>Financial Feasibility</span>
              </div>
              <span className="text-xs text-stone-400 font-mono">20-Room Revenue Model</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal mb-3">
              Financial Projections & Interactive Calculator
            </h2>

            {/* Interactive Calculator Controls */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-3">
                {/* Occupancy Slider */}
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-stone-300">Average Occupancy:</span>
                    <span className="text-[#83C5BE] font-bold font-mono">{simOccupancy}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="5"
                    value={simOccupancy}
                    onChange={(e) => setSimOccupancy(Number(e.target.value))}
                    className="w-full accent-[#006D77] cursor-pointer"
                  />
                  <span className="text-[10px] text-stone-400 block mt-0.5">Baseline assumption: 75%</span>
                </div>

                {/* ADR Slider */}
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-stone-300">Average Daily Rate (ADR):</span>
                    <span className="text-[#83C5BE] font-bold font-mono">₱{simADR.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="2800"
                    max="5000"
                    step="100"
                    value={simADR}
                    onChange={(e) => setSimADR(Number(e.target.value))}
                    className="w-full accent-[#006D77] cursor-pointer"
                  />
                  <span className="text-[10px] text-stone-400 block mt-0.5">Baseline assumption: ₱3,500</span>
                </div>

                {/* Dayglow Sessions per day */}
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-stone-300">Dayglow Sessions / Day:</span>
                    <span className="text-[#E29578] font-bold font-mono">{simDayglowPerDay} pairs</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    step="1"
                    value={simDayglowPerDay}
                    onChange={(e) => setSimDayglowPerDay(Number(e.target.value))}
                    className="w-full accent-[#E29578] cursor-pointer"
                  />
                  <span className="text-[10px] text-stone-400 block mt-0.5">Baseline assumption: 5 pairs/day</span>
                </div>
              </div>

              {/* Dynamic Revenue Result Display */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-center">
                <div className="p-2.5 rounded-lg bg-black/30">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Monthly Room Revenue</span>
                  <span className="text-base sm:text-lg font-serif font-bold text-white">
                    ₱{Math.round(calculatedRoomRev).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-stone-400 block">24 accommodations × {simOccupancy}% × ₱{simADR}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-black/30">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Monthly Dayglow Ancillary</span>
                  <span className="text-base sm:text-lg font-serif font-bold text-[#E29578]">
                    ₱{Math.round(calculatedDayglowRev).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-stone-400 block">{simDayglowPerDay} pairs/day × ₱850 avg</span>
                </div>

                <div className="p-2.5 rounded-lg bg-teal-950/70 border border-teal-500/40">
                  <span className="text-[10px] uppercase tracking-wider text-[#83C5BE] font-bold block">Total Projected Monthly</span>
                  <span className="text-base sm:text-lg font-serif font-bold text-[#83C5BE]">
                    ₱{Math.round(calculatedTotalMonthlyRev).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-stone-300 block">Annualized: ₱{Math.round(calculatedTotalMonthlyRev * 12).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Target Core KPIs */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/15 text-xs">
              <div className="text-[10px] uppercase tracking-widest text-[#83C5BE] font-bold mb-2">
                Operational Launch Performance Scorecard (KPIs)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-stone-200">
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="font-bold text-[#83C5BE] block text-sm">≥ 85 NPS</span>
                  <span className="text-[10px] text-stone-400">Guest Net Promoter Score</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="font-bold text-[#83C5BE] block text-sm">&lt; 3.0 min</span>
                  <span className="text-[10px] text-stone-400">Average check-in speed</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="font-bold text-[#83C5BE] block text-sm">&lt; 5%</span>
                  <span className="text-[10px] text-stone-400">90-Day staff turnover</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="font-bold text-[#83C5BE] block text-sm">≥ 3.5%</span>
                  <span className="text-[10px] text-stone-400">Direct website conversion</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SLIDE 12: CONCLUSION, INVESTOR RECOMMENDATION & ACTIONS
           ========================================================================= */}
        {currentSlide === 12 && (
          <div className="w-full max-w-5xl mx-auto flex flex-col justify-center items-center text-center animate-fadeIn py-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-[#83C5BE] border border-teal-500/30 text-xs font-semibold uppercase tracking-widest mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Final Strategic Verdict: Unanimous "GO"</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal mb-3">
              Strategic Recommendation & Launch Authorization
            </h2>

            <p className="font-serif italic text-base sm:text-lg text-[#FFDDD2] max-w-2xl font-light mb-6">
              "Alon & Aninag stands ready to redefine boutique coastal hospitality in Negros Occidental — grounded in people, nature, and shared prosperity."
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl mb-6 text-left">
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="font-bold text-white text-xs block mb-1">1. High Asset Efficiency</span>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  24 boutique accommodations generating ₱1.7M+ monthly revenue supported by high-margin daytime paddle experiences.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="font-bold text-white text-xs block mb-1">2. Stable 10-Person Team</span>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  Rigorous 30-day onboarding and collective NPS bonuses ensuring low turnover and consistent guest satisfaction.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="font-bold text-white text-xs block mb-1">3. Protected Capital Scope</span>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  Strictly ring-fenced ₱500,000 launch capital with a healthy 30% (₱150k) contingency buffer.
                </p>
              </div>
            </div>

            {/* Final Action CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-sm bg-[#006D77] hover:bg-[#00555d] text-white text-xs sm:text-sm uppercase tracking-wider font-bold transition shadow-lg cursor-pointer flex items-center gap-2"
              >
                <span>Return to Resort Website</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  handleClose();
                  openBookingModal();
                }}
                className="px-6 py-2.5 rounded-sm bg-[#E29578] hover:bg-[#d48163] text-white text-xs sm:text-sm uppercase tracking-wider font-bold transition shadow-md cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Stay</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Presentation Navigation Bar */}
      <footer className="relative z-20 px-4 sm:px-8 py-3 bg-black/50 backdrop-blur-md border-t border-white/10 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition border ${
              currentSlide === 1
                ? 'opacity-30 border-white/10 text-stone-500 cursor-not-allowed'
                : 'bg-white/10 hover:bg-white/20 border-white/20 text-white cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous Slide</span>
          </button>

          {/* Clickable 01 to 12 Slide Numbers / Dots */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1">
            {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => {
              const isActive = currentSlide === num;
              return (
                <button
                  key={num}
                  onClick={() => setSlide(num)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-sm text-xs font-mono font-bold transition flex items-center justify-center cursor-pointer ${
                    isActive
                      ? 'bg-[#006D77] text-white shadow-md border border-[#83C5BE] scale-105'
                      : 'bg-white/10 hover:bg-white/20 text-stone-300 border border-white/10'
                  }`}
                  title={`Slide ${num}: ${slideTitles[num - 1]}`}
                >
                  {String(num).padStart(2, '0')}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition border ${
              currentSlide === totalSlides
                ? 'opacity-30 border-white/10 text-stone-500 cursor-not-allowed'
                : 'bg-[#006D77] hover:bg-[#00555d] border-teal-500/50 text-white cursor-pointer shadow-md'
            }`}
          >
            <span className="hidden sm:inline">Next Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Slide Drawer Modal / Popover (Shows All 12 Slide Titles and Quick Jump) */}
      {isSlideDrawerOpen && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-lg flex flex-col p-4 sm:p-8 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/20">
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white">
                All 12 Presentation Slides • Quick Jump
              </h2>
              <p className="text-xs text-[#83C5BE]">
                Alon & Aninag Boutique Beach Resort • BSHM Operational Launch Plan
              </p>
            </div>
            <button
              onClick={() => setIsSlideDrawerOpen(false)}
              className="p-2 rounded-sm bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto max-h-[75vh] custom-scrollbar p-1">
            {slideTitles.map((title, idx) => {
              const slideNum = idx + 1;
              const isCurrent = currentSlide === slideNum;
              return (
                <button
                  key={slideNum}
                  onClick={() => {
                    setSlide(slideNum);
                    setIsSlideDrawerOpen(false);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#006D77] border-[#83C5BE] shadow-lg shadow-teal-950'
                      : 'bg-white/10 hover:bg-white/20 border-white/15'
                  }`}
                >
                  <span className="w-7 h-7 rounded bg-black/40 font-mono font-bold text-xs text-[#83C5BE] flex items-center justify-center shrink-0">
                    {String(slideNum).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-xs text-white block truncate">{title}</span>
                    <span className="text-[10px] text-stone-300 mt-0.5 block truncate">
                      {slideNum === 1 && 'Introduction & Scale'}
                      {slideNum === 2 && 'Executive Summary & ₱500k Scope'}
                      {slideNum === 3 && 'Aesthetic Seekers & Barkadas'}
                      {slideNum === 4 && 'Wood & White, 0m Sand Walkout'}
                      {slideNum === 5 && '10-Person Team Architecture'}
                      {slideNum === 6 && 'EOE & 30-Day Onboarding'}
                      {slideNum === 7 && 'Clear Kayak & Floating Tray'}
                      {slideNum === 8 && 'Omni-Channel Funnel & Direct PMS'}
                      {slideNum === 9 && 'Interactive SVG Donut Breakdown'}
                      {slideNum === 10 && '3-Phase 90-Day Milestones'}
                      {slideNum === 11 && 'Dynamic Revenue Calculator'}
                      {slideNum === 12 && 'Conclusion & Launch Recommendation'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
