import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
  ArrowRight,
  ExternalLink,
  Facebook,
  Copy,
  Check,
  CreditCard,
  MessageCircle,
} from 'lucide-react';
import { FollowerPackage, OrderDetails } from '../types';
import { formatBDT } from '../utils/format';
import { CONTACT_CONFIG, PACKAGES_DATA } from '../data/packagesData';

interface CheckoutModalProps {
  pkg: FollowerPackage;
  onClose: () => void;
  onOrderPlaced: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  pkg: initialPkg,
  onClose,
  onOrderPlaced,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPkg, setSelectedPkg] = useState<FollowerPackage>(initialPkg);
  const [pageUrl, setPageUrl] = useState('');
  const [phoneOrWhatsapp, setPhoneOrWhatsapp] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Rocket' | 'Card'>('bKash');
  const [trxId, setTrxId] = useState('');

  const [formErrors, setFormErrors] = useState<{ pageUrl?: string; phoneOrWhatsapp?: string; trxId?: string }>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);

  const getAccountForMethod = () => {
    switch (paymentMethod) {
      case 'bKash':
        return CONTACT_CONFIG.bKashNumber;
      case 'Nagad':
        return CONTACT_CONFIG.nagadNumber;
      case 'Rocket':
        return CONTACT_CONFIG.rocketNumber;
      default:
        return CONTACT_CONFIG.bKashNumber;
    }
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('01700000000');
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const validateStep1 = (): boolean => {
    const errors: { pageUrl?: string } = {};
    if (!pageUrl.trim()) {
      errors.pageUrl = 'ফেসবুক পেজ বা প্রোফাইলের লিংক প্রদান করুন';
    } else if (
      !pageUrl.includes('facebook.com') &&
      !pageUrl.includes('fb.com') &&
      !pageUrl.includes('fb.watch') &&
      !pageUrl.startsWith('@')
    ) {
      errors.pageUrl = 'সঠিক ফেসবুক লিংক দিন (যেমন: facebook.com/yourpage)';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const errors: { phoneOrWhatsapp?: string; trxId?: string } = {};
    if (!phoneOrWhatsapp.trim()) {
      errors.phoneOrWhatsapp = 'আপনার মোবাইল / হোয়াটসঅ্যাপ নম্বর দিন';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextToStep2 = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleNextToStep3 = () => {
    setCurrentStep(3);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsProcessing(true);

    setTimeout(() => {
      const newOrder: OrderDetails = {
        orderId: `NOS-${Math.floor(100000 + Math.random() * 900000)}`,
        package: selectedPkg,
        pageUrl: pageUrl.trim(),
        whatsappOrPhone: phoneOrWhatsapp.trim(),
        paymentMethod,
        trxId: trxId.trim() || undefined,
        totalPriceBDT: selectedPkg.priceBDT,
        placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setCompletedOrder(newOrder);
      onOrderPlaced(newOrder);
      setCurrentStep(4);
      setIsProcessing(false);
    }, 600);
  };

  const handleCopyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedOrderId(true);
    setTimeout(() => setCopiedOrderId(false), 2000);
  };

  const generateWhatsAppOrderLink = (order: OrderDetails) => {
    const msg = encodeURIComponent(
      `Hello Noyon Online Service, আমি একটি অর্ডার দিয়েছি [${order.orderId}]।\n` +
      `প্যাকেজ: ${order.package.name}\n` +
      `মূল্য: ৳${order.totalPriceBDT}\n` +
      `পেজ লিংক: ${order.pageUrl}\n` +
      `পেমেন্ট: ${order.paymentMethod} (TrxID: ${order.trxId || 'Sent via App'})\n` +
      `দয়া করে ডেলিভারি শুরু নিশ্চিত করুন!`
    );
    return `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${msg}`;
  };

  return (
    <div
      id="checkout-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative my-6 animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Facebook className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Noyon Online Service • অর্ডার চেকআউট
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">১০০% নিরাপদ • পাসওয়ার্ড ছাড়া অর্ডার</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4-Step Indicator Bar */}
        <div className="bg-slate-100 px-6 py-2.5 flex items-center justify-between text-[11px] font-bold text-slate-600 border-b border-slate-200/60">
          <div className={`flex items-center gap-1 ${currentStep >= 1 ? 'text-blue-600' : ''}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-300'}`}>১</span>
            <span>লিংক</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className={`flex items-center gap-1 ${currentStep >= 2 ? 'text-blue-600' : ''}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-300'}`}>২</span>
            <span>প্যাকেজ</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className={`flex items-center gap-1 ${currentStep >= 3 ? 'text-blue-600' : ''}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-300'}`}>৩</span>
            <span>পেমেন্ট</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className={`flex items-center gap-1 ${currentStep >= 4 ? 'text-emerald-600' : ''}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 4 ? 'bg-emerald-600 text-white' : 'bg-slate-300'}`}>৪</span>
            <span>ডেলিভারি</span>
          </div>
        </div>

        {/* Modal Body: Steps 1, 2, 3, 4 */}
        <div className="p-6">
          {/* STEP 1: Page Link Submit */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">ধাপ ১ (৪ এর মধ্যে)</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">আপনার Facebook Page লিংক দিন</h3>
                <p className="text-xs text-slate-600">আপনার পেজের পাবলিক লিংক দিন। কোনো পাসওয়ার্ড বা অ্যাক্সেস দিতে হবে না।</p>
              </div>

              {/* Selected package preview */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-extrabold text-blue-900">{selectedPkg.name}</div>
                  <div className="text-[11px] text-blue-700">১০০% Non-Drop গ্যারান্টি</div>
                </div>
                <div className="text-base font-black text-blue-700">{formatBDT(selectedPkg.priceBDT)}</div>
              </div>

              <div>
                <label htmlFor="modal-page-url" className="block text-xs font-bold text-slate-700 mb-1">
                  Facebook Page বা Profile লিংক <span className="text-rose-500">*</span>
                </label>
                <input
                  id="modal-page-url"
                  type="text"
                  value={pageUrl}
                  onChange={(e) => setPageUrl(e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900 ${
                    formErrors.pageUrl ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                  }`}
                />
                {formErrors.pageUrl ? (
                  <p className="text-[11px] text-rose-600 mt-1 font-semibold">{formErrors.pageUrl}</p>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    পাসওয়ার্ডের কোনো প্রয়োজন নেই। শুধু লিংকই যথেষ্ট।
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleNextToStep2}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>পরবর্তী ধাপ (প্যাকেজ নির্বাচন)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Select Package */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">ধাপ ২ (৪ এর মধ্যে)</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">Followers প্যাকেজ নির্বাচন করুন</h3>
                <p className="text-xs text-slate-600">আপনার প্রয়োজনীয় প্যাকেজটি নির্বাচন করুন:</p>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {PACKAGES_DATA.slice(0, 4).map((p) => {
                  const isSelected = selectedPkg.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPkg(p)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'}`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{p.name}</div>
                          <div className="text-[10px] text-slate-500">{p.deliveryTime} • {p.badge || 'Non-Drop'}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-black text-slate-900">{formatBDT(p.priceBDT)}</div>
                        <div className="text-[10px] line-through text-slate-400">{formatBDT(p.oldPriceBDT)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-1/3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  পিছনে
                </button>
                <button
                  type="button"
                  onClick={handleNextToStep3}
                  className="w-2/3 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <span>পেমেন্ট ধাপে যান</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {currentStep === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">ধাপ ৩ (৪ এর মধ্যে)</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">পেমেন্ট বিবরণ (Payment)</h3>
                <p className="text-xs text-slate-600">
                  নির্ধারিত মূল্য <strong className="text-blue-700 font-black">{formatBDT(selectedPkg.priceBDT)}</strong> সেন্ড মানি করুন।
                </p>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bKash')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    paymentMethod === 'bKash' ? 'border-pink-500 bg-pink-50 text-pink-700 ring-1 ring-pink-500' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  bKash
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Nagad')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    paymentMethod === 'Nagad' ? 'border-orange-500 bg-orange-50 text-orange-700 ring-1 ring-orange-500' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Nagad
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Rocket')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    paymentMethod === 'Rocket' ? 'border-purple-500 bg-purple-50 text-purple-700 ring-1 ring-purple-500' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Rocket
                </button>
              </div>

              {/* Payment Instruction Card */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">{paymentMethod} পার্সোনাল নম্বর:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-slate-900">{getAccountForMethod()}</span>
                    <button
                      type="button"
                      onClick={handleCopyNumber}
                      className="p-1 hover:text-blue-600 text-slate-400"
                      title="Copy Number"
                    >
                      {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 leading-relaxed">
                  ১. আপনার {paymentMethod} অ্যাপ থেকে 'Send Money' করুন।<br />
                  ২. পরিমাণ: <strong>{formatBDT(selectedPkg.priceBDT)}</strong><br />
                  ৩. নিচে আপনার WhatsApp/মোবাইল নম্বর ও TrxID দিন।
                </div>
              </div>

              {/* Customer Phone & TrxID inputs */}
              <div className="space-y-3">
                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-bold text-slate-700 mb-1">
                    আপনার WhatsApp / মোবাইল নম্বর <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    value={phoneOrWhatsapp}
                    onChange={(e) => setPhoneOrWhatsapp(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                  {formErrors.phoneOrWhatsapp && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.phoneOrWhatsapp}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-trxid" className="block text-xs font-bold text-slate-700 mb-1">
                    Transaction ID (TrxID) <span className="text-slate-400 font-normal">(ঐচ্ছিক)</span>
                  </label>
                  <input
                    id="modal-trxid"
                    type="text"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                    placeholder="যেমন: 9J4K8L..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl uppercase font-mono text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-1/3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  পিছনে
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-2/3 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  {isProcessing ? 'অর্ডার প্রসেসিং হচ্ছে...' : `অর্ডার কনফার্ম করুন (${formatBDT(selectedPkg.priceBDT)})`}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Delivery Confirmation */}
          {currentStep === 4 && completedOrder && (
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ধাপ ৪: ডেলিভারি প্রক্রিয়াধীন
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  অর্ডার সফলভাবে গ্রহণ করা হয়েছে!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1">
                  ১৫ থেকে ৩০ মিনিটের মধ্যে আপনার পেজে ফলোয়ার আসা শুরু হবে।
                </p>
              </div>

              {/* Order Receipt */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-left text-xs space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-bold">অর্ডার আইডি (Order ID):</span>
                  <div className="flex items-center gap-1">
                    <span className="font-mono font-bold text-blue-700">{completedOrder.orderId}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyOrderId(completedOrder.orderId)}
                      className="p-1 hover:text-blue-600 text-slate-400"
                    >
                      {copiedOrderId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">প্যাকেজ:</span>
                  <span className="font-bold text-slate-900">{completedOrder.package.name}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">পেজ লিংক:</span>
                  <span className="text-blue-700 font-medium truncate max-w-[180px]">{completedOrder.pageUrl}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">মোট মূল্য:</span>
                  <span className="font-black text-slate-900">{formatBDT(completedOrder.totalPriceBDT)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <a
                  href={generateWhatsAppOrderLink(completedOrder)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp এ অর্ডার নিশ্চিত করুন</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
