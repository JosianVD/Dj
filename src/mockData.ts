import { DJ, Song, Message, Singer, Venue } from './types';

export const MOCK_VENUES: Venue[] = [
  {
    id: 'la-terraza',
    name: 'La Terraza',
    heroImage: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=800',
    description: 'A breath-taking rooftop garden overlooking the tropical coast. Famed for its immersive sound systems, lush hanging vines, and curated local & international line-ups.',
    currentDJId: 'dj-nova',
    rating: 4.9,
    distance: '0.2 mi',
    address: 'Calle Principal #45, Vega Baja, PR',
    drinkSpecials: [
      'Neon Mezcalita - Artisanal mezcal, dragonfruit, fresh lime, glowing salt rim',
      'Elixir of Vybe - Premium gin, lavender reduction, sparkling elderflower',
      'Midnight Eclipse - Charcoal-infused rum, fresh passionfruit, cold pressed pineapple'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1485872224824-d18743a1908b?auto=format&fit=crop&q=80&w=400'
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'Mateo Delgado',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
        rating: 5,
        comment: 'Best rooftop on the island hands down. Sound is crystal clear. Watching Nova drop deep techno under the stars was an absolute spiritual experience.',
        date: '2 hours ago'
      },
      {
        id: 'rev-2',
        userName: 'Elena Ruiz',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
        rating: 5,
        comment: 'The vibes are premium. Staff makes you feel like absolute royalty. Try the Neon Mezcalita immediately.',
        date: 'Yesterday'
      }
    ]
  },
  {
    id: 'black-box',
    name: 'The Black Box',
    heroImage: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800',
    description: 'An underground techno sanctuary. Designed with industrial concrete, state-of-the-art spatial audio, and pitch-black aesthetics punctured only by laser rays.',
    currentDJId: 'dj-kora',
    rating: 4.8,
    distance: '1.4 mi',
    address: 'Avenida Ponce de León 1055, San Juan, PR',
    drinkSpecials: [
      'Resonance Cold Brew - Espresso-infused tequila, rich coffee liqueur, orange zest',
      'Laser Beam - White rum, triple sec, blue curaçao, neon glow stick',
      'Sub-Bass Sour - Double bourbon, fresh lemon, aromatic bitters foam'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=400'
    ],
    reviews: [
      {
        id: 'rev-3',
        userName: 'Julian V.',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
        rating: 5,
        comment: 'Pure underground culture. No phones on the dancefloor. Kora played an incredible hypnotic set. Best night in months.',
        date: '1 day ago'
      }
    ]
  },
  {
    id: 'velvet-room',
    name: 'Velvet Room',
    heroImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=800',
    description: 'An ultra-exclusive luxury lounge offering hand-crafted molecular cocktails, velvet-draped VIP booths, and high-energy luxury future beats.',
    currentDJId: 'dj-shadow',
    rating: 4.7,
    distance: '3.1 mi',
    address: 'Condado Ocean Boulevard #80, Condado, PR',
    drinkSpecials: [
      'Royal Velvet - Moët Champagne, crème de cassis, fresh blackberry spray',
      'Golden Ticket - 23k gold flakes, premium vodka, white cranberry elixir',
      'Smoked Truffle Manhattan - Smoked sweet vermouth, private selection whiskey'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?auto=format&fit=crop&q=80&w=400'
    ],
    reviews: [
      {
        id: 'rev-4',
        userName: 'Carla S.',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
        rating: 4,
        comment: 'Incredible decor and celebrity DJs. The crowd is highly fashionable. Prices are steep but absolutely worth the elite atmosphere.',
        date: '3 days ago'
      }
    ]
  }
];

