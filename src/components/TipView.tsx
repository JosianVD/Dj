import React, { useState, useEffect } from 'react';
import { DJ } from '../types';
import { CreditCard, DollarSign, Gift, Heart, Sparkles, Star, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TipViewProps {
  dj: DJ;
  onTipSuccess: (amount: number) => void;
  showToast: (msg: string) => void;
  onShowCheckout: (config: {
    amount: number;
    recipientName: string;
    purpose: string;
    onPaymentSuccess: () => void;
  }) => void;
}

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
}

export default function TipView({ dj, onTipSuccess, showToast, onShowCheckout }: TipViewProps) {
  const [tipAmount, setTipAmount] = useState<number | ''>('');
  const [goalAmount, setGoalAmount] = useState(500);
  const [currentTips, setCurrentTips] = useState(384);
  const [supporters, setSupporters] = useState([
    { name: 'Mateo D.', amount: 15, msg: 'Insane set tonight!' },
    { name: 'Elena R.', amount: 10, msg: 'Vibes are incredible!' },
    { name: 'Sofia G.', amount: 5, msg: 'Play some Keinemusik please!' }
  ]);
  
  // Confetti triggering
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);

  const triggerConfetti = () => {
    const colors = ['#a855f7', '#06b6d4', '#ec4899', '#3b82f6', '#f43f5e', '#eab308'];
    const particles: ConfettiParticle[] = Array.from({ length: 45 }).map((_, idx) => ({
      id: Date.now() + idx,
      x: Math.random() * 100, // percentage x
      y: Math.random() * -20 - 10, // start above view
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 6,
      delay: Math.random() * 0.5
    }));
    setConfetti(particles);
    
    // Clear particles after 3.5 seconds
    setTimeout(() => {
      setConfetti([]);
    }, 3500);
  };

  const handleQuickTip = (amount: number) => {
    onShowCheckout({
      amount,
      recipientName: dj.name,
      purpose: "Live DJ Set Tip Support",
      onPaymentSuccess: () => {
        processTip(amount);
      }
    });
  };

  const handleCustomTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipAmount || tipAmount <= 0) return;
    const amount = Number(tipAmount);
    onShowCheckout({
      amount,
      recipientName: dj.name,
      purpose: "Live DJ Set Tip Support",
      onPaymentSuccess: () => {
        processTip(amount);
      }
    });
  };

  const processTip = (amount: number) => {
    // Fire callback
    onTipSuccess(amount);
    triggerConfetti();
    
    // Update local tracker progress
    setCurrentTips((prev) => Math.min(prev + amount, goalAmount + 100));
    
    // Add to supporters stream
    setSupporters((prev) => [
      { name: 'You', amount, msg: 'Tipped the DJ' },
      ...prev.slice(0, 2)
    ]);

    setTipAmount('');
    showToast(`You tipped ${dj.name} $${amount}! Thank you!`);
  };

  const progressPercentage = Math.min((currentTips / goalAmount) * 100, 100);

  return (
    <div className="relative w-full h-full flex flex-col bg-[#050505] text-white overflow-hidden">
      
      {/* RENDER THE CONFETTI OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        {confetti.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-bounce"
            style={{
              left: `${p.x}%`,
              top: '100%',
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              animationDuration: `${1.5 + Math.random() * 1.5}s`,
              animationDelay: `${p.delay}s`,
              transform: `translateY(-${Math.floor(Math.random() * 500) + 300}px) rotate(${Math.random() * 360}deg)`,
              opacity: 0.8,
              transition: 'transform 3s cubic-bezier(0.1, 0.8, 0.3, 1)'
            }}
          />
        ))}
      </div>

      {/* Main content body */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-24 space-y-5 relative z-10">
        
        {/* Header HUD */}
        <div>
          <h3 className="font-display font-black text-2xl tracking-tighter bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            TIP THE DJ
          </h3>
          <p className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
            Support the set live
          </p>
        </div>

        {/* DJ Hero Centerpiece (Portrait + Glowing Halo) */}
        <div className="flex flex-col items-center text-center space-y-3 py-3 relative">
          
          {/* Ambient Glowing Aura */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-purple-600/20 blur-[30px] animate-pulse-glow" />

          <div className="relative w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <img
              src={dj.avatar}
              alt={dj.name}
              className="w-full h-full object-cover rounded-full border-2 border-black"
              referrerPolicy="no-referrer"
            />
            {/* Crown or Star Badge */}
            <span className="absolute -bottom-1 -right-1 w-7 h-7 bg-purple-600 border border-black rounded-full flex items-center justify-center text-white shadow-lg">
              <Gift className="w-3.5 h-3.5 text-glow-purple" />
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-1">
              <h4 className="font-display font-black text-lg tracking-wide text-white uppercase">{dj.name}</h4>
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 animate-pulse" />
            </div>
            <p className="text-xs text-white/50">{dj.venueName}</p>
          </div>
        </div>

        {/* Tonight's Tip Goal Tracker */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-4 space-y-3 shadow-2xl">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> TONIGHT'S GOAL
            </span>
            <span className="text-xs font-mono font-bold text-purple-400">
              ${currentTips} / ${goalAmount}
            </span>
          </div>

          {/* Luxury Progress Bar */}
          <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-1000 shadow-lg"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <p className="text-[10px] text-white/40 font-medium">
            Help the DJ unlock the late-night Extended Encore Set!
          </p>
        </div>

        {/* Quick Tipping Dollar Options */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
            Select Tip Amount
          </span>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 20, 50].map((amt) => (
              <button
                key={amt}
                onClick={() => handleQuickTip(amt)}
                className="py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all text-sm font-mono font-bold text-white shadow-xl"
              >
                ${amt}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Tip Input Form */}
        <form onSubmit={handleCustomTipSubmit} className="space-y-3">
          <div className="relative flex items-center">
            <DollarSign className="absolute left-4 w-4 h-4 text-gray-400" />
            <input
              type="number"
              min="1"
              max="500"
              placeholder="Enter custom tip amount..."
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-9 pr-24 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={!tipAmount}
              className="absolute right-2 py-2 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 disabled:bg-white/5 disabled:text-white/20 text-[10px] font-bold text-white uppercase tracking-wider shadow-[0_4px_12px_rgba(168,85,247,0.3)]"
            >
              SEND TIP
            </button>
          </div>
        </form>

        {/* Recent supporters List */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> RECENT SUPPORTERS
          </span>

          <div className="space-y-2">
            {supporters.map((sup, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-purple-950/40 border border-purple-800/30 flex items-center justify-center text-[10px] font-mono font-bold text-purple-400">
                    {sup.name[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{sup.name}</span>
                    <span className="text-[10px] text-white/40 italic">"{sup.msg}"</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5 uppercase">
                  <Heart className="w-3 h-3 fill-pink-500" /> Propina
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
