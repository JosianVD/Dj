import React from 'react';
import { Venue, DJ } from '../types';
import { MapPin, Star, Flame, Calendar, GlassWater, Images, MessageSquare } from 'lucide-react';

interface VenueViewProps {
  venue: Venue;
  allDjs: DJ[];
  onSelectDj: (dj: DJ) => void;
  onSelectVenue: (venueId: string) => void;
}

export default function VenueView({ venue, allDjs, onSelectDj, onSelectVenue }: VenueViewProps) {
  // Cross reference active DJ details
  const activeDj = allDjs.find(d => d.id === venue.currentDJId);

  // Weekly line-up mockup
  const weeklySchedule = [
    { day: 'MON', event: 'Sunset Sessions', dj: 'DJ Nova', active: true },
    { day: 'WED', event: 'Afro Beats Night', dj: 'DJ Kora', active: false },
    { day: 'FRI', event: 'Underground Techno', dj: 'DJ Nova', active: false },
    { day: 'SAT', event: 'Late Night Future Beats', dj: 'DJ Shadow', active: false },
    { day: 'SUN', event: 'Karaoke & Cocktails', dj: 'Live Crowd Stage', active: false }
  ];

  return (
    <div className="relative w-full h-full flex flex-col bg-[#050505] text-white">
      
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 animate-fade-in">
        
        {/* Luxury Hero Image */}
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={venue.heroImage}
            alt={venue.name}
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Cinematic dark gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/60" />

          {/* Location / Rating Tags */}
          <div className="absolute top-4 left-4 flex gap-1.5">
            <span className="bg-white/10 border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-mono text-purple-400 font-bold flex items-center gap-1">
              <MapPin className="w-3 h-3 text-purple-400" />
              {venue.distance} Away
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div>
              <h2 className="font-display font-black text-2xl tracking-tighter leading-none text-white uppercase">
                {venue.name}
              </h2>
              <p className="text-[10px] text-white/50 font-mono mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                {venue.address}
              </p>
            </div>

            <div className="flex items-center gap-1 bg-white/10 border border-white/10 px-2.5 py-1 rounded-full text-xs font-mono font-bold text-purple-400">
              <Star className="w-3.5 h-3.5 text-purple-450 fill-purple-450" />
              {venue.rating}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 mt-5 space-y-2">
          <h3 className="text-xs font-mono font-bold text-white/50 uppercase tracking-widest">ABOUT THE SPACE</h3>
          <p className="text-white/70 text-xs leading-relaxed text-justify font-sans">
            {venue.description}
          </p>
        </div>

        {/* Live Now Stage Link */}
        {activeDj && (
          <div className="px-4 mt-5">
            <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-4 flex justify-between items-center relative overflow-hidden shadow-xl">
              <div className="space-y-1">
                <span className="bg-red-500 text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full uppercase text-white inline-block animate-pulse mb-1">
                  LIVE BOOTH
                </span>
                <h4 className="font-display font-black text-base text-white uppercase">{activeDj.name}</h4>
                <p className="text-[10px] font-mono text-purple-400">{activeDj.genre}</p>
              </div>

              <button
                onClick={() => onSelectDj(activeDj)}
                className="py-2.5 px-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-450 rounded-xl text-xs font-bold text-white tracking-widest uppercase transition-all shrink-0 shadow-[0_10px_20px_rgba(236,72,153,0.3)] hover:scale-[1.01]"
              >
                Connect Live
              </button>
            </div>
          </div>
        )}

        {/* Menu of drink specials */}
        <div className="px-4 mt-6 space-y-3">
          <h3 className="text-xs font-mono font-bold text-white/50 uppercase tracking-widest flex items-center gap-1">
            <GlassWater className="w-4 h-4 text-purple-400" /> SIGNATURE COCKTAILS
          </h3>

          <div className="space-y-2.5">
            {venue.drinkSpecials.map((drink, idx) => {
              const [name, desc] = drink.split(' - ');
              return (
                <div
                  key={idx}
                  className="p-3.5 bg-white/5 border border-white/10 rounded-2xl space-y-1 shadow-lg"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white tracking-wide uppercase">{name}</span>
                    <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-lg">
                      Special Tonight
                    </span>
                  </div>
                  <p className="text-[10px] text-white/50 leading-normal font-sans">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly line-up schedule */}
        <div className="px-4 mt-6 space-y-3">
          <h3 className="text-xs font-mono font-bold text-white/50 uppercase tracking-widest flex items-center gap-1">
            <Calendar className="w-4 h-4 text-purple-400" /> WEEKLY CALENDAR
          </h3>

          <div className="space-y-2">
            {weeklySchedule.map((sched, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3.5 rounded-2xl border shadow-xl ${
                  sched.active
                    ? 'bg-purple-950/20 border-purple-500/30'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                    sched.active
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-[0_5px_15px_rgba(168,85,247,0.4)]'
                      : 'bg-white/5 text-white/50 border border-white/10'
                  }`}>
                    {sched.day}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-white truncate uppercase">{sched.event}</span>
                    <span className="text-[10px] text-white/50 truncate font-sans">{sched.dj}</span>
                  </div>
                </div>

                {sched.active ? (
                  <span className="text-[9px] font-mono font-bold text-purple-400 bg-purple-500/15 border border-purple-500/20 px-2 py-1 rounded">
                    ON STAGE
                  </span>
                ) : (
                  <span className="text-[9px] font-mono text-white/30 font-bold">Reserved</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery swipe */}
        <div className="mt-6 space-y-3">
          <div className="px-4 flex justify-between items-center">
            <h3 className="text-xs font-mono font-bold text-white/50 uppercase tracking-widest flex items-center gap-1">
              <Images className="w-4 h-4 text-purple-400" /> VENUE IMAGES
            </h3>
            <span className="text-[9px] text-white/30 font-mono">Pinch to Zoom</span>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 py-1">
            {venue.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className="w-44 h-32 shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-md"
              >
                <img
                  src={imgUrl}
                  alt={`Venue Gallery ${idx}`}
                  className="w-full h-full object-cover filter brightness-90 hover:brightness-100 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews block */}
        <div className="px-4 mt-6 space-y-3">
          <h3 className="text-xs font-mono font-bold text-white/50 uppercase tracking-widest flex items-center gap-1">
            <MessageSquare className="w-4 h-4 text-purple-400" /> REVIEWS
          </h3>

          <div className="space-y-3">
            {venue.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.userAvatar}
                      alt={rev.userName}
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white uppercase">{rev.userName}</span>
                      <span className="text-[9px] text-white/40 font-mono">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-xs font-bold text-purple-400">
                    <Star className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
                    {rev.rating}
                  </div>
                </div>

                <p className="text-xs text-white/60 leading-relaxed italic font-sans">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
