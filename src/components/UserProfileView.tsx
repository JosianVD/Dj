import React from 'react';
import { DJ, Venue } from '../types';
import { Award, Compass, Heart, History, MapPin, Music, Star, Ticket } from 'lucide-react';

interface UserProfileViewProps {
  favoriteDjs: DJ[];
  savedVenues: Venue[];
  onSelectDj: (dj: DJ) => void;
  onSelectVenue: (venueId: string) => void;
}

const USER_BADGES = [
  { name: 'VVIP Member', color: 'from-amber-500 to-yellow-600', desc: 'Authorized VVIP backstage permissions' },
  { name: 'Techno Purist', color: 'from-purple-600 to-indigo-600', desc: 'Voted 50+ times on melodic techno songs' },
  { name: 'Midnight Nomad', color: 'from-cyan-500 to-blue-600', desc: 'Connected at 4+ distinct geographic venues' }
];

const HISTORIC_EVENTS = [
  { date: 'July 11, 2026', title: 'Midnight Eclipse Tour', dj: 'DJ Nova', venue: 'La Terraza' },
  { date: 'July 04, 2026', title: 'Sub-Bass Launch Party', dj: 'DJ Shadow', venue: 'Velvet Room' },
  { date: 'June 28, 2026', title: 'Deep Solstice', dj: 'DJ Kora', venue: 'The Black Box' }
];

export default function UserProfileView({ favoriteDjs, savedVenues, onSelectDj, onSelectVenue }: UserProfileViewProps) {
  return (
    <div className="relative w-full h-full flex flex-col bg-[#050505] text-white">
      
      {/* Scrollable container */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-24 space-y-5 animate-fade-in">
        
        {/* Header HUD */}
        <div>
          <h3 className="font-display font-black text-2xl tracking-tighter bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent uppercase">
            MY VYBE ID
          </h3>
          <p className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
            Sleek user profile & credentials
          </p>
        </div>

        {/* User Card centerpiece */}
        <div className="bg-white/5 border border-white/10 rounded-[28px] p-5 relative overflow-hidden flex items-center gap-4 shadow-xl">
          {/* Ambient glowing radial light behind avatar */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-[30px] pointer-events-none" />

          {/* User profile image */}
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shrink-0 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
              alt="User profile avatar"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <h4 className="font-display font-black text-lg text-white uppercase">Elena Ruiz</h4>
              <span className="w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center text-[8px] text-white font-extrabold">
                ★
              </span>
            </div>
            <p className="text-[10px] font-mono text-purple-400 font-bold">MEMBER SINCE JUNE 2026</p>
            <p className="text-[10px] text-white/50 font-medium font-sans">San Juan, PR • @elena_r</p>
          </div>
        </div>

        {/* Earned Badges section */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-purple-400" /> EARNED BADGES
          </span>

          <div className="grid grid-cols-1 gap-2.5">
            {USER_BADGES.map((b, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3.5 bg-white/5 border border-white/10 rounded-2xl shadow-xl"
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${b.color} flex items-center justify-center text-lg font-bold shrink-0 shadow-md`}>
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase">{b.name}</div>
                  <div className="text-[10px] text-white/50 mt-0.5 leading-normal font-sans">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Rooftops & Venues row */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-purple-400" /> SAVED LUXURY VENUES
          </span>

          <div className="grid grid-cols-2 gap-3">
            {savedVenues.map((v) => (
              <div
                key={v.id}
                onClick={() => onSelectVenue(v.id)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-2.5 space-y-2 hover:border-purple-500/30 transition-all duration-300 shadow-xl"
              >
                <div className="h-20 rounded-xl overflow-hidden relative border border-white/5">
                  <img
                    src={v.heroImage}
                    alt={v.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-0.5 px-0.5">
                  <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate uppercase">{v.name}</h4>
                  <div className="flex items-center justify-between text-[9px] text-white/50 font-mono">
                    <span>{v.distance} Away</span>
                    <span className="flex items-center gap-0.5 text-purple-400 font-bold">
                      ★ {v.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite DJs Stream */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-purple-400" /> FAVORITE DJS
          </span>

          <div className="space-y-2.5">
            {favoriteDjs.map((dj) => (
              <div
                key={dj.id}
                onClick={() => onSelectDj(dj)}
                className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:border-purple-500/20 transition-all shadow-xl"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={dj.avatar}
                    alt={dj.name}
                    className="w-9 h-9 rounded-full object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">{dj.name}</h4>
                    <p className="text-[10px] text-white/40 font-mono">{dj.genre}</p>
                  </div>
                </div>

                <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs text-white/50 hover:text-white">
                  ➔
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Nightlife History timeline logs */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1">
            <History className="w-3.5 h-3.5 text-purple-400" /> NIGHTLIFE HISTORY
          </span>

          <div className="space-y-2.5">
            {HISTORIC_EVENTS.map((evt, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center shadow-xl"
              >
                <div>
                  <div className="text-xs font-bold text-white uppercase">{evt.title}</div>
                  <div className="text-[10px] text-white/50 font-mono mt-0.5">
                    {evt.dj} • <span className="text-purple-300 font-bold">{evt.venue}</span>
                  </div>
                </div>

                <span className="text-[9px] font-mono text-white/40 font-bold">
                  {evt.date}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
