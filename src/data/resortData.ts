import { Room, BookingAddon, Attraction, MenuItem, Activity, UserReview, SocialPost, LoyaltyTier, CompetitorResort } from '../types';

import heroImg from '../assets/images/alon_resort_hero_1788181474178.jpg';
import suiteImg from '../assets/images/alon_room_suite_1788181490218.jpg';
import sunsetDeckImg from '../assets/images/alon_sunset_deck_1788181502814.jpg';
import diningImg from '../assets/images/alon_dining_food_1788181542228.jpg';
import bonfireImg from '../assets/images/alon_bonfire_night_1788181556425.jpg';
import dayglowImg from '../assets/images/dayglow_paddle_tray_1789410722115.jpg';
import floatingTrayImg from '../assets/images/floating_snack_tray_1789410736354.jpg';
import sunsetPaddleKayakImg from '../assets/images/sunset_paddle_kayak_1789415143089.jpg';

export const RESORT_IMAGES = {
  hero: heroImg,
  suite: suiteImg,
  sunsetDeck: sunsetDeckImg,
  dining: diningImg,
  bonfire: bonfireImg,
  dayglow: dayglowImg,
  floatingTray: floatingTrayImg,
  sunsetPaddleKayak: sunsetPaddleKayakImg,
  beachDay: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  islets: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
  diving: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
  kayaking: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
  cottage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
  polaroid: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
};

export const RESORT_INFO = {
  name: 'Alon Aninag Boutique Beach Resort',
  shortName: 'Alon & Aninag',
  tagline: 'Where Waves Rest and Souls Glow',
  alternativeTagline: 'Rest. Glow. Repeat.',
  concept: 'Boutique beachfront retreat in Poblacion Beach, Sipalay City • Affordable, aesthetic, soulful • 24 accommodations across 5 boutique categories • Perfect for young travelers, couples, and small families',
  location: {
    address: 'Poblacion Beach (near Jazz Inn / Sunset Baywalk), Sipalay City, Negros Occidental 6111, Philippines',
    coordinates: { lat: 9.7528, lng: 122.3989 },
    nearestAirports: ['Bacolod-Silay Airport (BCD - 3.5 hrs)', 'Dumaguete-Sibulan Airport (DGT - 3.5 hrs)'],
    travelNote: 'Direct scenic coastal road via South National Highway with air-conditioned resort shuttles & Ceres bus lines available.'
  },
  contact: {
    phone: '+63 917 582 2566 (0917-582-ALON)',
    telephone: '(034) 473-2026',
    email: 'stay@alonaninag-resort.ph',
    inquiriesEmail: 'concierge@alonaninag-resort.ph',
    social: {
      instagram: '@alon.aninag.sipalay',
      facebook: 'fb.com/AlonAninagResort',
      tiktok: '@alonaninag'
    }
  },
  stats: {
    totalRooms: 24,
    totalUnits: 24,
    beachfrontDistance: '0 meters (Direct Sand Walkout)',
    satisfactionRate: '99.4%',
    verifiedReviews: 348
  }
};

export const DAYGLOW_EXPERIENCE_DATA = {
  id: 'aninag-dayglow-paddle',
  title: 'The Aninag Dayglow & Paddle Experience',
  tagline: 'Paddle. Relax. Capture the Glow.',
  subtitle: 'Signature Daytime Beach & Wellness Experience at Alon & Aninag',
  brandTagline: 'Where Waves Rest and Souls Glow',
  targetMarket: {
    primary: 'Aesthetic Seekers – Young Couples & Barkada (Ages 20–35)',
    description: 'Overnight guests, young couples, barkadas, day-trippers, and staycationers from Bacolod, Negros Occidental, and nearby regions seeking calm, photogenic coastal relaxation.'
  },
  pricing: {
    overnight: {
      pricePHP: 850,
      badge: 'Exclusive Add-on for Staying Guests',
      label: '₱850 / pair',
      period: 'per pair (2 guests)',
      savings: 'Save ₱350 vs. Day Pass',
      idealFor: 'Overnight resort guests'
    },
    dayPass: {
      pricePHP: 1200,
      badge: 'For Non-Staying Day Visitors',
      label: '₱1,200 / pair',
      period: 'per pair (2 guests)',
      savings: 'Full Beachfront Access Included',
      idealFor: 'Day-trippers & staycationers'
    }
  },
  duration: '2 Hours Reserved Experience',
  inclusions: [
    '2-Hour Access to Photogenic Clear Kayaks & Stand-Up Paddleboards (SUP)',
    'Aesthetic Floating Negrense Snack & Cold-Brew Herbal Tea Tray',
    'Reserved Beachfront Shaded Daybed with Handwoven Tropical Canopies',
    'Dedicated Friendly Local Host Assistance & Basic Paddling Coaching',
    'Dedicated Host Photo & Short-Form Reel Assistance',
    'Fresh Warm Towel Rinse-off Service Post-Paddle',
    'Phone-Friendly Branded Water-Resistant Dry Bags',
    'Personalized Digital Photo Souvenir Card'
  ],
  timeSlots: [
    { id: 'morning', label: '8:00 AM – 10:00 AM', name: 'Morning Calm Waters', vibe: 'Silky glass water & gentle morning sea breeze', icon: 'Sun' },
    { id: 'midday', label: '10:30 AM – 12:30 PM', name: 'Midday Tropical Radiance', vibe: 'Brilliant turquoise illumination for vibrant transparent shots', icon: 'Sparkles' },
    { id: 'afternoon', label: '1:30 PM – 3:30 PM', name: 'Warm Afternoon Breeze', vibe: 'Lazy beach lounging with chilled herbal tea', icon: 'Wind' },
    { id: 'pre-sunset', label: '3:30 PM – 5:30 PM', name: 'Pre-Sunset Golden Glow', vibe: 'Transition smoothly into Aninag Hour & sunset bonfire', icon: 'Sunset' }
  ],
  features: [
    {
      id: 'clear-kayak',
      title: 'Photogenic Clear Kayak & SUP Setup',
      subtitle: 'Crystal-Clear Transparency on Sipalay Waters',
      description: 'Capture stunning, crystal-clear water moments directly in front of the resort. Our transparent kayaks and premium paddleboards offer high visual appeal for social media storytelling.',
      badge: 'Instagram & TikTok Sensation',
      image: RESORT_IMAGES.dayglow
    },
    {
      id: 'floating-tray',
      title: 'Floating Negrense Snack & Tea Tray',
      subtitle: 'Local Flavors Served on Calm Waters or Daybed',
      description: 'Delivers authentic Negrense flavors in a unique, luxurious floating woven bamboo presentation. Enjoy artisanal cold-brew lemongrass-pandan or hibiscus-calamansi teas paired with fresh mangoes and native delicacies.',
      badge: 'Local Negrense Artisanship',
      image: RESORT_IMAGES.floatingTray
    },
    {
      id: 'beachfront-daybed',
      title: 'Reserved Beachfront Daybed Lounge',
      subtitle: 'Peaceful Shaded Haven with Dedicated Host Service',
      description: 'Guarantees comfortable, shaded relaxation under woven native canopies with personal host care. Scheduled time slots prevent overcrowding, ensuring an intimate, serene island atmosphere.',
      badge: 'Zero Overcrowding Guarantee',
      image: RESORT_IMAGES.sunsetDeck
    }
  ],
  processSteps: [
    {
      step: 1,
      title: 'Choose Your Time Slot',
      desc: 'Book online or at the front desk with pre-scheduled slots to guarantee exclusive uncrowded water access.'
    },
    {
      step: 2,
      title: 'Safety Briefing & Gear Assignment',
      desc: 'Our certified beach hosts fit USCG-approved life jackets, provide waterproof phone dry bags, and share paddling coaching.'
    },
    {
      step: 3,
      title: 'Paddle & Explore',
      desc: 'Glide across the calm, shallow Poblacion Bay waters in 100% transparent kayaks with coral-safe paddles.'
    },
    {
      step: 4,
      title: 'Enjoy Floating Refreshments',
      desc: 'Savor your woven bamboo floating tray of chilled Negrense cold-brew tea and tropical snack platters on the water or daybed.'
    },
    {
      step: 5,
      title: 'Relax, Take Photos & Rinse Off',
      desc: 'Our host captures stunning high-res photos for your social feed, followed by fresh towel rinse-off and digital souvenir.'
    }
  ],
  coastalJourney: [
    { phase: '01. Daytime Glow', title: 'Dayglow & Paddle', time: '8:00 AM – 3:30 PM', desc: 'Clear kayak gliding, floating snacks & sunbathing' },
    { phase: '02. Golden Transition', title: 'Relax & Refresh', time: '3:30 PM – 5:00 PM', desc: 'Shaded daybed resting, fresh towel rinse & cold juices' },
    { phase: '03. Aninag Magic', title: 'Aninag Hour Sunset', time: '5:00 PM – 6:30 PM', desc: 'Soulful sunset deck cocktails & panoramic golden skies' },
    { phase: '04. Night Twilight', title: 'Driftwood Bonfire', time: '6:30 PM – 9:30 PM', desc: 'Acoustic jams, marshmallow toasting & starlit soul rest' }
  ],
  differentiation: [
    { title: 'Warm Local Hospitality', desc: 'Attentive, friendly Negrense beach hosts who personalize your paddle and take professional-grade couple/barkada photos.' },
    { title: 'Quiet & Uncrowded Beachfront', desc: 'With only 20 resort rooms and strict booking slots, our shoreline never suffers from the commercial chaos of larger tourist beaches.' },
    { title: 'Affordable Native Aesthetic', desc: 'Minimalist bamboo, woven rattan, and clean oceanfront lines that look effortlessly premium without luxury price inflation.' },
    { title: 'Complete Day-to-Sunset Flow', desc: 'Seamlessly transition from morning paddle to afternoon tea, sunset watching at Aninag Deck, and cozy evening bonfire circles.' }
  ],
  safetyCommitment: [
    { title: 'Daily Gear Maintenance Checklists', desc: 'Every clear kayak, paddleboard, and life vest undergoes daily saltwater rinse, UV inspection, and structural integrity checks.' },
    { title: 'Real-Time Tide & Weather Monitoring', desc: 'Tides and sea conditions are reviewed before every session to guarantee gentle, calm, and safe waters.' },
    { title: 'Safety-Certified Local Hosts', desc: 'Trained in first-aid, water safety, and paddling instruction to accompany guests with complete peace of mind.' },
    { title: 'Strict Slot Capacity Control', desc: 'Capped guest pairs per slot ensure safe distances and unobstructed photo angles on the water.' }
  ],
  socialPromotion: {
    hashtag: '#DayglowAtAlon',
    communityTag: '#GlowAtAlon',
    tiktokHook: 'POV: Floating in a transparent kayak in Sipalay with Negrense cold-brew tea 🌴✨',
    instagramHook: 'The daytime glow up you did not know Sipalay had. Tag your paddle partner! 🌊'
  },
  academicProjectInfo: {
    title: 'Strategic Planning for New Product Development',
    course: 'Strategic Management',
    program: 'Bachelor of Science in Hospitality Management (BSHM - 4B)',
    activityType: 'Group Application Activity',
    group: 'Group 1',
    members: [
      { name: 'Elmer Alam-Alam', role: 'Strategic Formulation & Concept Development' },
      { name: 'Jeric Abestano', role: 'Operations & Process Architecture' },
      { name: 'Genevive Casipong', role: 'Market Research & Customer Segmentation' },
      { name: 'Cris Remitar', role: 'Financial Analysis & Pricing Strategy' },
      { name: 'Judy Ann Tromata', role: 'Marketing Mix & Promotional Campaign' }
    ],
    strategicRationale: 'Monetizes daytime beachfront hours for a 20-room boutique resort without capital-intensive room expansion, fulfilling young travelers’ demand for photogenic, slow-travel coastal experiences.',
    managementDecision: 'GO — Proceed with Full Rollout'
  }
};

