import React from 'react';
import { Users, Radio, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingScreenProps {
  onEnter: () => void;
}

export default function LandingScreen({ onEnter }: LandingScreenProps) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-black overflow-hidden px-6 pb-12 pt-8 text-white">
      
      {/* Background Cinematic Nightlife Imagery Loop / Simulation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95 z-10" />
        <img
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1080"
          alt="Cinematic Nightclub Deck"
          className="w-full h-full object-cover scale-110 blur-[1px] animate-pulse-glow"
          referrerPolicy="no-referrer"
        />
        
        {/* Colorful Laser Beam Lines */}
        <div className="absolute top-0 left-1/4 w-[2px] h-[150%] bg-purple-500/30 blur-[1px] transform -rotate-45 origin-top animate-pulse" />
        <div className="absolute top-0 right-1/4 w-[3px] h-[150%] bg-cyan-400/20 blur-[2px] transform rotate-45 origin-top animate-pulse" />
        <div className="absolute top-1/3 left-1/2 w-[1px] h-[150%] bg-pink-500/20 blur-[1px] transform -rotate-12 origin-top" />
      </div>

      {/* Top Header Brand */}
      <div className="relative z-10 flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <span className="font-display font-black text-base text-white tracking-tighter">V</span>
          </div>
          <span className="font-display font-black tracking-widest text-sm text-white">VYBE</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest uppercase text-white/80 font-bold">2026 KEYNOTE</span>
        </div>
      </div>

      {/* Center Cinematic Card Overlay */}
      <div className="relative z-10 my-auto flex flex-col space-y-6 text-center">
        
        {/* Animated Live Badge */}
        <div className="mx-auto flex items-center gap-1.5 px-4 py-1.5 bg-purple-950/40 border border-purple-500/30 rounded-full shadow-lg shadow-purple-500/10 animate-bounce">
          <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-purple-300 font-bold">
            LIVE NOW
          </span>
        </div>

        {/* Cinematic Title & Venue */}
        <div className="space-y-2">
          <h1 className="font-display font-black text-5xl tracking-tighter leading-none bg-gradient-to-r from-purple-400 via-pink-400 to-orange-450 bg-clip-text text-transparent">
            DJ NOVA
          </h1>
          <p className="text-sm font-semibold tracking-wide text-cyan-400 font-sans uppercase">
            La Terraza • Vega Baja
          </p>
        </div>

        {/* Live Audience Count Pill */}
        <div className="mx-auto flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl shadow-xl">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-mono font-bold text-gray-300">
            243 people connected
          </span>
        </div>
      </div>

      {/* Landing Experience Enter Triggers */}
      <div className="relative z-10 w-full flex flex-col items-center space-y-4">
        
        {/* Large Glowing Button */}
        <button
          onClick={onEnter}
          className="group relative w-full py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-450 rounded-3xl font-display font-black tracking-widest uppercase text-white shadow-[0_15px_30px_rgba(236,72,153,0.3)] transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] focus:outline-none"
        >
          {/* Inner Light Glow */}
          <span className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
            <span className="text-sm text-glow-purple">ENTER EXPERIENCE</span>
          </div>
        </button>

        <p className="text-[10px] text-white/40 font-mono tracking-wider uppercase text-center">
          Tap above to launch live club interaction
        </p>
      </div>

    </div>
  );
}
