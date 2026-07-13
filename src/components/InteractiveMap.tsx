import React, { useState, useEffect, useRef } from 'react';
import { DJ } from '../types';
import { 
  Compass, 
  Users, 
  Radio, 
  MapPin, 
  Search, 
  Sparkles, 
  Music, 
  MessageSquare, 
  Mic, 
  Heart, 
  Calendar 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import L from 'leaflet';

interface InteractiveMapProps {
  djs: DJ[];
  onSelectDj: (dj: DJ) => void;
  onEnterExperience: (dj: DJ, initialOverlay?: 'request' | 'message' | 'karaoke' | 'tip' | 'book' | null) => void;
}

export default function InteractiveMap({ djs, onSelectDj, onEnterExperience }: InteractiveMapProps) {
  const [selectedDj, setSelectedDj] = useState<DJ | null>(djs[0] || null);
  const [activeFilter, setActiveFilter] = useState<string>('Live Now');
  const [showOptionsSheet, setShowOptionsSheet] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const filters = ['Live Now', 'Trending', 'Distance', 'Melodic Techno', 'Afro House', 'Hip-Hop'];

  const getFilteredDjs = () => {
    if (activeFilter === 'Live Now') return djs.filter(d => d.isLive);
    if (activeFilter === 'Melodic Techno') return djs.filter(d => d.genre.includes('Techno'));
    if (activeFilter === 'Afro House') return djs.filter(d => d.genre.includes('Afro'));
    if (activeFilter === 'Hip-Hop') return djs.filter(d => d.genre.includes('Hip-Hop'));
    return djs;
  };

  const filteredDjs = getFilteredDjs();

  // Range helper (DJ Nova at 0.2 mi is nearby; others are out of range for direct booth interaction)
  const isSelectedDjNearby = selectedDj 
    ? (selectedDj.id === 'dj-nova' || parseFloat(selectedDj.distance) < 0.5) 
    : false;

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center map around Puerto Rico coordinates to comfortably encompass Vega Baja, San Juan, and Condado
    const map = L.map(mapContainerRef.current, {
      center: [18.4550, -66.2500],
      zoom: 11,
      zoomControl: false,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Add Premium free CartoDB Dark Matter tile layer for an amazing high-contrast dark cyberpunk styling
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20
    }).addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Render Markers (runs whenever the filtered DJs or selected DJ change)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers to prevent duplicates
    Object.keys(markersRef.current).forEach(key => {
      const marker = markersRef.current[key];
      if (marker) {
        marker.remove();
      }
    });
    markersRef.current = {};

    // A. Add User Location Marker (Cyan Glow)
    const userLatLng: L.LatLngExpression = [18.4452, -66.3875];
    const userIcon = L.divIcon({
      html: `
        <div class="flex flex-col items-center">
          <div class="relative flex items-center justify-center">
            <span class="absolute w-5 h-5 rounded-full bg-cyan-500/30 animate-ping" style="animation-duration: 2.5s"></span>
            <span class="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]"></span>
          </div>
          <span class="text-[9px] font-mono font-bold text-cyan-400 mt-1.5 bg-[#09090b]/90 px-1.5 py-0.5 rounded border border-cyan-500/20 whitespace-nowrap shadow-md">Mi Ubicación</span>
        </div>
      `,
      className: 'custom-user-marker',
      iconSize: [60, 40],
      iconAnchor: [30, 10]
    });

    const userMarker = L.marker(userLatLng, { icon: userIcon }).addTo(map);
    markersRef.current['user'] = userMarker;

    // B. Add DJ Markers
    const djCoords: Record<string, L.LatLngExpression> = {
      'dj-nova': [18.4430, -66.3980],
      'dj-kora': [18.4615, -66.1150],
      'dj-shadow': [18.4550, -66.0720]
    };

    const markerColors: Record<string, string> = {
      'dj-nova': '#a855f7', // purple
      'dj-kora': '#06b6d4', // cyan
      'dj-shadow': '#ec4899' // pink
    };

    filteredDjs.forEach(dj => {
      const coords = djCoords[dj.id] || [18.4550, -66.2500];
      const isSelected = selectedDj?.id === dj.id;
      const color = markerColors[dj.id] || '#a855f7';

      // Custom high-tech glowing divIcon with DJ avatar picture
      const djIcon = L.divIcon({
        html: `
          <div class="relative flex flex-col items-center group transition-all duration-300">
            <!-- Pulsing Circle Glow -->
            <span class="absolute -top-1 w-14 h-14 rounded-full animate-ping ${isSelected ? 'opacity-50' : 'opacity-0'}" style="background-color: ${color}; animation-duration: 3s"></span>
            
            <!-- Avatar Ring -->
            <div class="relative w-11 h-11 rounded-full p-[2px] transition-all duration-300 border border-black shadow-lg" style="background: ${isSelected ? `linear-gradient(135deg, ${color}, #ffffff)` : 'linear-gradient(135deg, #27272a, #09090b)'}">
              <img src="${dj.avatar}" class="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
              <!-- Live indicator dot -->
              ${dj.isLive ? `
                <span class="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-black"></span>
                </span>
              ` : ''}
            </div>

            <!-- Custom DJ Name Badge -->
            <div class="mt-1 bg-[#09090b]/95 border border-zinc-800/80 px-2 py-0.5 rounded shadow-md text-[8px] font-mono font-bold tracking-tight text-white whitespace-nowrap">
              ${dj.name}
            </div>
          </div>
        `,
        className: 'custom-dj-marker',
        iconSize: [60, 65],
        iconAnchor: [30, 30]
      });

      const marker = L.marker(coords, { icon: djIcon })
        .addTo(map)
        .on('click', () => {
          setSelectedDj(dj);
          map.panTo(coords, { animate: true, duration: 0.5 });
        });

      markersRef.current[dj.id] = marker;
    });

  }, [filteredDjs, selectedDj]);

  // 3. Pan map on selectedDJ external changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedDj) return;

    const djCoords: Record<string, L.LatLngExpression> = {
      'dj-nova': [18.4430, -66.3980],
      'dj-kora': [18.4615, -66.1150],
      'dj-shadow': [18.4550, -66.0720]
    };

    const coords = djCoords[selectedDj.id];
    if (coords) {
      map.panTo(coords, { animate: true, duration: 0.5 });
    }
  }, [selectedDj]);

  return (
    <div className="relative w-full h-full flex flex-col bg-[#050505]">
      
      {/* Map Header Search HUD */}
      <div className="px-4 pt-3 pb-2 z-[1000] space-y-3 bg-gradient-to-b from-[#050505] via-[#050505]/95 to-transparent shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Compass className="w-5 h-5 text-purple-400 animate-spin-slow" />
            <h3 className="font-display font-black text-lg tracking-tighter uppercase bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              RADAR EN VIVO
            </h3>
          </div>
          <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full font-bold">
            3 ACTIVE VYBES
          </span>
        </div>

        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search venue, DJ or genre..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-9 pr-4 text-xs text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>

        {/* Filter Pills Deck */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold font-sans tracking-wide shrink-0 transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/20 scale-105'
                  : 'bg-white/5 text-white/45 border border-white/10 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Map display box */}
      <div className="relative flex-1 overflow-hidden bg-[#0c0c0e] border-y border-white/5">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Drag Hint Overlay */}
        <div className="absolute bottom-3 left-4 text-[9px] text-white/40 font-mono flex items-center gap-1 z-[1000] bg-black/60 px-2 py-1 rounded border border-white/5 pointer-events-none">
          <MapPin className="w-3 h-3 text-purple-400 animate-pulse" />
          Mapa Interactivo Puerto Rico • GPS Real Activo
        </div>
      </div>

      {/* Floating DJ Premium Card Overlay */}
      <AnimatePresence mode="wait">
        {selectedDj && (
          <motion.div
            key={selectedDj.id}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            className="absolute bottom-4 inset-x-3 z-[1000]"
          >
            {/* Opaque & Premium card box (non-transparent) */}
            <div 
              onClick={() => {
                if (isSelectedDjNearby) {
                  setShowOptionsSheet(true);
                } else {
                  onEnterExperience(selectedDj);
                }
              }}
              className="bg-[#0b0b0e] border-2 border-white/15 rounded-[28px] p-4.5 flex flex-col space-y-3.5 relative overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.95)] cursor-pointer group active:scale-[0.99] transition-transform"
            >
              {/* Premium Subtle Background Glow Accent matching DJ theme color */}
              <div 
                className="absolute -right-12 -top-12 w-32 h-32 rounded-full blur-[40px] opacity-20 pointer-events-none"
                style={{
                  backgroundColor: selectedDj.id === 'dj-nova' ? '#a855f7' : selectedDj.id === 'dj-kora' ? '#06b6d4' : '#ec4899'
                }}
              />
              
              {/* Card Contents */}
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* DJ Portrait with live badge */}
                  <div className="relative w-14 h-14 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-md">
                    <img
                      src={selectedDj.avatar}
                      alt={selectedDj.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-1 left-1 bg-red-500 text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded font-mono text-white flex items-center gap-0.5 uppercase shadow">
                      <Radio className="w-2.5 h-2.5 animate-pulse" /> LIVE
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-display font-black text-base text-white tracking-wide">
                        {selectedDj.name}
                      </h4>
                      {selectedDj.verified && (
                        <span className="w-3.5 h-3.5 bg-cyan-500 rounded-full flex items-center justify-center text-[8px] text-black font-extrabold shadow">
                          ✓
                        </span>
                      )}
                    </div>
                    
                    <span className="text-xs text-white/70 font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                      {selectedDj.venueName}
                    </span>
                    
                    <span className="text-[10px] font-mono text-purple-400 font-bold mt-0.5">
                      {selectedDj.genre}
                    </span>
                  </div>
                </div>

                {/* Distance pill */}
                <div className="flex flex-col items-end shrink-0 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-xl">
                  <span className="text-xs font-black text-white font-mono">{selectedDj.distance}</span>
                  <span className="text-[8px] text-white/50 uppercase tracking-widest font-mono font-bold">Away</span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="relative grid grid-cols-3 gap-2 bg-white/5 border border-white/5 rounded-xl p-2.5 text-center">
                <div>
                  <div className="text-[9px] text-white/40 font-mono uppercase tracking-wider font-bold">Crowd</div>
                  <div className="text-xs font-black text-purple-400 font-mono flex items-center justify-center gap-1 mt-0.5">
                    <Users className="w-3 h-3" />
                    {selectedDj.audienceCount}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-white/40 font-mono uppercase tracking-wider font-bold">Sound</div>
                  <div className="text-xs font-bold text-pink-400 truncate max-w-[90px] mt-0.5">{selectedDj.vibe.split('&')[0]}</div>
                </div>
                <div>
                  <div className="text-[9px] text-white/40 font-mono uppercase tracking-wider font-bold">Vibe</div>
                  <div className="text-xs font-black text-orange-400 flex items-center justify-center gap-0.5 font-mono mt-0.5">
                    <Sparkles className="w-2.5 h-2.5 text-orange-400" /> HOT
                  </div>
                </div>
              </div>

              {/* Range Status Bar */}
              <div className="relative flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-mono">
                {isSelectedDjNearby ? (
                  <>
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      DENTRO DEL RANGO
                    </span>
                    <span className="text-purple-300 font-bold animate-pulse">
                      TOCA PARA OPCIONES DE CABINA ⚡
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-amber-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      FUERA DE RANGO
                    </span>
                    <span className="text-white/40">
                      Entrar en modo espectador 👁️
                    </span>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="relative flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDj(selectedDj);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold text-white tracking-wide transition-colors"
                >
                  Perfil DJ
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSelectedDjNearby) {
                      setShowOptionsSheet(true);
                    } else {
                      onEnterExperience(selectedDj);
                    }
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:brightness-110 text-xs font-black tracking-wider uppercase text-white shadow-lg transition-all duration-300"
                >
                  {isSelectedDjNearby ? 'Ver Opciones' : 'Ver Stream'}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Sheet Modal for Nearby DJ Booth Options */}
      <AnimatePresence>
        {showOptionsSheet && selectedDj && (
          <div className="absolute inset-0 z-[2000] bg-black/75 backdrop-blur-md flex items-end justify-center">
            {/* Tap backdrop to close */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setShowOptionsSheet(false)} />
            
            {/* Bottom Sheet Container */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative w-full bg-[#0a0a0d] border-t border-zinc-800 rounded-t-[32px] p-6 pb-8 space-y-5 z-[2100] shadow-[0_-20px_50px_rgba(0,0,0,0.9)] max-h-[85vh] overflow-y-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Pull handle indicator */}
              <div className="mx-auto w-12 h-1.5 bg-zinc-800 rounded-full mb-1" />

              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-purple-500/40 shadow-inner shrink-0">
                  <img src={selectedDj.avatar} alt={selectedDj.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="font-display font-black text-base text-white tracking-wider uppercase">
                    🎛️ CABINA DE {selectedDj.name}
                  </h3>
                  <p className="text-[11px] text-purple-400 font-bold uppercase tracking-wider">
                    {selectedDj.venueName} • Enlace Físico Activo
                  </p>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex gap-2.5">
                <span className="text-base shrink-0">🟢</span>
                <p className="text-[10px] text-zinc-300 leading-relaxed">
                  Estás a solo <strong>{selectedDj.distance}</strong>. Tienes enlace preferencial a la cabina. Elige una acción interactiva en tiempo real:
                </p>
              </div>

              {/* Options list */}
              <div className="grid grid-cols-1 gap-2.5">
                <button
                  onClick={() => {
                    onEnterExperience(selectedDj, 'request');
                    setShowOptionsSheet(false);
                  }}
                  className="flex items-center justify-between p-3.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800/80 hover:border-purple-500/30 rounded-xl transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                      <Music className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <div className="text-xs font-black text-white">Pedir una Canción</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">Agrega peticiones a la playlist de la noche</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/10">PEDIR</span>
                </button>

                <button
                  onClick={() => {
                    onEnterExperience(selectedDj, 'message');
                    setShowOptionsSheet(false);
                  }}
                  className="flex items-center justify-between p-3.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800/80 hover:border-cyan-500/30 rounded-xl transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <div className="text-xs font-black text-white">Enviar Mensaje / Shoutout</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">Envía felicitaciones directas a las pantallas del club</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/10">MENSAJE</span>
                </button>

                <button
                  onClick={() => {
                    onEnterExperience(selectedDj, 'karaoke');
                    setShowOptionsSheet(false);
                  }}
                  className="flex items-center justify-between p-3.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800/80 hover:border-pink-500/30 rounded-xl transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform">
                      <Mic className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <div className="text-xs font-black text-white">Subirse al Escenario (Karaoke)</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">Fila de espera para cantar en el soundstage principal</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/10">CANTAR</span>
                </button>

                <button
                  onClick={() => {
                    onEnterExperience(selectedDj, 'tip');
                    setShowOptionsSheet(false);
                  }}
                  className="flex items-center justify-between p-3.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800/80 hover:border-orange-500/30 rounded-xl transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:scale-105 transition-transform">
                      <Heart className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <div className="text-xs font-black text-white">Apoyar con Propina</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">Apoya el set y pide prioridad de atención</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/10">TIP DJ</span>
                </button>

                <button
                  onClick={() => {
                    onEnterExperience(selectedDj, 'book');
                    setShowOptionsSheet(false);
                  }}
                  className="flex items-center justify-between p-3.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800/80 hover:border-emerald-500/30 rounded-xl transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <Calendar className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <div className="text-xs font-black text-white">Contratar DJ (Booking)</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">Reserva una fecha de evento directamente con {selectedDj.name}</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10">RESERVAR</span>
                </button>
              </div>

              {/* Close and spectate buttons */}
              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={() => {
                    onEnterExperience(selectedDj);
                    setShowOptionsSheet(false);
                  }}
                  className="flex-1 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-black tracking-wider uppercase text-white rounded-xl transition-colors"
                >
                  Solo Ver Transmisión 👁️
                </button>
                <button
                  onClick={() => setShowOptionsSheet(false)}
                  className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 text-xs font-bold text-zinc-400 rounded-xl transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