export const ROOMS_DATA: Room[] = [
  {
    id: 'room-aninag-villa',
    name: 'Aninag Sunset Master Villa',
    category: 'Villa',
    displayCategory: 'Sunset Master Villa',
    tagline: 'Panoramic sea-facing sunset haven with private oceanfront balcony & hammock',
    pricePHP: 3200,
    capacity: { adults: 2, children: 1, maxTotal: 3 },
    bedType: '1 King Plush Pillow-Top Bed',
    sizeSqM: 42,
    view: 'Beachfront Ocean View',
    description: 'Our crown jewel at Alon Aninag. Perched right on the golden sands of Poblacion Beach with wide sliding glass doors, handcrafted teak headboards, woven rattan accents, and a private wooden balcony tailored for golden hour soul-watching.',
    features: [
      'Private sunset viewing balcony with woven hammock',
      'En-suite stone bathroom with hot & cold rain shower',
      'Ultra-quiet split inverter air conditioning',
      'Complimentary high-speed Starlink Wi-Fi (150+ Mbps)',
      'Locally sourced artisan bath essentials & Negrense bathrobes',
      'Mini-refrigerator, French press coffee station & electric kettle'
    ],
    amenities: ['Oceanfront Balcony', 'High-Speed Wi-Fi', 'Rain Shower', 'Daily Housekeeping', 'Breakfast for 2', 'Welcome Fresh Buko Drink', 'Smart TV with Netflix'],
    images: [suiteImg, heroImg, sunsetDeckImg],
    availableUnits: 3,
    totalUnits: 5,
    rating: 4.98,
    reviewCount: 114,
    featured: true
  },
  {
    id: 'room-alon-oceanfront',
    name: 'Alon Oceanfront Cozy Suite',
    category: 'Suite',
    displayCategory: 'Oceanfront Suite',
    tagline: 'Step directly from your wooden veranda onto the soft warm sand of Poblacion Beach',
    pricePHP: 2600,
    capacity: { adults: 2, children: 2, maxTotal: 4 },
    bedType: '1 Queen Bed + 1 Daybed Lounger',
    sizeSqM: 34,
    view: 'Direct Beach Walkout',
    description: 'Designed for couples and soul-searchers who love waking up to the gentle murmur of ocean waves. Features crisp organic linen, warm ambient mood lighting, a dedicated writing/work nook, and direct beach step-out access.',
    features: [
      'Direct ground-level step-out to Poblacion shoreline',
      'Custom wooden daybed converting to extra single sleeper',
      'Warm golden lighting & signature lemongrass-pandan aroma',
      'Work-friendly desk with fast Wi-Fi and universal charging',
      'Organic coconut toiletries in refillable ceramic pump bottles'
    ],
    amenities: ['Beach Walkout', 'Fast Wi-Fi', 'Hot Rain Shower', 'Complimentary Breakfast', 'Mini Fridge', 'Work Nook', 'Beach Towels & Tote Bag'],
    images: [heroImg, suiteImg, diningImg],
    availableUnits: 2,
    totalUnits: 4,
    rating: 4.95,
    reviewCount: 92,
    featured: true
  },
  {
    id: 'room-soul-deluxe',
    name: 'Soul Deluxe Queen',
    category: 'Deluxe',
    displayCategory: 'Soul Deluxe Room',
    tagline: 'Minimalist wood & white haven delivering maximum comfort at an accessible rate',
    pricePHP: 1800,
    capacity: { adults: 2, children: 0, maxTotal: 2 },
    bedType: '1 Queen Bed',
    sizeSqM: 26,
    view: 'Sunset Sea View',
    description: 'Our most sought-after budget-friendly boutique room. Built with clean lines, light oak furnishings, warm recessed lighting, and silent air conditioning. The perfect sanctuary after a full day of island hopping in Sipalay.',
    features: [
      'Clean minimalist Japanese-Scandinavian aesthetic',
      'Orthopedic queen mattress with 300-thread count cotton sheets',
      'Hot & cold water shower with good water pressure',
      'Soundproofed walls ensuring peaceful slumber',
      'Complimentary morning native hot chocolate or barako coffee'
    ],
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'Hot Shower', 'Morning Coffee/Tablea', 'Eco-friendly Toiletries', 'Luggage Bench'],
    images: [suiteImg, heroImg, diningImg],
    availableUnits: 4,
    totalUnits: 6,
    rating: 4.90,
    reviewCount: 64,
    featured: false
  },
  {
    id: 'room-standard',
    name: 'Alon Aninag Standard Room',
    category: 'Standard',
    displayCategory: 'Standard Room',
    tagline: 'Serene tropical haven crafted with warm native timber, silent split air conditioning & rain shower',
    pricePHP: 1600,
    capacity: { adults: 2, children: 1, maxTotal: 3 },
    bedType: '1 Queen Plush Bed',
    sizeSqM: 28,
    view: 'Tropical Garden & Sea',
    description: 'An inviting, peaceful retreat designed for slow travelers and couples seeking unpretentious coastal comfort. Just steps from Poblacion Beach, featuring locally crafted hardwood furnishings, organic cotton linens, quiet cooling, and a dedicated vanity work desk.',
    features: [
      'Split inverter silent air conditioning',
      'Private stone bathroom with hot & cold rain shower',
      'Complimentary high-speed Starlink Wi-Fi (150+ Mbps)',
      'Handcrafted local teak bed and work vanity desk',
      'Locally sourced virgin coconut bath amenities & fresh towels',
      'Electric kettle with artisan native coffee & tea'
    ],
    amenities: ['Air Conditioning', 'Starlink Wi-Fi', 'Hot Rain Shower', 'Daily Housekeeping', 'Complimentary Breakfast', 'Eco Toiletries', 'Work Nook'],
    images: [suiteImg, diningImg, heroImg],
    availableUnits: 3,
    totalUnits: 5,
    rating: 4.89,
    reviewCount: 56,
    featured: false
  },
  {
    id: 'room-barkada-loft',
    name: 'Barkada Glow Loft',
    category: 'Loft',
    displayCategory: 'Barkada Loft',
    tagline: 'Aesthetic multi-level bunk & loft suite created for youth barkadas and fun group trips',
    pricePHP: 3500,
    capacity: { adults: 4, children: 1, maxTotal: 5 },
    bedType: '2 Queen Beds + 1 Upper Loft Bunk',
    sizeSqM: 48,
    view: 'Tropical Garden & Sea',
    description: 'The ultimate barkada haven in Sipalay. High ceilings, industrial-boho rattan lamps, board games shelf, multiple charging ports for cameras and phones, and ample space for group storytelling and guitar jamming after sunset.',
    features: [
      'Split-level design with loft mezzanine and lounge corner',
      'Acoustic guitar and vintage card & board games collection',
      '5 separate plush beds with personal reading lamps & USB-C ports',
      'Double vanity bathroom sink for seamless group prep',
      'Large gear rack for dive bags, snorkel masks, and slippers'
    ],
    amenities: ['Sleeps up to 5', 'Double Vanity', 'High-Speed Wi-Fi', 'Board Games & Cards', 'Breakfast for 4 Included', 'Bluetooth Sound Speaker', 'Filtered Drinking Water'],
    images: [bonfireImg, suiteImg, sunsetDeckImg],
    availableUnits: 2,
    totalUnits: 4,
    rating: 4.92,
    reviewCount: 78,
    featured: true
  }
];

