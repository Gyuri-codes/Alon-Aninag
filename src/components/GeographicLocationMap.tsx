import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { 
  MapPin, 
  Plus, 
  Minus, 
  RotateCcw, 
  Navigation, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Copy,
  Info
} from 'lucide-react';

export interface MapLocation {
  id: string;
  name: string;
  shortName: string;
  type: 'our-resort' | 'competitor';
  category: string;
  address: string;
  distanceKm: number;
  travelTime: string;
  description: string;
  badge?: string;
  topRated?: boolean;
  coords: {
    // Relative coordinates on a 800 x 620 map canvas
    x: number;
    y: number;
  };
  labelOffset: {
    dx: number;
    dy: number;
    align: 'start' | 'middle' | 'end';
  };
}

export const GeographicLocationMap: React.FC = () => {
  const { t, addNotification } = useResort();
  
  // The 4 key locations: Alon & Aninag + 3 competitors from reference screenshots
  const locations: MapLocation[] = [
    {
      id: 'alon-aninag',
      name: 'Alon & Aninag Boutique Beach Resort',
      shortName: 'Alon & Aninag Frontage',
      type: 'our-resort',
      category: '24-Room Boutique Beachfront Sanctuary',
      address: 'Poblacion Beach (near Jazz Inn & Baywalk), Sipalay City, Negros Occidental 6111',
      distanceKm: 0,
      travelTime: 'Town Center • Direct Beachfront',
      description: 'Direct beachfront on Poblacion Beach. 0 meters from the sand, 5 minutes from Sipalay City Public Terminal.',
      badge: 'You Are Here',
      coords: { x: 495, y: 255 }, // Central Poblacion Beach coastline by Sipalay River
      labelOffset: { dx: -18, dy: -18, align: 'end' }
    },
    {
      id: 'tinagong-dagat',
      name: 'Tinagong Dagat Island Resort',
      shortName: 'Tinagong Dagat',
      type: 'competitor',
      category: 'Eco-Island Lagoon Resort',
      address: 'Sitio Latasan, Brgy. 4, Sipalay City, Negros Occidental',
      distanceKm: 6.5,
      travelTime: '15 mins by Boat / 20 mins by Car',
      description: 'Famous hidden sea lagoon featuring interconnected wooden footbridges across picturesque limestone karst islets.',
      badge: 'Competitor • North Lagoon',
      coords: { x: 535, y: 78 }, // Northern Sipalay islet inlet (matches Screenshot 2)
      labelOffset: { dx: -16, dy: 4, align: 'end' }
    },
    {
      id: 'bugana-beach',
      name: 'Bugana Beach and Dive Resort',
      shortName: 'Bugana Beach & Dive',
      type: 'competitor',
      category: 'Boutique Bay & Dive Resort',
      address: 'Brgy. Maricalum, Punta Ballo Beach / Campomanes Bay, Sipalay City, Negros Occidental',
      distanceKm: 11.8,
      travelTime: '20 mins by Car / Van',
      description: 'Nestled on Punta Ballo Beach overlooking protected Campomanes Bay with on-site diving facilities and garden villas.',
      badge: 'Competitor • Campomanes Bay',
      coords: { x: 375, y: 440 }, // Punta Ballo Beach / Campomanes Bay (matches Screenshot 1)
      labelOffset: { dx: -16, dy: -6, align: 'end' }
    },
    {
      id: 'manami-resort',
      name: 'Manami Resort',
      shortName: 'Manami Resort',
      type: 'competitor',
      category: '5-Star Luxury Nature Sanctuary',
      address: 'MCC3+FC3, Brgy. Cayhagan, Sipalay City, Negros Occidental',
      distanceKm: 18.0,
      travelTime: '35 mins by Resort SUV / Shuttle',
      description: 'High-end nature retreat in secluded Cayhagan cove featuring cliffside villas, Lin-aw fine dining, and cave wellness spa.',
      badge: 'Competitor • South Coast',
      topRated: true,
      coords: { x: 448, y: 550 }, // South of Campomanes Bay (matches Screenshot 1)
      labelOffset: { dx: -16, dy: 2, align: 'end' }
    }
  ];

  const [selectedId, setSelectedId] = useState<string>('alon-aninag');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  const selectedLoc = locations.find(l => l.id === selectedId) || locations[0];

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.35, 2.2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const next = Math.max(prev - 0.35, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setSelectedId('alon-aninag');
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleSelectLocation = (loc: MapLocation) => {
    setSelectedId(loc.id);

    // If selecting a specific location, smoothly pan towards it
    if (loc.id === 'alon-aninag') {
      setPanOffset({ x: 0, y: 0 });
    } else {
      // Calculate pan offset to center this marker (canvas center is 400, 310)
      const targetX = (400 - loc.coords.x) * 0.45;
      const targetY = (310 - loc.coords.y) * 0.45;
      setPanOffset({ x: targetX, y: targetY });
      if (zoomLevel < 1.25) {
        setZoomLevel(1.35);
      }
    }

    if (loc.type === 'competitor') {
      addNotification(
        'Competitor Selected',
        `Viewing ${loc.name} (${loc.distanceKm} km from Alon & Aninag).`,
        'alert'
      );
    }
  };

  const handleCopyLocation = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${selectedLoc.name}: ${selectedLoc.address}`);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Location Filter & Quick Jump Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider text-[11px]">
          <Navigation className="w-3.5 h-3.5 text-[#006D77] dark:text-[#83C5BE]" />
          <span>{t('geographicSector', 'Geographic Locations')}:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={handleReset}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition cursor-pointer ${
              selectedId === 'alon-aninag' && zoomLevel === 1
                ? 'bg-[#006D77] text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            {t('overviewMap', 'All 4 Locations')}
          </button>

          {locations.map(loc => {
            const isSelected = selectedId === loc.id;
            const isOurResort = loc.type === 'our-resort';
            return (
              <button
                key={loc.id}
                onClick={() => handleSelectLocation(loc)}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? isOurResort 
                      ? 'bg-[#006D77] text-white shadow-xs'
                      : 'bg-[#FF2A85] text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isOurResort ? 'bg-[#83C5BE]' : 'bg-[#FF2A85]'}`} />
                <span>{loc.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map Card */}
      <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-lg bg-[#99E2F8] relative min-h-[460px] sm:min-h-[500px] select-none">
        {/* Floating Zoom & Map Controls (matching reference screenshot) */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
          <div className="bg-white/95 dark:bg-[#131F2A]/95 rounded-lg shadow-md border border-stone-200 dark:border-stone-700 overflow-hidden flex flex-col">
            <button
              onClick={handleZoomIn}
              className="p-2 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer border-b border-stone-200 dark:border-stone-700"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleReset}
            className="p-2 bg-white/95 dark:bg-[#131F2A]/95 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg shadow-md border border-stone-200 dark:border-stone-700 transition cursor-pointer flex items-center justify-center"
            title="Reset Map View"
            aria-label="Reset Map View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Map Legend Badge */}
        <div className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-[#131F2A]/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 shadow-sm text-[11px] space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006D77] border-2 border-white ring-1 ring-[#006D77]/40" />
            <span className="font-bold text-stone-800 dark:text-white">Alon & Aninag (Our Resort)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF2A85] border-2 border-white ring-1 ring-[#FF2A85]/40" />
            <span className="font-medium text-stone-600 dark:text-stone-300">Competitor Resorts (3)</span>
          </div>
        </div>

        {/* SVG Interactive Canvas */}
        <div 
          className="w-full h-[460px] sm:h-[500px] overflow-hidden cursor-grab active:cursor-grabbing relative"
          style={{ backgroundColor: '#99E2F8' }}
        >
          <div
            className="w-full h-full transition-transform duration-500 ease-out origin-center"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`
            }}
          >
            <svg
              viewBox="0 0 800 620"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Land natural gradient */}
                <linearGradient id="landGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DEF6E4" />
                  <stop offset="70%" stopColor="#D4F4DC" />
                  <stop offset="100%" stopColor="#CBEFD4" />
                </linearGradient>

                {/* Beach sand gradient */}
                <linearGradient id="beachSand" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F9E8B6" />
                  <stop offset="100%" stopColor="#F5E0A3" />
                </linearGradient>

                {/* River water gradient */}
                <linearGradient id="riverWater" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8AD6EE" />
                  <stop offset="100%" stopColor="#9DE4F8" />
                </linearGradient>

                {/* Drop shadow for markers */}
                <filter id="markerShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.35" />
                </filter>
              </defs>

              {/* Water Base (Sulu Sea / West Philippine Basin) */}
              <rect x="0" y="0" width="800" height="620" fill="#99E2F8" />

              {/* Subtle coastal water wave ripples on west */}
              <g stroke="#FFFFFF" strokeWidth="1.2" opacity="0.3" fill="none">
                <path d="M 60,80 Q 90,75 120,80 T 180,80" />
                <path d="M 40,220 Q 70,215 100,220 T 160,220" />
                <path d="M 50,380 Q 80,375 110,380 T 170,380" />
                <path d="M 70,510 Q 100,505 130,510 T 190,510" />
              </g>

              {/* Water Labels (as in reference screenshots) */}
              <g fill="#007788" fontSize="11" fontWeight="600" opacity="0.75" letterSpacing="0.8">
                <text x="50" y="55">SULU SEA COASTAL WATERS</text>
                <text x="320" y="475" fontSize="13" fontWeight="bold">Campomanes Bay</text>
              </g>

              {/* MAIN CONTINUOUS LANDMASS OF SIPALAY CITY (Eastern side with natural peninsulas, bays, and coves) */}
              {/* Land border incorporates:
                  1. Northern lagoon & inlet (Tinagong Dagat)
                  2. Central Poblacion Bay and Sipalay River mouth
                  3. Campomanes Bay curved inlet and Punta Ballo Beach
                  4. Southern Cayhagan cove (Manami Resort)
              */}
              <path
                d="
                  M 800,0 
                  L 520,0 
                  Q 490,40 510,75 
                  Q 480,90 520,120
                  Q 470,160 485,210
                  Q 440,240 488,252
                  Q 475,280 495,330
                  Q 440,360 420,400
                  Q 330,420 370,460
                  Q 390,480 435,510
                  Q 420,540 450,575
                  Q 430,600 460,620
                  L 800,620 
                  Z
                "
                fill="url(#landGreen)"
                stroke="#B5DDC0"
                strokeWidth="2"
              />

              {/* Golden Beach Sand Strips Along Poblacion, Punta Ballo, and Coves */}
              {/* 1. Poblacion Beach yellow sand strip */}
              <path
                d="M 488,245 Q 482,258 488,272 L 498,272 Q 493,258 498,245 Z"
                fill="url(#beachSand)"
                stroke="#E2CD90"
                strokeWidth="0.8"
              />

              {/* 2. Punta Ballo Beach sand strip */}
              <path
                d="M 365,432 Q 355,445 372,458 L 378,454 Q 363,442 372,432 Z"
                fill="url(#beachSand)"
                stroke="#E2CD90"
                strokeWidth="0.8"
              />

              {/* 3. Cayhagan Beach sand strip */}
              <path
                d="M 444,545 Q 436,558 450,572 L 454,568 Q 442,556 448,545 Z"
                fill="url(#beachSand)"
                stroke="#E2CD90"
                strokeWidth="0.8"
              />

              {/* Northern Islets Archipelago (Tinagong Dagat Islet Labyrinth - matching Screenshot 2) */}
              <g fill="#C4EACD" stroke="#A7D6B2" strokeWidth="1.2">
                {/* Islet 1 (Latasan Island area) */}
                <path d="M 480,105 Q 515,85 530,110 Q 520,135 490,130 Q 470,120 480,105 Z" />
                {/* Islet 2 */}
                <circle cx="560" cy="95" r="14" />
                {/* Islet 3 */}
                <circle cx="585" cy="115" r="10" />
                {/* Footbridge connection line (iconic Tinagong Dagat wooden bridge) */}
                <line x1="530" y1="110" x2="550" y2="98" stroke="#A67C52" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="572" y1="102" x2="578" y2="110" stroke="#A67C52" strokeWidth="2" strokeDasharray="3 2" />
              </g>

              {/* Sipalay River flowing horizontally from inland into Poblacion Bay (matching Screenshot 3) */}
              <path
                d="M 800,240 Q 680,245 610,230 Q 560,215 540,242 Q 520,250 486,248"
                fill="none"
                stroke="url(#riverWater)"
                strokeWidth="11"
                strokeLinecap="round"
              />
              <text x="630" y="248" fill="#007788" fontSize="8.5" fontWeight="600" opacity="0.8">
                Sipalay River
              </text>

              {/* Road Network across Sipalay (Sipalay National Highway & Poblacion Streets) */}
              <g fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.85" strokeLinecap="round">
                {/* Main Highway running North-South */}
                <path d="M 590,0 Q 575,60 595,130 Q 610,180 580,225 Q 565,270 575,340 Q 590,410 520,470 Q 480,510 515,620" />
                {/* Sipalay Town Streets (matching Screenshot 3) */}
                <path d="M 540,252 L 580,252 L 620,260" strokeWidth="2.2" />
                <path d="M 525,270 L 590,270" strokeWidth="2" />
                <path d="M 535,290 L 585,290" strokeWidth="2" />
                <path d="M 545,245 L 545,300" strokeWidth="2" />
                <path d="M 565,245 L 565,305" strokeWidth="2" />
                {/* Road branching to Campomanes Bay / Punta Ballo */}
                <path d="M 560,370 Q 480,410 400,435" strokeWidth="2.2" />
                {/* Road to Cayhagan / Manami */}
                <path d="M 520,480 Q 490,520 460,545" strokeWidth="2.2" />
              </g>

              {/* Town labels (matching Screenshot 3) */}
              <g fill="#6B7280" fontSize="8" fontWeight="600">
                <text x="518" y="265">Barangay 5</text>
                <text x="518" y="285">Barangay 1</text>
                <text x="518" y="302">Barangay 2</text>
                <text x="580" y="285">Barangay 3</text>
                <text x="495" y="235" fill="#006D77" fontWeight="bold">Poblacion Beach</text>
              </g>

              {/* Geographic feature labels on land */}
              <g fill="#007788" fontSize="10" fontWeight="bold">
                <text x="365" y="420">Punta Ballo Beach</text>
                <text x="500" y="145" fontSize="9" fontWeight="600" fill="#4B5563">Latasan Island</text>
              </g>

              {/* Connecting Distance Dotted Lines when competitor is selected */}
              {selectedLoc.type === 'competitor' && (
                <g>
                  <line
                    x1="495"
                    y1="255"
                    x2={selectedLoc.coords.x}
                    y2={selectedLoc.coords.y}
                    stroke="#E29578"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                  />
                  {/* Distance badge along the line */}
                  <rect
                    x={(495 + selectedLoc.coords.x) / 2 - 28}
                    y={(255 + selectedLoc.coords.y) / 2 - 10}
                    width="56"
                    height="20"
                    rx="4"
                    fill="#1E293B"
                    fillOpacity="0.9"
                  />
                  <text
                    x={(495 + selectedLoc.coords.x) / 2}
                    y={(255 + selectedLoc.coords.y) / 2 + 3}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9.5"
                    fontWeight="bold"
                  >
                    {selectedLoc.distanceKm} km
                  </text>
                </g>
              )}

              {/* ========================================================
                  COMPETITOR 1: Tinagong Dagat Island Resort (North Lagoon)
                  Exact styling from Screenshot 2:
                  - Magenta circle pin with white umbrella
                  - Pink text with white halo outline
                 ======================================================== */}
              <g 
                transform="translate(535, 78)"
                className="cursor-pointer group"
                onClick={() => handleSelectLocation(locations[1])}
              >
                {/* Active Highlight Halo */}
                {selectedId === 'tinagong-dagat' && (
                  <circle r="22" fill="#FF2A85" fillOpacity="0.25" stroke="#FF2A85" strokeWidth="2" className="animate-ping" />
                )}

                {/* Pin Circle (Google Maps / OSM pink style) */}
                <circle
                  r="14"
                  fill="#FF2A85"
                  stroke="#FFFFFF"
                  strokeWidth="2.8"
                  filter="url(#markerShadow)"
                />

                {/* Beach Umbrella Icon inside pin */}
                <g transform="translate(-6.5, -6.5)" stroke="#FFFFFF" fill="none" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M 1.5,8 A 5,5 0 0,1 11.5,8 Z" fill="#FFFFFF" fillOpacity="0.8" />
                  <line x1="6.5" y1="4" x2="6.5" y2="12" />
                  <path d="M 6.5,12 A 1.2,1.2 0 0,0 8.5,12" />
                </g>

                {/* Visible Name Label: Tinagong Dagat Island Resort */}
                {/* Crisp text with white halo outline matching Screenshot 2 */}
                <text
                  x="-18"
                  y="-4"
                  textAnchor="end"
                  fill="#FF1493"
                  fontSize="12.5"
                  fontWeight="bold"
                  style={{
                    paintOrder: 'stroke fill',
                    stroke: '#FFFFFF',
                    strokeWidth: '4.5px',
                    strokeLinejoin: 'round'
                  }}
                >
                  Tinagong Dagat
                </text>
                <text
                  x="-18"
                  y="12"
                  textAnchor="end"
                  fill="#FF1493"
                  fontSize="12"
                  fontWeight="bold"
                  style={{
                    paintOrder: 'stroke fill',
                    stroke: '#FFFFFF',
                    strokeWidth: '4px',
                    strokeLinejoin: 'round'
                  }}
                >
                  Island Resort
                </text>
              </g>

              {/* ========================================================
                  COMPETITOR 2: Bugana Beach and Dive Resort (Punta Ballo)
                  Exact styling from Screenshot 1:
                  - Magenta circle pin with white umbrella
                  - Pink text with white halo outline
                 ======================================================== */}
              <g 
                transform="translate(375, 440)"
                className="cursor-pointer group"
                onClick={() => handleSelectLocation(locations[2])}
              >
                {/* Active Highlight Halo */}
                {selectedId === 'bugana-beach' && (
                  <circle r="22" fill="#FF2A85" fillOpacity="0.25" stroke="#FF2A85" strokeWidth="2" className="animate-ping" />
                )}

                {/* Pin Circle */}
                <circle
                  r="14"
                  fill="#FF2A85"
                  stroke="#FFFFFF"
                  strokeWidth="2.8"
                  filter="url(#markerShadow)"
                />

                {/* Beach Umbrella Icon */}
                <g transform="translate(-6.5, -6.5)" stroke="#FFFFFF" fill="none" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M 1.5,8 A 5,5 0 0,1 11.5,8 Z" fill="#FFFFFF" fillOpacity="0.8" />
                  <line x1="6.5" y1="4" x2="6.5" y2="12" />
                  <path d="M 6.5,12 A 1.2,1.2 0 0,0 8.5,12" />
                </g>

                {/* Visible Name Label: Bugana Beach and Dive Resort */}
                <text
                  x="-18"
                  y="-4"
                  textAnchor="end"
                  fill="#FF1493"
                  fontSize="12.5"
                  fontWeight="bold"
                  style={{
                    paintOrder: 'stroke fill',
                    stroke: '#FFFFFF',
                    strokeWidth: '4.5px',
                    strokeLinejoin: 'round'
                  }}
                >
                  Bugana Beach
                </text>
                <text
                  x="-18"
                  y="12"
                  textAnchor="end"
                  fill="#FF1493"
                  fontSize="12"
                  fontWeight="bold"
                  style={{
                    paintOrder: 'stroke fill',
                    stroke: '#FFFFFF',
                    strokeWidth: '4px',
                    strokeLinejoin: 'round'
                  }}
                >
                  and Dive Resort
                </text>
              </g>

              {/* ========================================================
                  COMPETITOR 3: Manami Resort (Cayhagan Cove - South)
                  Exact styling from Screenshot 1:
                  - Magenta circle pin with white umbrella
                  - Pink text with white halo outline + "Top rated"
                 ======================================================== */}
              <g 
                transform="translate(448, 550)"
                className="cursor-pointer group"
                onClick={() => handleSelectLocation(locations[3])}
              >
                {/* Active Highlight Halo */}
                {selectedId === 'manami-resort' && (
                  <circle r="22" fill="#FF2A85" fillOpacity="0.25" stroke="#FF2A85" strokeWidth="2" className="animate-ping" />
                )}

                {/* Pin Circle */}
                <circle
                  r="14"
                  fill="#FF2A85"
                  stroke="#FFFFFF"
                  strokeWidth="2.8"
                  filter="url(#markerShadow)"
                />

                {/* Beach Umbrella Icon */}
                <g transform="translate(-6.5, -6.5)" stroke="#FFFFFF" fill="none" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M 1.5,8 A 5,5 0 0,1 11.5,8 Z" fill="#FFFFFF" fillOpacity="0.8" />
                  <line x1="6.5" y1="4" x2="6.5" y2="12" />
                  <path d="M 6.5,12 A 1.2,1.2 0 0,0 8.5,12" />
                </g>

                {/* Visible Name Label: Manami Resort */}
                <text
                  x="-18"
                  y="-5"
                  textAnchor="end"
                  fill="#FF1493"
                  fontSize="13"
                  fontWeight="bold"
                  style={{
                    paintOrder: 'stroke fill',
                    stroke: '#FFFFFF',
                    strokeWidth: '4.5px',
                    strokeLinejoin: 'round'
                  }}
                >
                  Manami Resort
                </text>
                {/* "Top rated" subtitle (matches Screenshot 1) */}
                <text
                  x="-18"
                  y="12"
                  textAnchor="end"
                  fill="#FF1493"
                  fontSize="10"
                  fontWeight="bold"
                  style={{
                    paintOrder: 'stroke fill',
                    stroke: '#FFFFFF',
                    strokeWidth: '3.5px',
                    strokeLinejoin: 'round'
                  }}
                >
                  Top rated
                </text>
              </g>

              {/* ========================================================
                  OUR RESORT: Alon & Aninag Boutique Beach Resort
                  Prominent, distinct from competitors:
                  - Signature Teal & Gold Pin with glowing pulse
                  - Direct beach frontage on Poblacion Beach sand
                 ======================================================== */}
              <g 
                transform="translate(495, 255)"
                className="cursor-pointer group"
                onClick={() => handleSelectLocation(locations[0])}
              >
                {/* Glowing beacon wave */}
                <circle r="22" fill="#006D77" fillOpacity="0.2" className="animate-ping" />
                <circle r="17" fill="#006D77" stroke="#FFFFFF" strokeWidth="3" filter="url(#markerShadow)" />
                <circle r="7" fill="#83C5BE" />

                {/* Sparkle star icon */}
                <text x="0" y="3.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">✦</text>

                {/* Label Box: Alon & Aninag Boutique Resort Frontage */}
                <g transform="translate(18, -12)">
                  <rect
                    x="0"
                    y="-12"
                    width="190"
                    height="32"
                    rx="5"
                    fill="#006D77"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    filter="url(#markerShadow)"
                  />
                  <text
                    x="10"
                    y="2"
                    fill="#FFFFFF"
                    fontSize="10.5"
                    fontWeight="bold"
                  >
                    Alon & Aninag Boutique Resort
                  </text>
                  <text
                    x="10"
                    y="14"
                    fill="#83C5BE"
                    fontSize="8.5"
                    fontWeight="600"
                  >
                    ★ Resort Frontage • You Are Here
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Bottom Location Details Card (Matching Screenshot 3 design) */}
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-[#13222F]/95 dark:bg-[#0B141C]/95 backdrop-blur-md p-4 rounded-xl border border-stone-700/80 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`p-1 rounded-sm ${selectedLoc.type === 'our-resort' ? 'bg-[#006D77] text-white' : 'bg-[#FF2A85] text-white'}`}>
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                <h4 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
                  {selectedLoc.name}
                </h4>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  selectedLoc.type === 'our-resort'
                    ? 'bg-teal-500/20 text-[#83C5BE] border border-teal-500/30'
                    : 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                }`}>
                  {selectedLoc.badge || selectedLoc.category}
                </span>
              </div>

              <p className="text-xs text-stone-300 font-light leading-relaxed">
                {selectedLoc.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-stone-400 pt-1">
                <span>📍 {selectedLoc.address}</span>
                {selectedLoc.distanceKm > 0 && (
                  <span className="text-[#FFDDD2] font-semibold">
                    ⏱ {selectedLoc.distanceKm} km from Alon & Aninag ({selectedLoc.travelTime})
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyLocation}
                className="px-3 py-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition cursor-pointer flex items-center gap-1.5 border border-white/15"
                title="Copy Address"
              >
                {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAddress ? 'Copied' : 'Copy Location'}</span>
              </button>

              {selectedLoc.type === 'competitor' && (
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-sm bg-[#006D77] hover:bg-[#00555d] text-white text-[11px] font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  <span>Alon & Aninag</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
