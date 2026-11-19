import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useResort } from '../context/ResortContext';
import { RESORT_IMAGES } from '../data/resortData';
import {
  Crosshair,
  Layers,
  ExternalLink,
  Copy,
  Check,
  Compass,
  Navigation,
  X,
  RotateCcw,
  RotateCw,
  Filter,
  Search,
  Maximize2,
  Minimize2,
  Box,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export type LocationCategory =
  | 'Resorts'
  | 'Competitors'
  | 'Beaches'
  | 'Restaurants'
  | 'Tourist Attractions';

export interface ResortLocation {
  id: string;
  name: string;
  shortName: string;
  categoryGroup: LocationCategory;
  categoryLabel: string;
  municipality: string;
  lat: number;
  lng: number;
  address: string;
  distanceKm: number; // relative to Alon & Aninag
  travelTime: string;
  description: string;
  image: string;
  priceRange?: string;
  highlights: string[];
  badge?: string;
  topRated?: boolean;
  color: string;
  iconType: 'resort' | 'competitor' | 'beach' | 'restaurant' | 'attraction';
}

export const ALL_LOCATIONS: ResortLocation[] = [
  // 1. RESORTS (Our Resort)
  {
    id: 'alon-aninag',
    name: 'Alon & Aninag Boutique Beach Resort',
    shortName: 'Alon & Aninag (Our Resort)',
    categoryGroup: 'Resorts',
    categoryLabel: '24-Room Boutique Beachfront Sanctuary',
    municipality: 'Sipalay City',
    lat: 9.7528,
    lng: 122.3989,
    address: 'Poblacion Beach (near Jazz Inn & Baywalk), Sipalay City, Negros Occidental 6111',
    distanceKm: 0,
    travelTime: 'Town Center • Direct Beachfront',
    description: 'Direct beachfront sanctuary on Poblacion Beach. Features 24 intimate coastal accommodations across 5 boutique categories, Soul Beach Cafe, and exclusive clear-kayak Dayglow floating experiences.',
    image: RESORT_IMAGES.hero,
    priceRange: '₱3,200 – ₱6,800 / night',
    highlights: ['Direct Poblacion Beach Sand', 'Aninag Dayglow Floating Tray Experience', 'Soul Beach Cafe & Bar', 'Starlink 150+ Mbps Wi-Fi'],
    badge: 'You Are Here',
    topRated: true,
    color: '#006D77',
    iconType: 'resort'
  },

  // 2. COMPETITORS
  {
    id: 'tinagong-dagat',
    name: 'Tinagong Dagat Island Resort',
    shortName: 'Tinagong Dagat',
    categoryGroup: 'Competitors',
    categoryLabel: 'Eco-Island Lagoon Resort',
    municipality: 'Sipalay City',
    lat: 9.7925,
    lng: 122.3882,
    address: 'Sitio Latasan, Brgy. 4, Sipalay City, Negros Occidental',
    distanceKm: 6.5,
    travelTime: '15 mins by Boat / 20 mins by Car',
    description: 'Picturesque hidden sea lagoon surrounded by limestone karst hills with interconnected wooden footbridges across saltwater islets.',
    image: RESORT_IMAGES.islets,
    priceRange: '₱1,800 – ₱4,500 / night',
    highlights: ['Interconnected wooden footbridges', 'Tidal saltwater lagoon swimming', 'Limestone karst islets', 'Kayaking & snorkel spots'],
    badge: 'North Lagoon Competitor',
    color: '#FF2A85',
    iconType: 'competitor'
  },
  {
    id: 'nayah-villas',
    name: 'Na-Yah Beach Villas Sipalay',
    shortName: 'Na-Yah Beach Villas',
    categoryGroup: 'Competitors',
    categoryLabel: 'Luxury Beachfront Villas',
    municipality: 'Sipalay City',
    lat: 9.7780,
    lng: 122.4080,
    address: 'Q9CX+65P, Sipalay City, 6113 Negros Occidental',
    distanceKm: 3.5,
    travelTime: '10 mins by Tricycle / Car',
    description: 'Exclusive private beachfront villas featuring individual plunge pools, modern Scandinavian-tropical architecture, and serene coastal privacy along Northern Sipalay.',
    image: RESORT_IMAGES.cottage,
    priceRange: '₱5,500 – ₱12,000 / night',
    highlights: ['Private plunge pools', 'Direct secluded beach access', 'Ultra-modern villa architecture', 'Romantic couples privacy'],
    badge: 'North Coast Competitor',
    color: '#9333EA',
    iconType: 'competitor'
  },
  {
    id: 'bugana-beach',
    name: 'Bugana Beach and Dive Resort',
    shortName: 'Bugana Beach & Dive',
    categoryGroup: 'Competitors',
    categoryLabel: 'Boutique Bay & Dive Resort',
    municipality: 'Sipalay City',
    lat: 9.7082,
    lng: 122.3785,
    address: 'Brgy. Maricalum, Campomanes Bay / Punta Ballo, Sipalay City, Negros Occidental',
    distanceKm: 11.8,
    travelTime: '20 mins by Car / Van',
    description: 'Nestled along the calm, sheltered waters of Campomanes Bay. Features spacious tropical garden villas, an open-air restaurant by the bay, and a private boat jetty for marine tours.',
    image: RESORT_IMAGES.diving,
    priceRange: '₱3,800 – ₱8,500 / night',
    highlights: ['Sheltered bay frontage', 'Tropical garden villas', 'Al fresco waterfront dining', 'Private boat jetty for dive tours'],
    badge: 'Campomanes Bay Competitor',
    color: '#FF2A85',
    iconType: 'competitor'
  },
  {
    id: 'takatuka-beach',
    name: 'Takatuka Beach Resort',
    shortName: 'Takatuka Beach Resort',
    categoryGroup: 'Competitors',
    categoryLabel: 'Themed Beachfront Lodge',
    municipality: 'Sipalay City',
    lat: 9.7120,
    lng: 122.3820,
    address: 'Brgy. 4, Sitio Punta Ballo, Sipalay City, 6113 Negros Occidental',
    distanceKm: 14.2,
    travelTime: '25 mins by Car / Van',
    description: 'Famed for its artistic, quirky, and colorful individually themed suites. Located right on Punta Ballo white sand beach with a vibrant beachfront restaurant and cocktail bar.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    priceRange: '₱3,200 – ₱7,500 / night',
    highlights: ['Unique whimsical theme rooms', 'Punta Ballo white sand beach', 'Beachfront gourmet restaurant', 'Eclectic oceanfront lounging'],
    badge: 'Punta Ballo Competitor',
    color: '#EA580C',
    iconType: 'competitor'
  },
  {
    id: 'nataasan-beach',
    name: 'Nataasan Beach Resort & Dive Center',
    shortName: 'Nataasan Beach Resort',
    categoryGroup: 'Competitors',
    categoryLabel: 'Cliffside Resort & Dive Center',
    municipality: 'Sipalay City',
    lat: 9.7100,
    lng: 122.3850,
    address: 'Brgy. 4, Sitio Punta Ballo, Sipalay City, 6113 Negros Occidental',
    distanceKm: 14.5,
    travelTime: '25 mins by Car / Van',
    description: 'Perched on the scenic cliffs above Punta Ballo, offering panoramic ocean views, a hilltop infinity pool, full dive shop facilities, and staircase access down to the white beach.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    priceRange: '₱2,800 – ₱6,000 / night',
    highlights: ['Cliffside panoramic views', 'Hilltop swimming pool', 'Full dive shop services', 'Sunset vista restaurant'],
    badge: 'Punta Ballo Competitor',
    color: '#0284C7',
    iconType: 'competitor'
  },
  {
    id: 'manami-resort',
    name: 'Manami Resort',
    shortName: 'Manami Resort',
    categoryGroup: 'Competitors',
    categoryLabel: '5-Star Ultra-Luxury Nature Sanctuary',
    municipality: 'Sipalay City',
    lat: 9.6821,
    lng: 122.3887,
    address: 'MCC3+FC3, Brgy. Cayhagan, Sipalay City, 6113 Negros Occidental',
    distanceKm: 18.0,
    travelTime: '35 mins by Resort Shuttle / SUV',
    description: 'Sipalay’s premier 5-star discovery hospitality estate situated in secluded Cayhagan cove. Features cliffside ocean villas, a private beach cove, fine dining Lin-aw pavilion, and nature wellness cave spa.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    priceRange: '₱14,000 – ₱28,000 / night',
    highlights: ['Private secluded beach cove', 'High-end Lin-aw gastronomy', 'Huni cave & nature spa', 'Dedicated private butler service'],
    badge: 'Top Rated • South Coast',
    topRated: true,
    color: '#FF2A85',
    iconType: 'competitor'
  },

  // 3. BEACHES
  {
    id: 'beach-poblacion',
    name: 'Poblacion Beach Frontage',
    shortName: 'Poblacion Beach',
    categoryGroup: 'Beaches',
    categoryLabel: 'Golden Sand Coastal Beach',
    municipality: 'Sipalay City',
    lat: 9.7532,
    lng: 122.3985,
    address: 'Poblacion Coastal Strip, Sipalay City, Negros Occidental',
    distanceKm: 0,
    travelTime: 'Direct Beachfront • 0 meters',
    description: 'A 1.2-kilometer golden-sand crescent beach right at the city center. Gentle, swimmable waves and unobstructed western horizon for sunset contemplation.',
    image: RESORT_IMAGES.beachDay,
    highlights: ['Directly outside Alon & Aninag', 'Calm sunset waters', 'Fine golden sand', 'Beach volleyball & walking'],
    badge: 'Primary Beachfront',
    color: '#0EA5E9',
    iconType: 'beach'
  },
  {
    id: 'beach-sugar',
    name: 'Sugar Beach (Langub Beach)',
    shortName: 'Sugar Beach',
    categoryGroup: 'Beaches',
    categoryLabel: 'Pristine Soft Brown Sand Haven',
    municipality: 'Sipalay City',
    lat: 9.7750,
    lng: 122.3980,
    address: 'Brgy. Nauhang, Sipalay City, Negros Occidental',
    distanceKm: 4.8,
    travelTime: '15 mins boat ride from Poblacion Beach',
    description: 'Accessible by traditional motorized outrigger boat. Famed for its ultra-fine sugar-like soft sand, coconut-fringed tree line, and tranquil, vehicle-free beachfront ambiance.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    highlights: ['Boat-access only privacy', 'Ultra-soft sand texture', 'Beachside bohemian cafes', 'Sunset beach bonfires'],
    badge: 'Iconic Sipalay Beach',
    color: '#0EA5E9',
    iconType: 'beach'
  },
  {
    id: 'beach-punta-ballo',
    name: 'Punta Ballo White Beach',
    shortName: 'Punta Ballo Beach',
    categoryGroup: 'Beaches',
    categoryLabel: 'White Sand & Diving Beach',
    municipality: 'Sipalay City',
    lat: 9.7110,
    lng: 122.3810,
    address: 'Sitio Punta Ballo, Brgy. 4, Sipalay City',
    distanceKm: 14.0,
    travelTime: '25 mins by Car / Tricycle',
    description: 'A half-kilometer strip of brilliant white sand facing direct south-west. Excellent house reef right off the shore for snorkeling and scuba diving.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
    highlights: ['White coralline sand', 'Offshore coral reef snorkeling', 'Scuba diving launch sites', 'Scenic cliff backdrop'],
    badge: 'Diving Destination',
    color: '#0EA5E9',
    iconType: 'beach'
  },
  {
    id: 'beach-campomanes',
    name: 'Campomanes Bay Protected Marine Beach',
    shortName: 'Campomanes Bay Beach',
    categoryGroup: 'Beaches',
    categoryLabel: 'Sheltered Deep-Water Bay',
    municipality: 'Sipalay City',
    lat: 9.7060,
    lng: 122.3740,
    address: 'Campomanes Bay, Brgy. Maricalum, Sipalay City',
    distanceKm: 12.5,
    travelTime: '20 mins by Car / Van',
    description: 'Enclosed bay protected from strong open-sea swells. Renowned for crystal-clear kayaking waters, mangrove estuaries, and sunken shipwrecks for diver exploration.',
    image: RESORT_IMAGES.kayaking,
    highlights: ['Protected natural harbor', 'Sunken shipwreck diving', 'Mangrove paddle trails', 'Calm glass-like water'],
    badge: 'Marine Haven',
    color: '#0EA5E9',
    iconType: 'beach'
  },

  // 4. RESTAURANTS
  {
    id: 'rest-soul-cafe',
    name: 'Soul Beach Cafe & Bar',
    shortName: 'Soul Beach Cafe',
    categoryGroup: 'Restaurants',
    categoryLabel: 'Beachfront Cafe & Negrense Bistro',
    municipality: 'Sipalay City',
    lat: 9.7529,
    lng: 122.3990,
    address: 'Alon & Aninag Beachfront Deck, Poblacion Beach, Sipalay City',
    distanceKm: 0,
    travelTime: 'On-site at Alon & Aninag',
    description: 'Our in-house al-fresco beachfront cafe serving specialty single-origin Negrense coffee, fresh seafood bowls, artisanal floating snacks, and sunset Don Papa rum craft cocktails.',
    image: RESORT_IMAGES.dining,
    priceRange: '₱180 – ₱480 per dish',
    highlights: ['Negrense specialty coffee', 'Craft sunset cocktails', 'Fresh grilled catch-of-the-day', 'Acoustic bonfire seating'],
    badge: 'Our Signature Dining',
    color: '#D97706',
    iconType: 'restaurant'
  },
  {
    id: 'rest-lin-aw',
    name: 'Lin-aw Restaurant & Cave Lounge',
    shortName: 'Lin-aw Restaurant',
    categoryGroup: 'Restaurants',
    categoryLabel: 'Fine Dining Nature Pavilion',
    municipality: 'Sipalay City',
    lat: 9.6825,
    lng: 122.3885,
    address: 'Manami Resort, Brgy. Cayhagan, Sipalay City',
    distanceKm: 18.0,
    travelTime: '35 mins by Car / SUV',
    description: 'Upscale cliffside gastronomy blending regional Negrense heirloom ingredients with Spanish coastal culinary heritage overlooking Cayhagan Bay.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    priceRange: '₱650 – ₱1,800 per dish',
    highlights: ['Gourmet coastal cuisine', 'Panoramic ocean terrace', 'Curated wine collection', 'Romantic candlelit ambiance'],
    badge: 'Fine Dining',
    color: '#D97706',
    iconType: 'restaurant'
  },
  {
    id: 'rest-takatuka-diner',
    name: 'Takatuka Beachfront Diner & Bar',
    shortName: 'Takatuka Diner',
    categoryGroup: 'Restaurants',
    categoryLabel: 'Eclectic Beachfront Bistro',
    municipality: 'Sipalay City',
    lat: 9.7122,
    lng: 122.3822,
    address: 'Punta Ballo Beach, Sipalay City',
    distanceKm: 14.2,
    travelTime: '25 mins by Car / Tricycle',
    description: 'Renowned for generous gourmet European-Filipino fusion dishes, homemade breads, fresh salads, and tropical cocktails directly on the sand.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    priceRange: '₱280 – ₱650 per dish',
    highlights: ['European-Filipino fusion', 'Fresh homemade breads', 'Beachfront tables', 'Signature fruit cocktails'],
    badge: 'Casual Beach Dining',
    color: '#D97706',
    iconType: 'restaurant'
  },
  {
    id: 'rest-jamont-grill',
    name: 'Jamont Seaside Grill & Bistro',
    shortName: 'Jamont Seaside Grill',
    categoryGroup: 'Restaurants',
    categoryLabel: 'Seafood Grill & Local Kitchen',
    municipality: 'Sipalay City',
    lat: 9.7512,
    lng: 122.3995,
    address: 'Alvarez St., Poblacion, Sipalay City',
    distanceKm: 0.3,
    travelTime: '3 mins walk from Alon & Aninag',
    description: 'Popular downtown restaurant celebrated for fresh charcoal-grilled tuna, sizzling squid, chicken inasal, and traditional Negrense comfort food.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    priceRange: '₱150 – ₱380 per dish',
    highlights: ['Charcoal grilled seafood', 'Authentic Chicken Inasal', 'Walking distance from beach', 'Family friendly'],
    badge: 'Local Favorite',
    color: '#D97706',
    iconType: 'restaurant'
  },

  // 5. TOURIST ATTRACTIONS
  {
    id: 'attr-tinagong-lagoon',
    name: 'Tinagong Dagat Karst Lagoon & Islets',
    shortName: 'Tinagong Dagat Lagoon',
    categoryGroup: 'Tourist Attractions',
    categoryLabel: 'Limestone Islet Labyrinth',
    municipality: 'Sipalay City',
    lat: 9.7928,
    lng: 122.3885,
    address: 'Sitio Latasan, Brgy. 4, Sipalay City',
    distanceKm: 6.5,
    travelTime: '15 mins boat ride / 20 mins drive',
    description: 'Often dubbed the "Jewel of Sipalay," featuring dozens of limestone karst rock formations connected by suspended bamboo and timber walkways over emerald tidal lagoons.',
    image: RESORT_IMAGES.islets,
    highlights: ['Suspended footbridges', 'Panoramic karst viewpoints', 'Lagoon paddleboarding', 'Cliffside photo ops'],
    badge: 'Must-See Landmark',
    color: '#059669',
    iconType: 'attraction'
  },
  {
    id: 'attr-perth-viewpoint',
    name: 'Perth Paradise Karst Hilltop Viewpoint',
    shortName: 'Perth Paradise Viewpoint',
    categoryGroup: 'Tourist Attractions',
    categoryLabel: 'Iconic Karst Panoramic View',
    municipality: 'Sipalay City',
    lat: 9.7610,
    lng: 122.4085,
    address: 'Sitio Sambulawan, Brgy. 4, Sipalay City',
    distanceKm: 4.2,
    travelTime: '12 mins drive from Poblacion',
    description: 'Famous hilltop infinity pool vantage point overlooking the miniature limestone karst islets of Sipalay, resembling the iconic islands of Coron and El Nido.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    highlights: ['Famous Sipalay postcard view', 'Hilltop infinity pool', 'Karst islet horizon', 'Negrense snack bar'],
    badge: 'Top Viewpoint',
    topRated: true,
    color: '#059669',
    iconType: 'attraction'
  },
  {
    id: 'attr-baywalk-plaza',
    name: 'Sipalay Baywalk & Sunset Promenade',
    shortName: 'Sipalay Baywalk',
    categoryGroup: 'Tourist Attractions',
    categoryLabel: 'Coastal Public Promenade',
    municipality: 'Sipalay City',
    lat: 9.7538,
    lng: 122.3995,
    address: 'Rodrigo G. Chua Blvd, Poblacion Beach, Sipalay City',
    distanceKm: 0.2,
    travelTime: '2 mins walk from Alon & Aninag',
    description: 'Picturesque beach promenade overlooking the Sulu Sea with scenic park benches, street food stalls, and stunning evening sunset vistas right next to our resort.',
    image: RESORT_IMAGES.sunsetDeck,
    highlights: ['Coastal jogging path', 'Sunset golden hour photo spot', 'Local Negrense street food', 'Immediate neighbor to Alon & Aninag'],
    badge: 'City Landmark',
    color: '#059669',
    iconType: 'attraction'
  },
  {
    id: 'attr-campomanes-sanctuary',
    name: 'Campomanes Bay Marine & Shipwreck Sanctuary',
    shortName: 'Campomanes Marine Sanctuary',
    categoryGroup: 'Tourist Attractions',
    categoryLabel: 'Marine Eco-Park & Dive Site',
    municipality: 'Sipalay City',
    lat: 9.7040,
    lng: 122.3730,
    address: 'Campomanes Bay, Brgy. Maricalum, Sipalay City',
    distanceKm: 12.8,
    travelTime: '25 mins drive / boat tour',
    description: 'Protected municipal marine sanctuary boasting lush coral gardens, sea turtle grazing areas, and accessible WW2 cargo shipwrecks for both snorkelers and licensed divers.',
    image: RESORT_IMAGES.diving,
    highlights: ['Shipwreck diving sites', 'Healthy coral reefs', 'Sea turtle sightings', 'Glass-bottom boat tours'],
    badge: 'Eco Sanctuary',
    color: '#059669',
    iconType: 'attraction'
  },
  {
    id: 'attr-ceres-terminal',
    name: 'Sipalay City Ceres Public Terminal',
    shortName: 'Sipalay Ceres Terminal',
    categoryGroup: 'Tourist Attractions',
    categoryLabel: 'Regional Transportation Hub',
    municipality: 'Sipalay City',
    lat: 9.7505,
    lng: 122.4035,
    address: 'Alvarez St, Sipalay City Center, Negros Occidental',
    distanceKm: 0.8,
    travelTime: '5 mins by Tricycle to Alon & Aninag',
    description: 'Central bus terminal for air-conditioned Ceres Liner coaches arriving from Bacolod-Silay Airport and Dumaguete-Sibulan Airport. Motorized tricycles are available 24/7 for resort transfers.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    highlights: ['Buses direct to Bacolod/Dumaguete', '24/7 local tricycle terminal', 'ATM banking nearby', 'Local fruit market'],
    badge: 'Transit Gateway',
    color: '#4B5563',
    iconType: 'attraction'
  }
];

export const CATEGORIES: LocationCategory[] = [
  'Resorts',
  'Competitors',
  'Beaches',
  'Restaurants',
  'Tourist Attractions'
];

type MapTileStyle = 'standard' | 'satellite' | 'terrain';

const MAP_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    standard: {
      type: 'raster',
      tiles: [
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
      ],
      tileSize: 256,
      maxzoom: 19
    },
    satellite: {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      ],
      tileSize: 256,
      maxzoom: 18
    },
    terrain: {
      type: 'raster',
      tiles: [
        'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
        'https://b.tile.opentopomap.org/{z}/{x}/{y}.png',
        'https://c.tile.opentopomap.org/{z}/{x}/{y}.png'
      ],
      tileSize: 256,
      maxzoom: 17
    }
  },
  layers: [
    {
      id: 'ocean-background',
      type: 'background',
      paint: {
        'background-color': '#AAD3DF'
      }
    },
    {
      id: 'standard-layer',
      type: 'raster',
      source: 'standard',
      layout: { visibility: 'visible' }
    },
    {
      id: 'satellite-layer',
      type: 'raster',
      source: 'satellite',
      layout: { visibility: 'none' }
    },
    {
      id: 'terrain-layer',
      type: 'raster',
      source: 'terrain',
      layout: { visibility: 'none' }
    }
  ]
};

