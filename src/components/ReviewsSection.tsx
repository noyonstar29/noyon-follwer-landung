import React, { useState } from 'react';
import {
  Facebook,
  Star,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Share2,
  ShieldCheck,
  Globe,
  MessageCircle,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { REVIEW_SCREENSHOTS, CONTACT_CONFIG } from '../data/packagesData';

export const ReviewsSection: React.FC = () => {
  const [likes, setLikes] = useState<{ [key: string]: { count: number; userLiked: boolean } }>(() => {
    const initial: { [key: string]: { count: number; userLiked: boolean } } = {};
    REVIEW_SCREENSHOTS.forEach((item) => {
      initial[item.id] = {
        count: item.likesCount || 18,
        userLiked: false,
      };
    });
    return initial;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | '5star' | 'growth'>('all');

  const toggleLike = (id: string) => {
    setLikes((prev) => {
      const current = prev[id] || { count: 18, userLiked: false };
      return {
        ...prev,
        [id]: {
          count: current.userLiked ? current.count - 1 : current.count + 1,
          userLiked: !current.userLiked,
        },
      };
    });
  };

  const filteredReviews = REVIEW_SCREENSHOTS.filter((item) => {
    if (activeFilter === '5star') return item.rating === 5;
    if (activeFilter === 'growth') return Boolean(item.growthProof);
    return true;
  });

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Facebook Badge */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold tracking-wide">
            <Facebook className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
            <span>ভেরিফায়েড ফেসবুক পেজ কাস্টমার রিভিউ</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            বাংলাদেশি কাস্টমারদের বাস্তব অভিজ্ঞতা ও মতামত
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            দেশজুড়ে হাজারো বাংলাদেশি পেজ ওনারদের সন্তুষ্টির প্রমাণ। কোনো ফেক বা বিদেশী রিভিউ নয়, ১০০% আসল বাংলাদেশি ক্লায়েন্টদের মতামত।
          </p>
        </div>

        {/* Facebook Scorecard Summary Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-4xl mx-auto mb-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-600 text-white flex flex-col items-center justify-center shadow-md shrink-0">
              <Facebook className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">৪.৯</span>
                <span className="text-slate-400 text-lg font-bold">/ ৫.০</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200">
                  অসাধারণ
                </span>
              </div>
              <div className="flex items-center gap-1 text-amber-400 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                ২,৫০০+ ভেরিফায়েড বাংলাদেশি পেজের ফেসবুক রিভিউ অনুযায়ী
              </p>
            </div>
          </div>

          {/* Quick Stats Bars */}
          <div className="w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-14 font-bold text-slate-700">৫ স্টার</span>
              <div className="w-36 sm:w-44 bg-slate-100 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full w-[98%]" />
              </div>
              <span className="font-mono font-bold text-slate-800">৯৮%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-14 font-bold text-slate-700">৪ স্টার</span>
              <div className="w-36 sm:w-44 bg-slate-100 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full w-[2%]" />
              </div>
              <span className="font-mono font-bold text-slate-800">২%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-14 font-bold text-slate-700">১-৩ স্টার</span>
              <div className="w-36 sm:w-44 bg-slate-100 rounded-full h-2">
                <div className="bg-slate-200 h-2 rounded-full w-[0%]" />
              </div>
              <span className="font-mono font-bold text-slate-800">০%</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            সকল রিভিউ ({REVIEW_SCREENSHOTS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('5star')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === '5star'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            ⭐⭐⭐⭐⭐ ৫ স্টার রিভিউ
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('growth')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'growth'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            📈 পেজ গ্রোথ ফলাফলসহ
          </button>
        </div>

        {/* Facebook Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredReviews.map((item) => {
            const isLiked = likes[item.id]?.userLiked;
            const currentLikes = likes[item.id]?.count || 18;

            return (
              <div
                key={item.id}
                id={`fb-review-card-${item.id}`}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Profile Picture, Name, Facebook recommendation */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* Realistic Bangladeshi Profile Photo */}
                    <div className="relative shrink-0">
                      <img
                        src={item.customerAvatar}
                        alt={item.customerName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs ring-2 ring-blue-500/20"
                        referrerPolicy="no-referrer"
                      />
                      {/* Facebook Logo Mini Badge */}
                      <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-blue-600 text-white flex items-center justify-center border-2 border-white shadow-xs">
                        <Facebook className="w-2.5 h-2.5 fill-current" />
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight truncate">
                          {item.customerName}
                        </h4>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      </div>

                      {/* Facebook Recommends Noyon Online Service */}
                      <p className="text-[11px] text-slate-600 leading-snug">
                        সুপারিশ করেছেন <span className="font-bold text-blue-700">Noyon Online Service</span>
                      </p>

                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                        <span>{item.date}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-0.5 text-slate-500">
                          <Globe className="w-2.5 h-2.5" />
                          <span>ফেসবুক পাবলিক রিভিউ</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 5-Star Rating & Package Pill */}
                  <div className="flex items-center justify-between gap-2 py-2 border-y border-slate-100 mb-3 text-xs">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                      <span className="text-[11px] font-bold text-slate-700 ml-1">৫.০</span>
                    </div>

                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md truncate max-w-[170px]">
                      🛍️ {item.orderInfo}
                    </span>
                  </div>

                  {/* Customer Review Text (Crisp Bangla Text) */}
                  <div className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 mb-3">
                    &ldquo;{item.messageText}&rdquo;
                  </div>

                  {/* Growth Proof Metrics (if available) */}
                  {item.growthProof && (
                    <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/70 text-[11px] mb-2">
                      <div className="flex items-center justify-between text-emerald-950 font-bold mb-1">
                        <span className="truncate max-w-[150px]">{item.growthProof.pageName}</span>
                        <span className="text-emerald-700 font-extrabold shrink-0 bg-emerald-100 px-1.5 py-0.5 rounded">
                          {item.growthProof.gain}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-emerald-200/50">
                        <span>পূর্বে: <strong className="text-slate-700">{item.growthProof.before}</strong></span>
                        <span>পরে: <strong className="text-emerald-600">{item.growthProof.after}</strong></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Facebook Action Footer: Like, Comment, Share */}
                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  {/* Reaction Summary */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 px-1">
                    <span className="flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] shadow-2xs">
                        👍
                      </span>
                      <span className="font-semibold text-slate-700">{currentLikes} জন লাইক দিয়েছেন</span>
                    </span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-0.5 text-[10px]">
                      <ShieldCheck className="w-3 h-3" />
                      ভেরিফায়েড
                    </span>
                  </div>

                  {/* Facebook Action Buttons */}
                  <div className="grid grid-cols-3 gap-1 pt-1 border-t border-slate-100 text-xs">
                    <button
                      type="button"
                      onClick={() => toggleLike(item.id)}
                      className={`py-1.5 rounded-lg flex items-center justify-center gap-1 font-bold transition-all cursor-pointer ${
                        isLiked
                          ? 'text-blue-600 bg-blue-50 font-black'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-blue-600 text-blue-600' : ''}`} />
                      <span>{isLiked ? 'লাইকড' : 'লাইক'}</span>
                    </button>

                    <button
                      type="button"
                      className="py-1.5 rounded-lg flex items-center justify-center gap-1 font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>মন্তব্য</span>
                    </button>

                    <button
                      type="button"
                      className="py-1.5 rounded-lg flex items-center justify-center gap-1 font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>শেয়ার</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Banner with WhatsApp Actions */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-4xl mx-auto shadow-xs text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>১০০% নিরাপদ ও সন্তুষ্টির গ্যারান্টি</span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            আপনিও কি আপনার পেজের ফলোয়ার বাড়িয়ে ব্যবসায় বিশ্বাসযোগ্যতা গড়তে চান?
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            কোনো পাসওয়ার্ড ছাড়াই ১৫-৩০ মিনিটে নন-ড্রপ ডেলিভারি শুরু। যেকোনো তথ্যের জন্য সরাসরি WhatsApp এ মেসেজ দিন বা কল করুন।
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <a
              id="reviews-order-whatsapp-btn"
              href={CONTACT_CONFIG.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>সরাসরি WhatsApp এ অর্ডার করুন</span>
            </a>

            <a
              id="reviews-talk-whatsapp-btn"
              href={CONTACT_CONFIG.whatsappTalkLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>কথা বলতে চাই (01831079416)</span>
            </a>

            <a
              id="reviews-support-whatsapp-btn"
              href={CONTACT_CONFIG.whatsappSupportLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <span>যেকোনো সমস্যায় যোগাযোগ করুন</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
