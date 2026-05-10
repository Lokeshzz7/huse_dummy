import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Shield, DollarSign, Calendar, CheckCircle, CreditCard,
  Lock, AlertTriangle, Info, Award, Clock, ArrowRight,
  FileText, Star, Building2, GraduationCap
} from 'lucide-react';
import { toast } from 'sonner';

interface PaymentEscrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: {
    providerName: string;
    providerType: 'business' | 'student';
    providerAvatar: string;
    price: string;
    timeline: string;
    rating: number;
  };
  projectTitle: string;
  onPaymentComplete: () => void;
}

interface Milestone {
  id: number;
  title: string;
  percentage: number;
  amount: number;
  deadline: string;
}

export function PaymentEscrowModal({
  isOpen,
  onClose,
  quote,
  projectTitle,
  onPaymentComplete
}: PaymentEscrowModalProps) {
  const [currentStep, setCurrentStep] = useState<'milestones' | 'payment' | 'confirmation'>('milestones');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'bank'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Parse price from string (e.g., "$7,500" -> 7500)
  const parsePrice = (priceStr: string) => {
    const match = priceStr.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, '')) : 0;
  };

  const totalAmount = parsePrice(quote.price);
  const platformFee = Math.round(totalAmount * 0.05); // 5% platform fee
  const escrowProtectionFee = Math.round(totalAmount * 0.02); // 2% escrow fee
  const finalAmount = totalAmount + platformFee + escrowProtectionFee;

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      title: 'Project Kickoff & Planning',
      percentage: 25,
      amount: Math.round(totalAmount * 0.25),
      deadline: '7 days from start'
    },
    {
      id: 2,
      title: 'Development & Implementation',
      percentage: 50,
      amount: Math.round(totalAmount * 0.50),
      deadline: '30 days from start'
    },
    {
      id: 3,
      title: 'Testing & Final Delivery',
      percentage: 25,
      amount: Math.round(totalAmount * 0.25),
      deadline: 'Upon completion'
    }
  ]);

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('confirmation');
      toast.success('Payment successful! Project initiated.');
      
      setTimeout(() => {
        onPaymentComplete();
        onClose();
      }, 3000);
    }, 2500);
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-4xl my-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-400" />
                  Secure Payment with Escrow
                </h2>
                <p className="text-gray-400 text-sm">
                  Your payment is protected until project completion
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                disabled={isProcessing}
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="px-6 py-4 border-b border-white/10">
              <div className="flex items-center justify-between relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
                    style={{
                      width: currentStep === 'milestones' ? '0%' : currentStep === 'payment' ? '50%' : '100%'
                    }}
                  />
                </div>

                {/* Steps */}
                {[
                  { id: 'milestones', label: 'Milestones', icon: FileText },
                  { id: 'payment', label: 'Payment', icon: CreditCard },
                  { id: 'confirmation', label: 'Confirmation', icon: CheckCircle }
                ].map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted =
                    (currentStep === 'payment' && index === 0) ||
                    (currentStep === 'confirmation' && index <= 1);

                  return (
                    <div key={step.id} className="relative flex flex-col items-center z-10">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 border-transparent'
                            : isCompleted
                            ? 'bg-green-500 border-transparent'
                            : 'bg-[#0a0a0a] border-white/20'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive || isCompleted ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <span
                        className={`text-xs mt-2 font-medium ${
                          isActive ? 'text-white' : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Project Summary */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-5 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-3xl">
                    {quote.providerAvatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">{projectTitle}</h3>
                    <p className="text-gray-400 text-sm mb-2">with {quote.providerName}</p>
                    <div className="flex items-center gap-4 text-sm">
                      {quote.providerType === 'business' ? (
                        <span className="flex items-center gap-1 text-cyan-400">
                          <Building2 className="w-3 h-3" />
                          Dofracto Business
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-purple-400">
                          <GraduationCap className="w-3 h-3" />
                          HUSE Platinum
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3 h-3 fill-current" />
                        {quote.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white mb-1">{quote.price}</div>
                    <div className="text-sm text-gray-400">{quote.timeline}</div>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              {currentStep === 'milestones' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Payment Milestones</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Funds are released to the provider upon completion and approval of each milestone
                    </p>
                  </div>

                  {/* Milestones List */}
                  <div className="space-y-3">
                    {milestones.map((milestone, index) => (
                      <div
                        key={milestone.id}
                        className="bg-white/5 border border-white/10 rounded-xl p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-bold text-white mb-1">{milestone.title}</h4>
                              <p className="text-sm text-gray-400">{milestone.deadline}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-white">
                              {formatCurrency(milestone.amount)}
                            </div>
                            <div className="text-sm text-gray-400">{milestone.percentage}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Escrow Info */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-green-400 mb-1">Escrow Protection</h4>
                        <p className="text-sm text-gray-400">
                          Your funds are held securely and only released when you approve each milestone.
                          Full refund available if deliverables don't meet agreed standards.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep('payment')}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all font-medium"
                  >
                    Proceed to Payment
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {currentStep === 'payment' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Payment Method */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Select Payment Method</h3>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { id: 'card', label: 'Card', icon: CreditCard },
                        { id: 'upi', label: 'UPI', icon: DollarSign },
                        { id: 'bank', label: 'Bank', icon: Building2 }
                      ].map((method) => {
                        const Icon = method.icon;
                        return (
                          <button
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id as any)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              paymentMethod === method.id
                                ? 'border-cyan-500 bg-cyan-500/10'
                                : 'border-white/10 bg-white/5 hover:bg-white/10'
                            }`}
                          >
                            <Icon className={`w-6 h-6 mx-auto mb-2 ${
                              paymentMethod === method.id ? 'text-cyan-400' : 'text-gray-400'
                            }`} />
                            <span className={`text-sm font-medium ${
                              paymentMethod === method.id ? 'text-white' : 'text-gray-400'
                            }`}>
                              {method.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Payment Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Summary */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h4 className="font-bold text-white mb-4">Payment Summary</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Project Cost</span>
                        <span className="text-white font-medium">{formatCurrency(totalAmount)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Platform Fee (5%)</span>
                        <span className="text-white font-medium">{formatCurrency(platformFee)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center gap-1">
                          Escrow Protection (2%)
                          <Info className="w-3 h-3" />
                        </span>
                        <span className="text-white font-medium">{formatCurrency(escrowProtectionFee)}</span>
                      </div>
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-white font-bold">Total Amount</span>
                        <span className="text-2xl font-bold text-cyan-400">{formatCurrency(finalAmount)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <Lock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-amber-400 font-medium mb-1">Secure Payment</p>
                      <p className="text-gray-400">
                        Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCurrentStep('milestones')}
                      className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all font-medium"
                      disabled={isProcessing}
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Shield className="w-5 h-5" />
                          Pay {formatCurrency(finalAmount)}
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 'confirmation' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                  <p className="text-gray-400 mb-6">
                    Your project has been initiated. Funds are held securely in escrow.
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 max-w-md mx-auto">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Transaction ID</span>
                        <span className="text-white font-mono">TXN{Date.now().toString().slice(-8)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Amount Paid</span>
                        <span className="text-white font-bold">{formatCurrency(finalAmount)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Status</span>
                        <span className="text-green-400 font-medium">Secured in Escrow</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-6">
                    Redirecting to project dashboard...
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
