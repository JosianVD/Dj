import React, { useState } from 'react';
import { 
  Compass, 
  Users, 
  Radio, 
  Sparkles, 
  MapPin, 
  Music, 
  MessageSquare, 
  Mic, 
  Heart, 
  Calendar, 
  ChevronDown, 
  Check, 
  ArrowRight, 
  Smartphone, 
  Globe, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Layers, 
  Share2, 
  Volume2, 
  Star,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DJ, Venue } from '../types';

interface SaaSHomepageProps {
  onLaunchDemo: (dj?: DJ, initialOverlay?: any) => void;
  djs: DJ[];
  venues: Venue[];
}

export default function SaaSHomepage({ onLaunchDemo, djs, venues }: SaaSHomepageProps) {
  // SaaS Page Interactive States
  const [isAnnual, setIsAnnual] = useState<boolean>(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'dj' | 'venue' | 'clubgoer'>('dj');
  const [demoHovered, setDemoHovered] = useState<boolean>(false);

  // FAQ mock data
  const faqs = [
    {
      q: "¿Cómo funciona la detección por GPS?",
      a: "VYBE utiliza geolocalización de alta precisión. Cuando un asistente entra en el rango de 100 metros del establecimiento (como La Terraza), la aplicación web móvil activa inmediatamente el acceso a la cabina interactiva, sin necesidad de descargas pesadas ni emparejamientos manuales."
    },
    {
      q: "¿Se integra con mi software de DJ (Pioneer, Serato, Traktor)?",
      a: "Sí. VYBE cuenta con un plugin ligero de transmisión en segundo plano que lee los metadatos de Pioneer Rekordbox, Serato DJ Pro y Traktor Scratch, permitiendo mostrar el playlist actual en vivo y gestionar las solicitudes votadas."
    },
    {
      q: "¿Cómo se gestionan las propinas y los pagos?",
      a: "La plataforma utiliza Stripe Connect de grado industrial. Las propinas van directamente a la cuenta conectada del DJ o del local, con transferencias automatizadas e inmediatas. VYBE no retiene fondos de los artistas."
    },
    {
      q: "¿La función de Karaoke requiere hardware especial?",
      a: "No. El local recibe un panel web de administración de lista de espera (Waitlist Panel) que puede proyectarse en cualquier Smart TV, tablet o proyector. Los cantantes se registran escaneando el código QR con su móvil."
    },
    {
      q: "¿Es seguro el sistema de Shoutouts en las pantallas?",
      a: "Completamente. Incluye un motor de filtrado por IA que audita cada mensaje contra spam y lenguaje inapropiado antes de su proyección. Además, la cabina del DJ y el staff del local tienen control total para moderar en tiempo real."
    }
  ];

  // Integrations mock data
  const integrations = [
    { name: 'Pioneer DJ', desc: 'Rekordbox Live Link', logo: '🎧' },
    { name: 'Serato DJ', desc: 'Sincronización de biblioteca', logo: '💿' },
    { name: 'Stripe', desc: 'Propinas y pagos directos', logo: '💳' },
    { name: 'Spotify API', desc: 'Metadatos oficiales de temas', logo: '🟢' },
    { name: 'Instagram', desc: 'Social share automatizado', logo: '📸' },
    { name: 'Apple Music', desc: 'Búsqueda e importación', logo: '🍎' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-zinc-100 overflow-x-hidden font-sans selection:bg-zinc-800 selection:text-white select-none">
      
      {/* Refined, Elegant Background Lighting (Single subtle indigo accent glow instead of rainbow) */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.12)_0%,rgba(9,9,11,0)_70%)] pointer-events-none z-0" />
      <div className="absolute top-[1800px] left-1/4 w-[400px] h-[400px] bg-zinc-800/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-40 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none z-0" />

      {/* 1. MINIMALIST LUXURY HEADER */}
      <header className="sticky top-0 z-[3000] w-full bg-[#09090b]/85 backdrop-blur-md border-b border-zinc-800/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo - Minimal Monochrome with tiny indigo dot */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded bg-white flex items-center justify-center shadow-md">
              <span className="font-display font-black text-base text-black">V</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-display font-black tracking-widest text-sm text-white leading-none">VYBE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              </div>
              <span className="text-[7px] font-mono tracking-widest text-zinc-400 font-bold uppercase mt-0.5">Live Engagement Platform</span>
            </div>
          </div>

          {/* Desktop Nav Links - Very clean, high-contrast, monospaced style */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-wider text-zinc-400 font-mono uppercase">
            <a href="#features" className="hover:text-white transition-colors">Características</a>
            <a href="#workflow" className="hover:text-white transition-colors">Cómo Funciona</a>
            <a href="#integrations" className="hover:text-white transition-colors">Ecosistema</a>
            <a href="#pricing" className="hover:text-white transition-colors">Precios</a>
            <a href="#faq" className="hover:text-white transition-colors">Preguntas</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onLaunchDemo()}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-[11px] font-mono text-zinc-300 tracking-wider font-bold transition-all"
            >
              <Smartphone className="w-3.5 h-3.5 text-zinc-400" />
              Demo Móvil
            </button>
            <button 
              onClick={() => onLaunchDemo()}
              className="px-4.5 py-2 rounded bg-white hover:bg-zinc-200 text-black text-[11px] font-mono tracking-widest uppercase font-bold transition-all active:scale-[0.98] shadow-sm"
            >
              Probar Demo ⚡
            </button>
          </div>

        </div>
      </header>

      {/* 2. ELEVATED HERO SECTION */}
      <section className="relative pt-20 pb-24 px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column Copy - High end typography */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Live Counter Badge - Discrete silver matte design */}
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[9px] font-mono font-bold text-zinc-300 uppercase tracking-widest">
                Nightlife Tech • Puerto Rico
              </span>
            </div>

            {/* Headline - No neon gradients, just premium black-and-white visual weight */}
            <div className="space-y-4">
              <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-[1.05] text-white">
                La experiencia interactiva definitiva en cabina.
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl font-sans">
                VYBE permite a los asistentes de un club solicitar música, enviar dedicatorias en vivo a las pantallas del local, sumarse a listas de Karaoke y aportar propinas al DJ, todo en tiempo real desde el GPS de su celular sin instalar aplicaciones.
              </p>
            </div>

            {/* Realtime Stats Grid - Clean Slate lines */}
            <div className="grid grid-cols-3 gap-6 border-y border-zinc-800/80 py-6.5 font-mono">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-white">12,400+</div>
                <div className="text-[9px] uppercase text-zinc-400 font-bold tracking-wider">Peticiones Exitosas</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-white">$34,800+</div>
                <div className="text-[9px] uppercase text-zinc-400 font-bold tracking-wider">Propinas Recibidas</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-white">98.2%</div>
                <div className="text-[9px] uppercase text-zinc-400 font-bold tracking-wider">Tasa de Retención</div>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => onLaunchDemo()}
                onMouseEnter={() => setDemoHovered(true)}
                onMouseLeave={() => setDemoHovered(false)}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded bg-white hover:bg-zinc-200 text-black text-xs font-mono tracking-widest uppercase font-bold transition-all shadow-lg"
              >
                <Zap className="w-3.5 h-3.5" />
                Lanzar Aplicación Demo
                <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${demoHovered ? 'translate-x-1' : ''}`} />
              </button>
              
              <a 
                href="#features"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-mono text-zinc-300 tracking-widest uppercase font-bold transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-zinc-400" />
                Ver Características
              </a>
            </div>

            {/* Rating Badges */}
            <div className="flex items-center gap-5 pt-1">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 text-zinc-300 fill-zinc-300" />
                ))}
              </div>
              <span className="text-[10px] font-mono text-zinc-500 font-bold tracking-wider uppercase">
                Calificación 4.9/5 por DJs & Clubes de PR
              </span>
            </div>

          </div>

          {/* Right Column - Premium Clean Interface Mockup */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Elegant Minimalist Widget Container (ZINC style) */}
            <div className="relative w-full max-w-sm rounded-2xl border border-zinc-800 bg-[#0c0c0e] p-6 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[40px] rounded-full pointer-events-none" />
              
              <div className="space-y-6 relative">
                
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🎛️</span>
                    <div>
                      <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">CONSOLA DEL DJ</h4>
                      <p className="text-[8px] font-mono text-zinc-500 font-bold uppercase mt-0.5">Panel de Control Activo</p>
                    </div>
                  </div>
                  <span className="text-[8px] font-mono bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-white tracking-wider font-bold">ONLINE</span>
                </div>

                {/* Simulated live feed item 1 */}
                <div className="space-y-2.5">
                  <span className="text-[8px] font-mono text-zinc-500 font-bold tracking-wider uppercase">Petición Reciente</span>
                  
                  <div className="p-3.5 bg-zinc-900/40 rounded border border-zinc-800/80 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🎵</span>
                        <div>
                          <div className="text-xs font-bold text-white">Strobe</div>
                          <div className="text-[9px] text-zinc-400 mt-0.5">Deadmau5</div>
                        </div>
                      </div>
                      <span className="text-[8px] font-mono font-bold text-zinc-300 bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded">Prioridad</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-white h-full w-[80%]" />
                    </div>
                    <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500">
                      <span>Votado por 42 clubbers</span>
                      <span className="text-zinc-300 font-bold">Upvote Activo</span>
                    </div>
                  </div>
                </div>

                {/* Simulated live shoutout item 2 */}
                <div className="space-y-2.5">
                  <span className="text-[8px] font-mono text-zinc-500 font-bold tracking-wider uppercase">Pantalla del Local</span>
                  
                  <div className="p-3 bg-[#09090b] rounded border border-zinc-800/60 flex gap-2.5 items-start">
                    <span className="text-xs text-zinc-500">💬</span>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-zinc-300">Elena Ruiz</span>
                        <span className="text-[8px] font-mono text-zinc-500">11:58 PM</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 italic leading-relaxed">"¡Felicidades a Carlos en la mesa 5! ¡Excelente set de Afro House! ✨"</p>
                    </div>
                  </div>
                </div>

                {/* Interactive Demo Trigger Button */}
                <button
                  onClick={() => onLaunchDemo(djs[0], 'request')}
                  className="w-full py-3 rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-widest transition-all"
                >
                  Probar Solicitud en Vivo ➔
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. TRUST BAR (Monochrome & Clean) */}
      <section className="border-y border-zinc-850 bg-[#09090b] py-10 overflow-hidden z-10 relative">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <p className="text-center text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-widest">
            En producción en los mejores establecimientos de Puerto Rico
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-6 opacity-40 hover:opacity-70 transition-all duration-350">
            <span className="font-display font-black text-sm tracking-[0.25em] text-white">LA TERRAZA</span>
            <span className="font-display font-black text-sm tracking-[0.25em] text-white">VEGA BAJA VIP</span>
            <span className="font-display font-black text-sm tracking-[0.25em] text-white">CONDADO ROOFTOP</span>
            <span className="font-display font-black text-sm tracking-[0.25em] text-white">SAN JUAN VIBE</span>
            <span className="font-display font-black text-sm tracking-[0.25em] text-white">ISLA VERDE BEATS</span>
          </div>
        </div>
      </section>

      {/* 4. FEATURES BENTO GRID (Elegant zinc layout) */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto z-10 relative space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono font-bold text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full uppercase tracking-widest">
            Tecnología Integrada
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white">
            La cabina de DJ, interactiva.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            Olvídate de la fila física, de gritarle al artista o escribir en papeles sucios. VYBE unifica la noche de forma elegante.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: GPS microfencing */}
          <div className="md:col-span-8 bg-[#0c0c0e] border border-zinc-850 rounded-xl p-8 relative overflow-hidden flex flex-col justify-between group hover:border-zinc-700 transition-all duration-300">
            <div className="space-y-4">
              <span className="w-9 h-9 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                <MapPin className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-display font-black text-white">Geolocalización por Presencia GPS</h3>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-lg">
                Nuestro sistema inteligente de geocercas detecta automáticamente cuando un usuario ingresa al local comercial. Al estar físicamente dentro de la discoteca, se desbloquea el acceso para interactuar en tiempo real.
              </p>
            </div>
            
            <div className="mt-8 p-3 bg-[#09090b] rounded border border-zinc-800 flex items-center justify-between text-[10px] font-mono">
              <span className="text-zinc-400 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                ESTABLECIMIENTO ACTIVO (VEGA BAJA)
              </span>
              <span className="text-zinc-500">Rango de Cobertura ✓</span>
            </div>
          </div>

          {/* Card 2: Song Requests */}
          <div className="md:col-span-4 bg-[#0c0c0e] border border-zinc-850 rounded-xl p-8 relative overflow-hidden flex flex-col justify-between group hover:border-zinc-700 transition-all duration-300">
            <div className="space-y-4">
              <span className="w-9 h-9 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                <Music className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-display font-black text-white">Solicitud de Canciones</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                El público solicita temas autorizados de tu biblioteca, vota por los favoritos de otros y el sistema los clasifica automáticamente por popularidad para el DJ.
              </p>
            </div>
            
            <button 
              onClick={() => onLaunchDemo(djs[0], 'request')}
              className="mt-8 py-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-wider transition-all"
            >
              Probar Módulo ➔
            </button>
          </div>

          {/* Card 3: Screen shoutouts */}
          <div className="md:col-span-4 bg-[#0c0c0e] border border-zinc-850 rounded-xl p-8 relative overflow-hidden flex flex-col justify-between group hover:border-zinc-700 transition-all duration-300">
            <div className="space-y-4">
              <span className="w-9 h-9 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                <MessageSquare className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-display font-black text-white">Mensajes a Pantalla</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Permite a los clientes publicar felicitaciones de cumpleaños o saludos de mesa que se proyectan de forma controlada en las pantallas gigantes del establecimiento.
              </p>
            </div>
            
            <button 
              onClick={() => onLaunchDemo(djs[0], 'message')}
              className="mt-8 py-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-wider transition-all"
            >
              Probar Mensaje ➔
            </button>
          </div>

          {/* Card 4: Tipping */}
          <div className="md:col-span-8 bg-[#0c0c0e] border border-zinc-850 rounded-xl p-8 relative overflow-hidden flex flex-col justify-between group hover:border-zinc-700 transition-all duration-300">
            <div className="space-y-4">
              <span className="w-9 h-9 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                <Heart className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-display font-black text-white">Monetización y Propinas Directas</h3>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-lg">
                Facilita que tus seguidores y clientes VIP te agradezcan el set. Se integra de forma nativa con Apple Pay y tarjetas bancarias. Las propinas caen directamente en la cuenta del DJ, aumentando las ganancias por noche sin comisiones abusivas.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-4 gap-3">
              {[5, 10, 20, 50].map((amt) => (
                <button
                  key={amt}
                  onClick={() => onLaunchDemo(djs[0], 'tip')}
                  className="py-2 bg-[#09090b] hover:bg-zinc-850 border border-zinc-800 rounded text-xs font-mono font-bold text-zinc-300 transition-colors"
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* 5. INTERACTIVE LIVE DASHBOARD MOCK (High Corporate Style) */}
      <section className="py-20 bg-[#070709] border-y border-zinc-850 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Consola Analítica</span>
            <h2 className="font-display font-black text-2xl sm:text-4xl tracking-tight text-white">
              Control absoluto del establecimiento.
            </h2>
            <p className="text-xs text-zinc-400 font-sans">
              DJs y dueños de locales comerciales reciben acceso a una interfaz unificada para supervisar el engagement de cada noche, propinas netas y popularidad de temas.
            </p>
          </div>

          <div className="bg-[#0c0c0e] border border-zinc-800 rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Mock Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800/80 pb-6">
              <div>
                <h3 className="font-display font-black text-sm text-white tracking-widest">VYBE ANALYTICS</h3>
                <p className="text-[9px] font-mono text-zinc-500 font-bold uppercase mt-0.5">La Terraza Club • Puerto Rico</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800">Métrica: Hoy en Vivo</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>

            {/* Grid of Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 pt-6">
              
              <div className="p-4 bg-zinc-900/30 border border-zinc-800/80 rounded space-y-1">
                <span className="text-[8px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Audiencia Conectada</span>
                <div className="text-xl font-black font-mono text-white">243 <span className="text-[10px] font-normal text-zinc-400">▲ 14%</span></div>
                <p className="text-[8px] font-mono text-zinc-500">Clubbers activos por GPS</p>
              </div>

              <div className="p-4 bg-zinc-900/30 border border-zinc-800/80 rounded space-y-1">
                <span className="text-[8px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Temas Solicitados</span>
                <div className="text-xl font-black font-mono text-white">78 <span className="text-[10px] font-normal text-zinc-400">▲ 32%</span></div>
                <p className="text-[8px] font-mono text-zinc-500">Peticiones enviadas a cola</p>
              </div>

              <div className="p-4 bg-zinc-900/30 border border-zinc-800/80 rounded space-y-1">
                <span className="text-[8px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Propinas Netas</span>
                <div className="text-xl font-black font-mono text-white">$384.00</div>
                <p className="text-[8px] font-mono text-zinc-500">Depósitos directos a Stripe</p>
              </div>

              <div className="p-4 bg-zinc-900/30 border border-zinc-800/80 rounded space-y-1">
                <span className="text-[8px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Satisfacción General</span>
                <div className="text-xl font-black font-mono text-white">96%</div>
                <p className="text-[8px] font-mono text-zinc-500">Votación en pista de baile</p>
              </div>

            </div>

            {/* Mock Charts Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
              
              {/* Left chart mockup: Song votes ranking */}
              <div className="lg:col-span-2 p-5 bg-[#09090b] border border-zinc-800 rounded space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-zinc-400 font-bold tracking-wider uppercase">Ranking de Peticiones del Público</span>
                  <span className="text-[8px] font-mono text-zinc-500">Auto-Actualizado</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2.5">
                    <span className="text-zinc-500 font-mono w-6">#1</span>
                    <span className="text-white font-bold flex-1 pl-2">Keinemusik - Muye (Original Mix)</span>
                    <span className="text-zinc-300 font-mono font-bold">54 votos</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2.5">
                    <span className="text-zinc-500 font-mono w-6">#2</span>
                    <span className="text-white font-bold flex-1 pl-2">Rampa - Les Gout</span>
                    <span className="text-zinc-300 font-mono font-bold">41 votos</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2.5">
                    <span className="text-zinc-500 font-mono w-6">#3</span>
                    <span className="text-white font-bold flex-1 pl-2">Solomun - Home (Club Mix)</span>
                    <span className="text-zinc-300 font-mono font-bold">33 votos</span>
                  </div>
                </div>
              </div>

              {/* Right chart mockup: Live stream activity */}
              <div className="p-5 bg-[#09090b] border border-zinc-800 rounded space-y-4">
                <span className="text-[9px] font-mono text-zinc-400 font-bold tracking-wider uppercase">Porcentaje de Interacción</span>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">🎵 Peticiones</span>
                    <span className="text-white font-bold">45%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-[45%]" />
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">💬 Saludos en Pantalla</span>
                    <span className="text-white font-bold">28%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-[28%]" />
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">🎤 Registros de Karaoke</span>
                    <span className="text-white font-bold">17%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-[17%]" />
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. WORKFLOW / HOW IT WORKS */}
      <section id="workflow" className="py-24 px-6 max-w-7xl mx-auto z-10 relative space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Flujo de Trabajo</span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white">
            Implementación inmediata.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Sin descargas molestas de App Store ni registros extensos por email. Todo funciona mediante enlace web optimizado para móviles de manera instantánea.
          </p>
        </div>

        {/* Selector Tabs (Refined zinc design) */}
        <div className="flex justify-center items-center gap-2 max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('dj')}
            className={`flex-1 py-2 rounded text-xs font-mono font-bold tracking-wider uppercase transition-all ${
              activeTab === 'dj' 
                ? 'bg-white text-black font-bold shadow-sm' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            🎧 Soy DJ
          </button>
          <button
            onClick={() => setActiveTab('venue')}
            className={`flex-1 py-2 rounded text-xs font-mono font-bold tracking-wider uppercase transition-all ${
              activeTab === 'venue' 
                ? 'bg-white text-black font-bold shadow-sm' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            🏢 Soy Venue
          </button>
          <button
            onClick={() => setActiveTab('clubgoer')}
            className={`flex-1 py-2 rounded text-xs font-mono font-bold tracking-wider uppercase transition-all ${
              activeTab === 'clubgoer' 
                ? 'bg-white text-black font-bold shadow-sm' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            🕺 Soy Clubber
          </button>
        </div>

        {/* Dynamic Step Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          
          {activeTab === 'dj' && (
            <>
              {/* DJ Step 1 */}
              <div className="bg-[#0c0c0e] border border-zinc-850 rounded-xl p-6.5 space-y-4 relative overflow-hidden group hover:border-zinc-700 transition-all">
                <span className="absolute top-4 right-6 text-4xl font-mono font-black text-zinc-800/20">01</span>
                <span className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs font-mono">1</span>
                <h4 className="text-base font-display font-black text-white">Crea tu Perfil</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Configura tu cuenta de artista en la plataforma, conecta tus redes sociales y asocia tu cuenta de Stripe para depósitos automáticos de propinas.
                </p>
              </div>

              {/* DJ Step 2 */}
              <div className="bg-[#0c0c0e] border border-zinc-850 rounded-xl p-6.5 space-y-4 relative overflow-hidden group hover:border-zinc-700 transition-all">
                <span className="absolute top-4 right-6 text-4xl font-mono font-black text-zinc-800/20">02</span>
                <span className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs font-mono">2</span>
                <h4 className="text-base font-display font-black text-white">Instala el Integrador</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Utiliza nuestro plugin ligero compatible con Serato o Rekordbox para reflejar automáticamente los temas listos para votación.
                </p>
              </div>

              {/* DJ Step 3 */}
              <div className="bg-[#0c0c0e] border border-zinc-850 rounded-xl p-6.5 space-y-4 relative overflow-hidden group hover:border-zinc-700 transition-all">
                <span className="absolute top-4 right-6 text-4xl font-mono font-black text-zinc-800/20">03</span>
                <span className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs font-mono">3</span>
                <h4 className="text-base font-display font-black text-white">Lanza tu Cabina</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Coloca tu código QR en el stand o proyéctalo. El público escanea y empieza a votar y enviar saludos de forma inmediata.
                </p>
              </div>
            </>
          )}

          {activeTab === 'venue' && (
            <>
              {/* Venue Step 1 */}
              <div className="bg-[#0c0c0e] border border-zinc-850 rounded-xl p-6.5 space-y-4 relative overflow-hidden group hover:border-zinc-700 transition-all">
                <span className="absolute top-4 right-6 text-4xl font-mono font-black text-zinc-800/20">01</span>
                <span className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs font-mono">1</span>
                <h4 className="text-base font-display font-black text-white">Declara tu GPS</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Establece los límites geográficos de tu establecimiento en nuestro panel administrativo para habilitar la geocerca de seguridad.
                </p>
              </div>

              {/* Venue Step 2 */}
              <div className="bg-[#0c0c0e] border border-zinc-850 rounded-xl p-6.5 space-y-4 relative overflow-hidden group hover:border-zinc-700 transition-all">
                <span className="absolute top-4 right-6 text-4xl font-mono font-black text-zinc-800/20">02</span>
                <span className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs font-mono">2</span>
                <h4 className="text-base font-display font-black text-white">Conecta las Pantallas</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Abre nuestro visor web en cualquier Smart TV o pantalla del local para mostrar la cola de Karaoke y los mensajes aprobados.
                </p>
              </div>

              {/* Venue Step 3 */}
              <div className="bg-[#0c0c0e] border border-zinc-850 rounded-xl p-6.5 space-y-4 relative overflow-hidden group hover:border-zinc-700 transition-all">
                <span className="absolute top-4 right-6 text-4xl font-mono font-black text-zinc-800/20">03</span>
                <span className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs font-mono">3</span>
                <h4 className="text-base font-display font-black text-white">Aumenta el Ticket Promedio</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Tus clientes interactúan de forma constante y permanecen un 40% más de tiempo en el local, elevando el consumo de bebidas.
                </p>
              </div>
            </>
          )}

          {activeTab === 'clubgoer' && (
            <>
              {/* Clubgoer Step 1 */}
              <div className="bg-[#0c0c0e] border border-zinc-850 rounded-xl p-6.5 space-y-4 relative overflow-hidden group hover:border-zinc-700 transition-all">
                <span className="absolute top-4 right-6 text-4xl font-mono font-black text-zinc-800/20">01</span>
                <span className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs font-mono">1</span>
                <h4 className="text-base font-display font-black text-white">Llega al Local y Escanea</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Escanea el código QR disponible en las mesas o barra. El GPS integrado de tu navegador validará tu ubicación instantáneamente.
                </p>
              </div>

              {/* Clubgoer Step 2 */}
              <div className="bg-[#0c0c0e] border border-zinc-850 rounded-xl p-6.5 space-y-4 relative overflow-hidden group hover:border-zinc-700 transition-all">
                <span className="absolute top-4 right-6 text-4xl font-mono font-black text-zinc-800/20">02</span>
                <span className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs font-mono">2</span>
                <h4 className="text-base font-display font-black text-white">Vota y Solicita Música</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Envía solicitudes de canciones, apóyate en los upvotes de otros temas, publica saludos en pantalla y regístrate para cantar.
                </p>
              </div>

              {/* Clubgoer Step 3 */}
              <div className="bg-[#0c0c0e] border border-zinc-850 rounded-xl p-6.5 space-y-4 relative overflow-hidden group hover:border-zinc-700 transition-all">
                <span className="absolute top-4 right-6 text-4xl font-mono font-black text-zinc-800/20">03</span>
                <span className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs font-mono">3</span>
                <h4 className="text-base font-display font-black text-white">Sé Parte de la Noche</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Disfruta de un evento personalizado y colaborativo con la música y ambiente bajo el control directo de la comunidad del club.
                </p>
              </div>
            </>
          )}

        </div>

      </section>

      {/* 7. MINIMALIST TESTIMONIALS */}
      <section className="py-20 bg-[#09090b] border-y border-zinc-850 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Testimonios de la Industria</span>
            <h2 className="font-display font-black text-2xl sm:text-4xl tracking-tight text-white">
              Sólido feedback de cabina.
            </h2>
            <p className="text-xs text-zinc-400 font-sans">
              DJs profesionales y gerentes de clubes explican los resultados de incorporar VYBE en sus eventos semanales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 bg-zinc-900/40 border border-zinc-850 rounded-xl space-y-4">
              <div className="flex items-center gap-0.5 text-zinc-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-zinc-400 text-zinc-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 italic leading-relaxed font-sans">
                "VYBE cambió por completo la forma en que interactúo con la pista de baile. El público pide canciones de mi catálogo sin interrumpir físicamente el booth. Las propinas Stripe son fantásticas."
              </p>
              <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
                <img src={djs[0]?.avatar} alt="DJ" className="w-9 h-9 rounded-full object-cover border border-zinc-800" referrerPolicy="no-referrer" />
                <div>
                  <h5 className="text-xs font-mono font-bold text-white">{djs[0]?.name}</h5>
                  <p className="text-[9px] font-mono text-zinc-500">DJ Residente / Melodic Set</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-900/40 border border-zinc-850 rounded-xl space-y-4">
              <div className="flex items-center gap-0.5 text-zinc-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-zinc-400 text-zinc-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 italic leading-relaxed font-sans">
                "La proyección de saludos en tiempo real es el feature más popular de cumpleaños. Las personas permanecen más tiempo en nuestro establecimiento consumiendo mientras esperan su turno o ven saludos."
              </p>
              <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150" alt="Elena" className="w-9 h-9 rounded-full object-cover border border-zinc-800" referrerPolicy="no-referrer" />
                <div>
                  <h5 className="text-xs font-mono font-bold text-white">Elena R.</h5>
                  <p className="text-[9px] font-mono text-zinc-500">Gerente de Operaciones / La Terraza</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-900/40 border border-zinc-850 rounded-xl space-y-4">
              <div className="flex items-center gap-0.5 text-zinc-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-zinc-400 text-zinc-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 italic leading-relaxed font-sans">
                "La geolocalización por coordenadas de satélite valida la presencia perfectamente. Los clubbers se conectan al instante sin contraseñas de Wi-Fi lentas. El soporte técnico ha sido de primera clase."
              </p>
              <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150" alt="Mateo" className="w-9 h-9 rounded-full object-cover border border-zinc-800" referrerPolicy="no-referrer" />
                <div>
                  <h5 className="text-xs font-mono font-bold text-white">Mateo D.</h5>
                  <p className="text-[9px] font-mono text-zinc-500">Coordinador de Eventos VIP</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. INTEGRATIONS ECOSYSTEM */}
      <section id="integrations" className="py-24 px-6 max-w-7xl mx-auto z-10 relative space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Interoperabilidad</span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white">
            Ecosistema de Integraciones.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans">
            VYBE opera en armonía con las herramientas y el hardware que se utiliza comúnmente en la industria musical.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {integrations.map((int, i) => (
            <div 
              key={i}
              className="p-5 bg-[#0c0c0e] border border-zinc-850 hover:border-zinc-700 rounded-xl flex flex-col items-center text-center space-y-3 transition-all"
            >
              <span className="text-2xl">{int.logo}</span>
              <div className="space-y-0.5">
                <h4 className="text-[11px] font-mono font-bold text-white">{int.name}</h4>
                <p className="text-[8px] font-sans text-zinc-500 leading-snug">{int.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. PRICING MODULE (Highly Corporate, No Rainbows) */}
      <section id="pricing" className="py-24 bg-[#070709] border-y border-zinc-850 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono font-bold text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full uppercase tracking-widest">
              Tarifas Transparentes
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white">
              Planes para cada necesidad.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Comienza gratis como artista o escala las funciones para tu establecimiento comercial con nuestras suscripciones mensuales.
            </p>
            
            {/* Monthly/Annual Toggle - Clean zinc pill */}
            <div className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 p-1.5 rounded-lg mt-4">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                  !isAnnual ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                  isAnnual ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Anual <span className="text-[9px] text-zinc-400 font-bold ml-1">(-20%)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Plan 1: DJ Free */}
            <div className="bg-[#0c0c0e] border border-zinc-850 rounded-xl p-8 flex flex-col justify-between space-y-8 hover:border-zinc-800 transition-all">
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-mono font-bold text-zinc-500 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded uppercase tracking-wider">
                    Para Artistas
                  </span>
                  <h4 className="text-xl font-display font-black text-white mt-4">DJ Free</h4>
                  <p className="text-xs text-zinc-500 mt-1 font-sans">Ideal para DJs emergentes o sets ocasionales.</p>
                </div>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-mono font-black text-white">$0</span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">/ Siempre Gratis</span>
                </div>

                <div className="border-t border-zinc-850 pt-6">
                  <ul className="space-y-3 text-xs text-zinc-400 font-sans">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
                      <span>Perfil de DJ público y link único</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
                      <span>Recepción de propinas directas (Stripe)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
                      <span>Hasta 15 peticiones de música por noche</span>
                    </li>
                    <li className="flex items-center gap-2 text-zinc-600 line-through">
                      <Check className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Mensajes ilimitados a pantallas gigantes</span>
                    </li>
                  </ul>
                </div>
              </div>

              <button 
                onClick={() => onLaunchDemo()}
                className="w-full py-3 rounded bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-wider transition-all"
              >
                Comenzar Gratis
              </button>
            </div>

            {/* Plan 2: DJ Pro (Recommended / Selected) */}
            <div className="bg-[#0c0c0e] border border-zinc-750 rounded-xl p-8 flex flex-col justify-between space-y-8 relative hover:border-zinc-600 transition-all shadow-xl">
              <span className="absolute top-0 right-8 transform -translate-y-1/2 text-[8px] font-mono font-black text-black bg-white border border-white px-3 py-1 rounded uppercase tracking-widest">
                Recomendado
              </span>
              
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-mono font-bold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded uppercase tracking-wider">
                    Súper Productor
                  </span>
                  <h4 className="text-xl font-display font-black text-white mt-4">DJ Pro</h4>
                  <p className="text-xs text-zinc-500 mt-1 font-sans">Para DJs activos, residentes y de giras constantes.</p>
                </div>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-mono font-black text-white">
                    ${isAnnual ? '19' : '24'}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">/ Mes</span>
                </div>

                <div className="border-t border-zinc-850 pt-6">
                  <ul className="space-y-3 text-xs text-zinc-400 font-sans">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-white flex-shrink-0" />
                      <span className="text-white font-medium">Peticiones de música ilimitadas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-white flex-shrink-0" />
                      <span className="text-white font-medium">Recepción de propinas (comisión 0%)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
                      <span>Soporte para plugin Serato / Rekordbox</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
                      <span>Exportación de datos de audiencia e emails</span>
                    </li>
                  </ul>
                </div>
              </div>

              <button 
                onClick={() => onLaunchDemo()}
                className="w-full py-3 rounded bg-white hover:bg-zinc-200 text-black text-[10px] font-mono font-bold uppercase tracking-wider transition-all shadow-md"
              >
                Obtener DJ Pro
              </button>
            </div>

            {/* Plan 3: Venue Commercial */}
            <div className="bg-[#0c0c0e] border border-zinc-850 rounded-xl p-8 flex flex-col justify-between space-y-8 hover:border-zinc-800 transition-all">
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-mono font-bold text-zinc-500 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded uppercase tracking-wider">
                    Para Clubes y Bares
                  </span>
                  <h4 className="text-xl font-display font-black text-white mt-4">Venue Premium</h4>
                  <p className="text-xs text-zinc-500 mt-1 font-sans">Licencia comercial completa para locales físicos.</p>
                </div>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-mono font-black text-white">
                    ${isAnnual ? '79' : '99'}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">/ Mes</span>
                </div>

                <div className="border-t border-zinc-850 pt-6">
                  <ul className="space-y-3 text-xs text-zinc-400 font-sans">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
                      <span>Acceso por geocerca de precisión GPS ilimitada</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
                      <span>Canal de visualización de Karaoke y Shoutouts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
                      <span>Consola de moderación automática de seguridad</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-zinc-300 flex-shrink-0" />
                      <span>Estadísticas analíticas de consumo y retención</span>
                    </li>
                  </ul>
                </div>
              </div>

              <button 
                onClick={() => onLaunchDemo()}
                className="w-full py-3 rounded bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-wider transition-all"
              >
                Registrar Mi Local
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 10. FAQS (Refined accordion borders) */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto z-10 relative space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Atención y Soporte</span>
          <h2 className="font-display font-black text-2xl sm:text-4xl tracking-tight text-white">
            Preguntas Frecuentes.
          </h2>
          <p className="text-xs text-zinc-400 font-sans max-w-xl mx-auto">
            ¿Tienes dudas técnicas sobre la implementación de VYBE en tu cabina o club? Revisa las respuestas comunes.
          </p>
        </div>

        <div className="border-t border-zinc-800 divide-y divide-zinc-800/80">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center text-left py-2 font-display font-bold text-sm text-white hover:text-zinc-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${isOpen ? 'rotate-180 text-white' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-zinc-400 font-sans pt-2 pb-3 leading-relaxed max-w-3xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. PREMIUM CONCRETE CTA FOOTER */}
      <footer className="border-t border-zinc-800 bg-[#09090b] py-16 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8 space-y-4">
              <h3 className="font-display font-black text-2xl sm:text-4xl tracking-tight text-white">
                ¿Listo para transformar tus noches de club?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-xl">
                Impulsa la interacción, aumenta la permanencia en tu local y monetiza tu talento como DJ. Pruébalo hoy sin compromisos comerciales.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-start md:justify-end">
              <button
                onClick={() => onLaunchDemo()}
                className="px-8 py-4 rounded bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-lg active:scale-[0.98]"
              >
                Lanzar Demo en Vivo ✨
              </button>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <span className="font-display font-black text-xs text-white">V</span>
              </div>
              <span className="font-display font-black tracking-widest text-xs text-white">VYBE</span>
            </div>

            {/* Copyright */}
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
              &copy; 2026 VYBE LIVE ENGAGEMENT. TODOS LOS DERECHOS RESERVADOS.
            </p>

          </div>

        </div>
      </footer>

    </div>
  );
}
