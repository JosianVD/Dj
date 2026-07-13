import React, { useState, useEffect } from 'react';
import PhoneFrame from './components/PhoneFrame';
import LandingScreen from './components/LandingScreen';
import DJDetectionScreen from './components/DJDetectionScreen';
import LiveScreen from './components/LiveScreen';
import InteractiveMap from './components/InteractiveMap';
import DJProfileView from './components/DJProfileView';
import VenueView from './components/VenueView';
import UserProfileView from './components/UserProfileView';
import SaaSHomepage from './components/SaaSHomepage';
import { MOCK_DJS, MOCK_VENUES, INITIAL_SONGS, INITIAL_MESSAGES, INITIAL_SINGERS } from './mockData';
import { DJ, Song, Message, Singer, Venue, Booking } from './types';
import { Compass, Users, MapPin, Sparkles, User, Radio, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type AppView = 'landing' | 'detection' | 'map' | 'nearby' | 'venue' | 'dj-profile' | 'live' | 'user-profile';

export default function App() {
  // Navigation & Active Item States
  const [showSaaSHomepage, setShowSaaSHomepage] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [selectedDj, setSelectedDj] = useState<DJ>(MOCK_DJS[0]);
  const [selectedVenueId, setSelectedVenueId] = useState<string>('la-terraza');
  const [initialLiveOverlay, setInitialLiveOverlay] = useState<'request' | 'message' | 'karaoke' | 'tip' | 'book' | null>(null);
  
  // Persisted Dynamic Collections
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [singers, setSingers] = useState<Singer[]>(INITIAL_SINGERS);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Toast and Dynamic Island Alerts
  const [dynamicAlert, setDynamicAlert] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Helper to trigger premium Dynamic Island notifications
  const triggerIslandAlert = (message: string) => {
    setDynamicAlert(message);
    setTimeout(() => {
      setDynamicAlert(null);
    }, 4000);
  };

  // Helper to trigger classic HUD toasts
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  // 1. Song Requests Upvoting
  const handleVoteSong = (songId: string) => {
    setSongs(prevSongs => 
      prevSongs.map(song => {
        if (song.id === songId) {
          const isVoted = song.requestedByMe;
          const updatedVotes = isVoted ? song.votes - 1 : song.votes + 1;
          
          if (!isVoted) {
            triggerIslandAlert(`🔥 Voted: "${song.title}"`);
          }
          
          return {
            ...song,
            votes: updatedVotes,
            requestedByMe: !isVoted
          };
        }
        return song;
      })
    );
  };

  // 2. Add New Song Request
  const handleRequestSong = (title: string, artist: string, isPriority: boolean) => {
    const newSongId = 'song-new-' + Date.now();
    const newSong: Song = {
      id: newSongId,
      title,
      artist,
      coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200',
      requestsCount: 1,
      requestedByMe: true,
      priorityLevel: isPriority ? 'priority' : 'normal',
      votes: 1
    };

    setSongs(prev => [newSong, ...prev]);
    triggerIslandAlert(`🎵 Request Pending: "${title}"`);
  };

  // 3. Add Message Shoutout
  const handleSendMessage = (category: Message['category'], text: string) => {
    const newMsg: Message = {
      id: 'msg-new-' + Date.now(),
      category,
      text,
      senderName: 'Elena Ruiz (You)',
      timestamp: '11:58 PM',
      approved: true
    };

    setMessages(prev => [newMsg, ...prev]);
    triggerIslandAlert(`💬 Shoutout Broadcasted!`);
  };

  // 4. Join Karaoke Queue
  const handleJoinKaraoke = (name: string, songTitle: string, artist: string) => {
    const newSinger: Singer = {
      id: 'singer-new-' + Date.now(),
      name,
      songTitle,
      artist,
      waitMinutes: singers.length === 0 ? 4 : singers[singers.length - 1].waitMinutes + 7
    };

    setSingers(prev => [...prev, newSinger]);
    triggerIslandAlert(`🎤 Registered: "${songTitle}"`);
  };

  // 5. Tipping Success
  const handleTipSuccess = (amount: number) => {
    triggerIslandAlert(`💜 Tipped ${selectedDj.name} $${amount}!`);
  };

  // 6. Luxury Booking Submit
  const handleBookingSubmit = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
    triggerIslandAlert(`📅 VVIP Booking Requested!`);
  };

  // Select Active Venue helper
  const activeVenue = MOCK_VENUES.find(v => v.id === selectedVenueId) || MOCK_VENUES[0];

  if (showSaaSHomepage) {
    return (
      <SaaSHomepage
        onLaunchDemo={(dj, initialOverlay) => {
          if (dj) {
            setSelectedDj(dj);
            setSelectedVenueId(dj.venueId);
          }
          if (initialOverlay) {
            setInitialLiveOverlay(initialOverlay);
            setCurrentView('live');
          } else {
            setCurrentView('landing');
          }
          setShowSaaSHomepage(false);
        }}
        djs={MOCK_DJS}
        venues={MOCK_VENUES}
      />
    );
  }

  return (
    <PhoneFrame 
      activeDjName={selectedDj?.name} 
      dynamicAlert={dynamicAlert}
      onBackToSaaS={() => setShowSaaSHomepage(true)}
    >
      
      {/* Dynamic Screen View Engine with AnimatePresence */}
      <div className="relative flex-1 w-full h-full flex flex-col overflow-hidden">
        
        <AnimatePresence mode="wait">
          
          {/* LANDING SCREEN */}
          {currentView === 'landing' && (
            <motion.div
              key="landing"
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <LandingScreen onEnter={() => setCurrentView('detection')} />
            </motion.div>
          )}

          {/* GPS CALIBRATION SONAR DETECTION */}
          {currentView === 'detection' && (
            <motion.div
              key="detection"
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <DJDetectionScreen
                djs={MOCK_DJS}
                onSelectDj={(dj) => {
                  setSelectedDj(dj);
                  setSelectedVenueId(dj.venueId);
                  setCurrentView('dj-profile');
                }}
                onEnterSingle={(dj) => {
                  setSelectedDj(dj);
                  setSelectedVenueId(dj.venueId);
                  setCurrentView('live');
                }}
                onScanComplete={() => {
                  setCurrentView('map');
                }}
              />
            </motion.div>
          )}

          {/* RADAR INTERACTIVE MAP VIEW */}
          {currentView === 'map' && (
            <motion.div
              key="map"
              className="absolute inset-0 w-full h-full flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <InteractiveMap
                djs={MOCK_DJS}
                onSelectDj={(dj) => {
                  setSelectedDj(dj);
                  setSelectedVenueId(dj.venueId);
                  setCurrentView('dj-profile');
                }}
                onEnterExperience={(dj, initialOverlay) => {
                  setSelectedDj(dj);
                  setSelectedVenueId(dj.venueId);
                  setInitialLiveOverlay(initialOverlay || null);
                  setCurrentView('live');
                }}
              />
            </motion.div>
          )}

          {/* ACTIVE LIVE DJ BOOTH SCENE */}
          {currentView === 'live' && (
            <motion.div
              key="live"
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
            >
              <LiveScreen
                dj={selectedDj}
                songs={songs}
                messages={messages}
                singers={singers}
                onBack={() => {
                  setInitialLiveOverlay(null);
                  setCurrentView('map');
                }}
                onVoteSong={handleVoteSong}
                onRequestSong={handleRequestSong}
                onSendMessage={handleSendMessage}
                onJoinKaraoke={handleJoinKaraoke}
                onTipSuccess={handleTipSuccess}
                onSubmitBooking={handleBookingSubmit}
                showToast={showToast}
                initialOverlay={initialLiveOverlay}
              />
            </motion.div>
          )}

          {/* DJ PROFILE */}
          {currentView === 'dj-profile' && (
            <motion.div
              key="dj-profile"
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="relative h-full flex flex-col">
                <div className="absolute top-4 left-4 z-20">
                  <button
                    onClick={() => setCurrentView('map')}
                    className="px-4 py-2 bg-zinc-950/80 border border-zinc-800 rounded-full text-xs font-bold text-gray-300 hover:text-white"
                  >
                    ← Radar
                  </button>
                </div>
                
                <DJProfileView
                  dj={selectedDj}
                  onBookNow={() => {
                    // Navigate to live screen and trigger book overlay
                    setCurrentView('live');
                    // We can guide them by flashing island
                    triggerIslandAlert('📅 Configure booking options');
                  }}
                  onEnterExperience={() => {
                    setCurrentView('live');
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* VENUE VISUAL GUIDE PAGE */}
          {currentView === 'venue' && (
            <motion.div
              key="venue"
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <VenueView
                venue={activeVenue}
                allDjs={MOCK_DJS}
                onSelectDj={(dj) => {
                  setSelectedDj(dj);
                  setSelectedVenueId(dj.venueId);
                  setCurrentView('dj-profile');
                }}
                onSelectVenue={(venueId) => {
                  setSelectedVenueId(venueId);
                  setCurrentView('venue');
                }}
              />
            </motion.div>
          )}

          {/* MY PROFILE SECTION */}
          {currentView === 'user-profile' && (
            <motion.div
              key="user-profile"
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <UserProfileView
                favoriteDjs={MOCK_DJS.slice(0, 2)}
                savedVenues={MOCK_VENUES}
                onSelectDj={(dj) => {
                  setSelectedDj(dj);
                  setSelectedVenueId(dj.venueId);
                  setCurrentView('dj-profile');
                }}
                onSelectVenue={(vId) => {
                  setSelectedVenueId(vId);
                  setCurrentView('venue');
                }}
              />
            </motion.div>
          )}

        </AnimatePresence>

        {/* 6. PRIMARY EXPLORATION NAVIGATION TAB BAR */}
        {/* Only rendered when browsing map, nearby, venue or profile views */}
        {currentView !== 'landing' && currentView !== 'detection' && currentView !== 'live' && (
          <div className="absolute bottom-4 inset-x-3 z-30 bg-zinc-950/85 border border-zinc-900 rounded-[20px] p-2 flex items-center justify-around shadow-xl backdrop-blur-md">
            {/* Map tab */}
            <button
              onClick={() => setCurrentView('map')}
              className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-xl transition-all ${
                currentView === 'map' ? 'text-purple-400 bg-purple-950/20 font-bold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Map className="w-4.5 h-4.5" />
              <span className="text-[9px] font-mono mt-1">Radar</span>
            </button>

            {/* Venue guide */}
            <button
              onClick={() => {
                setSelectedVenueId('la-terraza');
                setCurrentView('venue');
              }}
              className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-xl transition-all ${
                currentView === 'venue' ? 'text-purple-400 bg-purple-950/20 font-bold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <MapPin className="w-4.5 h-4.5" />
              <span className="text-[9px] font-mono mt-1">Venues</span>
            </button>

            {/* User Profile */}
            <button
              onClick={() => setCurrentView('user-profile')}
              className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-xl transition-all ${
                currentView === 'user-profile' ? 'text-purple-400 bg-purple-950/20 font-bold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <User className="w-4.5 h-4.5" />
              <span className="text-[9px] font-mono mt-1">My ID</span>
            </button>
          </div>
        )}

      </div>

      {/* Elegant Toast Notifications overlay */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-50 bg-zinc-950/95 border border-zinc-800 px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping shrink-0" />
            <span className="text-[10px] font-mono font-bold text-gray-200 uppercase tracking-wider">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </PhoneFrame>
  );
}
