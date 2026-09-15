import React, { useState, useRef, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { COMPETITORS_DATA } from '../data/resortData';
import { CompetitorResort } from '../types';
import { 
  MapPin, 
  Compass, 
  Navigation, 
  Copy, 
  Check, 
  Route, 
  Award,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Crosshair,
  Info,
  Map as MapIcon,
  Layers,
  ArrowRight
} from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const { addNotification, requestUserLocation, distanceToResortKm } = useResort();
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorResort>(COMPETITORS_DATA[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [isZoomed, setIsZoomed] = useState<boolean>(true); // Default to focused/zoomed into the selected area
  const [activeAreaTag, setActiveAreaTag] = useState<string>('North Sipalay Coast');

  // DOM ref to the map display area so we can scroll the browser directly to it
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const mapCanvasRef = useRef<HTMLDivElement>(null);

  const handleCopyAddress = (resortName: string, address: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${resortName}: ${address}`);
      setCopiedId(id);
      addNotification('Address Copied', `${resortName} address copied to clipboard!`, 'alert');
      setTimeout(() => setCopiedId(null), 2200);
    }
  };

  // When a user selects a resort (via card, button, or map pin)
  const handleSelectResort = (competitor: CompetitorResort, shouldScroll: boolean = true) => {
    setSelectedCompetitor(competitor);
    setIsZoomed(true); // Automatically zoom in & pan directly to that geographic area!

    // Update geographic zone tag
    if (competitor.id === 'comp-nayah') {
      setActiveAreaTag('North Sipalay Coastal Plains');
    } else if (competitor.id === 'comp-bugana') {
      setActiveAreaTag('Campomanes Bay Coastal Enclave');
    } else if (competitor.id === 'comp-takatuka') {
      setActiveAreaTag('Punta Ballo White Sand Coast');
    } else if (competitor.id === 'comp-nataasan') {
      setActiveAreaTag('Punta Ballo Elevated Cliffside');
    } else if (competitor.id === 'comp-manami') {
      setActiveAreaTag('Cayhagan Nature Valley & Cove');
    }

    if (shouldScroll && mapSectionRef.current) {
      // Direct smooth movement directly to that geographic map area
      mapSectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }

    addNotification(
      'Geographic Area Focused', 
      `Directly moved to ${competitor.name} in Sipalay land territory (${competitor.distanceKm} km away).`, 
      'alert'
    );
  };

  // Direct pan coordinate math:
  // Center is (300, 235). When zoomed 1.6x, we translate the board so (pin.x, pin.y) is near center
  const getMapTransform = () => {
    if (!isZoomed) return 'translate(0px, 0px) scale(1)';
    
    // SVG viewBox is 600 x 470
    const pinX = (selectedCompetitor.mapPin.leftPercent / 100) * 600;
    const pinY = (selectedCompetitor.mapPin.topPercent / 100) * 470;
    
    // Translate offset to move this exact geographic area to the center (300, 235)
    const scale = 1.65;
    const targetCenterX = 300;
    const targetCenterY = 235;
    
    const deltaX = (targetCenterX - pinX) * scale * 0.7;
    const deltaY = (targetCenterY - pinY) * scale * 0.7;

    return `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
  };

  const ourResort = {
    name: 'Alon & Aninag Boutique Beach Resort',
    location: 'Poblacion Beach (near Jazz Inn), Sipalay City, 6113 Negros Occidental, Philippines',
    category: '12-Room Boutique Beachfront Sanctuary',
    distanceKm: 0,
    travelTime: 'Town Center Beachfront',
    mapPin: { leftPercent: 70, topPercent: 44, x: 420, y: 207 },
    highlights: [
      'Direct golden sand beachfront on Poblacion Bay',
      'Signature Aninag Dayglow & Paddle Experience',
      'Nightly acoustic soul bonfires on the sand',
      'Walking distance to Poblacion market & food hub'
    ],
    priceRange: '₱3,200 – ₱7,200 / night',
    atmosphere: 'Intimate, warm wood & white minimalist coastal aesthetic with personalized service'
  };

  // Convert competitor map pins to SVG coordinates for SVG line drawing & pin icons
  const competitorsWithCoordinates = COMPETITORS_DATA.map((c) => ({
    ...c,
    svgX: (c.mapPin.leftPercent / 100) * 600,
    svgY: (c.mapPin.topPercent / 100) * 470,
  }));

  const selectedWithCoords = competitorsWithCoordinates.find(c => c.id === selectedCompetitor.id) || competitorsWithCoordinates[0];

  return (
    <section id="competitors" className="py-20 bg-[#FAF7F2] dark:bg-[#080E14] border-b border-[#E8DFC8] dark:border-stone-800 scroll-mt-20 transition-colors">
      {/* Anchor for backwards compatibility */}
      <span id="map" className="sr-only" aria-hidden="true">Nearby Competitors & Map</span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-teal-50 dark:bg-teal-950/50 text-[#006D77] dark:text-[#83C5BE] border border-teal-200 dark:border-teal-800 text-xs font-bold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5 text-[#006D77] dark:text-[#83C5BE]" />
            Sipalay Geographic Landscape
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241D] dark:text-white tracking-tight mb-4">
            Nearby Competitors & Resort Locations
          </h2>
          <p className="text-sm sm:text-base text-[#6B5A48] dark:text-stone-300 leading-relaxed">
            All resort properties situated accurately across Sipalay’s terrestrial landmass—from our central haven on Poblacion Beach to coastal land enclaves in North Sipalay, Campomanes Bay, Punta Ballo, and Cayhagan.
          </p>
        </div>

        {/* Quick Filter & GPS Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                filterType === 'all'
                  ? 'bg-[#006D77] text-white shadow-sm'
                  : 'bg-white dark:bg-[#131F2A] border border-[#DDD0B9] dark:border-stone-700 text-[#5C4E3F] dark:text-stone-300 hover:bg-[#F3EDE2] dark:hover:bg-stone-800'
              }`}
            >
              All 5 Competitors
            </button>
            <button
              onClick={() => setFilterType('nearby')}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                filterType === 'nearby'
                  ? 'bg-[#006D77] text-white shadow-sm'
                  : 'bg-white dark:bg-[#131F2A] border border-[#DDD0B9] dark:border-stone-700 text-[#5C4E3F] dark:text-stone-300 hover:bg-[#F3EDE2] dark:hover:bg-stone-800'
              }`}
            >
              Under 12 km
            </button>
            <button
              onClick={() => setFilterType('luxury')}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                filterType === 'luxury'
                  ? 'bg-[#006D77] text-white shadow-sm'
                  : 'bg-white dark:bg-[#131F2A] border border-[#DDD0B9] dark:border-stone-700 text-[#5C4E3F] dark:text-stone-300 hover:bg-[#F3EDE2] dark:hover:bg-stone-800'
              }`}
            >
              Luxury & Villas
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => requestUserLocation()}
              className="px-4 py-1.5 rounded-sm bg-white dark:bg-[#131F2A] border border-[#DDD0B9] dark:border-stone-700 hover:bg-[#FAF7F2] dark:hover:bg-stone-800 text-xs font-semibold text-[#2C241D] dark:text-white flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            >
              <Navigation className="w-3.5 h-3.5 text-[#E29578]" />
              <span>{distanceToResortKm !== null ? `Your GPS: ${distanceToResortKm} km to Poblacion` : 'Measure Distance to Alon'}</span>
            </button>
          </div>
        </div>

        {/* Map & Competitor Panel Split */}
        <div ref={mapSectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14 scroll-mt-24">
          {/* Interactive Geographic Coastline Competitor Map */}
          <div className="lg:col-span-7 bg-[#E8EFF1] dark:bg-[#131F2A] rounded-2xl p-4 sm:p-5 border border-[#D0DFE2] dark:border-stone-800 shadow-sm relative overflow-hidden flex flex-col justify-between transition-colors">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#D0DFE2] dark:border-stone-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  Active Area: <span className="text-[#006D77] dark:text-[#83C5BE] font-bold">{activeAreaTag}</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={`px-3 py-1 rounded transition cursor-pointer flex items-center gap-1 text-[11px] font-semibold border ${
                    isZoomed 
                      ? 'bg-[#006D77] text-white border-[#006D77]' 
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700'
                  }`}
                  title={isZoomed ? "Reset Map to Overview" : "Zoom directly into selected area"}
                >
                  {isZoomed ? <ZoomOut className="w-3.5 h-3.5 text-white" /> : <ZoomIn className="w-3.5 h-3.5 text-[#006D77] dark:text-[#83C5BE]" />}
                  <span>{isZoomed ? 'Overview Map' : 'Direct Area Zoom'}</span>
                </button>
              </div>
            </div>

            {/* Map Canvas with Direct Pan & Zoom Transform */}
            <div 
              ref={mapCanvasRef}
              className="relative w-full h-[470px] bg-linear-to-br from-[#68AEC2] via-[#7BBECF] to-[#599FA0] rounded-xl overflow-hidden border border-[#89BFCE] select-none shadow-inner"
            >
              {/* SVG Layer that animates panning & zooming directly to the selected area */}
              <div 
                className="w-full h-full transition-transform duration-700 ease-out origin-center"
                style={{ transform: getMapTransform() }}
              >
                <svg 
                  className="w-full h-full"
                  viewBox="0 0 600 470" 
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    {/* Natural terrain land gradient */}
                    <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EAE0CA" />
                      <stop offset="50%" stopColor="#DFCDB0" />
                      <stop offset="100%" stopColor="#D4BF9D" />
                    </linearGradient>

                    {/* Mountain texture pattern */}
                    <pattern id="mountainPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 0,20 Q 10,12 20,20 T 40,20" fill="none" stroke="#BAA582" strokeWidth="0.8" opacity="0.4" />
                      <circle cx="20" cy="20" r="1.5" fill="#BAA582" opacity="0.3" />
                    </pattern>

                    {/* Soft water wave gradient */}
                    <linearGradient id="waterHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Water Base (West Philippine Sea / Sulu Sea) */}
                  <rect width="600" height="470" fill="transparent" />

                  {/* Ocean ripples on the west (left side) */}
                  <g opacity="0.35">
                    <path d="M 40,70 Q 70,60 100,70 T 160,70" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
                    <path d="M 30,160 Q 60,150 90,160 T 150,160" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
                    <path d="M 60,260 Q 90,250 120,260 T 180,260" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
                    <path d="M 40,360 Q 70,350 100,360 T 160,360" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
                  </g>

                  {/* TERRESTRIAL NEGROS ISLAND LANDMASS:
                      Coastline runs from (380,0) down to (300,470), expanding eastward to (600,0) and (600,470).
                      All resorts are positioned strictly on this dry land, NOT in the water.
                  */}
                  <path
                    d="M 600,0 
                       L 380,0 
                       Q 360,50 410,95 
                       Q 390,140 400,185 
                       Q 365,220 395,260 
                       Q 330,305 360,350 
                       Q 290,380 315,425 
                       Q 270,445 320,470 
                       L 600,470 Z"
                    fill="url(#landGradient)"
                    stroke="#BAA582"
                    strokeWidth="2.5"
                  />

                  {/* Topography hill overlay on land */}
                  <path
                    d="M 600,0 
                       L 380,0 
                       Q 360,50 410,95 
                       Q 390,140 400,185 
                       Q 365,220 395,260 
                       Q 330,305 360,350 
                       Q 290,380 315,425 
                       Q 270,445 320,470 
                       L 600,470 Z"
                    fill="url(#mountainPattern)"
                  />

                  {/* Sandy Beach Fringe & Coral Reef shallow line on the coast edge */}
                  <path
                    d="M 380,0 
                       Q 360,50 410,95 
                       Q 390,140 400,185 
                       Q 365,220 395,260 
                       Q 330,305 360,350 
                       Q 290,380 315,425 
                       Q 270,445 320,470"
                    fill="none"
                    stroke="#97DFE8"
                    strokeWidth="9"
                    opacity="0.45"
                  />

                  {/* Terrestrial Mountain Ridges (Inland Negros Occidental) */}
                  <path d="M 500,50 Q 530,110 515,180" fill="none" stroke="#A89472" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.6" />
                  <path d="M 460,210 Q 500,280 480,350" fill="none" stroke="#A89472" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.6" />
                  <path d="M 420,360 Q 470,415 450,460" fill="none" stroke="#A89472" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.6" />

                  {/* Geographic Coastline Labels firmly on Land */}
                  <g fill="#7A6852" fontSize="9" fontWeight="bold" letterSpacing="1.2">
                    <text x="440" y="35">NORTH SIPALAY (COASTAL LAND)</text>
                    <text x="435" y="195" fill="#006D77">POBLACION BAY (TOWN CENTER)</text>
                    <text x="400" y="325">CAMPOMANES BAY COAST</text>
                    <text x="350" y="405">PUNTA BALLO PENINSULA</text>
                    <text x="480" y="450">CAYHAGAN VALLEYS</text>
                  </g>

                  {/* Sea Labels (West side) */}
                  <g fill="#FFFFFF" fontSize="9" fontWeight="bold" letterSpacing="1.5" opacity="0.8">
                    <text x="30" y="35">SULU SEA COASTAL WATERS</text>
                    <text x="40" y="240">WEST PHILIPPINE BASIN</text>
                  </g>

                  {/* Dynamic Route Line connecting Alon & Aninag on land (420, 207) to the selected competitor */}
                  <line
                    x1="420"
                    y1="207"
                    x2={selectedWithCoords.svgX}
                    y2={selectedWithCoords.svgY}
                    stroke="#E29578"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                  />

                  {/* Highlighting Spotlight / Radius Circle on the selected geographic area */}
                  <circle
                    cx={selectedWithCoords.svgX}
                    cy={selectedWithCoords.svgY}
                    r="26"
                    fill="#E29578"
                    fillOpacity="0.18"
                    stroke="#E29578"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    className="animate-spin"
                    style={{ transformOrigin: `${selectedWithCoords.svgX}px ${selectedWithCoords.svgY}px`, animationDuration: '10s' }}
                  />

                  {/* SVG PINS:
                      All SVG circles and markers drawn directly in map coordinates so they pan and zoom accurately!
                  */}

                  {/* Pin 0: ALON & ANINAG BOUTIQUE RESORT (Our Resort - Poblacion Beach Land) */}
                  <g 
                    transform="translate(420, 207)" 
                    className="cursor-pointer"
                    onClick={() => addNotification('Alon & Aninag', 'You are viewing our 12-room boutique sanctuary on Poblacion Beach.', 'alert')}
                  >
                    <circle r="16" fill="#006D77" stroke="#FFFFFF" strokeWidth="3" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
                    <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">✨</text>
                    {/* Badge */}
                    <rect x="-65" y="22" width="130" height="18" rx="4" fill="#1A1A1A" fillOpacity="0.92" stroke="#83C5BE" strokeWidth="0.8" />
                    <text x="0" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">Alon & Aninag (Our Resort)</text>
                  </g>

                  {/* Pins 1 to 5: Competitors (Strictly on Land) */}
                  {competitorsWithCoordinates.map((comp, idx) => {
                    const isCurrent = comp.id === selectedCompetitor.id;

                    return (
                      <g 
                        key={comp.id} 
                        transform={`translate(${comp.svgX}, ${comp.svgY})`}
                        className="cursor-pointer"
                        onClick={() => handleSelectResort(comp, false)}
                      >
                        {/* Selected halo */}
                        {isCurrent && (
                          <circle r="18" fill="none" stroke="#E29578" strokeWidth="3" className="animate-ping" opacity="0.75" />
                        )}
                        <circle 
                          r={isCurrent ? "14" : "11"} 
                          fill={isCurrent ? "#2C241D" : "#FFFFFF"} 
                          stroke={isCurrent ? "#E29578" : "#2C241D"} 
                          strokeWidth={isCurrent ? "3" : "2"} 
                          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
                        />
                        <text 
                          x="0" 
                          y="4" 
                          textAnchor="middle" 
                          fill={isCurrent ? "#FFFFFF" : "#2C241D"} 
                          fontSize={isCurrent ? "10" : "9"} 
                          fontWeight="bold"
                        >
                          {idx + 1}
                        </text>
                        {/* Resort label box */}
                        <rect 
                          x="-45" 
                          y={isCurrent ? "18" : "15"} 
                          width="90" 
                          height="16" 
                          rx="3" 
                          fill={isCurrent ? "#2C241D" : "#FFFFFF"} 
                          stroke={isCurrent ? "#E29578" : "#D0DFE2"} 
                          strokeWidth="1"
                          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))"
                        />
                        <text 
                          x="0" 
                          y={isCurrent ? "29" : "26"} 
                          textAnchor="middle" 
                          fill={isCurrent ? "#FFFFFF" : "#2C241D"} 
                          fontSize="7.5" 
                          fontWeight="bold"
                        >
                          {comp.name.split(' ')[0]} {comp.name.split(' ')[1] || ''}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Map Legend Overlay */}
              <div className="absolute top-3 left-3 bg-white/95 dark:bg-[#0E1720]/95 backdrop-blur-xs p-3 rounded-lg border border-stone-200 dark:border-stone-700 text-xs text-[#2C241D] dark:text-stone-200 shadow-xs space-y-1.5 z-10">
                <div className="font-bold text-stone-500 dark:text-stone-400 uppercase text-[10px] tracking-wider">Map Pin Legend</div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#006D77] border border-white shrink-0" />
                  <span className="font-semibold text-stone-900 dark:text-white">Alon & Aninag (Poblacion Beach)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#2C241D] dark:bg-stone-600 border border-[#E29578] shrink-0" />
                  <span className="text-stone-700 dark:text-stone-300">Competitors on Land (1–5)</span>
                </div>
              </div>

              {/* Terrestrial Land Verification Seal */}
              <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-[#0E1720]/95 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-medium text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 flex items-center gap-1.5 shadow-xs z-10">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Terrestrial Locations Verified</span>
              </div>

              {/* Currently Focused Area Chip */}
              <div className="absolute bottom-3 right-3 bg-[#006D77] text-white px-3 py-1 rounded text-xs font-semibold shadow-md flex items-center gap-1.5 z-10">
                <Crosshair className="w-3.5 h-3.5 text-[#83C5BE]" />
                <span>Viewing: {selectedCompetitor.name}</span>
              </div>
            </div>

            {/* Route & Distance Footer */}
            <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-[#5C4E3F] dark:text-stone-400 px-2 gap-2">
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 text-[#E29578]" />
                <span className="font-bold text-stone-800 dark:text-stone-200">Distance from Alon & Aninag:</span>
                <span className="font-semibold text-[#006D77] dark:text-[#83C5BE]">{selectedCompetitor.distanceKm} km</span>
                <span>• {selectedCompetitor.travelTime}</span>
              </div>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">Poblacion central access allows seamless transit across all Sipalay districts.</span>
            </div>
          </div>

          {/* Selected Resort Details & Comparative Inspector */}
          <div className="lg:col-span-5 bg-white dark:bg-[#131F2A] rounded-2xl p-6 sm:p-7 border border-[#E5DAC4] dark:border-stone-800 shadow-sm flex flex-col justify-between transition-colors">
            <div>
              {/* Category Badge & Distance */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#006D77] dark:text-[#83C5BE] bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-sm border border-teal-100 dark:border-teal-800">
                  {selectedCompetitor.category}
                </span>
                <span className="text-xs font-bold text-[#E29578] bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-sm border border-amber-200 dark:border-amber-800">
                  {selectedCompetitor.distanceKm} km away
                </span>
              </div>

              {/* Resort Title */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-2">
                {selectedCompetitor.name}
              </h3>

              {/* Geographic District Banner */}
              <div className="mb-3 px-3 py-1.5 rounded bg-teal-50/70 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-xs text-[#006D77] dark:text-[#83C5BE] font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#006D77] dark:text-[#83C5BE]" />
                <span>Geographic Sector: {activeAreaTag}</span>
              </div>

              {/* Exact Location & Address */}
              <div className="bg-[#FAF7F2] dark:bg-[#0E1720] p-3.5 rounded-lg border border-[#E8DFC8] dark:border-stone-800 mb-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] uppercase font-bold text-[#8C7B68] dark:text-stone-400 tracking-wider">Terrestrial Land Address</p>
                      <p className="text-xs font-medium text-stone-800 dark:text-stone-200 leading-relaxed font-mono mt-0.5">
                        {selectedCompetitor.location}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyAddress(selectedCompetitor.name, selectedCompetitor.location, selectedCompetitor.id)}
                    className="p-1.5 rounded bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 transition cursor-pointer shrink-0"
                    title="Copy Address"
                  >
                    {copiedId === selectedCompetitor.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Overview & Atmosphere */}
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                {selectedCompetitor.description}
              </p>

              {/* Atmosphere / Vibe */}
              <div className="mb-4 text-xs text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-[#0E1720] p-3 rounded border border-stone-200 dark:border-stone-800">
                <strong className="text-stone-900 dark:text-white block mb-0.5">Hospitality Atmosphere:</strong>
                <span>{selectedCompetitor.atmosphere}</span>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 mb-5">
                <p className="text-[11px] uppercase font-bold text-stone-500 dark:text-stone-400 tracking-wider">Property Highlights:</p>
                {selectedCompetitor.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300">
                    <Check className="w-3.5 h-3.5 text-[#006D77] dark:text-[#83C5BE] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Comparison Edge */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-stone-500 dark:text-stone-400">Estimated Price Bracket:</span>
                <span className="font-serif font-bold text-stone-900 dark:text-white">{selectedCompetitor.priceRange}</span>
              </div>

              {/* Comparative Badge for Alon & Aninag */}
              <div className="bg-teal-50/70 dark:bg-teal-950/40 rounded-lg p-3 border border-teal-100 dark:border-teal-900/60 flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#006D77] dark:text-[#83C5BE] shrink-0 mt-0.5" />
                <div className="text-xs text-[#006D77] dark:text-[#83C5BE]">
                  <strong className="block text-stone-900 dark:text-white font-medium">Why Alon & Aninag Stands Apart:</strong>
                  Intimate 12-room boutique setting with uncrowded sands, beachfront sunset acoustics, and exclusive Dayglow clear kayak experiences on Poblacion Beach.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All 5 Competitors List Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                Sipalay Resort Directory & Comparative Locations
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                Click "Select on Map" to automatically scroll to and move directly to that geographic area on the map.
              </p>
            </div>
            <span className="text-xs text-stone-500 dark:text-stone-400 hidden sm:inline-block">5 Competitors Analyzed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Our Resort Card */}
            <div className="bg-[#006D77] dark:bg-[#00555d] text-white rounded-xl p-5 border border-teal-800 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 text-white px-2 py-0.5 rounded-sm">
                    Our Resort
                  </span>
                  <span className="text-xs font-bold text-[#83C5BE]">
                    You Are Here
                  </span>
                </div>
                <h4 className="font-serif text-xl font-bold mb-2">
                  {ourResort.name}
                </h4>
                <p className="text-xs text-stone-200 mb-3 leading-relaxed">
                  {ourResort.category}
                </p>
                <div className="text-[11px] font-mono bg-black/20 p-2 rounded text-stone-300 mb-3 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#83C5BE] shrink-0 mt-0.5" />
                  <span>{ourResort.location}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-teal-600/50 flex items-center justify-between text-xs">
                <span className="text-stone-300">Rate Range:</span>
                <span className="font-bold text-white">{ourResort.priceRange}</span>
              </div>
            </div>

            {/* 5 Competitor Cards */}
            {COMPETITORS_DATA.map((comp, idx) => {
              const isSelected = selectedCompetitor.id === comp.id;

              return (
                <div
                  key={comp.id}
                  onClick={() => handleSelectResort(comp, true)}
                  className={`bg-white dark:bg-[#131F2A] rounded-xl p-5 border transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xs ${
                    isSelected
                      ? 'border-[#006D77] ring-2 ring-[#006D77]/30 shadow-md -translate-y-0.5'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#006D77] dark:text-[#83C5BE] bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-sm border border-teal-100 dark:border-teal-800">
                        Competitor {idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                        {comp.distanceKm} km away
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-white mb-1">
                      {comp.name}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
                      {comp.category}
                    </p>

                    <div className="text-[11px] font-mono bg-[#FAF7F2] dark:bg-[#0E1720] p-2 rounded text-stone-700 dark:text-stone-300 mb-3 flex items-start justify-between gap-1 border border-stone-200 dark:border-stone-800">
                      <div className="flex items-start gap-1">
                        <MapPin className="w-3 h-3 text-[#006D77] dark:text-[#83C5BE] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{comp.location}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyAddress(comp.name, comp.location, comp.id);
                        }}
                        className="p-1 hover:bg-white dark:hover:bg-stone-800 rounded text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition cursor-pointer shrink-0"
                        title="Copy Address"
                      >
                        {copiedId === comp.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-2 mb-3">
                      {comp.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                    <span className="text-stone-500 dark:text-stone-400 font-medium">{comp.travelTime}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectResort(comp, true);
                      }}
                      className={`font-bold px-3 py-1.5 rounded transition cursor-pointer flex items-center gap-1.5 text-xs ${
                        isSelected 
                          ? 'bg-[#006D77] text-white shadow-xs' 
                          : 'bg-[#FAF7F2] dark:bg-stone-800 text-[#006D77] dark:text-[#83C5BE] border border-[#D0DFE2] dark:border-stone-700 hover:bg-[#006D77] hover:text-white dark:hover:bg-[#006D77]'
                      }`}
                    >
                      <span>{isSelected ? 'Area Focused' : 'Select on Map'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export const CompetitorMap = InteractiveMap;
