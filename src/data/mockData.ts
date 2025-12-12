/**
 * HostCity Mock Data
 * 
 * Realistic data for FIFA World Cup 2026 in USA host cities.
 * Primary focus: NY/NJ (MetLife Stadium area)
 */

import { PinCategory } from '../components/MapPin';

// Types
export interface Place {
  id: string;
  name: string;
  category: PinCategory;
  categoryLabel: string;
  vibe: string;
  address: string;
  distance: string;
  walkTime: string;
  isOpen: boolean;
  openHours: string;
  crowdStatus: 'quiet' | 'moderate' | 'busy' | 'packed';
  crowdUsual: 'quiet' | 'moderate' | 'busy';
  rating: number;
  hasScreens: boolean;
  matchesShown: string[];
  imageUrl: string;
  latitude: number;
  longitude: number;
}

export interface Offer {
  id: string;
  title: string;
  placeName: string;
  placeCategory: string;
  matchContext?: string;
  matchTime?: string;
  description: string;
  attributes: string[];
  distance: string;
  endsAt: string;
  badge: 'featured' | 'ends_soon' | 'new' | 'popular' | null;
  category: 'FOOD' | 'DRINK' | 'MERCH' | 'EXPERIENCE';
  isSaved: boolean;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  stage: 'GROUP' | 'ROUND OF 16' | 'QUARTER FINAL' | 'SEMI FINAL' | 'FINAL';
  status: 'upcoming' | 'starts_soon' | 'ongoing' | 'finished';
  isMyTeam: boolean;
  isNearby: boolean;
}

export interface SafetyAlert {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  updatedAt: string;
  affectedAreas: string;
}

export interface ChatMessage {
  id: string;
  type: 'assistant' | 'user';
  message: string;
  timestamp: string;
}

