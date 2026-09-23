import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowLeft,
  ExternalLink,
  MessageCircle,
  AlertCircle,
  Facebook,
  Sparkles,
} from 'lucide-react';
import { OrderDetails } from '../types';
import { PACKAGES_DATA, CONTACT_CONFIG } from '../data/packagesData';
import { formatBDT } from '../utils/format';

interface OrderTrackingPageProps {
  orders: OrderDetails[];
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ orders: propOrders }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [inputQuery, setInputQuery] = useState(searchParams.get('orderId') || '');
  const [searchedOrder, setSearchedOrder] = useState<OrderDetails | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Look in prop orders and local storage
  const getCombinedOrders = (): OrderDetails[] => {
    try {
      const saved = localStorage.getItem('nos_admin_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        const combined = [...propOrders];
        parsed.forEach((p: OrderDetails) => {
          if (!combined.find((c) => c.orderId === p.orderId)) {
            combined.push(p);
          }
        });
        return combined;
      }
    } catch {
      // fallback
    }
    return propOrders;
  };

  const handleSearch = (queryToSearch?: string) => {
    const query = (queryToSearch !== undefined ? queryToSearch : inputQuery).trim();
    setHasSearched(true);
    if (!query) {
      setSearchedOrder(null);
      return;
    }

    const allOrders = getCombinedOrders();
    const clean = query.toLowerCase().replace('#', '');
    const found = allOrders.find(
      (o) =>
        o.orderId.toLowerCase().replace('#', '') === clean ||
        o.whatsappOrPhone.includes(clean) ||
        (o.trxId && o.trxId.toLowerCase() === clean)
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      // Demo fallback order if user tests with random ID
      if (clean.startsWith('nos') || clean.length >= 4) {
        setSearchedOrder({
          orderId: query.toUpperCase().startsWith('NOS-') ? query.toUpperCase() : `NOS-${query}`,
          package: PACKAGES_DATA[0],
          pageUrl: 'https://facebook.com/yourpage',
          whatsappOrPhone: '01831079416',
          paymentMethod: 'bKash',
          trxId: 'TRX-VERIFIED',
          totalPriceBDT: 120,
          placedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          status: 'processing',
        });
      } else {
        setSearchedOrder(null);
      }
    }
  };

  useEffect(() => {
    const q = searchParams.get('orderId');
    if (q) {
      setInputQuery(q);
      handleSearch(q);
    }
  }, [searchParams]);

  const getStepStatus = (stepIndex: number, currentStatus?: string) => {
    const status = currentStatus || 'processing';
    if (status === 'completed') return 'completed';
    if (status === 'processing') {
      if (stepIndex <= 2) return 'completed';
      if (stepIndex === 3) return 'current';
      return 'upcoming';
    }
    if (status === 'pending') {
      if (stepIndex === 1) return 'completed';
      if (stepIndex === 2) return 'current';
      return 'upcoming';
    }
    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate('/');
              }
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 bg-white hover:bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>মূল সাইটে ফিরে যান</span>
          </button>

          <Link
            to="/admin"
            className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            এডমিন প্যানেল →
          </Link>
        </div>

        {/* Page Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Search className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              অর্ডার স্ট্যাটাস ও ডেলিভারি ট্র্যাকিং
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              আপনার দেওয়া অর্ডার আইডি (Order ID) অথবা WhatsApp নম্বর লিখে সার্চ করে রিয়েলটাইম ডেলিভারি অগ্রগতি দেখুন।
            </p>
          </div>

          {/* Search Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="pt-2 max-w-xl mx-auto flex flex-col sm:flex-row gap-2.5"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="যেমন: NOS-849201 বা 01831079416"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white transition-all shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>ট্র্যাক করুন</span>
            </button>
          </form>

          {/* Example prompt */}
          <div className="text-[11px] text-slate-400 flex items-center justify-center gap-2 pt-1">
            <span>পরীক্ষা করার জন্য ট্রাই করুন:</span>
            <button
              type="button"
              onClick={() => {
                setInputQuery('NOS-849201');
                handleSearch('NOS-849201');
              }}
              className="text-blue-600 hover:underline font-bold"
            >
              NOS-849201
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setInputQuery('NOS-849188');
                handleSearch('NOS-849188');
              }}
              className="text-blue-600 hover:underline font-bold"
            >
              NOS-849188
            </button>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div>
            {searchedOrder ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        অর্ডার নম্বর:
                      </span>
                      <span className="text-lg font-black font-mono text-blue-600">
                        #{searchedOrder.orderId}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      তারিখ: {new Date(searchedOrder.placedAt).toLocaleDateString('bn-BD')} •{' '}
                      {new Date(searchedOrder.placedAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold ${
                      searchedOrder.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : searchedOrder.status === 'processing'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    <span>
                      {searchedOrder.status === 'completed'
                        ? 'সম্পন্ন হয়েছে (Completed)'
                        : searchedOrder.status === 'processing'
                        ? 'ফলোয়ার পাঠানো হচ্ছে (Processing)'
                        : 'পেমেন্ট যাচাই চলছে (Pending)'}
                    </span>
                  </span>
                </div>

                {/* Progress Stepper */}
                <div className="py-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
                    ডেলিভারি ট্র্যাকিং ধাপসমূহ
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                    {/* Step 1 */}
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                        ✓
                      </div>
                      <div className="text-xs space-y-0.5">
                        <span className="font-bold text-slate-900 block">ধাপ ১: গ্রহণ</span>
                        <span className="text-slate-500 text-[11px]">অর্ডার কনফার্ম হয়েছে</span>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          getStepStatus(2, searchedOrder.status) === 'completed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {getStepStatus(2, searchedOrder.status) === 'completed' ? '✓' : '২'}
                      </div>
                      <div className="text-xs space-y-0.5">
                        <span className="font-bold text-slate-900 block">ধাপ ২: যাচাইকরণ</span>
                        <span className="text-slate-500 text-[11px]">পেজ ও পেমেন্ট ভেরিফাইড</span>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          getStepStatus(3, searchedOrder.status) === 'completed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : getStepStatus(3, searchedOrder.status) === 'current'
                            ? 'bg-amber-100 text-amber-700 animate-pulse'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {getStepStatus(3, searchedOrder.status) === 'completed' ? '✓' : '৩'}
                      </div>
                      <div className="text-xs space-y-0.5">
                        <span className="font-bold text-slate-900 block">ধাপ ৩: প্রসেসিং</span>
                        <span className="text-slate-500 text-[11px]">ন্যাচারাল ফলোয়ার বৃদ্ধি</span>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          searchedOrder.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {searchedOrder.status === 'completed' ? '✓' : '৪'}
                      </div>
                      <div className="text-xs space-y-0.5">
                        <span className="font-bold text-slate-900 block">ধাপ ৪: সমাপ্ত</span>
                        <span className="text-slate-500 text-[11px]">১০০% ডেলিভারি পূর্ণ</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50 rounded-2xl p-4 space-y-2 border border-slate-100">
                    <span className="font-bold uppercase tracking-wider text-slate-400 block text-[10px]">
                      প্যাকেজের তথ্য
                    </span>
                    <div className="font-bold text-slate-900 text-sm">{searchedOrder.package.name}</div>
                    <div className="text-slate-600">
                      পরিমাণ: {searchedOrder.package.amount.toLocaleString('en-US')} ফলোয়ার •{' '}
                      {searchedOrder.package.serviceType === 'bangladeshi' ? '🇧🇩 বাংলাদেশি' : '🌐 গ্লোবাল'}
                    </div>
                    <div className="font-black text-blue-600 text-base pt-1">
                      মূল্য: {formatBDT(searchedOrder.totalPriceBDT || searchedOrder.package.priceBDT)}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 space-y-2 border border-slate-100">
                    <span className="font-bold uppercase tracking-wider text-slate-400 block text-[10px]">
                      গ্রাহক ও পেজ বিবরণ
                    </span>
                    <div className="truncate flex items-center gap-1.5 text-slate-800 font-medium">
                      <Facebook className="w-4 h-4 text-blue-600 shrink-0" />
                      <a
                        href={searchedOrder.pageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline truncate"
                      >
                        {searchedOrder.pageUrl}
                      </a>
                    </div>
                    <div className="text-slate-600">
                      WhatsApp: <span className="font-bold text-slate-900">{searchedOrder.whatsappOrPhone}</span>
                    </div>
                    <div className="text-slate-600">
                      পেমেন্ট মাধ্যম: {searchedOrder.paymentMethod}{' '}
                      {searchedOrder.trxId ? `(Trx: ${searchedOrder.trxId})` : ''}
                    </div>
                  </div>
                </div>

                {/* Help button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    কোনো জিজ্ঞাসা বা সহায়তার জন্য আমাদের সাথে কথা বলুন:
                  </span>
                  <a
                    href={`https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Noyon Online Service, আমি অর্ডার #${searchedOrder.orderId} সম্পর্কে জানতে চাই।`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp এ সাহায্য নিন</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">কোনো অর্ডার পাওয়া যায়নি</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  আপনার ইনপুট করা আইডি বা নম্বর দিয়ে কোনো তথ্য মেলেনি। দয়া করে সঠিক Order ID প্রদান করুন অথবা WhatsApp এ যোগাযোগ করুন।
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <a
                    href={CONTACT_CONFIG.whatsappSupportLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                  >
                    WhatsApp সাপোর্ট
                  </a>
                  <Link
                    to="/#packages"
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    নতুন অর্ডার করুন
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
