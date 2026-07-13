import React, { useState } from 'react';
import { Message, MessageCategory } from '../types';
import { Send, CheckCircle2, Clock, Volume2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SendMessageViewProps {
  messages: Message[];
  onSendMessage: (category: 'Birthday' | 'Proposal' | 'Anniversary' | 'Shoutout' | 'General', text: string) => void;
  showToast: (msg: string) => void;
}

const CATEGORIES: MessageCategory[] = [
  { id: 'Shoutout', label: 'Shoutout', color: 'from-purple-600 to-indigo-600', emoji: '🙌' },
  { id: 'Birthday', label: 'Birthday', color: 'from-pink-500 to-rose-500', emoji: '🎂' },
  { id: 'Proposal', label: 'Proposal', color: 'from-red-600 to-pink-600', emoji: '💍' },
  { id: 'Anniversary', label: 'Anniversary', color: 'from-amber-500 to-orange-500', emoji: '🥂' },
  { id: 'General', label: 'General', color: 'from-cyan-500 to-teal-500', emoji: '💬' }
];

export default function SendMessageView({ messages, onSendMessage, showToast }: SendMessageViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<Message['category']>('Shoutout');
  const [messageText, setMessageText] = useState('');
  const [pendingUserMsgs, setPendingUserMsgs] = useState<{ id: string; text: string; category: Message['category']; approved: boolean }[]>([]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const id = 'user-pending-' + Date.now();
    const newMsg = {
      id,
      text: messageText.trim(),
      category: selectedCategory,
      approved: false
    };

    setPendingUserMsgs(prev => [newMsg, ...prev]);
    setMessageText('');
    showToast('Shoutout submitted for approval!');

    // Simulate DJ approval after 3 seconds
    setTimeout(() => {
      setPendingUserMsgs(prev => 
        prev.map(msg => msg.id === id ? { ...msg, approved: true } : msg)
      );
      onSendMessage(selectedCategory, newMsg.text);
      showToast('Your shoutout has been approved & broadcasted!');
    }, 3500);
  };

  const getCategoryTheme = (cat: Message['category']) => {
    return CATEGORIES.find(c => c.id === cat) || CATEGORIES[0];
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#050505] text-white">
      
      {/* Scrollable Main Stream */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-32 space-y-5">
        
        {/* Header HUD */}
        <div>
          <h3 className="font-display font-black text-2xl tracking-tighter bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            LIVE SHOUTOUTS
          </h3>
          <p className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
            Send messages directly to the main screen
          </p>
        </div>

        {/* Message Input Box */}
        <div className="bg-white/5 border border-white/10 rounded-[24px] p-4 space-y-4 shadow-2xl">
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono font-bold text-white/50 uppercase tracking-widest">
              1. Choose Category
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold font-sans tracking-wide shrink-0 transition-all ${
                    selectedCategory === cat.id
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-md scale-105`
                      : 'bg-white/5 text-white/45 hover:text-white border border-white/10'
                  }`}
                >
                  <span className="mr-1">{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSend} className="space-y-3">
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-white/50 uppercase tracking-widest">
                2. Your Shoutout Message
              </span>
              <textarea
                rows={2}
                maxLength={100}
                required
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Sofia is turning 25! Drop some heavy progressive techno beats for her!"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-650 focus:outline-none focus:border-purple-500 resize-none"
              />
              <div className="text-right text-[9px] text-white/40 font-mono">
                {messageText.length}/100 characters
              </div>
            </div>

            {/* Glowing Send Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-display font-black text-xs uppercase tracking-widest text-white shadow-[0_10px_20px_rgba(168,85,247,0.3)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast to DJ Monitor</span>
            </button>
          </form>
        </div>

        {/* Live Message Approvals & Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" /> LIVE FEED
            </span>
            <span className="text-[9px] text-white/40 font-mono">Real-time update</span>
          </div>

          {/* Combined Stream: User Pending + Approved Messages */}
          <div className="space-y-3">
            {/* User Pending Messages */}
            <AnimatePresence>
              {pendingUserMsgs.map((pMsg) => {
                const theme = getCategoryTheme(pMsg.category);
                return (
                  <motion.div
                    key={pMsg.id}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className={`relative p-3.5 rounded-2xl border ${
                      pMsg.approved 
                        ? 'bg-purple-950/20 border-purple-500/30' 
                        : 'bg-white/5 border-white/10'
                    } flex flex-col space-y-2`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${theme.color}`}>
                        {theme.emoji} {pMsg.category.toUpperCase()}
                      </span>
                      
                      <div className="flex items-center gap-1">
                        {pMsg.approved ? (
                          <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-0.5 font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5" /> APPROVED
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-amber-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 animate-spin" /> DJ PENDING
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-white font-medium leading-relaxed">
                      {pMsg.text}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[9px] text-white/40 font-mono">
                      <span>Me (Pending User)</span>
                      <span>Just now</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Mock Database approved Messages */}
            {messages.map((msg) => {
              const theme = getCategoryTheme(msg.category);
              return (
                <div
                  key={msg.id}
                  className="p-3.5 bg-white/5 border border-white/5 rounded-2xl flex flex-col space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${theme.color}`}>
                      {theme.emoji} {msg.category.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-450 font-mono flex items-center gap-0.5">
                      ✓ BROADCASTED
                    </span>
                  </div>

                  <p className="text-xs text-white/80 font-medium leading-relaxed">
                    {msg.text}
                  </p>

                  <div className="flex justify-between items-center pt-1 text-[9px] text-white/40 font-mono">
                    <span>{msg.senderName}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