// Mock Places
export const places: Place[] = [
  {
    id: '1',
    name: 'MetLife Stadium',
    category: 'stadium',
    categoryLabel: 'Stadium',
    vibe: 'Official World Cup venue · 82,500 capacity',
    address: '1 MetLife Stadium Dr, East Rutherford, NJ',
    distance: '0.2 mi',
    walkTime: '~5 min walk',
    isOpen: true,
    openHours: 'Match days: Gates open 3h before kickoff',
    crowdStatus: 'busy',
    crowdUsual: 'moderate',
    rating: 4.8,
    hasScreens: false,
    matchesShown: [],
    imageUrl: 'https://example.com/metlife.jpg',
    latitude: 40.8128,
    longitude: -74.0742,
  },
  {
    id: '2',
    name: 'The Meadowlands Sports Bar',
    category: 'venue',
    categoryLabel: 'Sports Bar',
    vibe: 'Lively bar · Outdoor screens · Great for USA games',
    address: '150 Washington Ave, Carlstadt, NJ',
    distance: '0.4 mi',
    walkTime: '~8 min walk',
    isOpen: true,
    openHours: '11:00 AM – 2:00 AM',
    crowdStatus: 'busy',
    crowdUsual: 'quiet',
    rating: 4.5,
    hasScreens: true,
    matchesShown: ['USA vs MEX', 'BRA vs ESP'],
    imageUrl: 'https://example.com/meadowlands-bar.jpg',
    latitude: 40.8234,
    longitude: -74.0654,
  },
  {
    id: '3',
    name: 'FIFA Fan Fest NJ',
    category: 'fanZone',
    categoryLabel: 'Fan Zone',
    vibe: 'Official fan zone · Live music · Giant screens',
    address: 'American Dream, East Rutherford, NJ',
    distance: '0.6 mi',
    walkTime: '~12 min walk',
    isOpen: true,
    openHours: '10:00 AM – 11:00 PM',
    crowdStatus: 'packed',
    crowdUsual: 'busy',
    rating: 4.7,
    hasScreens: true,
    matchesShown: ['All matches'],
    imageUrl: 'https://example.com/fan-fest.jpg',
    latitude: 40.8156,
    longitude: -74.0712,
  },
  {
    id: '4',
    name: 'NJ State Police - Meadowlands',
    category: 'safety',
    categoryLabel: 'Police Station',
    vibe: 'Emergency services · Event support',
    address: '1 Police Plaza, East Rutherford, NJ',
    distance: '0.3 mi',
    walkTime: '~6 min walk',
    isOpen: true,
    openHours: '24 hours',
    crowdStatus: 'quiet',
    crowdUsual: 'quiet',
    rating: 4.2,
    hasScreens: false,
    matchesShown: [],
    imageUrl: 'https://example.com/police.jpg',
    latitude: 40.8098,
    longitude: -74.0778,
  },
  {
    id: '5',
    name: 'Hackensack University Medical Center',
    category: 'safety',
    categoryLabel: 'Hospital',
    vibe: 'Full emergency services · 24/7',
    address: '30 Prospect Ave, Hackensack, NJ',
    distance: '4.2 mi',
    walkTime: '~15 min drive',
    isOpen: true,
    openHours: '24 hours',
    crowdStatus: 'moderate',
    crowdUsual: 'moderate',
    rating: 4.4,
    hasScreens: false,
    matchesShown: [],
    imageUrl: 'https://example.com/hospital.jpg',
    latitude: 40.8887,
    longitude: -74.0445,
  },
  {
    id: '6',
    name: 'Secaucus Junction',
    category: 'transit',
    categoryLabel: 'Transit Hub',
    vibe: 'NJ Transit hub · Direct to Penn Station',
    address: 'County Ave, Secaucus, NJ',
    distance: '1.8 mi',
    walkTime: '~8 min shuttle',
    isOpen: true,
    openHours: '5:00 AM – 1:00 AM',
    crowdStatus: 'busy',
    crowdUsual: 'moderate',
    rating: 4.1,
    hasScreens: false,
    matchesShown: [],
    imageUrl: 'https://example.com/secaucus.jpg',
    latitude: 40.7618,
    longitude: -74.0745,
  },
  {
    id: '7',
    name: 'Tailgate Alley',
    category: 'fanZone',
    categoryLabel: 'Tailgate Zone',
    vibe: 'Pre-game parties · Food trucks · Family friendly',
    address: 'MetLife Stadium Lot K',
    distance: '0.1 mi',
    walkTime: '~2 min walk',
    isOpen: true,
    openHours: 'Match days: 5h before kickoff',
    crowdStatus: 'packed',
    crowdUsual: 'busy',
    rating: 4.6,
    hasScreens: true,
    matchesShown: ['All matches'],
    imageUrl: 'https://example.com/tailgate.jpg',
    latitude: 40.8142,
    longitude: -74.0728,
  },
  {
    id: '8',
    name: 'Jersey City Waterfront Bar',
    category: 'venue',
    categoryLabel: 'Bar & Grill',
    vibe: 'NYC skyline views · Craft beers · Match screenings',
    address: '100 Hudson St, Jersey City, NJ',
    distance: '8.5 mi',
    walkTime: '~25 min drive',
    isOpen: true,
    openHours: '12:00 PM – 12:00 AM',
    crowdStatus: 'moderate',
    crowdUsual: 'moderate',
    rating: 4.3,
    hasScreens: true,
    matchesShown: ['USA vs MEX'],
    imageUrl: 'https://example.com/jc-bar.jpg',
    latitude: 40.7178,
    longitude: -74.0341,
  },
];

