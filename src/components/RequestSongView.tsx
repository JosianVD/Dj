import React, { useState } from 'react';
import { Song } from '../types';
import { Search, Flame, Award, Heart, Check, HelpCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RequestSongViewProps {
  songs: Song[];
  onVote: (songId: string) => void;
  onRequestNew: (title: string, artist: string, isPriority: boolean) => void;
  showToast: (msg: string) => void;
  onShowCheckout: (config: {
    amount: number;
    recipientName: string;
    purpose: string;
    onPaymentSuccess: () => void;
  }) => void;
}

export default function RequestSongView({
  songs,
  onVote,
  onRequestNew,
  showToast,
  onShowCheckout
}: RequestSongViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Trending' | 'Popular Tonight' | 'My Requests'>('Trending');
  
  // Custom request overlay state
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [isPriority, setIsPriority] = useState(false);

  // Filter songs based on search
  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTitle.trim();
    const artist = newArtist.trim();
    if (!title || !artist) return;
    
    if (isPriority) {
      onShowCheckout({
        amount: 5.00,
        recipientName: "DJ Nova",
        purpose: `Priority request for "${title}"`,
        onPaymentSuccess: () => {
          onRequestNew(title, artist, true);
          // Reset and close everything
          setNewTitle('');
          setNewArtist('');
          setIsPriority(false);
          setShowRequestModal(false);
        }
      });
    } else {
      onRequestNew(title, artist, false);
      showToast('Normal Request Submitted!');
      
      // Reset
      setNewTitle('');
      setNewArtist('');
      setIsPriority(false);
      setShowRequestModal(false);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#050505] text-white">
      
      {/* Scrollable Main Deck */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-24 space-y-5">
        
        {/* Header HUD */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-display font-black text-2xl tracking-tighter bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              REQUEST QUEUE
            </h3>
            <p className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
              Live Soundstage
            </p>
          </div>

          <button
            onClick={() => setShowRequestModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-transform text-[10px] font-bold tracking-widest uppercase rounded-xl shadow-[0_10px_20px_rgba(168,85,247,0.3)]"
          >
            + New Request
          </button>
        </div>

        {/* Live Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search artist, track or remix..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
          />
        </div>

        {/* Categories / Pill Filter */}
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          {['Trending', 'Popular Tonight', 'My Requests'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-1 text-xs font-bold tracking-wider uppercase transition-all border-b-2 shrink-0 ${
                activeTab === tab
                  ? 'border-purple-500 text-white font-black'
                  : 'border-transparent text-white/40 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Card Display */}
        <div className="space-y-4">
          {filteredSongs.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-xs font-mono">
              No matching tracks found tonight.
            </div>
          ) : (
            filteredSongs.map((song) => (
              <div
                key={song.id}
                className="group relative flex items-center justify-between p-3.5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-xl"
              >
                {/* Album Art & Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {song.priorityLevel === 'priority' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-pink-500 rounded-full border border-black flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col min-w-0 max-w-[150px] md:max-w-[180px]">
                    <span className="text-sm font-bold text-white truncate">{song.title}</span>
                    <span className="text-xs text-white/50 truncate mt-0.5">{song.artist}</span>
                    
                    {/* Tiny stats bar */}
                    <div className="flex items-center gap-2 mt-1.5">
                      {song.priorityLevel === 'priority' ? (
                        <span className="text-[8px] font-mono font-bold bg-pink-500/20 border border-pink-500/30 px-1 py-0.2 rounded text-pink-400 uppercase">
                          VIP PRIORITY
                        </span>
                      ) : (
                        <span className="text-[8px] font-mono font-bold bg-white/5 border border-white/5 px-1 py-0.2 rounded text-white/40 uppercase">
                          NORMAL
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Vote Action Deck */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-mono font-black text-purple-400">
                      {song.votes}
                    </span>
                    <span className="text-[8px] text-white/40 uppercase font-mono">Votes</span>
                  </div>

                  {/* Vote Button */}
                  <button
                    onClick={() => onVote(song.id)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      song.requestedByMe
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-[0_4px_12px_rgba(147,51,234,0.3)]'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white'
                    }`}
                  >
                    {song.requestedByMe ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Flame className="w-4 h-4 animate-pulse text-purple-400" />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* RENDER POPUP REQUEST MODAL */}
      <AnimatePresence>
        {showRequestModal && (
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
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-display font-extrabold text-xl text-white">
                    Request a Song
                  </h4>
                  <p className="text-[9px] font-mono text-white/40">
                    Live approval by DJ Nova
                  </p>
                </div>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-white/50 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">Song Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rumble"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">Artist / DJ</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Skrillex & Fred Again"
                    value={newArtist}
                    onChange={(e) => setNewArtist(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Priority Selection */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1">
                      <Star className="w-4 h-4 text-pink-400" /> Boost Priority Request
                    </span>
                    <input
                      type="checkbox"
                      checked={isPriority}
                      onChange={(e) => setIsPriority(e.target.checked)}
                      className="w-5 h-5 accent-purple-600 rounded bg-white/5 border-white/10"
                    />
                  </div>
                  <p className="text-[9px] text-white/40 leading-relaxed">
                    Priority requests bypass the voting queue and are highlighted directly on the DJ’s monitor. Tip of $5 included automatically.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-display font-black text-xs uppercase tracking-widest text-white shadow-[0_10px_20px_rgba(168,85,247,0.3)] active:scale-[0.98] transition-all duration-300"
                >
                  Submit Live Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