export const BOOKING_ADDONS: BookingAddon[] = [
  {
    id: 'addon-dayglow-paddle',
    name: 'The Aninag Dayglow & Paddle Experience (For 2 Guests / Pair)',
    description: '2-hour clear kayak/SUP rental, aesthetic floating Negrense cold-brew tea & snack tray, reserved beachfront shaded daybed, and dedicated host photo assistance.',
    pricePHP: 850,
    category: 'activity'
  },
  {
    id: 'addon-shuttle-bacolod',
    name: 'Private Roundtrip Shuttle (Bacolod or Dumaguete to Sipalay)',
    description: 'Comfortable air-conditioned private van pick-up and drop-off directly to our resort lobby.',
    pricePHP: 3800,
    category: 'transfer'
  },
  {
    id: 'addon-bonfire-dinner',
    name: 'Soul Sunset Bonfire & Romantic Seafood Platter Setup',
    description: 'Private candlelit beach table with bonfire, Negrense grilled seafood feast, and a bottle of wine.',
    pricePHP: 1650,
    category: 'dining'
  },
  {
    id: 'addon-island-hopping-pass',
    name: 'Sipalay 4-Islet Boat Tour & Snorkeling Gear for 2',
    description: 'Private boat tour visiting Tinagong Dagat, Sugar Beach, Campomanes Bay, and Snorkel Sanctuary.',
    pricePHP: 1800,
    category: 'activity'
  },
  {
    id: 'addon-massage-wellness',
    name: 'In-Room Hilot Healing Massage (60 mins)',
    description: 'Traditional Negrense virgin coconut oil massage performed by our certified local wellness therapist.',
    pricePHP: 650,
    category: 'wellness'
  },
  {
    id: 'addon-diving-intro',
    name: 'Discover Scuba Diving Pass with Master Instructor',
    description: 'Complete introductory dive including gear, orientation, boat transfer, and underwater photos.',
    pricePHP: 2800,
    category: 'activity'
  }
];