// Mock Offers
export const offers: Offer[] = [
  {
    id: '1',
    title: '2-for-1 Draft Beers',
    placeName: 'The Meadowlands Sports Bar',
    placeCategory: 'Sports Bar',
    matchContext: 'Tonight',
    matchTime: '20:00',
    description: 'All draft beers 2-for-1 during USA vs MEX match',
    attributes: ['🍺 Drinks', '📺 Big Screen', '🎉 Match Day'],
    distance: '0.4 mi',
    endsAt: '23:00',
    badge: 'featured',
    category: 'DRINK',
    isSaved: false,
  },
  {
    id: '2',
    title: 'World Cup Burger Combo $15',
    placeName: 'Tailgate Alley',
    placeCategory: 'Food Truck',
    matchContext: 'All Match Days',
    description: 'Burger, fries, and drink combo special',
    attributes: ['🍔 Food', '👨‍👩‍👧 Family', '🎉 Match Day'],
    distance: '0.1 mi',
    endsAt: 'Match end',
    badge: 'popular',
    category: 'FOOD',
    isSaved: true,
  },
  {
    id: '3',
    title: 'Official USA Jersey 20% Off',
    placeName: 'FIFA Fan Fest NJ',
    placeCategory: 'Official Merch',
    matchContext: 'This Weekend',
    description: 'All USA jerseys 20% off at official store',
    attributes: ['👕 Merch', '🇺🇸 USA', '⭐ Official'],
    distance: '0.6 mi',
    endsAt: 'Sun 23:59',
    badge: 'ends_soon',
    category: 'MERCH',
    isSaved: false,
  },
  {
    id: '4',
    title: 'Free Shuttle to Stadium',
    placeName: 'Secaucus Junction',
    placeCategory: 'Transit',
    matchContext: 'All Match Days',
    description: 'Free shuttle service from station to MetLife',
    attributes: ['🚌 Transit', '🎟️ With Ticket', '♿ Accessible'],
    distance: '1.8 mi',
    endsAt: 'Match start',
    badge: null,
    category: 'EXPERIENCE',
    isSaved: false,
  },
  {
    id: '5',
    title: 'Happy Hour: $5 Margaritas',
    placeName: 'Jersey City Waterfront Bar',
    placeCategory: 'Bar & Grill',
    matchContext: 'Daily 4-7 PM',
    description: 'Enjoy NYC views with discounted margaritas',
    attributes: ['🍹 Drinks', '🌆 Views', '📺 Screens'],
    distance: '8.5 mi',
    endsAt: '19:00',
    badge: 'new',
    category: 'DRINK',
    isSaved: false,
  },
];

// Mock Matches
export const matches: Match[] = [
  {
    id: '1',
    homeTeam: 'USA',
    awayTeam: 'MEX',
    homeFlag: '🇺🇸',
    awayFlag: '🇲🇽',
    date: '2026-06-15',
    time: '20:00',
    venue: 'MetLife Stadium',
    city: 'NY/NJ',
    stage: 'GROUP',
    status: 'starts_soon',
    isMyTeam: true,
    isNearby: true,
  },
  {
    id: '2',
    homeTeam: 'BRA',
    awayTeam: 'ESP',
    homeFlag: '🇧🇷',
    awayFlag: '🇪🇸',
    date: '2026-06-15',
    time: '14:00',
    venue: 'MetLife Stadium',
    city: 'NY/NJ',
    stage: 'GROUP',
    status: 'ongoing',
    isMyTeam: false,
    isNearby: true,
  },
  {
    id: '3',
    homeTeam: 'ENG',
    awayTeam: 'FRA',
    homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayFlag: '🇫🇷',
    date: '2026-06-16',
    time: '18:00',
    venue: 'SoFi Stadium',
    city: 'Los Angeles',
    stage: 'GROUP',
    status: 'upcoming',
    isMyTeam: false,
    isNearby: false,
  },
  {
    id: '4',
    homeTeam: 'ARG',
    awayTeam: 'GER',
    homeFlag: '🇦🇷',
    awayFlag: '🇩🇪',
    date: '2026-06-16',
    time: '15:00',
    venue: 'AT&T Stadium',
    city: 'Dallas',
    stage: 'GROUP',
    status: 'upcoming',
    isMyTeam: false,
    isNearby: false,
  },
  {
    id: '5',
    homeTeam: 'CAN',
    awayTeam: 'JPN',
    homeFlag: '🇨🇦',
    awayFlag: '🇯🇵',
    date: '2026-06-17',
    time: '12:00',
    venue: 'MetLife Stadium',
    city: 'NY/NJ',
    stage: 'GROUP',
    status: 'upcoming',
    isMyTeam: false,
    isNearby: true,
  },
  {
    id: '6',
    homeTeam: 'USA',
    awayTeam: 'GER',
    homeFlag: '🇺🇸',
    awayFlag: '🇩🇪',
    date: '2026-06-20',
    time: '19:00',
    venue: 'MetLife Stadium',
    city: 'NY/NJ',
    stage: 'GROUP',
    status: 'upcoming',
    isMyTeam: true,
    isNearby: true,
  },
  {
    id: '7',
    homeTeam: 'TBD',
    awayTeam: 'TBD',
    homeFlag: '🏳️',
    awayFlag: '🏳️',
    date: '2026-07-10',
    time: '20:00',
    venue: 'MetLife Stadium',
    city: 'NY/NJ',
    stage: 'QUARTER FINAL',
    status: 'upcoming',
    isMyTeam: false,
    isNearby: true,
  },
  {
    id: '8',
    homeTeam: 'TBD',
    awayTeam: 'TBD',
    homeFlag: '🏳️',
    awayFlag: '🏳️',
    date: '2026-07-19',
    time: '16:00',
    venue: 'MetLife Stadium',
    city: 'NY/NJ',
    stage: 'FINAL',
    status: 'upcoming',
    isMyTeam: false,
    isNearby: true,
  },
];

