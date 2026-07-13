import React from 'react';
import { DJ } from '../types';
import { Award, Calendar, Instagram, MessageSquare, Radio, Star, Users, CheckCircle } from 'lucide-react';

interface DJProfileViewProps {
  dj: DJ;
  onBookNow: () => void;
  onEnterExperience: () => void;
}

export default function DJProfileView({ dj, onBookNow, onEnterExperience }: DJProfileViewProps) {
  return (
    <div className="relative w-full h-full flex flex-col bg-[#050505] text-white">
      
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 animate-fade-in">
        
        {/* Cinematic Netflix Hero Image Block */}
        <div className="relative h-64 w-full overflow-hidden">
          {/* Hero background image */}
          <img
            src={dj.heroVideoUrl}
            alt={dj.name}
            className="w-full h-full object-cover scale-105 filter brightness-90 animate-pulse-glow"
            referrerPolicy="no-referrer"
          />
          {/* Cinematic dark gradients on top & bottom */}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/80 to-transparent" />

          {/* Floating Verified & Live Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {dj.isLive && (
              <span className="flex items-center gap-1 bg-red-500 text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full uppercase">
                <Radio className="w-2.5 h-2.5 animate-pulse" /> LIVE NOW
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <h2 className="font-display font-black text-2xl tracking-tighter leading-none text-white uppercase">
                  {dj.name}
                </h2>
                {dj.verified && (
                  <span className="w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center text-[10px] text-black font-extrabold shadow-lg shrink-0">
                    ✓
                  </span>
                )}
              </div>
              <p className="text-xs text-cyan-300 font-mono tracking-wider">{dj.genre}</p>
            </div>

            {/* Quick Live Join CTA */}
            {dj.isLive && (
              <button
                onClick={onEnterExperience}
                className="py-1.5 px-3 rounded-full bg-purple-600 hover:bg-purple-500 text-[10px] font-bold text-white uppercase tracking-wider animate-bounce shadow-md border border-purple-500/20"
              >
                Join Live
              </button>
            )}
          </div>
        </div>

        {/* Profiles metadata stats bar */}
        <div className="px-4 mt-4 grid grid-cols-3 gap-2.5">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center shadow-lg">
            <div className="text-[9px] text-white/40 font-mono uppercase tracking-widest">Followers</div>
            <div className="text-xs font-mono font-bold text-white mt-0.5">
              {(dj.followersCount / 1000).toFixed(1)}k
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center shadow-lg">
            <div className="text-[9px] text-white/40 font-mono uppercase tracking-widest">Rating</div>
            <div className="text-xs font-mono font-bold text-purple-400 flex items-center justify-center gap-0.5 mt-0.5">
              <Star className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
              {dj.rating}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center shadow-lg">
            <div className="text-[9px] text-white/40 font-mono uppercase tracking-widest">Sound</div>
            <div className="text-xs font-semibold text-pink-400 mt-0.5 truncate max-w-[80px]">
              {dj.vibe.split(' ')[0] || 'Vibrant'}
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="px-4 mt-6 space-y-2">
          <h3 className="text-xs font-mono font-bold text-white/50 uppercase tracking-widest">Artist Bio</h3>
          <p className="text-white/70 text-xs leading-relaxed text-justify font-sans">
            {dj.bio}
          </p>
        </div>

        {/* Social Links Row */}
        <div className="px-4 mt-5 flex gap-2">
          <a
            href={`https://instagram.com/${dj.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-white/70 hover:text-white"
          >
            <Instagram className="w-4 h-4 text-pink-500" />
            <span>{dj.instagram}</span>
          </a>
          <a
            href={`https://tiktok.com/${dj.tiktok}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-white/70 hover:text-white"
          >
            <span className="text-purple-400 font-extrabold text-xs">𝕏</span>
            <span>{dj.tiktok}</span>
          </a>
        </div>

        {/* Swipeable Photo Gallery row */}
        <div className="mt-6 space-y-3">
          <div className="px-4 flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-white/50 uppercase tracking-widest">Sound Booth Gallery</h3>
            <span className="text-[9px] text-white/30 font-mono">Swipe</span>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 py-1">
            {dj.gallery.map((photo, idx) => (
              <div
                key={idx}
                className="w-40 h-28 shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-md"
              >
                <img
                  src={photo}
                  alt={`Gallery ${idx}`}
                  className="w-full h-full object-cover filter brightness-90 hover:brightness-100 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming events schedule list */}
        <div className="px-4 mt-6 space-y-3">
          <h3 className="text-xs font-mono font-bold text-white/50 uppercase tracking-widest flex items-center gap-1">
            <Calendar className="w-4 h-4 text-purple-400" /> UPCOMING TOUR SCHEDULE
          </h3>

          <div className="space-y-2.5">
            {dj.upcomingEvents.map((event, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-2xl shadow-xl"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white truncate">{event.title}</span>
                  <span className="text-[10px] text-white/50 truncate font-sans">{event.venueName}</span>
                </div>

                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-lg shrink-0">
                  {event.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Global Floating BOOK NOW button */}
        <div className="px-4 mt-6">
          <button
            onClick={onBookNow}
            className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-450 hover:scale-[1.01] rounded-2xl font-display font-black text-xs uppercase tracking-widest text-white shadow-[0_15px_30px_rgba(236,72,153,0.3)] transition-all duration-300"
          >
            BOOK {dj.name.toUpperCase()} FOR EVENT
          </button>
        </div>

      </div>

    </div>
  );
}