const MAX_3D_PITCH = 65;
const DEFAULT_3D_PITCH = 52;

const normalizeBearing = (deg: number): number => {
  const normalized = ((deg % 360) + 360) % 360;
  return normalized >= 359.5 || normalized < 0.5 ? 0 : Math.round(normalized);
};

export const GeographicLocationMap: React.FC = () => {
  const { addNotification, navigateTo } = useResort();

  const viewportRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Record<string, maplibregl.Marker>>({});
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // States
  const [activeTileStyle, setActiveTileStyle] = useState<MapTileStyle>('standard');
  const [selectedLocationId, setSelectedLocationId] = useState<string>('alon-aninag');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [userGpsPosition, setUserGpsPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Genuine WebGL Camera Orientation States (Rotation Bearing & 3D Tilt Pitch)
  const [mapBearing, setMapBearing] = useState<number>(0);
  const [mapPitch, setMapPitch] = useState<number>(0);

  // Category Filter State (Multi-select support)
  const [selectedCategories, setSelectedCategories] = useState<LocationCategory[]>([]);

  // Information Card Visibility & Auto-hide Timer
  const [isCardVisible, setIsCardVisible] = useState<boolean>(true);
  const autoHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Selected Location memo
  const selectedLocation = useMemo(() => {
    return ALL_LOCATIONS.find(loc => loc.id === selectedLocationId) || ALL_LOCATIONS[0];
  }, [selectedLocationId]);

  // Filtered locations based on active category selections
  const filteredLocations = useMemo(() => {
    if (selectedCategories.length === 0) return ALL_LOCATIONS;
    return ALL_LOCATIONS.filter(loc => selectedCategories.includes(loc.categoryGroup));
  }, [selectedCategories]);

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return ALL_LOCATIONS.filter(loc =>
      loc.name.toLowerCase().includes(q) ||
      loc.shortName.toLowerCase().includes(q) ||
      loc.categoryGroup.toLowerCase().includes(q) ||
      loc.categoryLabel.toLowerCase().includes(q) ||
      loc.address.toLowerCase().includes(q) ||
      loc.municipality.toLowerCase().includes(q) ||
      loc.highlights.some(h => h.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Initial 3-second auto-hide on load
  useEffect(() => {
    autoHideTimerRef.current = setTimeout(() => {
      setIsCardVisible(false);
    }, 3000);

    return () => {
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
      }
    };
  }, []);

  // Helper to trigger 3-second auto-hide
  const triggerAutoHide = useCallback(() => {
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current);
    }
    autoHideTimerRef.current = setTimeout(() => {
      setIsCardVisible(false);
    }, 3000);
  }, []);

  // Build HTML marker DOM element anchored strictly at diamond tip (bottom-center of pin geometry)
  const createMarkerElement = useCallback((location: ResortLocation, isSelected: boolean): HTMLDivElement => {
    const isOurResort = location.id === 'alon-aninag';
    const isTopRated = location.topRated;

    const root = document.createElement('div');
    root.className = 'maplibregl-custom-marker relative flex flex-col items-center cursor-pointer group select-none';
    root.style.zIndex = isSelected ? '20' : isOurResort ? '12' : '2';

    const ringClass = isOurResort
      ? 'ring-4 ring-amber-400 scale-110'
      : location.categoryGroup === 'Competitors'
      ? 'ring-4 ring-pink-400 scale-110'
      : location.categoryGroup === 'Beaches'
      ? 'ring-4 ring-cyan-300 scale-110'
      : location.categoryGroup === 'Restaurants'
      ? 'ring-4 ring-amber-300 scale-110'
      : 'ring-4 ring-emerald-300 scale-110';

    if (isOurResort) {
      root.innerHTML = `
        <div class="relative flex flex-col items-center">
          <div class="absolute -inset-2 rounded-full bg-teal-500/30 animate-ping pointer-events-none"></div>
          <div data-pin-circle="true" class="relative w-11 h-11 rounded-full bg-[#006D77] border-2 border-white shadow-2xl flex items-center justify-center text-white transition-transform duration-200 ${
            isSelected ? ringClass : 'ring-2 ring-[#006D77]/50'
          }">
            <span class="text-base font-bold text-amber-300">✦</span>
          </div>
          <div class="w-2.5 h-2.5 bg-[#006D77] rotate-45 -mt-1.5 border-r-2 border-b-2 border-white"></div>
        </div>
        <div class="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md bg-[#006D77] text-white text-[10px] font-bold shadow-md whitespace-nowrap border border-white/40 pointer-events-none">
          Alon & Aninag (Our Resort)
        </div>
      `;
    } else if (location.categoryGroup === 'Competitors') {
      root.innerHTML = `
        <div class="relative flex flex-col items-center">
          <div data-pin-circle="true" class="relative w-9 h-9 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white transition-transform duration-200 ${
            isSelected ? ringClass : ''
          }" style="background-color: ${location.color};">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11" />
            </svg>
          </div>
          <div class="w-2 h-2 rotate-45 -mt-1 border-r border-b border-white" style="background-color: ${location.color};"></div>
        </div>
        <div class="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 px-2 py-0.5 rounded bg-white text-stone-900 text-[10px] font-bold shadow-md whitespace-nowrap border border-pink-400 pointer-events-none" style="color: ${location.color};">
          ${location.name.split(' ')[0]} ${isTopRated ? '★' : ''}
        </div>
      `;
    } else if (location.categoryGroup === 'Beaches') {
      root.innerHTML = `
        <div class="relative flex flex-col items-center">
          <div data-pin-circle="true" class="relative w-8 h-8 rounded-full bg-[#0EA5E9] border-2 border-white shadow-md flex items-center justify-center text-white transition-transform duration-200 ${
            isSelected ? ringClass : ''
          }">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div class="w-2 h-2 bg-[#0EA5E9] rotate-45 -mt-1 border-r border-b border-white"></div>
        </div>
        <div class="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 px-1.5 py-0.2 rounded bg-white text-[#0EA5E9] text-[9.5px] font-bold shadow whitespace-nowrap border border-cyan-300 pointer-events-none">
          ${location.shortName}
        </div>
      `;
    } else if (location.categoryGroup === 'Restaurants') {
      root.innerHTML = `
        <div class="relative flex flex-col items-center">
          <div data-pin-circle="true" class="relative w-8 h-8 rounded-full bg-[#D97706] border-2 border-white shadow-md flex items-center justify-center text-white transition-transform duration-200 ${
            isSelected ? ringClass : ''
          }">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div class="w-2 h-2 bg-[#D97706] rotate-45 -mt-1 border-r border-b border-white"></div>
        </div>
        <div class="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 px-1.5 py-0.2 rounded bg-white text-[#D97706] text-[9.5px] font-bold shadow whitespace-nowrap border border-amber-300 pointer-events-none">
          ${location.shortName}
        </div>
      `;
    } else {
      root.innerHTML = `
        <div class="relative flex flex-col items-center">
          <div data-pin-circle="true" class="relative w-8 h-8 rounded-full bg-[#059669] border-2 border-white shadow-md flex items-center justify-center text-white transition-transform duration-200 ${
            isSelected ? ringClass : ''
          }">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div class="w-2 h-2 bg-[#059669] rotate-45 -mt-1 border-r border-b border-white"></div>
        </div>
        <div class="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 px-1.5 py-0.2 rounded bg-white text-[#059669] text-[9.5px] font-bold shadow whitespace-nowrap border border-emerald-300 pointer-events-none">
          ${location.shortName}
        </div>
      `;
    }

    return root;
  }, []);

  // Keep WebGL canvas sized cleanly with container & fullscreen changes
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const handleResize = () => {
      requestAnimationFrame(() => {
        const map = mapInstanceRef.current;
        if (map) {
          try {
            map.resize();
          } catch {
            // Safe guard
          }
        }
      });
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(vp);
    return () => ro.disconnect();
  }, [isFullscreen]);

  // Fit bounds safely across all Sipalay destinations while respecting UI overlays
  const fitAllDestinations = useCallback((options?: { pitch?: number; bearing?: number; duration?: number }) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const bounds = new maplibregl.LngLatBounds();
    ALL_LOCATIONS.forEach(loc => bounds.extend([loc.lng, loc.lat]));

    try {
      map.fitBounds(bounds, {
        padding: { top: 84, bottom: 72, left: 48, right: 72 },
        maxZoom: 13.5,
        pitch: options?.pitch ?? map.getPitch(),
        bearing: options?.bearing ?? map.getBearing(),
        duration: options?.duration ?? 700
      });
    } catch {
      // Safe guard
    }
  }, []);

  // Center or fly cleanly to a selected destination (preserves user 3D tilt angle)
  const flyToLocation = useCallback((location: ResortLocation, zoom = 15) => {
    setSelectedLocationId(location.id);
    setIsCardVisible(true);
    triggerAutoHide();

    const map = mapInstanceRef.current;
    if (map) {
      try {
        map.flyTo({
          center: [location.lng, location.lat],
          zoom: Math.max(map.getZoom(), zoom),
          duration: 900,
          essential: true
        });
      } catch {
        // Safe guard
      }
    }
  }, [triggerAutoHide]);

  // Interactive Camera Controls (3D Pitch/Tilt, Rotation Bearing, Zoom, Full Reset)
  const handleToggle3DTilt = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const isTilted = map.getPitch() >= 10;
    map.easeTo({
      pitch: isTilted ? 0 : DEFAULT_3D_PITCH,
      duration: 600,
      easing: (t) => 1 - Math.pow(1 - t, 3)
    });
  }, []);

  const handleTiltUp = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const targetPitch = Math.min(MAX_3D_PITCH, map.getPitch() + 15);
    map.easeTo({ pitch: targetPitch, duration: 380 });
  }, []);

  const handleTiltDown = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const targetPitch = Math.max(0, map.getPitch() - 15);
    map.easeTo({ pitch: targetPitch, duration: 380 });
  }, []);

  const handleReturn2D = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.easeTo({ pitch: 0, duration: 500 });
  }, []);

  const handleRotateLeft = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.easeTo({ bearing: map.getBearing() - 45, duration: 420 });
  }, []);

  const handleRotateRight = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.easeTo({ bearing: map.getBearing() + 45, duration: 420 });
  }, []);

  const handleResetBearing = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.easeTo({ bearing: 0, duration: 450 });
  }, []);

  const handleZoomIn = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.easeTo({ zoom: Math.min(18, map.getZoom() + 0.85), duration: 280 });
  }, []);

  const handleZoomOut = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.easeTo({ zoom: Math.max(5, map.getZoom() - 0.85), duration: 280 });
  }, []);

  const handleResetMap = useCallback(() => {
    fitAllDestinations({ pitch: 0, bearing: 0, duration: 750 });
    setSelectedLocationId('alon-aninag');
    setIsCardVisible(true);
    triggerAutoHide();
  }, [fitAllDestinations, triggerAutoHide]);

  // Prevent browser page pinch-zoom or Safari gesture leaks over overlay UI inside viewportRef
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const onViewportWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };
    const preventSafariGesture = (e: Event) => {
      e.preventDefault();
    };

    vp.addEventListener('wheel', onViewportWheel, { passive: false });
    vp.addEventListener('gesturestart', preventSafariGesture, { passive: false });
    vp.addEventListener('gesturechange', preventSafariGesture, { passive: false });

    return () => {
      vp.removeEventListener('wheel', onViewportWheel);
      vp.removeEventListener('gesturestart', preventSafariGesture);
      vp.removeEventListener('gesturechange', preventSafariGesture);
    };
  }, []);

  // Toggle Category Filter (Multi-select)
  const toggleCategory = (cat: LocationCategory) => {
    setSelectedCategories(prev => {
      if (prev.includes(cat)) {
        return prev.filter(c => c !== cat);
      } else {
        return [...prev, cat];
      }
    });
  };

  const clearCategoryFilters = () => {
    setSelectedCategories([]);
  };

  // User Geolocation
  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      addNotification('Geolocation', 'Geolocation is not supported by your browser.', 'alert');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        setUserGpsPosition({ lat: latitude, lng: longitude });

        const map = mapInstanceRef.current;
        if (map) {
          try {
            map.flyTo({ center: [longitude, latitude], zoom: 14, duration: 1200, essential: true });
          } catch {
            // Safe guard
          }

          const R = 6371;
          const dLat = ((9.7528 - latitude) * Math.PI) / 180;
          const dLon = ((122.3989 - longitude) * Math.PI) / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((latitude * Math.PI) / 180) *
              Math.cos((9.7528 * Math.PI) / 180) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = Math.round(R * c);

          addNotification(
            'GPS Located',
            `You are approximately ${distance} km from Alon & Aninag Boutique Beach Resort.`,
            'alert'
          );
        }
      },
      () => {
        setIsLocating(false);
        addNotification(
          'Location Access',
          'Could not retrieve your location. Showing Sipalay coastal map.',
          'alert'
        );
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Update blue pulsing GPS dot marker when userGpsPosition resolves
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !userGpsPosition) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setLngLat([userGpsPosition.lng, userGpsPosition.lat]);
      return;
    }

    const gpsEl = document.createElement('div');
    gpsEl.className = 'relative flex items-center justify-center pointer-events-none';
    gpsEl.innerHTML = `
      <span class="absolute w-7 h-7 rounded-full bg-sky-500/35 animate-ping"></span>
      <span class="relative w-3.5 h-3.5 rounded-full bg-sky-500 border-2 border-white shadow-lg"></span>
    `;

    userMarkerRef.current = new maplibregl.Marker({ element: gpsEl, anchor: 'center' })
      .setLngLat([userGpsPosition.lng, userGpsPosition.lat])
      .addTo(map);
  }, [userGpsPosition]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!wrapperRef.current) return;
    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen().catch(() => {
        setIsFullscreen(prev => !prev);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(() => {
        const map = mapInstanceRef.current;
        if (map) {
          try {
            map.resize();
          } catch {
            // Safe guard
          }
        }
      }, 250);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Initialize MapLibre GL 3D WebGL Map Once on Mount
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const initialMap = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: [122.3920, 9.7380],
      zoom: 12,
      minZoom: 5,
      maxZoom: 18,
      pitch: 0,
      maxPitch: MAX_3D_PITCH,
      bearing: 0,
      maxBounds: [
        [114.0, 4.0],
        [128.0, 21.5]
      ],
      dragPan: true,
      dragRotate: true,
      pitchWithRotate: true,
      touchZoomRotate: true,
      touchPitch: true,
      scrollZoom: true,
      doubleClickZoom: true,
      keyboard: true,
      attributionControl: false
    });

    mapInstanceRef.current = initialMap;

    // Add coastal sky/horizon atmosphere for angled 3D view
    initialMap.on('style.load', () => {
      try {
        initialMap.setSky({
          'sky-color': '#88C6DF',
          'sky-horizon-blend': 0.55,
          'horizon-color': '#DDEFF6',
          'horizon-fog-blend': 0.5,
          'fog-color': '#CDE5EE',
          'fog-ground-blend': 0.25
        });
      } catch {
        // Safe fallback if browser WebGL shader skips sky
      }
    });

    // Live camera telemetry synchronization for Compass & 3D Tilt indicators
    const syncOrientation = () => {
      setMapBearing(normalizeBearing(initialMap.getBearing()));
      setMapPitch(Math.round(initialMap.getPitch()));
    };
    initialMap.on('rotate', syncOrientation);
    initialMap.on('pitch', syncOrientation);
    initialMap.on('moveend', syncOrientation);

    // Populate all 20 Sipalay destination markers anchored at diamond tip
    ALL_LOCATIONS.forEach(loc => {
      const el = createMarkerElement(loc, loc.id === 'alon-aninag');

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelectedLocationId(loc.id);
        setIsCardVisible(true);
        triggerAutoHide();
        try {
          initialMap.flyTo({
            center: [loc.lng, loc.lat],
            zoom: Math.max(initialMap.getZoom(), 14),
            duration: 850,
            essential: true
          });
        } catch {
          // Safe guard
        }
      });

      const marker = new maplibregl.Marker({
        element: el,
        anchor: 'bottom'
      })
        .setLngLat([loc.lng, loc.lat])
        .addTo(initialMap);

      markersRef.current[loc.id] = marker;
    });

    const fitTimer = setTimeout(() => {
      try {
        initialMap.resize();
        fitAllDestinations({ pitch: 0, bearing: 0, duration: 0 });
      } catch {
        // Safe guard
      }
    }, 300);

    return () => {
      clearTimeout(fitTimer);
      Object.values(markersRef.current).forEach(m => m.remove());
      markersRef.current = {};
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
      try {
        initialMap.remove();
      } catch {
        // Safe guard
      }
      mapInstanceRef.current = null;
    };
  }, [createMarkerElement, fitAllDestinations, triggerAutoHide]);

  // Handle Instant Tile Layer Switching (Zero Flicker, Preserves 3D Tilt & Bearing)
  const handleTileChange = (style: MapTileStyle) => {
    setActiveTileStyle(style);
    const map = mapInstanceRef.current;
    if (!map) return;

    const layers: Array<{ id: string; key: MapTileStyle }> = [
      { id: 'standard-layer', key: 'standard' },
      { id: 'satellite-layer', key: 'satellite' },
      { id: 'terrain-layer', key: 'terrain' }
    ];

    try {
      layers.forEach(({ id, key }) => {
        if (map.getLayer(id)) {
          map.setLayoutProperty(id, 'visibility', key === style ? 'visible' : 'none');
        }
      });
    } catch {
      // Safe guard
    }
  };

  // Sync Markers with Category Filters and Selection Without Rebuilding DOM Nodes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    ALL_LOCATIONS.forEach(loc => {
      const marker = markersRef.current[loc.id];
      if (!marker) return;

      const isCategoryVisible =
        selectedCategories.length === 0 || selectedCategories.includes(loc.categoryGroup);
      const isSelected = loc.id === selectedLocationId;
      const el = marker.getElement();

      el.style.display = isCategoryVisible ? 'flex' : 'none';
      el.style.zIndex = isSelected ? '20' : loc.id === 'alon-aninag' ? '12' : '2';

      const circleEl = el.querySelector('[data-pin-circle="true"]');
      if (circleEl) {
        const activeClasses =
          loc.id === 'alon-aninag'
            ? ['ring-4', 'ring-amber-400', 'scale-110']
            : loc.categoryGroup === 'Competitors'
            ? ['ring-4', 'ring-pink-400', 'scale-110']
            : loc.categoryGroup === 'Beaches'
            ? ['ring-4', 'ring-cyan-300', 'scale-110']
            : loc.categoryGroup === 'Restaurants'
            ? ['ring-4', 'ring-amber-300', 'scale-110']
            : ['ring-4', 'ring-emerald-300', 'scale-110'];

        circleEl.classList.remove(
          'ring-2',
          'ring-[#006D77]/50',
          'ring-4',
          'ring-amber-400',
          'ring-pink-400',
          'ring-cyan-300',
          'ring-amber-300',
          'ring-emerald-300',
          'scale-110'
        );

        if (isSelected) {
          circleEl.classList.add(...activeClasses);
        } else if (loc.id === 'alon-aninag') {
          circleEl.classList.add('ring-2', 'ring-[#006D77]/50');
        }
      }
    });
  }, [selectedCategories, selectedLocationId]);

  const handleCopyAddress = (loc: ResortLocation) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${loc.name}: ${loc.address}`);
      setCopiedId(loc.id);
      setTimeout(() => setCopiedId(null), 2500);
      addNotification('Address Copied', `${loc.name} address copied to clipboard.`, 'alert');
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`space-y-3 ${
        isFullscreen
          ? 'fixed inset-0 z-[9999] bg-[#0E1720] p-4 sm:p-6 overflow-y-auto flex flex-col justify-between'
          : 'relative'
      }`}
    >
      {/* 1. TOP CONTROLS BAR: Search & Layer Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-white dark:bg-[#131F2A] p-3 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
        {/* Real-time Search Input */}
        <div className="relative flex-1">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder="Search resorts, competitors, beaches, restaurants, or attractions..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-stone-50 dark:bg-[#0B131A] border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:border-[#006D77]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-0.5 cursor-pointer"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Suggestions Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#131F2A] rounded-xl border border-stone-200 dark:border-stone-700 shadow-2xl z-50 max-h-72 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800">
              {searchResults.map(result => (
                <button
                  key={result.id}
                  onClick={() => {
                    flyToLocation(result, 16);
                    setSearchQuery('');
                  }}
                  className="w-full text-left p-2.5 hover:bg-stone-50 dark:hover:bg-[#1A2837] transition flex items-center gap-3 cursor-pointer"
                >
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-10 h-10 rounded-lg object-cover shrink-0 border border-stone-200 dark:border-stone-700"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: result.color }}
                      />
                      <span className="text-xs font-bold text-stone-900 dark:text-white truncate">
                        {result.name}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full font-semibold uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 shrink-0">
                        {result.categoryGroup}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                      {result.municipality} • {result.address}
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-[#006D77] dark:text-[#83C5BE] shrink-0">
                    {result.distanceKm === 0 ? '0 km' : `${result.distanceKm} km`}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Mode Switcher: Standard, Satellite, Terrain */}
        <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800/80 p-1 rounded-xl shrink-0 self-end sm:self-auto">
          <button
            onClick={() => handleTileChange('standard')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
              activeTileStyle === 'standard'
                ? 'bg-white dark:bg-[#006D77] text-[#006D77] dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
            title="Standard Street Map"
          >
            <Layers className="w-3 h-3" />
            <span>Map</span>
          </button>
          <button
            onClick={() => handleTileChange('satellite')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
              activeTileStyle === 'satellite'
                ? 'bg-white dark:bg-[#006D77] text-[#006D77] dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
            title="Photorealistic Satellite Imagery"
          >
            <span>Satellite</span>
          </button>
          <button
            onClick={() => handleTileChange('terrain')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
              activeTileStyle === 'terrain'
                ? 'bg-white dark:bg-[#006D77] text-[#006D77] dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
            title="Topographic Terrain with Elevation"
          >
            <span>Terrain</span>
          </button>
        </div>
      </div>

      {/* 2. CATEGORY FILTERS ROW (Requirement 6: Multi-Select + Clear Filters) */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-50 dark:bg-[#131F2A]/60 p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs">
        <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wider text-[10px]">
          <Filter className="w-3.5 h-3.5 text-[#006D77] dark:text-[#83C5BE]" />
          <span>Category Filters:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map(category => {
            const isSelected = selectedCategories.includes(category);
            const count = ALL_LOCATIONS.filter(l => l.categoryGroup === category).length;
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-[#006D77] text-white border-[#006D77] shadow-xs'
                    : 'bg-white dark:bg-[#0E1720] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected
                      ? 'bg-white/25 text-white'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {selectedCategories.length > 0 && (
            <button
              onClick={clearCategoryFilters}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. MAIN INTERACTIVE MAP VIEWPORT CONTAINER */}
      <div
        ref={viewportRef}
        className={`relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xl select-none ${
          isFullscreen ? 'flex-1 min-h-[70vh]' : 'h-[480px] sm:h-[560px]'
        }`}
        style={{
          backgroundColor: '#AAD3DF',
          touchAction: 'none',
          overscrollBehavior: 'contain'
        }}
      >
        {/* Full-bleed WebGL 3D Interactive Map Canvas */}
        <div
          ref={mapContainerRef}
          className="absolute inset-0 w-full h-full z-10 select-none"
          style={{ touchAction: 'none' }}
        />

        {/* Real-time 3D Tilt & Bearing Indicator with One-Tap Reset */}
        {(mapPitch >= 1 || (mapBearing !== 0 && mapBearing !== 360)) && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-stone-900/95 dark:bg-black/95 text-white backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold border border-teal-500/50 shadow-xl flex flex-wrap items-center justify-center gap-2 animate-fadeIn pointer-events-auto max-w-[85%] sm:max-w-none">
            {mapPitch >= 1 && (
              <div className="flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Tilt: {mapPitch}°</span>
                <button
                  onClick={handleReturn2D}
                  className="text-[10px] bg-[#006D77] hover:bg-[#00555d] text-white uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full transition cursor-pointer shadow-xs"
                  title="Return to flat 2D overhead view"
                >
                  2D View
                </button>
              </div>
            )}
            {mapPitch >= 1 && mapBearing !== 0 && mapBearing !== 360 && (
              <span className="text-white/25">•</span>
            )}
            {mapBearing !== 0 && mapBearing !== 360 && (
              <div className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 text-teal-400 inline-flex items-center justify-center transition-transform duration-150"
                  style={{ transform: `rotate(${-mapBearing}deg)` }}
                >
                  ▲
                </span>
                <span>Rotation: {mapBearing}°</span>
                <button
                  onClick={handleResetBearing}
                  className="text-[10px] bg-[#006D77] hover:bg-[#00555d] text-white uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full transition cursor-pointer shadow-xs"
                  title="Reset orientation to True North"
                >
                  Reset North
                </button>
              </div>
            )}
          </div>
        )}

        {/* Unobtrusive Desktop Gesture Hint Pill */}
        <div className="absolute bottom-8 right-2 z-15 hidden xl:flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white/90 text-[10px] px-2.5 py-1 rounded-full border border-white/10 pointer-events-none select-none">
          <span>Drag: Pan</span>
          <span className="opacity-40">•</span>
          <span>Right-Drag / 2-Finger Drag: 3D Tilt &amp; Rotate</span>
          <span className="opacity-40">•</span>
          <span>Pinch / Scroll: Zoom</span>
        </div>

        {/* FLOATING TOP-RIGHT 3D & CAMERA CONTROLS: Zoom, Compass, 3D Tilt, Rotate, GPS, Reset, Fullscreen */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
          {/* Zoom Buttons */}
          <div className="bg-white/95 dark:bg-[#131F2A]/95 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 overflow-hidden flex flex-col">
            <button
              onClick={handleZoomIn}
              className="py-1.5 px-2.5 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer border-b border-stone-200 dark:border-stone-700 flex items-center justify-center"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <span className="text-sm font-bold leading-none">+</span>
            </button>
            <button
              onClick={handleZoomOut}
              className="py-1.5 px-2.5 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer flex items-center justify-center"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <span className="text-sm font-bold leading-none">−</span>
            </button>
          </div>

          {/* Interactive Compass Widget (Synchronized orientation; click to reset North) */}
          <button
            onClick={handleResetBearing}
            className="py-1.5 px-2 bg-white/95 dark:bg-[#131F2A]/95 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 transition cursor-pointer flex flex-col items-center justify-center group"
            title={`Compass (${mapBearing}°). Click to reset North.`}
            aria-label="Reset Compass to North"
          >
            <div
              className="w-4 h-4 flex items-center justify-center text-teal-600 dark:text-teal-400 transition-transform duration-150"
              style={{ transform: `rotate(${-mapBearing}deg)` }}
            >
              <Compass className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[8px] font-bold text-stone-500 dark:text-stone-400 leading-none mt-0.5">
              {mapBearing === 0 ? 'N' : `${mapBearing}°`}
            </span>
          </button>

          {/* Interactive 3D Tilt Controls: 3D/2D Mode Toggle + Tilt Up/Down */}
          <div className="bg-white/95 dark:bg-[#131F2A]/95 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 overflow-hidden flex flex-col">
            <button
              onClick={handleToggle3DTilt}
              className={`py-1.5 px-2 transition cursor-pointer border-b border-stone-200 dark:border-stone-700 flex flex-col items-center justify-center ${
                mapPitch >= 10
                  ? 'bg-[#006D77] text-white'
                  : 'text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title={mapPitch >= 10 ? 'Return to flat 2D view' : 'Switch to angled 3D perspective'}
              aria-label="Toggle 3D Tilt View"
            >
              <Box className="w-3.5 h-3.5" />
              <span className="text-[8.5px] font-extrabold leading-none mt-0.5">
                {mapPitch >= 10 ? '2D' : '3D'}
              </span>
            </button>
            <button
              onClick={handleTiltUp}
              disabled={mapPitch >= MAX_3D_PITCH}
              className="py-1 px-2 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-35 disabled:cursor-not-allowed transition cursor-pointer border-b border-stone-200 dark:border-stone-700 flex items-center justify-center"
              title="Tilt Up (Increase 3D perspective angle)"
              aria-label="Tilt Up"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleTiltDown}
              disabled={mapPitch <= 0}
              className="py-1 px-2 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-35 disabled:cursor-not-allowed transition cursor-pointer flex items-center justify-center"
              title="Tilt Down (Flatten toward 2D view)"
              aria-label="Tilt Down"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Map Rotation Buttons */}
          <div className="bg-white/95 dark:bg-[#131F2A]/95 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 overflow-hidden flex flex-col">
            <button
              onClick={handleRotateLeft}
              className="p-1.5 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer border-b border-stone-200 dark:border-stone-700 flex items-center justify-center"
              title="Rotate Map Counter-Clockwise (-45°)"
              aria-label="Rotate Left"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleRotateRight}
              className="p-1.5 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer flex items-center justify-center"
              title="Rotate Map Clockwise (+45°)"
              aria-label="Rotate Right"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* User Geolocation GPS Button */}
          <button
            onClick={handleLocateUser}
            disabled={isLocating}
            className={`p-2 bg-white/95 dark:bg-[#131F2A]/95 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 transition cursor-pointer flex items-center justify-center ${
              isLocating ? 'animate-spin text-teal-600' : ''
            }`}
            title="Locate My Current GPS Position"
            aria-label="Locate Me"
          >
            <Crosshair className="w-3.5 h-3.5" />
          </button>

          {/* Reset Map Button (Overview + True North + Flat 2D) */}
          <button
            onClick={handleResetMap}
            className="py-1.5 px-2 bg-white/95 dark:bg-[#131F2A]/95 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 transition cursor-pointer flex items-center justify-center"
            title="Reset Map Position, Orientation & 2D View"
            aria-label="Reset Map"
          >
            <span className="text-[9.5px] font-extrabold text-[#006D77] dark:text-[#83C5BE]">RESET</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-white/95 dark:bg-[#131F2A]/95 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 transition cursor-pointer flex items-center justify-center"
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen Map'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* FLOATING TOP-LEFT REGISTRY OVERVIEW BADGE */}
        <div className="absolute top-4 left-4 z-20 max-w-xs sm:max-w-md hidden md:block">
          <div className="bg-white/90 dark:bg-[#131F2A]/90 backdrop-blur-md p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-md space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between pb-1 border-b border-stone-100 dark:border-stone-800">
              <span className="font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider text-[10px]">
                Sipalay Coast & Regional Registry
              </span>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">
                {filteredLocations.length} Locations Active
              </span>
            </div>
            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto no-scrollbar">
              <button
                onClick={() => flyToLocation(ALL_LOCATIONS[0], 16)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer flex items-center gap-1 ${
                  selectedLocationId === 'alon-aninag'
                    ? 'bg-[#006D77] text-white shadow-xs'
                    : 'bg-teal-50 dark:bg-teal-950/60 text-[#006D77] dark:text-[#83C5BE] hover:bg-teal-100'
                }`}
              >
                <span>✦</span>
                <span>Alon & Aninag (Our Resort)</span>
              </button>
              {ALL_LOCATIONS.filter(l => l.categoryGroup === 'Competitors').map(comp => (
                <button
                  key={comp.id}
                  onClick={() => flyToLocation(comp, 15)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition cursor-pointer flex items-center gap-1 ${
                    selectedLocationId === comp.id
                      ? 'bg-[#FF2A85] text-white shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: comp.color }} />
                  <span>{comp.shortName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. MINIMIZED FLOATING BUTTON (Requirements 3 & 4) */}
        <div
          className={`absolute bottom-4 left-4 z-20 transition-all duration-500 ease-in-out ${
            !isCardVisible
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <button
            onClick={() => {
              if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
              setIsCardVisible(true);
            }}
            className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[#13222F]/95 dark:bg-[#0B141C]/95 backdrop-blur-md text-white shadow-2xl border border-stone-600/70 hover:border-teal-400 hover:bg-[#1A2D3E] transition-all flex items-center gap-3 text-xs font-semibold cursor-pointer group"
            title="Click to reopen destination information card"
          >
            <img
              src={selectedLocation.image}
              alt={selectedLocation.name}
              className="w-8 h-8 rounded-lg object-cover border border-white/20 shrink-0"
            />
            <div className="flex flex-col text-left">
              <span className="font-bold text-white group-hover:text-teal-300 transition-colors">
                {selectedLocation.name}
              </span>
              <span className="text-[10px] text-stone-300 font-light truncate max-w-[180px] sm:max-w-xs">
                {selectedLocation.distanceKm === 0
                  ? 'Poblacion Beach • Resort Frontage'
                  : `${selectedLocation.distanceKm} km from Alon & Aninag • ${selectedLocation.categoryGroup}`}
              </span>
            </div>
            <span className="ml-1 text-[10px] uppercase tracking-wider font-bold bg-teal-500/20 text-[#83C5BE] px-2.5 py-1 rounded-lg border border-teal-500/30 whitespace-nowrap">
              Show Details ↑
            </span>
          </button>
        </div>

        {/* 5. FLOATING INFORMATION CARD WITH THUMBNAILS (Requirements 3 & 4) */}
        <div
          className={`absolute bottom-4 left-4 right-4 z-20 pointer-events-none transition-all duration-500 ease-in-out ${
            isCardVisible
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
        >
          <div
            onMouseEnter={() => {
              if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
            }}
            className="bg-[#13222F]/95 dark:bg-[#0B141C]/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-stone-700/80 text-white shadow-2xl max-h-[65vh] sm:max-h-none overflow-y-auto pointer-events-auto"
          >
            {/* Top row with Title, Badges, and Minimize Button */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-3">
                <img
                  src={selectedLocation.image}
                  alt={selectedLocation.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border-2 border-white/20 shrink-0 shadow-md"
                />
                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`text-[9.5px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        selectedLocation.id === 'alon-aninag'
                          ? 'bg-teal-500/20 text-[#83C5BE] border border-teal-500/30'
                          : selectedLocation.categoryGroup === 'Competitors'
                          ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                          : selectedLocation.categoryGroup === 'Beaches'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : selectedLocation.categoryGroup === 'Restaurants'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {selectedLocation.categoryGroup} • {selectedLocation.badge || selectedLocation.categoryLabel}
                    </span>
                    {selectedLocation.distanceKm > 0 && (
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                        ⏱ {selectedLocation.distanceKm} km from Alon & Aninag ({selectedLocation.travelTime})
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                    {selectedLocation.name}
                  </h3>
                </div>
              </div>

              {/* Minimize / Close Button (Requirement 4) */}
              <button
                onClick={() => {
                  if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
                  setIsCardVisible(false);
                }}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition cursor-pointer shrink-0"
                title="Minimize details to explore entire map"
                aria-label="Minimize details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body & Highlights */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
              <div className="space-y-1.5">
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-3xl">
                  {selectedLocation.description}
                </p>

                {/* Highlights Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedLocation.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-white/10 text-stone-200 px-2 py-0.5 rounded-full border border-white/10"
                    >
                      {h}
                    </span>
                  ))}
                  {selectedLocation.priceRange && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
                      🏷 {selectedLocation.priceRange}
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-stone-400 pt-0.5">
                  <span>📍 {selectedLocation.address} ({selectedLocation.municipality})</span>
                </div>
              </div>

              {/* Action Buttons: Directions, Copy, Book Stay */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {/* Copy Address */}
                <button
                  onClick={() => handleCopyAddress(selectedLocation)}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 border border-white/15"
                  title="Copy Location Address"
                >
                  {copiedId === selectedLocation.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedId === selectedLocation.id ? 'Copied' : 'Copy Address'}</span>
                </button>

                {/* Direct Google Maps Directions Navigation Link (Requirement 7) */}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.lat},${selectedLocation.lng}&destination_place_id=${encodeURIComponent(
                    selectedLocation.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#006D77] hover:bg-[#00555d] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3 opacity-75" />
                </a>

                {/* If competitor or distant spot is selected, quick return to Alon & Aninag */}
                {selectedLocation.id !== 'alon-aninag' && (
                  <button
                    onClick={() => flyToLocation(ALL_LOCATIONS[0], 16)}
                    className="px-3.5 py-2 rounded-xl bg-teal-800/80 hover:bg-teal-700 text-teal-100 text-xs font-semibold transition cursor-pointer flex items-center gap-1 border border-teal-600/40"
                  >
                    <span>Back to Our Resort</span>
                  </button>
                )}

                {/* If Alon & Aninag is selected, quick Book Stay button */}
                {selectedLocation.id === 'alon-aninag' && (
                  <button
                    onClick={() => navigateTo('booking')}
                    className="px-3.5 py-2 rounded-xl bg-[#E29578] hover:bg-[#d68568] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-md"
                  >
                    <span>Book Your Stay</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Always-Visible Viewport Attribution Strip */}
        <div className="absolute bottom-1.5 right-2 z-15 pointer-events-auto bg-white/80 dark:bg-[#0B131A]/80 backdrop-blur-xs text-[10px] text-stone-600 dark:text-stone-300 px-2 py-0.5 rounded-md border border-stone-200/60 dark:border-stone-700/60">
          {activeTileStyle === 'standard' && (
            <span>
              Sipalay Coastal Map • &copy;{' '}
              <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline">
                OpenStreetMap
              </a>
            </span>
          )}
          {activeTileStyle === 'satellite' && (
            <span>Sipalay Satellite • Tiles &copy; Esri &amp; GIS User Community</span>
          )}
          {activeTileStyle === 'terrain' && (
            <span>
              Sipalay Terrain • &copy;{' '}
              <a href="https://opentopomap.org" target="_blank" rel="noopener noreferrer" className="underline">
                OpenTopoMap
              </a>
            </span>
          )}
        </div>
      </div>

      {/* 6. QUICK HORIZONTAL DESTINATION CHIPS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider shrink-0 mr-1">
          Explore:
        </span>
        {filteredLocations.map(loc => (
          <button
            key={loc.id}
            onClick={() => flyToLocation(loc, 15)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 border ${
              selectedLocationId === loc.id
                ? 'bg-[#006D77] text-white border-[#006D77] shadow-xs'
                : 'bg-white dark:bg-[#131F2A] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-50'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: loc.color }}
            />
            <span>{loc.shortName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