// Mock Safety Alerts
export const safetyAlerts: SafetyAlert[] = [
  {
    id: '1',
    severity: 'warning',
    title: 'NJ Transit Delay to Meadowlands',
    description: 'Expect 15-20 minute delays on Meadowlands Rail Line due to signal issues.',
    updatedAt: '10 min ago',
    affectedAreas: 'Stadium routes',
  },
  {
    id: '2',
    severity: 'info',
    title: 'Road Closures Around MetLife',
    description: 'Route 120 closed 3 hours before match. Use Route 17 alternative.',
    updatedAt: '1 hour ago',
    affectedAreas: 'East Rutherford',
  },
  {
    id: '3',
    severity: 'info',
    title: 'Heat Advisory',
    description: 'Temperatures expected to reach 92°F. Stay hydrated and use cooling stations.',
    updatedAt: '2 hours ago',
    affectedAreas: 'All outdoor areas',
  },
];

// Initial chat messages for Copilot
export const initialChatMessages: ChatMessage[] = [
  {
    id: '1',
    type: 'assistant',
    message: `Welcome to HostCity for the 2026 World Cup in NY/NJ! 🏟️

I can help you with:
• Finding safe routes to the stadium
• Avoiding crowded areas
• Discovering bars showing matches
• Real-time safety updates

What would you like to know?`,
    timestamp: 'Just now',
  },
];

// Suggestion chips for Copilot
export const copilotSuggestions = {
  gettingAround: [
    { label: 'Safe route to MetLife', icon: '🗺️' },
    { label: 'Avoid crowded areas', icon: '👥' },
    { label: 'Transit to stadium', icon: '🚇' },
  ],
  places: [
    { label: 'Quiet bar nearby', icon: '🍺' },
    { label: 'Tailgate parties', icon: '🎉' },
    { label: 'Family-friendly spots', icon: '👨‍👩‍👧' },
  ],
  safety: [
    { label: 'Current safety status', icon: '🛡️' },
    { label: 'Nearest police station', icon: '👮' },
    { label: 'Emergency contacts', icon: '📞' },
  ],
};

// Helper functions
export function getPlacesByCategory(category: PinCategory): Place[] {
  return places.filter(p => p.category === category);
}

export function getNearbyPlaces(limit: number = 3): Place[] {
  return [...places]
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    .slice(0, limit);
}

export function getMatchesByDate(date: string): Match[] {
  return matches.filter(m => m.date === date);
}

export function getUpcomingMatches(limit: number = 5): Match[] {
  return matches
    .filter(m => m.status !== 'finished')
    .slice(0, limit);
}

export function getActiveOffers(): Offer[] {
  return offers.filter(o => o.badge !== null || !o.isSaved);
}

export function getFeaturedOffer(): Offer | undefined {
  return offers.find(o => o.badge === 'featured');
}

