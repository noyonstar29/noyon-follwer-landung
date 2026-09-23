import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  ExternalLink,
  MessageCircle,
  RefreshCw,
  PlusCircle,
  ArrowLeft,
  DollarSign,
  Users,
  Facebook,
} from 'lucide-react';
import { OrderDetails, FollowerPackage } from '../types';
import { PACKAGES_DATA, CONTACT_CONFIG } from '../data/packagesData';
import { formatBDT } from '../utils/format';

interface AdminPanelPageProps {
  orders: OrderDetails[];
  onUpdateOrderStatus?: (orderId: string, status: 'pending' | 'processing' | 'completed' | 'cancelled') => void;
  onAddOrder?: (order: OrderDetails) => void;
}

// Initial demo orders if none exist
const INITIAL_DEMO_ORDERS: OrderDetails[] = [
  {
    orderId: 'NOS-849201',
    package: PACKAGES_DATA[0], // 1K BD
    pageUrl: 'https://facebook.com/bd.fashion.corner',
    whatsappOrPhone: '01831079416',
    paymentMethod: 'bKash',
    trxId: '9G7A5F4382',
    totalPriceBDT: 120,
    placedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: 'processing',
  },
  {
    orderId: 'NOS-849188',
    package: PACKAGES_DATA[1], // 5K BD
    pageUrl: 'https://facebook.com/dhaka.gadget.zone',
    whatsappOrPhone: '01712345678',
    paymentMethod: 'Nagad',
    trxId: '8B3C2D1190',
    totalPriceBDT: 599,
    placedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    status: 'completed',
  },
  {
    orderId: 'NOS-849175',
    package: PACKAGES_DATA[4], // 5K Global
    pageUrl: 'https://facebook.com/global.travels.agency',
    whatsappOrPhone: '01987654321',
    paymentMethod: 'Rocket',
    trxId: '7X9Y1Z8823',
    totalPriceBDT: 350,
    placedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    status: 'pending',
  },
];

