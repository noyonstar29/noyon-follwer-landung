import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Facebook,
  ExternalLink,
} from 'lucide-react';
import { OrderDetails } from '../types';
import { formatBDT } from '../utils/format';
import { PACKAGES_DATA } from '../data/packagesData';

interface OrderStatusModalProps {
  orders: OrderDetails[];
  onClose: () => void;
}

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({ orders, onClose }) => {
  const [searchId, setSearchId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<OrderDetails | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const clean = searchId.trim().toUpperCase();

    // Check existing in session orders
    const matched = orders.find(
      (o) => o.orderId.toUpperCase() === clean || o.orderId.toUpperCase() === `NOS-${clean}`
    );

    if (matched) {
      setSearchedOrder(matched);
    } else if (clean.length >= 3) {
      // Create a mock lookup for any simulated order number
      setSearchedOrder({
        orderId: clean.startsWith('NOS-') ? clean : `NOS-${clean}`,
        package: PACKAGES_DATA[1],
        pageUrl: 'https://facebook.com/yourpage',
        whatsappOrPhone: '017XXXXXXXX',
        paymentMethod: 'bKash',
        totalPriceBDT: 120,
        placedAt: 'Today, 10:15 AM',
      });
    } else {
      setSearchedOrder(null);
    }
  };

  return (
    <div
      id="order-status-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">অর্ডার ট্র্যাক করুন</h3>
              <p className="text-[11px] text-slate-500">লাইভ ডেলিভারি স্ট্যাটাস আপডেট</p>
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

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Order ID লিখুন (যেমন: NOS-491024)"
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900 font-mono"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              সার্চ
            </button>
          </form>

          {/* Quick Click for session orders */}
          {orders.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                এই সেশনের সাম্প্রতিক অর্ডারসমূহ:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {orders.map((ord) => (
                  <button
                    key={ord.orderId}
                    type="button"
                    onClick={() => {
                      setSearchId(ord.orderId);
                      setSearchedOrder(ord);
                      setHasSearched(true);
                    }}
                    className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                  >
                    {ord.orderId}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Searched Order Card */}
          {searchedOrder ? (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                <div>
                  <span className="text-slate-400 font-mono text-[10px]">অর্ডার #{searchedOrder.orderId}</span>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {searchedOrder.package.name}
                  </h4>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  ডেলিভারি চলছে
                </span>
              </div>

              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span>ডেলিভারি অগ্রগতি</span>
                  <span className="text-blue-700 font-bold">৭৫% সম্পন্ন</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full w-[75%]" />
                </div>
              </div>

              <div className="space-y-1.5 pt-1 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">টার্গেট পেজ:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[180px]">
                    {searchedOrder.pageUrl}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">পেমেন্ট:</span>
                  <span className="font-semibold text-slate-800">
                    {searchedOrder.paymentMethod} ({formatBDT(searchedOrder.totalPriceBDT)})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">গ্যারান্টি:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    ১০০% Non-Drop গ্যারান্টি
                  </span>
                </div>
              </div>
            </div>
          ) : hasSearched ? (
            <div className="text-center py-6 text-slate-500 text-xs">
              &quot;{searchId}&quot; নম্বরে কোনো অর্ডার পাওয়া যায়নি। সঠিক অর্ডার আইডি দিয়ে পুনরায় চেষ্টা করুন।
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
