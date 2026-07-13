import React, { useState, useEffect } from 'react';
import { DJ } from '../types';
import { Compass, MapPin, Users, Flame, Navigation, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DJDetectionScreenProps {
  djs: DJ[];
  onSelectDj: (dj: DJ) => void;
  onEnterSingle: (dj: DJ) => void;
  onScanComplete: () => void;
}

export default function DJDetectionScreen({ djs, onSelectDj, onEnterSingle, onScanComplete }: DJDetectionScreenProps) {
  const [stage, setStage] = useState<'permission' | 'scanning' | 'results'>('permission');
  const [statusText, setStatusText] = useState('Syncing coordinates...');

  useEffect(() => {
    if (stage === 'scanning') {
      const timers = [
        setTimeout(() => setStatusText('Pulsing sonar channels...'), 600),
        setTimeout(() => setStatusText('Detecting active sound systems...'), 1200),
        setTimeout(() => setStatusText('Found active frequencies nearby!'), 1800),
        setTimeout(() => {
          onScanComplete();
        }, 2200),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [stage]);

  const handleGrantPermission = () => {
    setStage('scanning');
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#050505] text-white overflow-y-auto no-scrollbar p-6">
      
      {/* BACKGROUND DECORATIVE GLOW */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-purple-900/15 via-pink-900/5 to-transparent pointer-events-none z-0" />

      {/* STAGE 1: LOCATION ACCESS PERMISSION REQUEST */}
      <AnimatePresence mode="wait">
        {stage === 'permission' && (
          <motion.div
            key="permission"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="my-auto flex flex-col justify-center items-center space-y-8 relative z-10 py-8"
          >
            {/* Visual Icon Halo */}
            <div className="relative flex items-center justify-center">
              <span className="absolute w-24 h-24 rounded-full bg-purple-500/10 animate-pulse" />
              <div className="relative w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
                <Navigation className="w-8 h-8 text-purple-400 transform rotate-45 animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-3 max-w-xs">
              <h2 className="font-display font-black text-2xl tracking-tighter uppercase">
                DJ DETECTION
              </h2>
              <p className="text-white/50 text-xs leading-relaxed font-sans">
                VYBE automatically detects venues, sound stages, and live DJs currently spinning near your location.
              </p>
            </div>

            {/* Simulated Prompt Container */}
            <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-5 space-y-5 shadow-2xl">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">Share Location Permission</h4>
                  <p className="text-[10px] text-white/40 leading-normal font-sans">
                    This will allow us to map DJ booths and measure audio distances with pixel-perfect accuracy.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleGrantPermission}
                  className="flex-1 py-3.5 px-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-xl text-xs font-bold text-white tracking-widest uppercase font-display shadow-[0_10px_20px_rgba(236,72,153,0.3)] transition-all active:scale-95"
                >
                  Locate Live DJs
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: RADAR SONAR SCANNING */}
        {stage === 'scanning' && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="my-auto flex flex-col justify-center items-center space-y-8 relative z-10"
          >
            {/* Spinning Radar Graphics */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 border border-purple-500/20 rounded-full animate-ping duration-[3000ms]" />
              <div className="absolute inset-4 border border-cyan-500/10 rounded-full animate-pulse" />
              <div className="absolute inset-10 border border-dashed border-zinc-800 rounded-full" />
              
              {/* Center Spinning Indicator */}
              <div className="absolute inset-2 border border-purple-500/10 rounded-full animate-spin-slow">
                <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-purple-500 shadow-lg" />
              </div>
              
              <Compass className="w-10 h-10 text-purple-400 animate-spin-slow" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-sm font-semibold tracking-widest text-cyan-400 font-mono">
                SCANNING LOCAL SPACE
              </h3>
              <p className="text-xs font-mono text-purple-400 font-bold animate-pulse">
                {statusText}
              </p>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: MULTIPLE DJs DISCOVERED LIST */}
        {stage === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col space-y-5 z-10"
          >
            {/* Results Title Banner */}
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-purple-400 uppercase tracking-widest">
                Gps calibration complete
              </span>
              <h3 className="font-display font-black text-2xl tracking-tighter leading-none text-white uppercase">
                DJs Active Nearby
              </h3>
              <p className="text-[11px] text-white/50 font-sans">
                Select an active frequency to join their live club stream.
              </p>
            </div>

            {/* List of DJ Cards */}
            <div className="flex-1 flex flex-col gap-4 py-2">
              {djs.map((dj, index) => (
                <motion.div
                  key={dj.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  onClick={() => onSelectDj(dj)}
                  className="group relative h-40 rounded-[24px] overflow-hidden border border-white/10 bg-white/5 flex flex-col justify-end p-4 cursor-pointer shadow-lg hover:border-purple-500/30 transition-all duration-300"
                >
                  {/* Photo Background overlay */}
                  <img
                    src={dj.heroVideoUrl}
                    alt={dj.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                  {/* Bottom shadow fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex justify-between items-center">
                    {/* Live Indicator */}
                    <span className="flex items-center gap-1 bg-red-500 text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      LIVE
                    </span>

                    {/* Distance pill */}
                    <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-[9px] font-mono text-purple-400 font-bold">
                      {dj.distance}
                    </span>
                  </div>

                  {/* Card Main Body info */}
                  <div className="relative space-y-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-display font-black text-lg text-white group-hover:text-purple-300 transition-colors uppercase">
                          {dj.name}
                        </h4>
                        {dj.verified && (
                          <span className="w-3.5 h-3.5 bg-cyan-400 rounded-full flex items-center justify-center text-[8px] text-black font-extrabold">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-white/55 font-medium">
                        {dj.venueName}
                      </p>
                    </div>

                    {/* Metadata strip */}
                    <div className="flex items-center justify-between text-[10px] text-white/55 pt-1.5 border-t border-white/10 font-mono">
                      <span>{dj.genre}</span>
                      <div className="flex items-center gap-1 text-cyan-400 font-bold">
                        <Users className="w-3 h-3 text-cyan-400" />
                        {dj.audienceCount}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick calibration feedback */}
            <div className="text-[10px] text-white/30 font-mono flex items-center justify-center gap-1.5 pt-2 border-t border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              Calibrated to Vega Baja Global Nodes
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
