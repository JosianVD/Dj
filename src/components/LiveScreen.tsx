import React, { useState, useEffect } from 'react';
import { DJ, Song, Message, Singer } from '../types';
import { Music, MessageSquare, Mic, Heart, Calendar, Users, Radio, ArrowLeft, Disc, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import RequestSongView from './RequestSongView';
import SendMessageView from './SendMessageView';
import KaraokeView from './KaraokeView';
import TipView from './TipView';
import BookingView from './BookingView';
import CheckoutOverlay from './CheckoutOverlay';

interface LiveScreenProps {
  dj: DJ;
  songs: Song[];
  messages: Message[];
  singers: Singer[];
  onBack: () => void;
  onVoteSong: (songId: string) => void;
  onRequestSong: (title: string, artist: string, isPriority: boolean) => void;
  onSendMessage: (category: 'Birthday' | 'Proposal' | 'Anniversary' | 'Shoutout' | 'General', text: string) => void;
  onJoinKaraoke: (name: string, songTitle: string, artist: string) => void;
  onTipSuccess: (amount: number) => void;
  onSubmitBooking: (bookingDetails: any) => void;
  showToast: (msg: string) => void;
  initialOverlay?: 'request' | 'message' | 'karaoke' | 'tip' | 'book' | null;
}

type ActiveOverlay = 'request' | 'message' | 'karaoke' | 'tip' | 'book' | null;

export default function LiveScreen({
  dj,
  songs,
  messages,
  singers,
  onBack,
  onVoteSong,
  onRequestSong,
  onSendMessage,
  onJoinKaraoke,
  onTipSuccess,
  onSubmitBooking,
  showToast,
  initialOverlay
}: LiveScreenProps) {
  const [overlay, setOverlay] = useState<ActiveOverlay>(initialOverlay || null);
  const [isKaraokeActive, setIsKaraokeActive] = useState(false);
  const [checkoutConfig, setCheckoutConfig] = useState<{
    amount: number;
    recipientName: string;
    purpose: string;
    onPaymentSuccess: () => void;
  } | null>(null);

  useEffect(() => {
    if (initialOverlay !== undefined) {
      setOverlay(initialOverlay);
    }
  }, [initialOverlay]);

  const handleDockClick = (tab: ActiveOverlay) => {
    if (overlay === tab) {
      setOverlay(null); // toggle close
    } else {
      setOverlay(tab);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#050505] text-white overflow-hidden">
      
      {/* 1. IMMERSIVE NIGHTCLUB VIDEO SIMULATOR BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src={dj.heroVideoUrl}
          alt="Live DJ Booth Deck"
          className="w-full h-full object-cover filter brightness-[0.45] scale-105 animate-pulse-glow"
          referrerPolicy="no-referrer"
        />
        {/* Dark radial glow overlay to keep text legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-black/80" />
        
        {/* Pulsing Sonar Equalizers */}
        <div className="absolute top-[35%] inset-x-0 h-20 flex items-end justify-center gap-1.5 opacity-35 pointer-events-none px-12">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="w-1 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full animate-pulse"
              style={{
                height: `${Math.floor(Math.random() * 90) + 10}%`,
                animationDuration: `${0.3 + i * 0.05}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* 2. TOP FLOATING NAVIGATION HUB - Vibrant Palette Styling */}
      <div className="relative z-20 flex justify-between items-center px-4 py-3 bg-black/20 backdrop-blur-md border-b border-white/5">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all active:scale-90"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Selected DJ Name tag */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1">
            <h2 className="font-display font-black text-sm tracking-wide text-white uppercase">{dj.name}</h2>
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          </div>
          <span className="text-[9px] font-mono text-white/60 tracking-wider uppercase">{dj.venueName}</span>
        </div>

        {/* Live connected badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
          <span>{dj.audienceCount} Live</span>
        </div>
      </div>

      {/* 3. CENTER SCREEN IMMERSIVE HUD (Visible when no overlay is open) */}
      <div className="relative z-10 flex-1 flex flex-col justify-between p-6">
        
        {/* Top Sound Track Display */}
        <AnimatePresence>
          {!overlay && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-auto bg-white/5 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex items-center gap-3 shadow-2xl max-w-xs"
            >
              <Disc className="w-8 h-8 text-purple-400 animate-spin-slow shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-[8px] font-mono text-purple-400 font-bold uppercase tracking-widest">NOW SPINNING</span>
                <span className="text-xs font-bold text-white truncate">Move (Original Mix)</span>
                <span className="text-[9px] text-white/50 truncate">Adam Port, Stryv, Keinemusik</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Vibe Indicator */}
        <AnimatePresence>
          {!overlay && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="my-auto text-center space-y-2 select-none"
            >
              <div className="text-[10px] font-mono tracking-widest uppercase text-purple-400 font-black">
                CURRENT VYBE LEVEL
              </div>
              <h1 className="font-display font-black text-5xl tracking-tighter leading-none text-glow-purple bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                {dj.vibe.toUpperCase()}
              </h1>
              <div className="flex justify-center items-center gap-1.5 pt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">Soundstage Connected</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Tips Goal Summary card */}
        <AnimatePresence>
          {!overlay && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-[24px] space-y-2 shadow-2xl"
            >
              <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                <span className="text-purple-400">DJ NOVA SET GOAL</span>
                <span className="text-white/60">76% Raised</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" style={{ width: '76%' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* 4. IMMERSIVE SLIDING INTERACTIVE OVERLAYS */}
      <AnimatePresence>
        {overlay && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 24, stiffness: 150 }}
            className="absolute inset-x-0 bottom-0 top-20 z-30 bg-[#050505]/95 rounded-t-[36px] border-t border-white/10 overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Top Close Drag Handler Pill */}
            <div className="w-full flex justify-center py-3 shrink-0">
              <button
                onClick={() => setOverlay(null)}
                className="w-14 h-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              />
            </div>

            {/* Dynamic View Injection */}
            <div className="flex-1 overflow-hidden bg-[#050505]/60">
              {overlay === 'request' && (
                <RequestSongView
                  songs={songs}
                  onVote={onVoteSong}
                  onRequestNew={onRequestSong}
                  showToast={showToast}
                  onShowCheckout={(config) => setCheckoutConfig(config)}
                />
              )}
              {overlay === 'message' && (
                <SendMessageView
                  messages={messages}
                  onSendMessage={onSendMessage}
                  showToast={showToast}
                />
              )}
              {overlay === 'karaoke' && (
                <KaraokeView
                  singers={singers}
                  onJoinQueue={onJoinKaraoke}
                  showToast={showToast}
                  isKaraokeActive={isKaraokeActive}
                  setIsKaraokeActive={setIsKaraokeActive}
                />
              )}
              {overlay === 'tip' && (
                <TipView
                  dj={dj}
                  onTipSuccess={onTipSuccess}
                  showToast={showToast}
                  onShowCheckout={(config) => setCheckoutConfig(config)}
                />
              )}
              {overlay === 'book' && (
                <BookingView
                  dj={dj}
                  onSubmitBooking={onSubmitBooking}
                  showToast={showToast}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. FLOATING 5-BUTTON DOCK (BOTTOM DOCK) - Vibrant Theme */}
      <div className="absolute bottom-6 inset-x-4 z-40 bg-white/10 backdrop-blur-2xl border border-white/20 p-2.5 rounded-full shadow-2xl flex items-center justify-between">
        
        {/* Request Song */}
        <button
          onClick={() => handleDockClick('request')}
          className={`w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all ${
            overlay === 'request'
              ? 'bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white scale-110 shadow-lg shadow-pink-500/20'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Music className="w-4.5 h-4.5" />
          <span className="text-[7px] font-mono font-bold mt-0.5">Request</span>
        </button>

        {/* Message DJ */}
        <button
          onClick={() => handleDockClick('message')}
          className={`w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all ${
            overlay === 'message'
              ? 'bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white scale-110 shadow-lg shadow-pink-500/20'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <MessageSquare className="w-4.5 h-4.5" />
          <span className="text-[7px] font-mono font-bold mt-0.5">Message</span>
        </button>

        {/* Live Karaoke */}
        <button
          onClick={() => handleDockClick('karaoke')}
          className={`w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all relative ${
            overlay === 'karaoke'
              ? 'bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white scale-110 shadow-lg shadow-pink-500/20'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Mic className="w-4.5 h-4.5" />
          <span className="text-[7px] font-mono font-bold mt-0.5">Karaoke</span>
          
          {/* Active status indicator badge */}
          <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-black transition-colors duration-300 ${
            isKaraokeActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'
          }`} />
        </button>

        {/* Tip DJ */}
        <button
          onClick={() => handleDockClick('tip')}
          className={`w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all ${
            overlay === 'tip'
              ? 'bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white scale-110 shadow-lg shadow-pink-500/20'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Heart className="w-4.5 h-4.5" />
          <span className="text-[7px] font-mono font-bold mt-0.5">Tip</span>
        </button>

        {/* Book DJ */}
        <button
          onClick={() => handleDockClick('book')}
          className={`w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all ${
            overlay === 'book'
              ? 'bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white scale-110 shadow-lg shadow-pink-500/20'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Calendar className="w-4.5 h-4.5" />
          <span className="text-[7px] font-mono font-bold mt-0.5">Book</span>
        </button>

      </div>

      {/* 6. RENDER THE SECURE CHECKOUT FOR DOCK OVERLAYS AT ROOT LEVEL */}
      <AnimatePresence>
        {checkoutConfig && (
          <CheckoutOverlay
            amount={checkoutConfig.amount}
            recipientName={checkoutConfig.recipientName}
            purpose={checkoutConfig.purpose}
            onPaymentSuccess={() => {
              checkoutConfig.onPaymentSuccess();
              setCheckoutConfig(null);
            }}
            onClose={() => setCheckoutConfig(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
