import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Lock, ShieldCheck, Check, ArrowLeft, Loader2, Sparkles } from 'lucide-react';

interface CheckoutOverlayProps {
  amount: number;
  recipientName: string;
  purpose: string; // e.g., "DJ Tip" or "Priority Song Request"
  onPaymentSuccess: () => void;
  onClose: () => void;
}

export default function CheckoutOverlay({
  amount,
  recipientName,
  purpose,
  onPaymentSuccess,
  onClose
}: CheckoutOverlayProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Auto-format card number (adds spaces every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = '';
    for (let i = 0; i < value.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    setCardNumber(formattedValue);
  };

  // Auto-format expiration date (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length >= 2) {
      setCardExpiry(value.slice(0, 2) + '/' + value.slice(2, 4));
    } else {
      setCardExpiry(value);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 4) {
      setCardCvv(value);
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      // Wait for success animation before triggering callback
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
      }, 1500);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/95 z-50 flex flex-col justify-end p-4 pb-8 md:pb-6 font-sans"
    >
      <motion.div
        initial={{ y: 150, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 150, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-[#0a0a0c] border border-white/10 rounded-[32px] p-6 space-y-5 shadow-2xl max-w-md mx-auto w-full overflow-y-auto max-h-[85vh] no-scrollbar"
      >
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key="payment-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white font-mono"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block">SECURE CHECKOUT</span>
                  <span className="text-xs text-white/50">{purpose}</span>
                </div>
              </div>

              {/* Amount Centerpiece */}
              <div className="bg-gradient-to-r from-purple-900/20 via-pink-900/10 to-orange-900/10 border border-white/5 rounded-2xl p-4 text-center space-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-15">
                  <ShieldCheck className="w-12 h-12 text-purple-400" />
                </div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">PAYING TO {recipientName.toUpperCase()}</span>
                <span className="font-display font-black text-3xl tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  ${amount.toFixed(2)}
                </span>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-2 gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" /> Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'paypal'
                      ? 'bg-[#ffc439] text-[#003087] shadow-md hover:bg-[#ebd034]'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="font-sans italic font-black lowercase text-xs">pay<span className="text-[#0079c1]">pal</span></span>
                </button>
              </div>

              {/* PayPal Flow */}
              {paymentMethod === 'paypal' && (
                <div className="space-y-4 py-3 text-center">
                  <p className="text-xs text-white/60 font-sans max-w-xs mx-auto">
                    You will be redirected to PayPal's secure gateway to authorize your payment of <strong className="text-white">${amount.toFixed(2)}</strong>.
                  </p>

                  <div className="space-y-2 max-w-xs mx-auto">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handlePay}
                      className="w-full py-3 bg-[#ffc439] hover:bg-[#f4be20] text-[#003087] rounded-xl font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_10px_20px_rgba(255,196,57,0.2)]"
                    >
                      {isProcessing ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#003087]" />
                      ) : (
                        <span className="font-sans italic font-black text-sm lowercase">Pay with pay<span className="text-[#0079c1]">pal</span></span>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handlePay}
                      className="w-full py-3 bg-[#0070ba] hover:bg-[#005ea6] text-white rounded-xl font-sans font-bold text-xs flex items-center justify-center transition-all active:scale-95"
                    >
                      Pay Later
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[9px] text-white/40 font-mono">
                    <Lock className="w-3 h-3 text-purple-400" /> Secure 256-Bit SSL Connection
                  </div>
                </div>
              )}

              {/* Credit Card Flow */}
              {paymentMethod === 'card' && (
                <form onSubmit={handlePay} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Ruiz"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                      />
                      <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">Expiry Date</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-center"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">CVV</label>
                      <input
                        type="password"
                        required
                        placeholder="•••"
                        maxLength={4}
                        value={cardCvv}
                        onChange={handleCvvChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-center"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 mt-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:scale-[1.01] active:scale-[0.98] rounded-2xl font-display font-black text-xs uppercase tracking-widest text-white shadow-[0_15px_30px_rgba(236,72,153,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>PROCESSING...</span>
                      </>
                    ) : (
                      <span>AUTHORIZE SECURE PAYMENT</span>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[9px] text-white/40 font-mono">
                    <Lock className="w-3 h-3 text-purple-400" /> Encrypted & Secure checkout
                  </div>
                </form>
              )}
            </motion.div>
          ) : (
            /* Success View */
            <motion.div
              key="success-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-10 text-center space-y-4 flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500 flex items-center justify-center text-green-400 shadow-[0_0_25px_rgba(34,197,94,0.3)] animate-pulse">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-display font-black text-xl text-white uppercase tracking-tight flex items-center gap-1 justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400" /> PAYMENT APPROVED
                </h4>
                <p className="text-xs text-white/60 font-sans max-w-xs leading-relaxed">
                  Your payment of <strong className="text-white">${amount.toFixed(2)}</strong> has been processed securely. Your support is active!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
