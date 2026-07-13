import React, { useState } from 'react';
import { DJ } from '../types';
import { Calendar, Clock, MapPin, Sparkles, Star, Ticket, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingViewProps {
  dj: DJ;
  onSubmitBooking: (bookingDetails: any) => void;
  showToast: (msg: string) => void;
}

const EVENT_TYPES = [
  { id: 'yacht', label: 'Luxury Yacht Private Party', price: 1800, icon: '🚢' },
  { id: 'gala', label: 'Red Carpet Fashion Gala', price: 2500, icon: '👠' },
  { id: 'mansion', label: 'Exclusive Mansion Takeover', price: 2000, icon: '🏰' },
  { id: 'beach', label: 'VVIP Beach Club Lounge Festival', price: 1500, icon: '🏝️' },
  { id: 'general', label: 'Private VIP Lounge Event', price: 1200, icon: '🥂' }
];

export default function BookingView({ dj, onSubmitBooking, showToast }: BookingViewProps) {
  const [eventType, setEventType] = useState('yacht');
  const [eventDate, setEventDate] = useState('2026-08-15');
  const [eventHours, setEventHours] = useState(4);
  const [eventLocation, setEventLocation] = useState('Vega Alta Beach Club, PR');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Confirmation state
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const selectedEvent = EVENT_TYPES.find(e => e.id === eventType) || EVENT_TYPES[0];
  const totalPrice = selectedEvent.price * eventHours;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const randomTicketId = 'VYBE-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(randomTicketId);
    
    const bookingDetails = {
      id: randomTicketId,
      djId: dj.id,
      eventType: selectedEvent.label,
      date: eventDate,
      hours: eventHours,
      location: eventLocation,
      specialRequests,
      status: 'confirmed'
    };

    onSubmitBooking(bookingDetails);
    setIsConfirmed(true);
    showToast(`VIP Booking requested for ${dj.name}!`);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#050505] text-white overflow-hidden">
      
      <AnimatePresence mode="wait">
        {!isConfirmed ? (
          <motion.div
            key="booking-form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-24 space-y-5"
          >
            {/* Header HUD */}
            <div>
              <h3 className="font-display font-black text-2xl tracking-tighter bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                VIP BOOKINGS
              </h3>
              <p className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
                Retain elite live artists for your private events
              </p>
            </div>

            {/* Selected Artist Summary */}
            <div className="bg-white/5 border border-white/10 rounded-[24px] p-3.5 flex items-center gap-3 shadow-xl">
              <img
                src={dj.avatar}
                alt={dj.name}
                className="w-12 h-12 rounded-full object-cover border border-purple-500/30"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="text-sm font-bold text-white">{dj.name}</h4>
                  <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.2 rounded font-bold">VERIFIED</span>
                </div>
                <p className="text-[10px] text-white/50 font-mono mt-0.5">{dj.genre}</p>
              </div>
            </div>

            {/* Booking Form inputs */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Event Type Grid Select */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
                  1. Elite Event Type
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {EVENT_TYPES.map((evt) => (
                    <button
                      key={evt.id}
                      type="button"
                      onClick={() => setEventType(evt.id)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left ${
                        eventType === evt.id
                          ? 'bg-purple-950/20 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{evt.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-white">{evt.label}</div>
                          <div className="text-[9px] text-white/40 font-mono mt-0.5">${evt.price} / hour rate</div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${eventType === evt.id ? 'text-purple-400 translate-x-1' : 'text-white/40'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Date, hours, and location */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
                    2. Event Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 w-4 h-4 text-gray-550 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-9 pr-2.5 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
                    3. Duration (Hours)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 w-4 h-4 text-gray-550 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    <input
                      type="number"
                      min="1"
                      max="12"
                      required
                      value={eventHours}
                      onChange={(e) => setEventHours(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-9 pr-2.5 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
                  4. Destination / Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 w-4 h-4 text-gray-550 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Beach Club, San Juan, PR"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
                  5. Special VVIP Requests
                </label>
                <textarea
                  rows={2}
                  placeholder="Need custom lasers, smoke machine, private VIP backline system, etc..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* Estimate Summary Ledger */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2.5 shadow-2xl">
                <div className="flex justify-between text-xs text-white/50">
                  <span>VVIP Booking Rate ({eventHours} hrs):</span>
                  <span className="font-mono text-white">${selectedEvent.price * eventHours}</span>
                </div>
                <div className="flex justify-between text-xs text-white/50">
                  <span>Premium Sound System Rider:</span>
                  <span className="font-mono text-emerald-450 font-bold">Included</span>
                </div>
                <div className="border-t border-white/5 pt-2.5 flex justify-between items-center">
                  <span className="text-xs font-bold text-white">Estimated Retainer:</span>
                  <span className="text-base font-mono font-black text-purple-400">${totalPrice.toLocaleString()} USD</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-display font-black text-xs uppercase tracking-widest text-white shadow-[0_10px_20px_rgba(168,85,247,0.3)] active:scale-[0.98] transition-all duration-300"
              >
                REQUEST VIP RESERVATION
              </button>

            </form>
          </motion.div>
        ) : (
          <motion.div
            key="booking-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col justify-center items-center px-6 text-center space-y-6 py-8"
          >
            {/* Visual ticket badge success */}
            <div className="relative">
              <span className="absolute w-24 h-24 rounded-full bg-purple-500/15 animate-ping" />
              <div className="relative w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/30">
                <CheckCircle2 className="w-9 h-9 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-black text-2xl tracking-tighter text-purple-400">
                BOOKING CONFIRMED
              </h3>
              <p className="text-xs text-white/50 max-w-xs leading-relaxed mx-auto">
                Your luxury private event request for {dj.name} has been approved. A VVIP concierge will contact you shortly to finalize event requirements.
              </p>
            </div>

            {/* High-Fidelity Ticketing Stub */}
            <div className="w-full bg-white/5 border border-white/10 rounded-[28px] p-5 space-y-4 relative overflow-hidden text-left shadow-2xl">
              {/* Ticket side notches */}
              <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-[#050505] border-r border-white/10" />
              <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[#050505] border-l border-white/10" />

              <div className="flex justify-between items-start border-b border-dashed border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-950/40 border border-purple-800/30 flex items-center justify-center text-purple-400 text-sm">
                    🎫
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Booking ID</div>
                    <div className="text-xs font-mono font-bold text-white">{ticketId}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-800/40 text-emerald-400 text-[8px] font-mono font-bold rounded">
                    VVIP ACTIVE
                  </span>
                </div>
              </div>

              {/* Ticket Ledger details */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <div className="text-[8px] font-mono text-white/40 uppercase">Artist</div>
                  <div className="font-bold text-white">{dj.name}</div>
                </div>
                <div>
                  <div className="text-[8px] font-mono text-white/40 uppercase">Date</div>
                  <div className="font-bold text-white">{eventDate}</div>
                </div>
                <div>
                  <div className="text-[8px] font-mono text-white/40 uppercase">Duration</div>
                  <div className="font-bold text-white font-mono">{eventHours} Hours</div>
                </div>
                <div>
                  <div className="text-[8px] font-mono text-white/40 uppercase">Rate Tier</div>
                  <div className="font-bold text-purple-400 font-mono">${selectedEvent.price}/hr</div>
                </div>
              </div>

              <div className="border-t border-dashed border-white/10 pt-3 flex justify-between items-center">
                <span className="text-[9px] font-mono text-white/40 uppercase">Total Retainer</span>
                <span className="text-sm font-mono font-bold text-purple-400">${totalPrice.toLocaleString()} USD</span>
              </div>
            </div>

            <button
              onClick={() => setIsConfirmed(false)}
              className="py-2.5 px-6 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold rounded-xl text-white uppercase tracking-wider"
            >
              Configure Another Date
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