export const AdminPanelPage: React.FC<AdminPanelPageProps> = ({
  orders: externalOrders,
  onUpdateOrderStatus,
  onAddOrder,
}) => {
  const navigate = useNavigate();

  // Local state with persistence
  const [ordersList, setOrdersList] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('nos_admin_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return externalOrders.length > 0 ? externalOrders : INITIAL_DEMO_ORDERS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'completed'>('all');
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (externalOrders.length > 0) {
      setOrdersList((prev) => {
        const merged = [...externalOrders];
        prev.forEach((p) => {
          if (!merged.find((m) => m.orderId === p.orderId)) {
            merged.push(p);
          }
        });
        return merged;
      });
    }
  }, [externalOrders]);

  const saveOrders = (updated: OrderDetails[]) => {
    setOrdersList(updated);
    try {
      localStorage.setItem('nos_admin_orders', JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  const handleStatusChange = (orderId: string, newStatus: 'pending' | 'processing' | 'completed' | 'cancelled') => {
    const updated = ordersList.map((ord) => (ord.orderId === orderId ? { ...ord, status: newStatus } : ord));
    saveOrders(updated);
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(orderId, newStatus);
    }
    showToast(`অর্ডার #${orderId} এর স্ট্যাটাস "${newStatus}" এ পরিবর্তন করা হয়েছে`);
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateTestOrder = () => {
    const randomPkg = PACKAGES_DATA[Math.floor(Math.random() * PACKAGES_DATA.length)];
    const randomId = `NOS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDetails = {
      orderId: randomId,
      package: randomPkg,
      pageUrl: 'https://facebook.com/new.test.page',
      whatsappOrPhone: '01831079416',
      paymentMethod: 'bKash',
      trxId: `TRX${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      totalPriceBDT: randomPkg.priceBDT,
      placedAt: new Date().toISOString(),
      status: 'pending',
    };

    const updated = [newOrder, ...ordersList];
    saveOrders(updated);
    if (onAddOrder) {
      onAddOrder(newOrder);
    }
    showToast(`নতুন টেস্ট অর্ডার #${randomId} তৈরি করা হয়েছে`);
  };

  // Filtered orders
  const filteredOrders = ordersList.filter((ord) => {
    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesStatus;
    const matchesSearch =
      ord.orderId.toLowerCase().includes(query) ||
      ord.whatsappOrPhone.includes(query) ||
      ord.pageUrl.toLowerCase().includes(query) ||
      ord.package.name.toLowerCase().includes(query) ||
      (ord.trxId && ord.trxId.toLowerCase().includes(query));
    return matchesStatus && matchesSearch;
  });

  // Calculate KPIs
  const totalRevenue = ordersList.reduce((acc, curr) => acc + (curr.totalPriceBDT || curr.package.priceBDT), 0);
  const pendingCount = ordersList.filter((o) => o.status === 'pending').length;
  const processingCount = ordersList.filter((o) => o.status === 'processing').length;
  const completedCount = ordersList.filter((o) => o.status === 'completed').length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Alert */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Noyon Online Service
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  ADMIN
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                ফেসবুক ফলোয়ার অর্ডার ও ডেলিভারি ম্যানেজমেন্ট প্যানেল
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleCreateTestOrder}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>টেস্ট অর্ডার যোগ করুন</span>
            </button>

            <Link
              to="/track-order"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700"
            >
              <Search className="w-4 h-4" />
              <span>ট্র্যাকিং পেজ</span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>মূল সাইটে ফিরুন</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>মোট অর্ডার</span>
              <Package className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{ordersList.length}</div>
            <div className="text-[11px] text-slate-400">সকল গ্রাহকের রেকর্ড</div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>প্রসেসিং হচ্ছে</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">{processingCount}</div>
            <div className="text-[11px] text-slate-400">ডেলিভারি চলমান</div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>সম্পন্ন অর্ডার</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">{completedCount}</div>
            <div className="text-[11px] text-slate-400">সফলভাবে ডেলিভার্ড</div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>মোট লেনদেন</span>
              <DollarSign className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{formatBDT(totalRevenue)}</div>
            <div className="text-[11px] text-slate-400">{pendingCount} টি পেন্ডিং যাচাই</div>
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl overflow-hidden space-y-4 p-5">
          {/* Filters & Search Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="অর্ডার আইডি, ফোন বা পেজ লিঙ্ক খুঁজুন..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                সকল ({ordersList.length})
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('pending')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  statusFilter === 'pending'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                পেন্ডিং ({pendingCount})
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('processing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  statusFilter === 'processing'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                প্রসেসিং ({processingCount})
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('completed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  statusFilter === 'completed'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                সম্পন্ন ({completedCount})
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4">অর্ডার আইডি</th>
                  <th className="py-3 px-4">প্যাকেজ</th>
                  <th className="py-3 px-4">ফেসবুক পেজ লিঙ্ক</th>
                  <th className="py-3 px-4">গ্রাহক / WhatsApp</th>
                  <th className="py-3 px-4">মূল্য ও পেমেন্ট</th>
                  <th className="py-3 px-4">স্ট্যাটাস</th>
                  <th className="py-3 px-4 text-right">একশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-500 text-xs">
                      কোনো অর্ডার পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => (
                    <tr key={ord.orderId} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-400 whitespace-nowrap">
                        #{ord.orderId}
                        <div className="text-[10px] text-slate-500 font-sans mt-0.5">
                          {new Date(ord.placedAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                        {ord.package.name}
                        <div className="text-[10px] text-slate-400 font-normal">
                          {ord.package.serviceType === 'bangladeshi' ? '🇧🇩 বাংলাদেশি' : '🌐 গ্লোবাল'}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate">
                        <a
                          href={ord.pageUrl.startsWith('http') ? ord.pageUrl : `https://${ord.pageUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-blue-400 flex items-center gap-1.5"
                        >
                          <Facebook className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <span className="truncate">{ord.pageUrl}</span>
                          <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
                        </a>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <a
                          href={`https://wa.me/${ord.whatsappOrPhone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{ord.whatsappOrPhone}</span>
                        </a>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-bold text-white">
                          {formatBDT(ord.totalPriceBDT || ord.package.priceBDT)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {ord.paymentMethod} {ord.trxId ? `(${ord.trxId})` : ''}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={ord.status || 'pending'}
                          onChange={(e) =>
                            handleStatusChange(
                              ord.orderId,
                              e.target.value as 'pending' | 'processing' | 'completed' | 'cancelled'
                            )
                          }
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer focus:outline-hidden ${
                            ord.status === 'completed'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                              : ord.status === 'processing'
                              ? 'bg-blue-950/80 text-blue-300 border-blue-500/40'
                              : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                          }`}
                        >
                          <option value="pending" className="bg-slate-900 text-white">
                            পেন্ডিং (Pending)
                          </option>
                          <option value="processing" className="bg-slate-900 text-white">
                            প্রসেসিং (Processing)
                          </option>
                          <option value="completed" className="bg-slate-900 text-white">
                            সম্পন্ন (Completed)
                          </option>
                          <option value="cancelled" className="bg-slate-900 text-white">
                            বাতিল (Cancelled)
                          </option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <Link
                          to={`/track-order?orderId=${ord.orderId}`}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition-colors inline-flex items-center gap-1"
                        >
                          <span>ট্র্যাক</span>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
