import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Check,
  Zap,
  ShieldCheck,
  Star,
  Sparkles,
  MessageCircle,
  PhoneCall,
  Headphones,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { FollowerPackage } from '../types';
import { PACKAGES_DATA, CONTACT_CONFIG, CHECKOUT_CONFIG } from '../data/packagesData';
import { formatBDT, calculateSavings } from '../utils/format';

interface ProductCardsSectionProps {
  onBuyPackage: (pkg: FollowerPackage) => void;
}

export const ProductCardsSection: React.FC<ProductCardsSectionProps> = ({
  onBuyPackage,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'bangladeshi' | 'global'>('all');

  const filteredPackages = PACKAGES_DATA.filter((pkg) => {
    if (selectedFilter === 'bangladeshi') return pkg.serviceType === 'bangladeshi';
    if (selectedFilter === 'global') return pkg.serviceType === 'global';
    return true;
  });

  return (
    <section id="packages" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Facebook Followers প্যাকেজ ও মূল্য তালিকা</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            জনপ্রিয় Facebook Followers প্যাকেজ সমূহ
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            আপনার পেজের সক্রিয়তা ও ব্র্যান্ড ট্রাস্ট বাড়াতে বেছে নিন ১০০% রিয়েল বাংলাদেশি অথবা গ্লোবাল Followers। কোনো পাসওয়ার্ড ছাড়াই সম্পূর্ণ নিরাপদ ও Non-Drop ডেলিভারি।
          </p>

          {/* Quick Contact Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            <a
              id="header-direct-whatsapp-btn"
              href={CONTACT_CONFIG.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>সরাসরি WhatsApp এ অর্ডার করুন</span>
            </a>

            <a
              id="header-talk-whatsapp-btn"
              href={CONTACT_CONFIG.whatsappTalkLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold shadow-xs transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              <span>কথা বলতে চাই</span>
            </a>

            <a
              id="header-support-whatsapp-btn"
              href={CONTACT_CONFIG.whatsappSupportLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold transition-colors"
            >
              <Headphones className="w-3.5 h-3.5 text-blue-700" />
              <span>যেকোনো সমস্যায় যোগাযোগ করুন</span>
            </a>
          </div>
        </div>

        {/* Filter Selection Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          <button
            id="filter-tab-all"
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            সকল প্যাকেজ ({PACKAGES_DATA.length})
          </button>

          <button
            id="filter-tab-bangladeshi"
            type="button"
            onClick={() => setSelectedFilter('bangladeshi')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedFilter === 'bangladeshi'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🇧🇩 বাংলাদেশি ফলোয়ার (৩টি)
          </button>

          <button
            id="filter-tab-global"
            type="button"
            onClick={() => setSelectedFilter('global')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedFilter === 'global'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🌐 গ্লোবাল ফলোয়ার (৩টি)
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPackages.map((pkg) => {
            const savings = calculateSavings(pkg.oldPriceBDT, pkg.priceBDT);
            const isFeatured = pkg.badge === 'সবচেয়ে জনপ্রিয়' || pkg.badge === 'সেরা ভ্যালু';

            const whatsappCardOrderUrl = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              `হ্যালো Noyon Online Service, আমি "${pkg.name}" (${formatBDT(pkg.priceBDT)}) প্যাকেজটি সরাসরি WhatsApp এ অর্ডার করতে চাই।`
            )}`;

            const whatsappCardTalkUrl = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              `হ্যালো, আমি "${pkg.name}" প্যাকেজটি সম্পর্কে কিছু তথ্য জানতে এবং কথা বলতে চাই।`
            )}`;

            return (
              <div
                key={pkg.id}
                id={`product-card-${pkg.id}`}
                className={`relative flex flex-col justify-between bg-white rounded-3xl border transition-all duration-200 overflow-hidden group ${
                  isFeatured
                    ? 'border-blue-500 shadow-xl shadow-blue-50 ring-2 ring-blue-500/30'
                    : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Top Badge */}
                {pkg.badge && (
                  <div className="absolute top-3.5 right-3.5 z-20 px-3 py-1 rounded-full text-[11px] font-black tracking-wide shadow-sm bg-blue-600 text-white">
                    {pkg.badge}
                  </div>
                )}

                {/* Professional Bangladesh-Focused Graphic Image Banner */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-5 flex flex-col justify-between text-white border-b border-blue-950">
                  {/* Subtle Background Pattern & Glow */}
                  <div className="absolute -right-8 -top-8 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -left-8 -bottom-8 w-36 h-36 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Brand Header Inside Graphic */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                        <Facebook className="w-4 h-4 fill-current" />
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold tracking-wider text-blue-200 block uppercase">
                          Noyon Online Service
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                          {pkg.serviceType === 'bangladeshi' ? '🇧🇩 100% Bangladeshi Service' : '🌐 100% Global Service'}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-black text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-lg shadow-2xs">
                      সাশ্রয় {savings}%
                    </span>
                  </div>

                  {/* Graphic Center Content with Required Graphic Bangla Badges */}
                  <div className="relative z-10 my-auto pt-2 space-y-2">
                    <div className="inline-block px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-extrabold tracking-wide">
                      {pkg.serviceType === 'bangladeshi' ? '100% Bangladeshi Real Followers' : '100% Real Global Followers'}
                    </div>
                    
                    <div className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                      <span>{pkg.amount.toLocaleString()}</span>
                      <span className="text-blue-300 text-base sm:text-lg font-bold">Followers</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap text-[11px] font-bold">
                      <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-blue-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        Non-Drop Service
                      </span>
                      <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-blue-200">
                        <TrendingUp className="w-3 h-3 text-cyan-400" />
                        Facebook Page Growth
                      </span>
                    </div>
                  </div>

                  {/* Graphic Bottom Bar */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-300 border-t border-white/10 pt-2">
                    <span className="font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      অফিশিয়াল নিরাপদ ডেলিভারি
                    </span>
                    <span className="text-slate-400 font-mono">ID: {pkg.id}</span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Package Title */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg sm:text-xl font-black text-slate-900">
                        <Link
                          to={`/product/${pkg.code || pkg.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {pkg.name}
                        </Link>
                      </h3>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-800">{pkg.rating}</span>
                      <span className="text-[11px] text-slate-500">({pkg.reviewsCount} Customer Review)</span>
                    </div>

                    {/* Price and Old Price Section */}
                    <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-baseline justify-between">
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                          {formatBDT(pkg.priceBDT)}
                        </div>
                        <div className="text-xs text-slate-400 line-through font-semibold">
                          পূর্বমূল্য: {formatBDT(pkg.oldPriceBDT)}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded-lg">
                          <Zap className="w-3 h-3 text-amber-500 fill-current" />
                          {pkg.deliveryTime}
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="mt-4 space-y-2 text-xs text-slate-700">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="font-semibold">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Buttons Section: WhatsApp Ordering & Support Everywhere */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    
                    {/* Primary WhatsApp Order Button */}
                    <a
                      id={`whatsapp-direct-btn-${pkg.id}`}
                      href={whatsappCardOrderUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md transition-all cursor-pointer text-center"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>সরাসরি WhatsApp এ অর্ডার করুন</span>
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </a>

                    {/* Secondary Row: Talk to us & Website Order */}
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        id={`whatsapp-talk-btn-${pkg.id}`}
                        href={whatsappCardTalkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-300 hover:bg-slate-50 text-slate-800 transition-colors shadow-2xs cursor-pointer text-center"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                        <span>কথা বলতে চাই</span>
                      </a>

                      <a
                        id={`order-now-btn-${pkg.id}`}
                        href={CHECKOUT_CONFIG.getPackageCheckoutUrl(pkg)}
                        onClick={(e) => {
                          if (onBuyPackage) {
                            e.preventDefault();
                            onBuyPackage(pkg);
                          }
                        }}
                        className="py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer text-center shadow-xs"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Order Now</span>
                      </a>
                    </div>

                    {/* View Details Route Link */}
                    <div className="text-center pt-0.5">
                      <Link
                        to={`/product/${pkg.code || pkg.id}`}
                        className="text-[11px] font-bold text-slate-500 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
                      >
                        <span>প্যাকেজের বিস্তারিত বিবরণ ও ফিচারস দেখুন →</span>
                      </Link>
                    </div>

                    {/* Support Link */}
                    <div className="pt-1 text-center">
                      <a
                        id={`contact-support-btn-${pkg.id}`}
                        href={CONTACT_CONFIG.whatsappSupportLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 hover:underline"
                      >
                        <Headphones className="w-3 h-3 text-blue-600" />
                        <span>যেকোনো সমস্যায় যোগাযোগ করুন</span>
                      </a>
                    </div>

                    <p className="text-[10px] text-center text-slate-400 font-medium">
                      🔒 কোনো পাসওয়ার্ড প্রয়োজন নেই • 100% Non-Drop গ্যারান্টি
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Order / Bulk Help Box with WhatsApp Action Buttons */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              কাস্টম ফলোয়ার প্যাকেজ ও বিশেষ সহায়তা
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              বড় পেজের জন্য ২০কে, ৫০কে বা ১০০কে+ Followers প্রয়োজন?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              বড় এজেন্সী, বিজনেস ও ক্রিয়েটর পেজের জন্য আমরা স্পেশাল বাল্ক ডিসকাউন্ট এবং নিরাপদ ড্রিপ-ফিড ডেলিভারি প্রদান করি। যেকোনো জিজ্ঞাসা বা সমস্যায় সরাসরি নক দিন।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              id="bulk-order-whatsapp-btn"
              href={`https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Noyon Online Service, আমার একটি বড় Facebook Page এর জন্য কাস্টম বাল্ক Followers প্যাকেজ প্রয়োজন।'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>সরাসরি WhatsApp এ অর্ডার করুন</span>
            </a>

            <a
              id="bulk-talk-whatsapp-btn"
              href={CONTACT_CONFIG.whatsappTalkLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold rounded-xl border border-slate-300 transition-colors whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>কথা বলতে চাই</span>
            </a>

            <a
              id="bulk-support-whatsapp-btn"
              href={CONTACT_CONFIG.whatsappSupportLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs sm:text-sm font-bold rounded-xl border border-blue-200 transition-colors whitespace-nowrap"
            >
              <Headphones className="w-4 h-4 text-blue-700" />
              <span>যেকোনো সমস্যায় যোগাযোগ করুন</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
