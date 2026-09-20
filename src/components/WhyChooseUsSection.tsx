import React from 'react';
import {
  Headphones,
  ShieldCheck,
  Zap,
  BadgeCheck,
  Sparkles,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { WHY_CHOOSE_US_POINTS, CONTACT_CONFIG } from '../data/packagesData';

export const WhyChooseUsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'headset':
        return <Headphones className="w-7 h-7 text-blue-600" />;
      case 'shield-check':
        return <ShieldCheck className="w-7 h-7 text-emerald-600" />;
      case 'zap':
        return <Zap className="w-7 h-7 text-amber-500 fill-current" />;
      case 'badge-check':
        return <BadgeCheck className="w-7 h-7 text-indigo-600" />;
      default:
        return <Sparkles className="w-7 h-7 text-blue-600" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>নিরাপদ ও বিশ্বস্ত সেবা</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            কেন আমাদের সার্ভিস নেবেন?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            আমরা শতভাগ নিরাপত্তা, রিয়েল সাপোর্ট এবং কোয়ালিটি নিশ্চিত করে ফেসবুক পেজের দ্রুত ও অর্গানিক গ্রোথে সাহায্য করি।
          </p>
        </div>

        {/* 4 Requested Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US_POINTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-7 hover:bg-white hover:border-blue-300 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {getIcon(item.icon)}
                </div>

                {/* English & Bengali Title */}
                <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-bold text-blue-600 mb-3">
                  {item.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center text-[11px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                <span>১০০% গ্যারান্টিড</span>
                <ArrowRight className="w-3 h-3 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Live Support Banner */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>২৪/৭ রিয়েল সাপোর্ট সক্রিয়</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              অর্ডার করার আগে কোনো প্রশ্ন আছে? সরাসরি কথা বলুন
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              আমাদের টিম আপনাকে সেরা প্যাকেজটি বেছে নিতে সাহায্য করবে। কোনো দ্বিধা ছাড়া যেকোনো সময় ইনবক্স করুন।
            </p>
          </div>

          <a
            href={CONTACT_CONFIG.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition-colors whitespace-nowrap shrink-0"
          >
            <span>WhatsApp এ যোগাযোগ করুন</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