export const ATTRACTONS_DATA: Attraction[] = [
  {
    id: 'attr-tinagong-dagat',
    name: 'Tinagong Dagat (Hidden Sea)',
    category: 'Island Hopping',
    distanceKm: 8.5,
    travelTime: '18 mins by Tricycle / 25 mins by Bangka',
    description: 'A labyrinth of dozen limestone islets linked by charming hanging bridges. Emerald saltwater lagoons ideal for leisurely kayaking, bamboo raft floating, and capturing iconic bridge photos.',
    highlights: ['Hanging footbridges', 'Kayaking in quiet lagoons', 'Limestone cliffs', 'Lush marine flora'],
    lat: 9.7125,
    lng: 122.3912,
    image: RESORT_IMAGES.islets,
    bestTimeToVisit: '8:00 AM – 11:00 AM (Calm water)',
    activityType: 'Sightseeing & Photography',
    rating: 4.9
  },
  {
    id: 'attr-sugar-beach',
    name: 'Sugar Beach (Langub Beach)',
    category: 'Beach',
    distanceKm: 5.2,
    travelTime: '12 mins by Bangka from Poblacion',
    description: 'A 2-kilometer strip of soft golden-brown sand framed by coconut palms and gentle rolling waves. Perfect for barefoot walks, volleyball, paddleboarding, and relaxed beachside cafés.',
    highlights: ['Fine golden sand', 'Safe gentle swimming', 'Beach volleyball', 'Rustic beach bars'],
    lat: 9.7741,
    lng: 122.4089,
    image: RESORT_IMAGES.beachDay,
    bestTimeToVisit: '2:00 PM – 6:00 PM (Sunset walk)',
    activityType: 'Swimming & Sunbathing',
    rating: 4.8
  },
  {
    id: 'attr-perth-paradise',
    name: 'Perth Paradise Resort Viewpoint',
    category: 'Viewpoint',
    distanceKm: 7.8,
    travelTime: '15 mins by Tricycle / Motorbike',
    description: 'Famous hilltop infinity pool overlooking the world-renowned panoramic vista of Sipalay’s scattered green islets and sparkling blue sea, often compared to Palawan and Halong Bay.',
    highlights: ['Iconic 360-degree panorama', 'Infinity pool photo spot', 'Drone photography paradise'],
    lat: 9.7214,
    lng: 122.3895,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    bestTimeToVisit: 'Early morning or 4:00 PM',
    activityType: 'Viewpoint & Photography',
    rating: 4.9
  },
  {
    id: 'attr-campomanes-bay',
    name: 'Campomanes Bay & Diving Sanctuary',
    category: 'Diving',
    distanceKm: 12.0,
    travelTime: '22 mins by Boat from Poblacion',
    description: 'The premier scuba diving and snorkeling hub of Southern Negros. Pristine coral gardens, historical cargo shipwrecks, drop-off walls, and frequent sightings of sea turtles and spotted eagle rays.',
    highlights: ['Vibrant coral gardens', 'WWII shipwreck dive', 'Clear 25m visibility', 'Sea turtle sightings'],
    lat: 9.6948,
    lng: 122.3762,
    image: RESORT_IMAGES.diving,
    bestTimeToVisit: '7:00 AM – 1:00 PM (High visibility)',
    activityType: 'Scuba Diving & Snorkeling',
    rating: 5.0
  },
  {
    id: 'attr-punta-ballo',
    name: 'Punta Ballo White Beach & Reef',
    category: 'Beach',
    distanceKm: 14.5,
    travelTime: '25 mins by Tricycle / Van',
    description: 'A 1-kilometer pristine white sand beach surrounded by rich coral drop-offs starting just 50 meters from the shoreline. Excellent for shore snorkeling and tranquil beach relaxation.',
    highlights: ['White sand stretch', 'Immediate coral reef drop-off', 'Secluded & peaceful', 'Family friendly'],
    lat: 9.6821,
    lng: 122.3820,
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    bestTimeToVisit: 'All day',
    activityType: 'Beach & Marine Conservation',
    rating: 4.85
  },
  {
    id: 'attr-poblacion-sunset',
    name: 'Poblacion Beach Sunset Promenade (Alon Aninag Frontage)',
    category: 'Culture & Food',
    distanceKm: 0.1,
    travelTime: '0 mins (Right at our resort doorstep)',
    description: 'Our home beach. Golden hour magic where the sky blazes in amber and violet. Lined with local seafood stalls, friendly local fishermen, and our own sunset deck acoustic sessions.',
    highlights: ['Unobstructed sunset horizon', 'Live acoustic soul nights', 'Local Negrense street food', 'Safe shallow water'],
    lat: 9.7528,
    lng: 122.3989,
    image: RESORT_IMAGES.sunsetDeck,
    bestTimeToVisit: '5:00 PM – 7:30 PM (Golden Hour)',
    activityType: 'Sunset & Dining',
    rating: 4.98
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // ==========================================
  // BREAKFAST — Silog & Filipino Breakfast (₱100 - ₱200)
  // ==========================================
  {
    id: 'menu-bf-tapsilog',
    name: 'Tapsilog',
    localName: 'Garlic Marinated Beef Tapa with Sinangag & Egg',
    category: 'Breakfast',
    pricePHP: 180,
    description: 'Tender marinated beef tapa seared with roasted garlic, served with two farm-fresh sunny eggs, fragrant heirloom garlic mountain rice, and pickled papaya atchara.',
    tags: ['Negrense Classic', 'Chef Signature'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-bf-longsilog',
    name: 'Longsilog',
    localName: 'Native Negrense Longganisa Silog',
    category: 'Breakfast',
    pricePHP: 160,
    description: 'Sweet and savory native Negrense garlic longganisa sausages, served with golden garlic fried rice, two sunny-side eggs, and spiced local sinamak vinegar.',
    tags: ['Negrense Classic'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-bf-tocilog',
    name: 'Tocilog',
    localName: 'Sweet Cured Pork Tocino Silog',
    category: 'Breakfast',
    pricePHP: 170,
    description: 'Caramelized sweet-cured pork tenderloin grilled tender, served with steaming garlic mountain rice, two sunny eggs, and fresh native sliced tomatoes.',
    tags: ['Filipino Classic'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-bf-bangsilog',
    name: 'Bangsilog',
    localName: 'Marinated Boneless Bangus Silog',
    category: 'Breakfast',
    pricePHP: 190,
    description: 'Crispy fried marinated milkfish belly seasoned with cracked pepper and garlic, served with fragrant sinangag rice, sunny eggs, and calamansi-chili dip.',
    tags: ['Local Catch', 'Chef Signature'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-bf-chicksilog',
    name: 'Chicksilog',
    localName: 'Golden Crispy Chicken Fillet Silog',
    category: 'Breakfast',
    pricePHP: 165,
    description: 'Golden seasoned chicken thigh fillet fried to a light crisp, served with savory country chicken gravy, garlic fried rice, and sunny farm eggs.',
    tags: ['Resort Favorite'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-bf-hotsilog',
    name: 'Hotsilog',
    localName: 'Classic Filipino Tender Juicy Hotdog Silog',
    category: 'Breakfast',
    pricePHP: 120,
    description: 'Two jumbo Filipino red hotdogs crosswise-seared on the grill, accompanied by garlic fried rice, two sunny-side eggs, and sweet banana ketchup.',
    tags: ['Comfort Food'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-bf-cornsilog',
    name: 'Cornsilog',
    localName: 'Gisadong Corned Beef Silog',
    category: 'Breakfast',
    pricePHP: 150,
    description: 'Sautéed premium chunky corned beef with caramelized sweet white onions and diced crispy potatoes, paired with garlic rice and sunny eggs.',
    tags: ['Comfort Food'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-bf-porksilog',
    name: 'Porksilog',
    localName: 'Crispy Fried Pork Chop Silog',
    category: 'Breakfast',
    pricePHP: 175,
    description: 'Golden marinated pork chop seared crisp on the bone, served with heirloom mountain garlic rice, sunny farm eggs, and house-made atchara relish.',
    tags: ['Filipino Classic'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-bf-daingsilog',
    name: 'Daingsilog',
    localName: 'Crispy Sun-Dried Fish Silog',
    category: 'Breakfast',
    pricePHP: 160,
    description: 'Sun-dried native fish crisped to perfection in coconut oil, served alongside fragrant garlic sinangag, two sunny eggs, and spiced native coconut vinegar.',
    tags: ['Local Catch'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-bf-spamsilog',
    name: 'Spamsilog',
    localName: 'Seared Golden Luncheon Meat Silog',
    category: 'Breakfast',
    pricePHP: 155,
    description: 'Thick-cut premium luncheon meat slices pan-seared golden crisp, accompanied by fragrant garlic sinangag rice, two eggs, and spiced vinegar.',
    tags: ['Comfort Food'],
    image: diningImg,
    available: true
  },

  // ==========================================
  // LUNCH — Resort Specials (₱250 - ₱500)
  // ==========================================
  {
    id: 'menu-lunch-adobo',
    name: 'Chicken Adobo',
    localName: 'Adobo sa Gata & Sukang Tuba',
    category: 'Lunch',
    pricePHP: 320,
    description: 'Slow-simmered tender chicken braised in artisanal coconut vinegar, aged soy sauce, whole garlic cloves, bay leaves, and cracked black pepper, finished with rich coconut cream.',
    tags: ['Negrense Classic', 'Chef Signature'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-lunch-crispy-pork',
    name: 'Crispy Pork Belly',
    localName: 'Lechon Kawali with Spiced Liver Gravy',
    category: 'Lunch',
    pricePHP: 390,
    description: 'Golden deep-fried pork belly slab with ultra-crisp crackling skin and juicy meat, paired with rich homemade liver sauce, spicy sinamak, and steaming jasmine rice.',
    tags: ['Filipino Classic', 'Chef Signature'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-lunch-karekare',
    name: 'Seafood Kare-Kare',
    localName: 'Kare-Kare nga Dagat with Bagoong Alamang',
    category: 'Lunch',
    pricePHP: 460,
    description: 'Rich roasted peanut and annatto stew brimming with fresh coastal tiger prawns, tender squid rings, and local mussels, garnished with blanched bok choy, eggplant, and sautéed shrimp paste.',
    tags: ['Chef Signature', 'Local Catch'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-lunch-inasal',
    name: 'Grilled Chicken Inasal',
    localName: 'Bacolod Chicken Inasal Lunch Plate',
    category: 'Lunch',
    pricePHP: 310,
    description: 'Signature flame-grilled quarter chicken marinated in calamansi, native ginger, lemongrass, and annatto chicken oil, served with garlic rice and spiced sinamak vinegar.',
    tags: ['Negrense Classic'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-lunch-caldereta',
    name: 'Beef Caldereta',
    localName: 'Rich Stewed Beef Caldereta',
    category: 'Lunch',
    pricePHP: 440,
    description: 'Hearty braised beef chuck slow-cooked in a rich spiced tomato sauce with bell peppers, potatoes, carrots, green olives, and melted cheddar cheese for a velvety sauce.',
    tags: ['Resort Special'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-lunch-sinigang',
    name: 'Sinigang na Baboy',
    localName: 'Pork Sinigang sa Native Batwan',
    category: 'Lunch',
    pricePHP: 380,
    description: 'Soul-warming sour broth simmered with tender pork ribs, native forest batwan fruit, tamarind, fresh kangkong water spinach, radish, tomato, and finger chilis.',
    tags: ['Negrense Classic', 'Comfort Food'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-lunch-pasta',
    name: 'Seafood Pasta',
    localName: 'Alon Coastal Garlic-Butter Fettuccine',
    category: 'Lunch',
    pricePHP: 420,
    description: 'Al dente fettuccine tossed with sautéed local tiger prawns, tender calamari rings, and clams in a light white wine garlic-butter and roasted cherry tomato confit sauce.',
    tags: ['Western Inspired', 'Local Catch'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-lunch-bbq',
    name: 'Chicken BBQ Plate',
    localName: 'Chargrilled Island Chicken BBQ Skewers',
    category: 'Lunch',
    pricePHP: 290,
    description: 'Three tender skewers of chicken fillet glazed in our sweet-savory island barbecue sauce, charred over coconut charcoal, served with golden java rice and native atchara.',
    tags: ['Resort Favorite'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-lunch-fish-chips',
    name: 'Fish & Chips',
    localName: 'Crispy Sipalay Catch & Potato Wedges',
    category: 'Lunch',
    pricePHP: 360,
    description: 'Golden beer-battered fresh local catch white fish fillets, served with hand-cut seasoned potato wedges, fresh lemon wedges, and house-made caper tartar dipping sauce.',
    tags: ['Western Inspired', 'Local Catch'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-lunch-bistek',
    name: 'Filipino-style Beef Steak',
    localName: 'Bistek Tagalog with Sweet Onions',
    category: 'Lunch',
    pricePHP: 410,
    description: 'Tender sliced beef sirloin marinated and seared in fresh calamansi juice, aged soy sauce, and crushed black pepper, smothered with caramelized sweet white onion rings.',
    tags: ['Filipino Classic'],
    image: diningImg,
    available: true
  },

  // ==========================================
  // DINNER — Grill, Inasal & Dinner Specials (₱300 - ₱600, Platter ₱2150)
  // ==========================================
  {
    id: 'menu-din-inasal',
    name: 'Chicken Inasal',
    localName: 'Authentic Bacolod Whole Leg Chicken Inasal',
    category: 'Dinner',
    pricePHP: 340,
    description: 'Flame-grilled chicken basted continuously in fragrant annatto oil, lemongrass, and native coconut vinegar, served with garlic rice, calamansi, chili, and spiced sinamak dip.',
    tags: ['Negrense Classic', 'Chef Signature'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-din-pork-bbq',
    name: 'Pork BBQ Platter',
    localName: 'Charcoal Grilled Pork BBQ Skewers (5 pcs)',
    category: 'Dinner',
    pricePHP: 360,
    description: 'Five skewers of tender pork loin marinated in rich caramelized garlic-brown sugar glaze, charred over mangrove charcoal, served with spicy vinegar and native atchara.',
    tags: ['Grill Favorite'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-din-bangus',
    name: 'Grilled Bangus',
    localName: 'Inihaw nga Boneless Bangus with Fresh Salsa',
    category: 'Dinner',
    pricePHP: 380,
    description: 'Whole boneless Dagupan milkfish stuffed with fresh diced tomatoes, native white onions, ginger, and herbs, wrapped in banana leaf and chargrilled over hot coals.',
    tags: ['Local Catch', 'Negrense Classic'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-din-tuna',
    name: 'Grilled Tuna Steak',
    localName: 'Inihaw nga Yellowfin Tuna Steak',
    category: 'Dinner',
    pricePHP: 490,
    description: 'Thick-cut fresh yellowfin tuna steak seared over open coals, brushed with garlic-calamansi herb butter, and served with grilled garden vegetables and jasmine rice.',
    tags: ['Local Catch', 'Chef Signature'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-din-tenderloin',
    name: 'Beef Tenderloin Steak',
    localName: 'Chargrilled Prime Beef Tenderloin Medallion',
    category: 'Dinner',
    pricePHP: 580,
    description: 'Prime beef tenderloin medallion grilled to your preferred doneness, topped with roasted garlic herb butter, served with mashed mountain potatoes and red wine demi-glace.',
    tags: ['Resort Special', 'Chef Signature'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-din-garlic-shrimp',
    name: 'Garlic Butter Shrimp',
    localName: 'Gambas Al Ajillo nga Hipon',
    category: 'Dinner',
    pricePHP: 480,
    description: 'Plump Sipalay coastal tiger prawns sautéed in rich garlic butter sauce, fresh lemon, white wine, and chopped parsley, served with steaming garlic mountain rice.',
    tags: ['Local Catch', 'Resort Special'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-din-liempo',
    name: 'Grilled Pork Liempo',
    localName: 'Inihaw nga Liempo with Sinamak Vinegar',
    category: 'Dinner',
    pricePHP: 370,
    description: 'Thick-cut pork belly slab marinated overnight in local citrus, dark soy, and minced garlic, grilled until edges are crisp and meat is tender and smoky.',
    tags: ['Grill Favorite'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-din-seafood-platter',
    name: 'Seafood Grill Platter',
    localName: 'Alon Grand Fisherman’s Ocean Feast (Serves 3-4)',
    category: 'Dinner',
    pricePHP: 2150,
    description: 'The ultimate beachfront banquet for 3 to 4 persons: grilled jumbo tiger prawns, whole blue swimmer crab, stuffed calamari squid, grilled tuna fillet, and local clams, served with three signature dipping sauces, grilled corn, and steaming garlic rice.',
    tags: ['Chef Signature', 'Local Catch', 'Family Feast'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-din-chicken-java',
    name: 'Chicken BBQ with Java Rice',
    localName: 'Skewered Chicken BBQ with Golden Java Rice',
    category: 'Dinner',
    pricePHP: 350,
    description: 'Three large skewers of chicken barbecue basted in rich glaze, paired with fragrant seasoned golden java rice, homemade peanut sauce, grilled sweet corn, and atchara.',
    tags: ['Resort Favorite'],
    image: diningImg,
    available: true
  },
  {
    id: 'menu-din-mixed-grill',
    name: 'Signature Resort Mixed Grill',
    localName: 'Alon Beachfront Charcoal Carnivore Platter',
    category: 'Dinner',
    pricePHP: 560,
    description: 'A master platter featuring chicken inasal skewer, grilled pork liempo strip, stuffed grilled local squid, and Negrense chorizo recado, served with garlic rice and sinamak.',
    tags: ['Chef Signature', 'Grill Favorite'],
    image: diningImg,
    available: true
  },

  // ==========================================
  // SUNSET COCKTAILS & BAR (10 Signature Drinks)
  // ==========================================
  {
    id: 'menu-bar-sunset-paradise',
    name: 'Sunset Paradise',
    localName: 'Tropical Rum & Guava Sunset Elixir',
    category: 'Bar & Cocktails',
    pricePHP: 320,
    description: 'Aged Don Papa Negrense rum shaken with tropical pink guava puree, golden mango nectar, and fresh lime juice, served over crushed ice with an edible tropical orchid.',
    tags: ['Cocktail', 'Chef Signature'],
    image: sunsetDeckImg,
    available: true
  },
  {
    id: 'menu-bar-mango-rum',
    name: 'Mango Rum Cooler',
    localName: 'Sweet Mango, White Rum & Coconut Mist',
    category: 'Bar & Cocktails',
    pricePHP: 280,
    description: 'Fresh sweet Guimaras mango puree blended with light island rum, fresh coconut water, bruised mint leaves, and a bright splash of calamansi citrus.',
    tags: ['Cocktail', 'Resort Favorite'],
    image: sunsetDeckImg,
    available: true
  },
  {
    id: 'menu-bar-mai-tai',
    name: 'Tropical Mai Tai',
    localName: 'Classic Polynesian-Negrense Island Mai Tai',
    category: 'Bar & Cocktails',
    pricePHP: 340,
    description: 'Premium dark and light rums, orange curaçao, freshly squeezed pineapple juice, orgeat almond syrup, finished with a dark rum float, lime wheel, and fresh mint sprig.',
    tags: ['Cocktail'],
    image: sunsetDeckImg,
    available: true
  },
  {
    id: 'menu-bar-coconut-mojito',
    name: 'Coconut Mojito',
    localName: 'Creamy Coconut, Mint & Masskara Rum',
    category: 'Bar & Cocktails',
    pricePHP: 290,
    description: 'Freshly muddled garden mint and lime wedges with Don Papa Masskara rum, velvety coconut milk, simple cane syrup, and sparkling club soda over crushed ice.',
    tags: ['Cocktail', 'Chef Signature'],
    image: sunsetDeckImg,
    available: true
  },
  {
    id: 'menu-bar-pineapple-punch',
    name: 'Pineapple Rum Punch',
    localName: 'Chargrilled Pineapple & Spiced Rum Punch',
    category: 'Bar & Cocktails',
    pricePHP: 300,
    description: 'Roasted pineapple juice, spiced dark rum, wild passionfruit syrup, Angostura aromatic bitters, and fresh lime, served tall over ice with freshly grated nutmeg.',
    tags: ['Cocktail'],
    image: sunsetDeckImg,
    available: true
  },
  {
    id: 'menu-bar-island-breeze',
    name: 'Island Breeze',
    localName: 'Refreshing Vodka, Cranberry & Sipalay Pineapple',
    category: 'Bar & Cocktails',
    pricePHP: 260,
    description: 'Crisp premium vodka layered with tart cranberry juice, sweet freshly pressed Sipalay pineapple juice, and a splash of ruby grapefruit, garnished with a dehydrated citrus wheel.',
    tags: ['Cocktail'],
    image: sunsetDeckImg,
    available: true
  },
  {
    id: 'menu-bar-passion-margarita',
    name: 'Passionfruit Margarita',
    localName: 'Tequila Reposado & Fresh Passionfruit Puree',
    category: 'Bar & Cocktails',
    pricePHP: 330,
    description: '100% blue agave tequila reposado, Cointreau orange liqueur, fresh tart passionfruit pulp, and squeezed lime, served in a glass rimmed with spicy chili-sea salt.',
    tags: ['Cocktail', 'Chef Signature'],
    image: sunsetDeckImg,
    available: true
  },
  {
    id: 'menu-bar-calamansi-mojito',
    name: 'Calamansi Mojito',
    localName: 'Native Calamansi & Negros Cane Mojito',
    category: 'Bar & Cocktails',
    pricePHP: 250,
    description: 'A handcrafted Negrense classic featuring muddled native calamansi citrus, wild garden mint, organic muscovado sugar syrup, local rum, and sparkling mineral water.',
    tags: ['Cocktail', 'Negrense Classic'],
    image: sunsetDeckImg,
    available: true
  },
  {
    id: 'menu-bar-blue-lagoon',
    name: 'Blue Lagoon',
    localName: 'Electric Blue Curaçao & Sparkling Citrus Splash',
    category: 'Bar & Cocktails',
    pricePHP: 270,
    description: 'Vibrant blue curaçao liqueur, citrus vodka, freshly squeezed lemonade, and sparkling soda over crystal ice, garnished with a maraschino cherry and orange crescent.',
    tags: ['Cocktail'],
    image: sunsetDeckImg,
    available: true
  },
  {
    id: 'menu-bar-sipalay-sunset',
    name: 'Sipalay Sunset',
    localName: 'Our Iconic Amber & Violet Gradient Cocktail',
    category: 'Bar & Cocktails',
    pricePHP: 310,
    description: 'Our iconic sunset-inspired layered cocktail: organic grenadine base, freshly pressed orange and pineapple juices, coconut rum, topped with an amber dark rum float and edible marigold petals.',
    tags: ['Cocktail', 'Chef Signature'],
    image: sunsetDeckImg,
    available: true
  }
];

export const ACTIVITIES_DATA: Activity[] = [
  {
    id: 'act-dayglow-paddle',
    title: 'The Aninag Dayglow & Paddle Experience',
    category: 'Water Sports',
    duration: '2 Hours (Pre-scheduled slots)',
    pricePHP: 850,
    priceNote: '₱850 / pair (Overnight) • ₱1,200 / pair (Day Pass)',
    description: 'Our signature daytime coastal experience. Glide over crystal-clear waters in photogenic clear kayaks, savor an aesthetic floating Negrense snack & cold-brew tea tray, and unwind on a reserved beachfront shaded daybed with dedicated host photo assistance.',
    includes: [
      '2-hour clear kayak or stand-up paddleboard rental',
      'Aesthetic floating Negrense snack & cold-brew herbal tea tray',
      'Reserved beachfront shaded daybed with woven canopy',
      'Dedicated local host assistance & phone photo taking',
      'Waterproof phone dry bag & fresh towel rinse-off'
    ],
    schedule: 'Daily slots: 8:00 AM, 10:30 AM, 1:30 PM, 3:30 PM',
    image: RESORT_IMAGES.dayglow,
    popular: true
  },
  {
    id: 'act-island-hopping',
    title: 'Ultimate Sipalay Islets & Hidden Lagoon Boat Safari',
    category: 'Island Hopping',
    duration: '4 - 5 Hours (Half Day)',
    pricePHP: 1800,
    priceNote: 'for up to 4 guests (includes boat & local boatman)',
    description: 'Explore Sipalay’s hidden coastlines on our motorized outrigger banca. Cruise past Tinagong Dagat limestone formations, swim in Sugar Beach, and visit picturesque coastal lagoons.',
    includes: ['Private motorized outrigger banca', 'Licensed local captain & guide', 'Snorkel masks & life vests', 'Cold bottled water & fresh tropical fruits'],
    schedule: 'Departures daily at 8:30 AM & 1:30 PM',
    image: RESORT_IMAGES.kayaking,
    popular: true
  },
  {
    id: 'act-sunset-bonfire',
    title: 'Alon Sunset Acoustic Soul Session & Beach Bonfire',
    category: 'Soul & Wellness',
    duration: 'Every evening 5:30 PM – 9:30 PM',
    pricePHP: 0,
    priceNote: 'Complimentary for in-house resort guests',
    description: 'Gather around the glowing driftwood bonfire as twilight settles over Poblacion Beach. Enjoy gentle live acoustic melodies from local Negrense musicians, marshmallow roasting, and cozy storytelling under the stars.',
    includes: ['Complimentary bonfire access', 'Live acoustic music set', 'Campfire marshmallows & skewers', 'Beach beanbags & woven mats'],
    schedule: 'Wednesdays through Sundays at 5:30 PM',
    image: RESORT_IMAGES.bonfire,
    popular: true
  },
  {
    id: 'act-kayak-paddle',
    title: 'Sunset Stand-Up Paddleboard & Clear Kayak Rental',
    category: 'Water Sports',
    duration: 'Per Hour (Walk-ins & Reservations)',
    pricePHP: 300,
    priceNote: '₱300 / hour (Paddleboard or LED-Lit Clear Kayak)',
    description: 'Launch directly from our beachfront wooden paddle shack right as the Sipalay sunset paints the sky in vibrant gold, pink, and purple. Features transparent clear kayaks illuminated with subtle perimeter LED lights and vibrant stand-up paddleboards with carbon fiber oars.',
    includes: [
      'Transparent clear kayak with fairy-light perimeter glow or colorful SUP board',
      'Ergonomic carbon fiber paddle & USCG-approved life vest',
      'Waterproof phone pouch with lanyard for sunset photography',
      'Brief 5-minute safety coaching & shore launch assistance'
    ],
    schedule: 'Daily rentals available (6:00 AM – 6:30 PM Sunset Session)',
    image: RESORT_IMAGES.sunsetPaddleKayak,
    popular: true
  }
];

export const COMPETITORS_DATA: CompetitorResort[] = [
  {
    id: 'comp-nayah',
    name: 'Na-Yah Beach Villas Sipalay',
    location: 'Q9CX+65P, Sipalay City, 6113 Negros Occidental, Philippines',
    category: 'Luxury Beachfront Villas',
    distanceKm: 3.5,
    travelTime: '10 mins by Tricycle / Car',
    description: 'Exclusive private beachfront villas featuring individual plunge pools, modern Scandinavian-tropical architecture, and serene coastal privacy along Northern Sipalay.',
    highlights: ['Private plunge pools', 'Direct secluded beach access', 'Ultra-modern villa interiors', 'High-end romantic privacy'],
    mapPin: {
      leftPercent: 74,
      topPercent: 18
    },
    priceRange: '₱5,500 – ₱12,000 / night',
    atmosphere: 'Ultra-exclusive private pool villas with modern minimalist architecture'
  },
  {
    id: 'comp-takatuka',
    name: 'Takatuka Beach Resort',
    location: 'Brgy. 4, Sitio Punta Ballo, Sipalay City, 6113, Philippines',
    category: 'Themed Beachfront Lodge',
    distanceKm: 14.2,
    travelTime: '25 mins by Car / Van',
    description: 'Famed for its artistic, quirky, and colorful individually themed suites. Located right on Punta Ballo white sand beach with a vibrant beachfront restaurant and cocktail bar.',
    highlights: ['Unique whimsical theme rooms', 'Punta Ballo white sand beach', 'Beachfront gourmet restaurant', 'Eclectic oceanfront lounging'],
    mapPin: {
      leftPercent: 55,
      topPercent: 86
    },
    priceRange: '₱3,200 – ₱7,500 / night',
    atmosphere: 'Artistic, colorful, pop-art themed fantasy rooms directly on the sand'
  },
  {
    id: 'comp-nataasan',
    name: 'Nataasan Beach Resort & Dive Center',
    location: 'Brgy. 4, Sitio Punta Ballo, Sipalay City, 6113, Philippines',
    category: 'Cliffside Resort & Dive Center',
    distanceKm: 14.5,
    travelTime: '25 mins by Car / Van',
    description: 'Perched on the scenic cliffs above Punta Ballo, offering panoramic ocean views, a hilltop infinity pool, full dive shop facilities, and staircase access down to the white beach.',
    highlights: ['Cliffside panoramic views', 'Hilltop swimming pool', 'Full dive shop services', 'Sunset vista restaurant'],
    mapPin: {
      leftPercent: 62,
      topPercent: 88
    },
    priceRange: '₱2,800 – ₱6,000 / night',
    atmosphere: 'Elevated cliffside positioning with broad sunset vistas and diving facilities'
  },
  {
    id: 'comp-bugana',
    name: 'Bugana Beach and Dive Resort',
    location: 'Brgy. Maricalum, Campomanes Bay, Sipalay City, 6113 Negros Occidental, Philippines',
    category: 'Boutique Bay Resort',
    distanceKm: 11.8,
    travelTime: '20 mins by Car / Boat',
    description: 'Nestled along the calm waters of Campomanes Bay. Features spacious tropical garden villas, an open-air restaurant by the bay, and a private boat jetty for marine tours.',
    highlights: ['Protected bay frontage', 'Lush tropical grounds', 'Al fresco waterfront dining', 'Private boat jetty access'],
    mapPin: {
      leftPercent: 64,
      topPercent: 68
    },
    priceRange: '₱3,800 – ₱8,500 / night',
    atmosphere: 'Serene sheltered cove ambiance with tropical greenery and calm bay waters'
  },
  {
    id: 'comp-manami',
    name: 'Manami Resort',
    location: 'MCC3+FC3, Brgy. Cayhagan, Sipalay City, 6113 Negros Occidental, Philippines',
    category: 'Ultra-Luxury Nature Sanctuary',
    distanceKm: 18.0,
    travelTime: '35 mins by Resort Shuttle / SUV',
    description: 'Sipalay’s premier 5-star discovery hospitality estate situated in secluded Cayhagan. Features cliffside ocean villas, a private cove, fine dining Lin-aw pavilion, and nature wellness spa.',
    highlights: ['Private secluded beach cove', 'High-end Lin-aw gastronomy', 'Huni cave & nature spa', 'Dedicated private butler service'],
    mapPin: {
      leftPercent: 78,
      topPercent: 93
    },
    priceRange: '₱14,000 – ₱28,000 / night',
    atmosphere: '5-star luxury nature sanctuary with private cove and bespoke butler service'
  }
];

export const REVIEWS_DATA: UserReview[] = [
  {
    id: 'rev-1',
    author: 'Camille & Marco Tan',
    userType: 'Couple',
    origin: 'Iloilo City',
    rating: 5,
    date: 'August 24, 2026',
    roomStayed: 'Aninag Sunset Master Villa',
    title: 'The best sunset and warmest hospitality we’ve ever experienced!',
    comment: 'Alon Aninag is everything we hoped for and more. Waking up right on Poblacion beach with that gentle sea breeze and the wood & white aesthetics was pure therapy. The sunset deck with their Don Papa cocktail and acoustic bonfire night made our anniversary truly unforgettable. Sulit na sulit!',
    likes: 38,
    verifiedStay: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-2',
    author: 'Jian Carlo & the Barkada',
    userType: 'Barkada / Group',
    origin: 'Bacolod City',
    rating: 5,
    date: 'August 18, 2026',
    roomStayed: 'Barkada Glow Loft',
    title: 'Unbelievable vibe, super fast Wi-Fi, and amazing inasal!',
    comment: 'We booked the Barkada Loft for 4 friends. The room was super spacious, the Wi-Fi was blazing fast for all our reels and TikToks, and the staff helped us arrange our boat to Tinagong Dagat in 5 minutes flat. Also, do not miss the grilled blue marlin and chicken inasal for dinner!',
    likes: 29,
    verifiedStay: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-3',
    author: 'David Harrison',
    userType: 'Solo Traveler',
    origin: 'Sydney, Australia',
    rating: 5,
    date: 'August 10, 2026',
    roomStayed: 'Alon Oceanfront Cozy Suite',
    title: 'Hidden gem in Southern Negros. 10/10 diving & peace.',
    comment: 'I spent 4 nights here diving Campomanes Bay. The resort is intimate, peaceful, and beautifully designed. No massive crowds like Boracay or El Nido, just genuine Filipino warmth, stunning sunset views, and great espresso in the morning. Will definitely return next year.',
    likes: 19,
    verifiedStay: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'soc-dayglow-1',
    userName: 'Alyssa & Gian',
    userHandle: '@alyssa.gian_travels',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    image: dayglowImg,
    caption: 'Clear kayak + floating Negrense iced tea tray = absolute peak relaxation! 🛶✨ The staff took the best reels for our TikTok! 100% recommend booking this! #DayglowAtAlon #AlonAninag #Sipalay',
    location: 'Dayglow Activity Zone • Poblacion Beach',
    likes: 742,
    timestamp: 'Just now',
    tag: '#DayglowAtAlon'
  },
  {
    id: 'soc-dayglow-2',
    userName: 'Negros Barkada Trippers',
    userHandle: '@negros_wanderers',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    image: floatingTrayImg,
    caption: 'That floating lemongrass cold-brew tea & fresh mango tray hit different after an hour on the paddleboard 🥭🌊 Shoutout to our local host! #DayglowAtAlon #WhereWavesRestAndSoulsGlow',
    location: 'Beachfront Daybed Lounge',
    likes: 588,
    timestamp: '4 hours ago',
    tag: '#DayglowAtAlon'
  },
  {
    id: 'soc-1',
    userName: 'Kaye Bautista',
    userHandle: '@kaye_travels',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    image: sunsetDeckImg,
    caption: 'Golden hour at @alon.aninag.sipalay hit differently today 🌅 Where waves rest and souls glow indeed! #GlowAtAlon #SipalayCity #NegrosOccidental',
    location: 'Sunset Deck • Poblacion Beach',
    likes: 428,
    timestamp: '2 hours ago',
    tag: '#GlowAtAlon'
  },
  {
    id: 'soc-2',
    userName: 'Miguel & Bea',
    userHandle: '@wanderingtwosome',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    image: heroImg,
    caption: 'Direct beachfront walkout from our room! Waking up to the morning tide in Sipalay is pure medicine for the tired soul 🌊☕️ #AlonAninagResort #StayWithUs',
    location: 'Aninag Master Villa',
    likes: 612,
    timestamp: '5 hours ago',
    tag: '#SoulGlow'
  },
  {
    id: 'soc-3',
    userName: 'Barkada Trippers PH',
    userHandle: '@barkadatrippers',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    image: bonfireImg,
    caption: 'Acoustic jams + beach bonfire + marshmallows = barkada core memory unlocked 🔥🏖️ Shoutout to the amazing staff at Alon & Aninag! #RestGlowRepeat',
    location: 'Beachfront Bonfire Pit',
    likes: 384,
    timestamp: '1 day ago',
    tag: '#BarkadaTrip'
  },
  {
    id: 'soc-4',
    userName: 'Chef Nadine Rivera',
    userHandle: '@nadine_eats',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    image: diningImg,
    caption: 'That grilled Sipalay blue marlin and native chicken inasal with batwan sinigang broth. Authentic Negrense goodness right on the beach 🍽️✨ #FoodieNegros',
    location: 'Alon Beachfront Dining',
    likes: 519,
    timestamp: '2 days ago',
    tag: '#NegrenseFlavors'
  }
];

export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    name: 'Sand',
    minStays: 0,
    pointsMultiplier: 1.0,
    color: '#D4A373',
    perks: ['Earn 1 Glow Point per ₱100 spent', 'Complimentary welcome fresh coconut drink', 'Free high-speed Starlink Wi-Fi access', 'Member-only flash secret promo codes']
  },
  {
    name: 'Wave',
    minStays: 2,
    pointsMultiplier: 1.25,
    color: '#4A90E2',
    perks: ['All Sand perks', 'Early check-in from 12:00 PM (subject to availability)', 'Complimentary sunset cocktail on the deck for 2', '10% discount on island hopping tours']
  },
  {
    name: 'Sunbeam',
    minStays: 4,
    pointsMultiplier: 1.5,
    color: '#E67E22',
    perks: ['All Wave perks', 'Guaranteed late check-out until 2:00 PM', 'Free room upgrade on birthday month', '15% discount on in-room massage & dining', 'Dedicated VIP concierge channel']
  },
  {
    name: 'Golden Glow',
    minStays: 7,
    pointsMultiplier: 2.0,
    color: '#E4A853',
    perks: ['All Sunbeam perks', 'Free 1-night stay voucher upon reaching tier', 'Complimentary private roundtrip shuttle van', 'Personalized chef sunset dinner experience', 'Complimentary bottle of Don Papa Rum reserve']
  }
];

export const CURRENCY_RATES: Record<string, { symbol: string; rateToPHP: number; name: string }> = {
  PHP: { symbol: '₱', rateToPHP: 1, name: 'Philippine Peso' },
  USD: { symbol: '$', rateToPHP: 0.0175, name: 'US Dollar' },
  EUR: { symbol: '€', rateToPHP: 0.0162, name: 'Euro' },
  JPY: { symbol: '¥', rateToPHP: 2.65, name: 'Japanese Yen' },
  KRW: { symbol: '₩', rateToPHP: 24.2, name: 'Korean Won' },
  AUD: { symbol: 'A$', rateToPHP: 0.0268, name: 'Australian Dollar' },
  SGD: { symbol: 'S$', rateToPHP: 0.0235, name: 'Singapore Dollar' }
};

export const FAQ_DATA = [
  {
    question: 'Where exactly is Alon Aninag located in Sipalay?',
    answer: 'We are situated directly on the shoreline of Poblacion Beach, Sipalay City, Negros Occidental. We are right next to the town’s scenic beachfront strip, just 2 minutes from Poblacion Baywalk and within short walking distance to local cafes and tricycle terminals.'
  },
  {
    question: 'How do I get to Sipalay from Bacolod or Dumaguete?',
    answer: 'From Bacolod City (Bacolod-Silay Airport), it is a 3.5 to 4-hour scenic drive south via Ceres Liner air-conditioned bus or private resort van. From Dumaguete City, it takes approximately 3.5 hours via Mabinay/Kabankalan or via the southern coastal highway. We offer door-to-door private airport shuttle transfers.'
  },
  {
    question: 'What are the check-in and check-out times?',
    answer: 'Standard check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in and late check-out can be requested upon booking and are prioritized for Glow Club members.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept GCash, Maya (PayMaya), Major Credit & Debit Cards (Visa, Mastercard, JCB, American Express), Online Bank Transfers (BDO, BPI, UnionBank), and Cash at the front desk. A 30% downpayment deposit is required to confirm online reservations.'
  },
  {
    question: 'Is there reliable Wi-Fi and mobile signal at the resort?',
    answer: 'Yes! We have high-speed Starlink Satellite Internet throughout all 24 accommodations, the sunset deck, and the beachfront dining area with speeds averaging 150+ Mbps. Mobile signal for Globe, Smart, and DITO is strong along Poblacion Beach.'
  },
  {
    question: 'Are walk-ins accepted?',
    answer: 'Yes, walk-in guests are always warmly welcomed at our front desk! However, because we only have 24 intimate boutique accommodations across 5 categories, we strongly recommend reserving in advance, especially for weekend getaways and peak holiday seasons.'
  }
];

export const TRANSLATION_PHRASES = [
  { english: 'Good morning', hiligaynon: 'Maayong aga', tagalog: 'Magandang umaga', cebuano: 'Maayong buntag', context: 'Morning greeting' },
  { english: 'Good evening', hiligaynon: 'Maayong gab-i', tagalog: 'Magandang gabi', cebuano: 'Maayong gabii', context: 'Evening greeting' },
  { english: 'Thank you very much', hiligaynon: 'Madamo nga salamat', tagalog: 'Maraming salamat', cebuano: 'Daghang salamat', context: 'Polite appreciation' },
  { english: 'How much is this?', hiligaynon: 'Tag-pila ini?', tagalog: 'Magkano ito?', cebuano: 'Tagpila kini?', context: 'Asking price' },
  { english: 'Where is the beach?', hiligaynon: 'Diin ang baybayon?', tagalog: 'Nasaan ang dalampasigan?', cebuano: 'Asa ang baybayon?', context: 'Directions' },
  { english: 'Delicious food!', hiligaynon: 'Namit gid ang pagkaon!', tagalog: 'Napakasarap ng pagkain!', cebuano: 'Lami kaayo ang pagkaon!', context: 'Dining compliment' },
  { english: 'Let us take a photo', hiligaynon: 'Mapalitrato kita', tagalog: 'Magpa-picture tayo', cebuano: 'Magpa-picture ta', context: 'Social & photos' },
  { english: 'Is this boat available for tour?', hiligaynon: 'Available ba ini nga sakayan para sa tour?', tagalog: 'Available ba ang bangkang ito para sa tour?', cebuano: 'Available ba kining sakayan para sa tour?', context: 'Island hopping' }
];