export const MOCK_DJS: DJ[] = [
  {
    id: 'dj-nova',
    name: 'DJ Nova',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    heroVideoUrl: 'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?auto=format&fit=crop&q=80&w=800',
    venueId: 'la-terraza',
    venueName: 'La Terraza • Vega Baja',
    distance: '0.2 mi',
    genre: 'Melodic Techno & Progressive',
    isLive: true,
    audienceCount: 243,
    vibe: 'Melodic, Dark & Immersive',
    verified: true,
    bio: 'Merging dark progressive basslines with ethereal melodies, Nova has established an unmatched emotional landscape in the world of melodic techno. Having performed at Tomorrowland and Ibiza residencies, he now curates deep cinematic journeys for select venues.',
    followersCount: 84900,
    rating: 4.9,
    ratingCount: 382,
    instagram: '@dj_nova_live',
    tiktok: '@nova_techno',
    gallery: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400'
    ],
    upcomingEvents: [
      { title: 'Solstice Eclipse Night', date: 'July 18, 2026', venueName: 'The Black Box' },
      { title: 'Sub-Zero Beach Festival', date: 'July 25, 2026', venueName: 'Ocean Park Sands' },
      { title: 'Celestial Garden Party', date: 'August 01, 2026', venueName: 'La Terraza Rooftop' }
    ]
  },
  {
    id: 'dj-kora',
    name: 'DJ Kora',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    heroVideoUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    venueId: 'black-box',
    venueName: 'The Black Box • San Juan',
    distance: '1.4 mi',
    genre: 'Afro House & Deep House',
    isLive: true,
    audienceCount: 189,
    vibe: 'Hypnotic, Soulful & Groovy',
    verified: true,
    bio: 'Rooted in rich tribal drums and soulful vocal cuts, Kora spins hypnotic afro house rhythms that keep crowds moving in synchronized harmony. Famous for her marathon 8-hour dynamic open-to-close underground club sets.',
    followersCount: 104500,
    rating: 4.8,
    ratingCount: 456,
    instagram: '@kora_sound',
    tiktok: '@korabeats',
    gallery: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=400'
    ],
    upcomingEvents: [
      { title: 'Tribal Resonance', date: 'July 17, 2026', venueName: 'The Black Box' },
      { title: 'Dusk till Dawn Tour', date: 'July 24, 2026', venueName: 'La Terraza' },
      { title: 'Ethereal Drums', date: 'July 31, 2026', venueName: 'The Secret Cove' }
    ]
  },
  {
    id: 'dj-shadow',
    name: 'DJ Shadow',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    heroVideoUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    venueId: 'velvet-room',
    venueName: 'Velvet Room • Condado',
    distance: '3.1 mi',
    genre: 'Hip-Hop & Future Beats',
    isLive: true,
    audienceCount: 312,
    vibe: 'Smooth, High-Energy & Late-Night',
    verified: true,
    bio: 'Fusing heavy-hitting southern trap baselines with luxurious future soul chords, Shadow commands a highly elite party aesthetic. He remains the premier choice for exclusive fashion galas, red carpets, and late-night lounge takeovers.',
    followersCount: 153000,
    rating: 4.7,
    ratingCount: 512,
    instagram: '@shadow_beats',
    tiktok: '@shadow_mix',
    gallery: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=400'
    ],
    upcomingEvents: [
      { title: 'Satin & Velvet Gala', date: 'July 19, 2026', venueName: 'Velvet Room' },
      { title: 'Neon Skylines', date: 'July 26, 2026', venueName: 'Ritz-Carlton Beach Lounge' },
      { title: 'Midnight Mirage', date: 'August 02, 2026', venueName: 'Velvet Room' }
    ]
  }
];

export const INITIAL_SONGS: Song[] = [
  {
    id: 'song-1',
    title: 'On My Knees',
    artist: 'Rüfüs Du Sol',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200',
    requestsCount: 42,
    requestedByMe: false,
    priorityLevel: 'normal',
    votes: 42
  },
  {
    id: 'song-2',
    title: 'Rumble',
    artist: 'Skrillex, Fred again.., Flowdan',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    requestsCount: 38,
    requestedByMe: false,
    priorityLevel: 'normal',
    votes: 38
  },
  {
    id: 'song-3',
    title: 'Move',
    artist: 'Adam Port, Stryv, Keinemusik',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=200',
    requestsCount: 56,
    requestedByMe: false,
    priorityLevel: 'normal',
    votes: 56
  },
  {
    id: 'song-4',
    title: 'Nanã',
    artist: 'Polo & Pan',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=200',
    requestsCount: 15,
    requestedByMe: false,
    priorityLevel: 'normal',
    votes: 15
  },
  {
    id: 'song-5',
    title: 'Starry Night',
    artist: 'Peggy Gou',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=200',
    requestsCount: 29,
    requestedByMe: false,
    priorityLevel: 'normal',
    votes: 29
  },
  {
    id: 'song-6',
    title: 'Insomnia (Nova Remix)',
    artist: 'Faithless',
    coverUrl: 'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?auto=format&fit=crop&q=80&w=200',
    requestsCount: 61,
    requestedByMe: false,
    priorityLevel: 'normal',
    votes: 61
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    category: 'Birthday',
    text: 'Happy 25th Birthday to Sofia! Drop that bass for her!',
    senderName: 'Carlos M.',
    timestamp: '11:42 PM',
    approved: true
  },
  {
    id: 'msg-2',
    category: 'Shoutout',
    text: 'Shoutout to the front row crew keeping the energy at 1000%! Let’s gooo!',
    senderName: 'DJ Nova (Host)',
    timestamp: '11:45 PM',
    approved: true
  },
  {
    id: 'msg-3',
    category: 'Anniversary',
    text: 'To Daniel - 3 years of dancing together under the lasers. Love you!',
    senderName: 'Jessica L.',
    timestamp: '11:51 PM',
    approved: true
  }
];

export const INITIAL_SINGERS: Singer[] = [
  {
    id: 'singer-1',
    name: 'Gaby & Thomas',
    songTitle: 'Interstellar Love',
    artist: 'The Flight Facilities',
    waitMinutes: 4
  },
  {
    id: 'singer-2',
    name: 'Sandro',
    songTitle: 'Losing It',
    artist: 'FISHER',
    waitMinutes: 11
  },
  {
    id: 'singer-3',
    name: 'Mariana Gomez',
    songTitle: 'Ray of Light',
    artist: 'Madonna',
    waitMinutes: 18
  }
];
