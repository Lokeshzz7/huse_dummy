import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, CreditCard, Smartphone, Building, Wallet, 
  CheckCircle, Shield, Lock, ArrowRight, AlertCircle, Users 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet';

export function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Form states
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');

  const paymentMethods = [
    { id: 'upi' as PaymentMethod, icon: Smartphone, label: 'UPI', popular: true },
    { id: 'card' as PaymentMethod, icon: CreditCard, label: 'Card', popular: false },
    { id: 'netbanking' as PaymentMethod, icon: Building, label: 'Net Banking', popular: false },
    { id: 'wallet' as PaymentMethod, icon: Wallet, label: 'Wallets', popular: false }
  ];

  const popularBanks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 
    'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'
  ];

  const wallets = [
    { name: 'Paytm', icon: '💳' },
    { name: 'PhonePe', icon: '💜' },
    { name: 'Google Pay', icon: '🔵' },
    { name: 'Amazon Pay', icon: '🟠' }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setPaymentSuccess(true);

    // Redirect to HUSE Circle after success
    setTimeout(() => {
      navigate('/husecircle/loading');
    }, 2000);
  };

  const isFormValid = () => {
    switch (selectedMethod) {
      case 'upi':
        return upiId.length > 0 && upiId.includes('@');
      case 'card':
        return cardNumber.length === 19 && cardName.length > 0 && cardExpiry.length === 5 && cardCvv.length === 3;
      case 'netbanking':
        return selectedBank.length > 0;
      case 'wallet':
        return selectedWallet.length > 0;
      default:
        return false;
    }
  };

  // Format card number
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  // Format expiry
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\//g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  if (paymentSuccess) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md bg-[#0a0a0a] border border-green-500/30 rounded-[25px] p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
                >
                  <CheckCircle className="text-green-400" size={40} />
                </motion.div>
                <h3 className="text-white font-bold text-[28px] mb-3">
                  Payment Successful! 🎉
                </h3>
                <p className="text-gray-400 text-[16px] mb-6">
                  Welcome to HUSE Circle! Redirecting to your house...
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
          >
            <div className="w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] bg-[#0a0a0a] border border-purple-500/30 rounded-[20px] sm:rounded-[25px] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <h2 className="text-[20px] sm:text-[24px] font-bold text-white mb-1">
                      Complete Your Payment
                    </h2>
                    <p className="text-gray-400 text-[12px] sm:text-[14px]">
                      Join HUSE Circle and start building your future
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                  </button>
                </div>

                {/* Price Summary */}
                <div className="bg-[#111] border border-purple-500/20 rounded-[12px] sm:rounded-[15px] p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-[13px] sm:text-[14px]">HUSE Circle Membership</span>
                    <span className="text-white font-bold text-[14px] sm:text-[16px]">₹199</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-purple-500/10">
                    <span className="text-white font-bold text-[14px] sm:text-[16px]">Total Amount</span>
                    <span className="text-white font-bold text-[20px] sm:text-[24px] bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                      ₹199
                    </span>
                  </div>
                  <p className="text-purple-400 text-[11px] sm:text-[12px] mt-2">
                    ✓ One-time payment • Access till graduation
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {/* Payment Method Selection */}
                <div className="mb-6">
                  <h3 className="text-white font-bold text-[16px] mb-3">Select Payment Method</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`relative p-4 rounded-[15px] border-2 transition-all ${
                            selectedMethod === method.id
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-purple-500/20 bg-[#111] hover:border-purple-500/40'
                          }`}
                        >
                          {method.popular && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                              POPULAR
                            </div>
                          )}
                          <Icon className={selectedMethod === method.id ? 'text-purple-400' : 'text-gray-400'} size={24} />
                          <p className={`text-[12px] font-medium mt-2 ${selectedMethod === method.id ? 'text-white' : 'text-gray-400'}`}>
                            {method.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Forms */}
                <div className="bg-[#111] border border-purple-500/20 rounded-[15px] p-6">
                  {/* UPI Form */}
                  {selectedMethod === 'upi' && (
                    <div>
                      <h4 className="text-white font-bold text-[14px] mb-4">Enter UPI ID</h4>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-purple-500/30 rounded-[12px] px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-all mb-4"
                      />
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="text-[12px] text-gray-400">Quick select:</div>
                        {['Google Pay', 'PhonePe', 'Paytm'].map((app) => (
                          <button
                            key={app}
                            onClick={() => setUpiId(`yourname@${app.toLowerCase().replace(' ', '')}`)}
                            className="text-[11px] px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 hover:bg-purple-500/20 transition-all"
                          >
                            {app}
                          </button>
                        ))}
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-[12px] p-3 flex items-start gap-2">
                        <AlertCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={16} />
                        <p className="text-blue-400 text-[12px]">
                          You'll receive a payment request on your UPI app. Please approve it to complete the payment.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Card Form */}
                  {selectedMethod === 'card' && (
                    <div>
                      <h4 className="text-white font-bold text-[14px] mb-4">Enter Card Details</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="text-gray-400 text-[12px] mb-2 block">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            className="w-full bg-[#0a0a0a] border border-purple-500/30 rounded-[12px] px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-gray-400 text-[12px] mb-2 block">Cardholder Name</label>
                          <input
                            type="text"
                            placeholder="Name on card"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value.toUpperCase())}
                            className="w-full bg-[#0a0a0a] border border-purple-500/30 rounded-[12px] px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-gray-400 text-[12px] mb-2 block">Expiry</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              maxLength={5}
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                              className="w-full bg-[#0a0a0a] border border-purple-500/30 rounded-[12px] px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-gray-400 text-[12px] mb-2 block">CVV</label>
                            <input
                              type="password"
                              placeholder="123"
                              maxLength={3}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                              className="w-full bg-[#0a0a0a] border border-purple-500/30 rounded-[12px] px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Net Banking Form */}
                  {selectedMethod === 'netbanking' && (
                    <div>
                      <h4 className="text-white font-bold text-[14px] mb-4">Select Your Bank</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {popularBanks.map((bank) => (
                          <button
                            key={bank}
                            onClick={() => setSelectedBank(bank)}
                            className={`p-3 rounded-[12px] border-2 text-left transition-all ${
                              selectedBank === bank
                                ? 'border-purple-500 bg-purple-500/10'
                                : 'border-purple-500/20 hover:border-purple-500/40'
                            }`}
                          >
                            <span className={selectedBank === bank ? 'text-white font-medium' : 'text-gray-400'}>
                              {bank}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Wallet Form */}
                  {selectedMethod === 'wallet' && (
                    <div>
                      <h4 className="text-white font-bold text-[14px] mb-4">Select Wallet</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {wallets.map((wallet) => (
                          <button
                            key={wallet.name}
                            onClick={() => setSelectedWallet(wallet.name)}
                            className={`p-4 rounded-[12px] border-2 transition-all ${
                              selectedWallet === wallet.name
                                ? 'border-purple-500 bg-purple-500/10'
                                : 'border-purple-500/20 hover:border-purple-500/40'
                            }`}
                          >
                            <div className="text-[32px] mb-2">{wallet.icon}</div>
                            <span className={`text-[14px] ${selectedWallet === wallet.name ? 'text-white font-medium' : 'text-gray-400'}`}>
                              {wallet.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center gap-6 text-[12px] text-gray-400">
                  <div className="flex items-center gap-2">
                    <Shield className="text-green-400" size={16} />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="text-green-400" size={16} />
                    <span>256-bit Encryption</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-purple-500/20 bg-[#111]">
                <button
                  onClick={handlePayment}
                  disabled={!isFormValid() || isProcessing}
                  className={`w-full py-4 rounded-[15px] font-bold text-[16px] transition-all flex items-center justify-center gap-2 ${
                    isFormValid() && !isProcessing
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      Pay ₹199
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
                <p className="text-gray-500 text-[11px] text-center mt-3">
                  By proceeding, you agree to our Terms of Service and Privacy Policy
                </p>

                {/* Already Paid Link */}
                <div className="text-center pt-4 border-t border-white/10">
                  <p className="text-gray-400 text-[14px]">
                    Already paid and have an account?{' '}
                    <button
                      onClick={onClose}
                      className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    >
                      Login here
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}