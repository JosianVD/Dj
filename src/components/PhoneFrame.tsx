import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Globe } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  activeDjName?: string;
  dynamicAlert?: string | null;
  onBackToSaaS?: () => void;
}

export default function PhoneFrame({ children, activeDjName, dynamicAlert, onBackToSaaS }: PhoneFrameProps) {
  return (
    <div className="relative min-h-screen w-full bg-[#020203] text-white flex items-center justify-center overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* Immersive Floating Header Pill to return to SaaS page */}
      {onBackToSaaS && (
        <div className="absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-[2000] flex justify-center px-4 w-full max-w-xs sm:max-w-md">
          <button
            onClick={onBackToSaaS}
            className="flex items-center justify-center gap-2 px-5 py-3 w-full rounded-full bg-zinc-950/90 hover:bg-black border border-zinc-800 hover:border-purple-500/50 text-[10px] font-mono font-black tracking-widest text-purple-300 shadow-[0_15px_30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all active:scale-[0.98] uppercase"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400 animate-spin-slow" />
            <span>VOLVER A LA WEB SAAS</span>
          </button>
        </div>
      )}
      
      {/* Deep immersive gradients on the background page canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#3b0764_0%,transparent_55%),radial-gradient(circle_at_85%_80%,#1d4ed8_0%,transparent_55%)] opacity-50 z-0 pointer-events-none" />

      {/* Modern, full-screen card frame with a glass border on desktop, and seamless edge-to-edge fit on mobile */}
      <div className="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl h-screen md:h-[92vh] md:my-auto md:rounded-[32px] md:border md:border-white/10 md:bg-black/90 md:backdrop-blur-xl md:shadow-[0_30px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col justify-between">
        
        {/* Floating Notification Overlay (gorgeous spring popover over any active view) */}
        <AnimatePresence>
          {dynamicAlert && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="absolute top-4 inset-x-4 z-50 flex justify-center pointer-events-none"
            >
              <div className="px-5 py-3 bg-black/95 border border-purple-500/40 rounded-2xl flex items-center gap-3 shadow-[0_15px_35px_rgba(168,85,247,0.4)] max-w-xs md:max-w-sm shrink-0 pointer-events-auto backdrop-blur-md">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shrink-0">
                  <Bell className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-semibold text-white tracking-wide">
                  {dynamicAlert}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clean, edge-to-edge container for the app's content views */}
        <div className="relative w-full h-full bg-[#050505] overflow-hidden flex flex-col">
          {children}
        </div>

      </div>

      {/* Brand Watermark (Desktop Top Left) */}
      <div className="hidden lg:flex absolute top-8 left-8 flex-col items-start opacity-50 z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <span className="font-display font-black text-sm text-white">V</span>
          </div>
          <span className="font-display font-black tracking-widest text-sm text-white">VYBE</span>
        </div>
      </div>

      {/* Brand Watermark (Desktop Bottom Right) */}
      <div className="hidden lg:flex absolute bottom-8 right-8 flex-col items-end opacity-40 hover:opacity-80 transition-opacity duration-300 z-10 pointer-events-none">
        <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-purple-400 font-bold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span>LIVE CLUB INTERACTION PLATFORM</span>
        </div>
        <span className="text-[9px] text-white/40 mt-1 font-sans">© 2026 VYBE. All rights reserved.</span>
      </div>

    </div>
  );
}
