export interface UpcomingEvent {
  title: string;
  date: string;
  venueName: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface DJ {
  id: string;
  name: string;
  avatar: string;
  heroVideoUrl: string; // Simulated video GIF or visual loop
  venueId: string;
  venueName: string;
  distance: string;
  genre: string;
  isLive: boolean;
  audienceCount: number;
  vibe: string;
  verified: boolean;
  bio: string;
  followersCount: number;
  rating: number;
  ratingCount: number;
  instagram: string;
  tiktok: string;
  gallery: string[];
  upcomingEvents: UpcomingEvent[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  requestsCount: number;
  requestedByMe: boolean;
  priorityLevel: 'normal' | 'priority';
  votes: number;
}

export interface MessageCategory {
  id: 'Birthday' | 'Proposal' | 'Anniversary' | 'Shoutout' | 'General';
  label: string;
  color: string;
  emoji: string;
}

export interface Message {
  id: string;
  category: 'Birthday' | 'Proposal' | 'Anniversary' | 'Shoutout' | 'General';
  text: string;
  senderName: string;
  timestamp: string;
  approved: boolean;
}

export interface Singer {
  id: string;
  name: string;
  songTitle: string;
  artist: string;
  waitMinutes: number;
}

export interface Venue {
  id: string;
  name: string;
  heroImage: string;
  description: string;
  currentDJId: string;
  rating: number;
  distance: string;
  drinkSpecials: string[];
  gallery: string[];
  reviews: Review[];
  address: string;
}

export interface Booking {
  id: string;
  eventType: string;
  date: string;
  hours: number;
  location: string;
  specialRequests: string;
  status: 'pending' | 'confirmed';
  djId: string;
}
