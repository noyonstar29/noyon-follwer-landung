import React from 'react';
import {
  MessageCircle,
  PackageCheck,
  CreditCard,
  Zap,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { HOW_IT_WORKS_STEPS, CONTACT_CONFIG, CHECKOUT_CONFIG } from '../data/packagesData';

interface HowItWorksSectionProps {
  onOrderNowClick: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onOrderNowClick,
}) => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <MessageCircle className="w-6 h-6 text-emerald-600 fill-emerald-100" />;
      case 1:
        return <PackageCheck className="w-6 h-6 text-blue-600" />;
      case 2:
        return <CreditCard className="w-6 h-6 text-indigo-600" />;
      case 3:
        return <Zap className="w-6 h-6 text-amber-500 fill-current" />;
      default:
        return <Sparkles className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wide">
            <span>৪টি সহজ ধাপ</span>
          </div>

          {/* Exact Title Requested */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            কিভাবে অর্ডার করবেন?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            খুব সহজেই মাত্র ৪টি ধাপে আপনার ফেসবুক পেজের জন্য ফলোয়ার অর্ডার সম্পন্ন করুন। কোনো পাসওয়ার্ড বা অ্যাডমিন অ্যাক্সেস প্রয়োজন নেই।
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs relative text-left flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div>
                {/* Big Step Number */}
                <div className="text-3xl sm:text-4xl font-black text-slate-200 group-hover:text-blue-200 transition-colors absolute top-5 right-5 select-none font-mono">
                  {item.step}
                </div>

                {/* Icon */}
                <div className="w-13 h-13 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-5 shadow-2xs group-hover:scale-110 transition-transform">
                  {getStepIcon(idx)}
                </div>

                {/* Title and Subtitle */}
                <h3 className="text-base sm:text-lg font-black text-slate-900 mb-0.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs font-bold text-blue-600 mb-2.5">
                  {item.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Step indicator */}
              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-400">
                ধাপ {idx + 1} / ৪
              </div>
            </div>
          ))}
        </div>

        {/* Process CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            id="how-it-works-order-now-btn"
            href={CHECKOUT_CONFIG.defaultCheckoutUrl}
            onClick={(e) => {
              if (onOrderNowClick) {
                e.preventDefault();
                onOrderNowClick();
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
          >
            <span>Order Now (এখনই অর্ডার করুন)</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={CONTACT_CONFIG.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp এ যোগাযোগ করুন</span>
          </a>
        </div>
      </div>
    </section>
  );
};
