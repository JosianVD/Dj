import React, { useState, useEffect } from 'react';
import { Singer } from '../types';
import { Mic, Users, Clock, Flame, Play, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface KaraokeViewProps {
  singers: Singer[];
  onJoinQueue: (name: string, songTitle: string, artist: string) => void;
  showToast: (msg: string) => void;
  isKaraokeActive: boolean;
  setIsKaraokeActive: (active: boolean) => void;
}

export default function KaraokeView({
  singers,
  onJoinQueue,
  showToast,
  isKaraokeActive,
  setIsKaraokeActive
}: KaraokeViewProps) {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  
  // Timer countdown for current singer
  const [secondsLeft, setSecondsLeft] = useState(142); // 2:22 mins left

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          return 240; // reset
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !songTitle.trim() || !songArtist.trim()) return;

    onJoinQueue(userName.trim(), songTitle.trim(), songArtist.trim());
    showToast('Success! You are added to the Karaoke queue.');

    setUserName('');
    setSongTitle('');
    setSongArtist('');
    setShowJoinModal(false);
  };

  // Current singer (usually head of list)
  const currentSinger = singers[0] || { name: 'Sarah & Carlos', songTitle: 'Cold Heart', artist: 'Elton John & Dua Lipa' };
  const queueSingers = singers.slice(1);

  // Total estimated wait time
  const totalWait = singers.reduce((acc, singer) => acc + singer.waitMinutes, 0);

  if (!isKaraokeActive) {
    return (
      <div className="relative w-full h-full flex flex-col bg-[#050505] text-white animate-fade-in justify-center items-center px-6 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.25)]">
          <Mic className="w-10 h-10 opacity-70 animate-pulse" />
        </div>
        
        <div className="space-y-2 max-w-sm">
          <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-widest bg-red-500/15 border border-red-500/20 px-3.5 py-1 rounded-full">
            STAGE INACTIVE
          </span>
          <h3 className="font-display font-black text-2xl tracking-tighter text-white uppercase pt-2">
            KARAOKE IS DEACTIVATED
          </h3>
          <p className="text-xs text-white/50 leading-relaxed">
            The karaoke soundstage is currently closed. Karaoke will become active once the DJ opens the queue from their booth.
          </p>
        </div>

        {/* DJ Simulation Console */}
        <div className="w-full max-w-xs bg-white/5 border border-white/10 rounded-[24px] p-5 space-y-3.5 shadow-2xl mt-4">
          <span className="text-[9px] font-mono text-purple-400 font-bold uppercase tracking-widest block">
            🎛️ DJ CONSOLE SIMULATOR
          </span>
          <p className="text-[10px] text-white/40 leading-normal">
            Simulate DJ action: toggle the Karaoke stage on to test the soundstage flow and sign up!
          </p>
          <button
            onClick={() => {
              setIsKaraokeActive(true);
              showToast("DJ Console: Karaoke Soundstage Activated!");
            }}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:scale-[0.98] transition-transform text-xs font-bold uppercase tracking-widest rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.2)] flex items-center justify-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>ACTIVATE KARAOKE STAGE</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col bg-[#050505] text-white animate-fade-in">
      
      {/* Scrollable container */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-24 space-y-5">
        
        {/* DJ Simulator Quick Toggle (when active) */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-mono text-white/50 uppercase">DJ Simulator Controls</span>
          </div>
          <button
            onClick={() => {
              setIsKaraokeActive(false);
              showToast("DJ Console: Karaoke Soundstage Deactivated.");
            }}
            className="text-[9px] font-mono font-bold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 px-2.5 py-1 rounded transition-colors"
          >
            DEACTIVATE STAGE
          </button>
        </div>

        {/* Header HUD */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-display font-black text-2xl tracking-tighter bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              LIVE KARAOKE
            </h3>
            <p className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
              Join the soundstage queue
            </p>
          </div>

          <button
            onClick={() => setShowJoinModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-transform text-[10px] font-bold tracking-widest uppercase rounded-xl shadow-[0_10px_20px_rgba(168,85,247,0.3)] flex items-center gap-1.5"
          >
            <Mic className="w-3.5 h-3.5 text-white" />
            <span>Join Queue</span>
          </button>
        </div>

        {/* Current Singer (Hero visualizer card) */}
        <div className="relative rounded-[28px] overflow-hidden border border-purple-500/30 bg-gradient-to-b from-purple-950/20 to-zinc-950 p-5 space-y-4 shadow-xl">
          {/* Neon abstract visual grid behind */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#a855f7 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          
          <div className="relative flex justify-between items-start">
            <span className="flex items-center gap-1.5 bg-purple-600 text-[8px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              ON THE STAGE
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-400 bg-purple-950/40 border border-purple-800/30 px-2 py-0.5 rounded-lg">
              <Clock className="w-3.5 h-3.5 animate-spin-slow" />
              {formatTime(secondsLeft)} Left
            </div>
          </div>

          {/* Singer details */}
          <div className="relative space-y-1">
            <h4 className="text-sm font-semibold text-white/50 font-mono tracking-wider uppercase">Active Performer</h4>
            <div className="text-2xl font-display font-black tracking-wide text-white leading-none uppercase">
              {currentSinger.name}
            </div>
            
            {/* Song details */}
            <div className="flex items-center gap-2 text-cyan-300 pt-1">
              <Disc className="w-4 h-4 text-cyan-400 animate-spin-slow" />
              <span className="text-xs font-bold font-sans">{currentSinger.songTitle}</span>
              <span className="text-[10px] text-white/40 font-mono">by {currentSinger.artist}</span>
            </div>
          </div>

          {/* Audio Equalizer Simulation Animation */}
          <div className="relative h-6 flex items-end gap-1 pt-1 justify-center opacity-70">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="w-1 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full animate-pulse"
                style={{
                  height: `${Math.floor(Math.random() * 100) + 1}%`,
                  animationDuration: `${0.4 + i * 0.08}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Global Wait Info Stats bar */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-3 shadow-lg">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] text-white/40 font-mono uppercase tracking-wider">Queue Count</div>
              <div className="text-xs font-bold text-white font-mono">{singers.length} Singers</div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-3 shadow-lg">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] text-white/40 font-mono uppercase tracking-wider">Est. Wait</div>
              <div className="text-xs font-bold text-white font-mono">~ {totalWait} mins</div>
            </div>
          </div>
        </div>

        {/* The Queue Stream */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1">
            <Mic className="w-3.5 h-3.5 text-purple-400" /> UPCOMING LINEUP
          </span>

          <div className="space-y-2.5">
            {queueSingers.length === 0 ? (
              <div className="text-center py-6 text-gray-650 text-xs font-mono">
                Lineup is currently empty. Be the first to join!
              </div>
            ) : (
              queueSingers.map((singer, index) => (
                <div
                  key={singer.id}
                  className="flex items-center justify-between p-3.5 bg-white/5 border border-white/10 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    {/* Index marker */}
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-white/60 shrink-0">
                      #{index + 2}
                    </div>

                    <div className="flex flex-col min-w-0 max-w-[170px]">
                      <span className="text-xs font-bold text-white truncate">{singer.name}</span>
                      <span className="text-[10px] text-white/50 truncate font-mono mt-0.5">
                        {singer.songTitle} • <span className="text-white/30">{singer.artist}</span>
                      </span>
                    </div>
                  </div>

                  {/* Estimated Wait Pill */}
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded-lg border border-purple-500/20">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    {singer.waitMinutes} min wait
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* RENDER JOIN QUEUE MODAL */}
      <AnimatePresence>
        {showJoinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 z-50 flex flex-col justify-end p-4 pb-28"
          >
            <motion.div
              initial={{ y: 150 }}
              animate={{ y: 0 }}
              exit={{ y: 150 }}
              className="bg-[#050505] border border-white/10 rounded-[32px] p-6 space-y-5 shadow-2xl max-h-[75vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-display font-black text-xl text-white uppercase">
                    Join Karaoke Queue
                  </h4>
                  <p className="text-[9px] font-mono text-white/40">
                    Host: DJ Nova • Sound Stage 1
                  </p>
                </div>
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-white/50 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Form details */}
              <form onSubmit={handleJoin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">Your Name / Group Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gaby & Thomas"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">Song Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cold Heart"
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">Original Artist</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elton John & Dua Lipa"
                    value={songArtist}
                    onChange={(e) => setSongArtist(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-display font-black text-xs uppercase tracking-widest text-white shadow-[0_10px_20px_rgba(168,85,247,0.3)]"
                >
                  Join Live Lineup
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
