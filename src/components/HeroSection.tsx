import React from 'react';
import {
  Facebook,
  ShieldCheck,
  Zap,
  Star,
  CheckCircle2,
  Lock,
  ArrowRight,
  MessageCircle,
  TrendingUp,
  Sparkles,
  PhoneCall,
  Headphones,
} from 'lucide-react';
import { FollowerPackage } from '../types';
import { PACKAGES_DATA, CONTACT_CONFIG, CHECKOUT_CONFIG } from '../data/packagesData';
import { formatBDT } from '../utils/format';

interface HeroSectionProps {
  onOrderNowClick: () => void;
  onBuyPackage: (pkg: FollowerPackage) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOrderNowClick,
  onBuyPackage,
}) => {
  // Featured Bangladeshi Package for hero spotlight
  const featuredPackage = PACKAGES_DATA.find((p) => p.id === 'pkg-1k-bd') || PACKAGES_DATA[0];

  return (
    <section
      id="hero"
      className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-blue-50/40 via-white to-slate-50 border-b border-slate-200 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Exact Title, Text, Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Noyon Online Service • বাংলাদেশে বিশ্বস্ত Facebook Growth Partner</span>
            </div>

            {/* Bangla Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.18]">
              আপনার Facebook Page বড় করুন{' '}
              <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2">
                Quality Followers
              </span>{' '}
              দিয়ে
            </h1>

            {/* Bangla Text */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-xl leading-relaxed font-normal">
              আপনার Facebook Page-এর জন্য নিন Real Followers এবং ১০০% Non-Drop সার্ভিস। দ্রুত ও নিরাপদে পেজের জনপ্রিয়তা বৃদ্ধি করুন।
            </p>

            {/* Buttons: Direct WhatsApp Order, Talk, Support */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                id="hero-contact-whatsapp-btn"
                href={CONTACT_CONFIG.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-600/20 hover:shadow-xl transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>সরাসরি WhatsApp এ অর্ডার করুন</span>
              </a>

              <a
                id="hero-talk-whatsapp-btn"
                href={CONTACT_CONFIG.whatsappTalkLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 font-bold text-sm sm:text-base shadow-xs transition-all"
              >
                <PhoneCall className="w-4 h-4 text-blue-600" />
                <span>কথা বলতে চাই</span>
              </a>

              <button
                id="hero-order-now-btn"
                type="button"
                onClick={onOrderNowClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer"
              >
                <span>প্যাকেজ দেখুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Support Link */}
            <div className="pt-0.5">
              <a
                id="hero-support-link"
                href={CONTACT_CONFIG.whatsappSupportLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
              >
                <Headphones className="w-3.5 h-3.5 text-blue-600" />
                <span>যেকোনো সমস্যায় যোগাযোগ করুন (WhatsApp: 01831079416)</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>১০০% Non-Drop গ্যারান্টি</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>পাসওয়ার্ডের প্রয়োজন নেই</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500 fill-current" />
                <span>১৫-৩০ মিনিটে শুরু</span>
              </div>
            </div>

            {/* Social Proof Stars */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                ৪.৯ / ৫.০ রেটিং (২,৫০০+ সফল অর্ডার সম্পন্ন)
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Product Spotlight & Live Growth Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Premium Card Container */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-7 space-y-5 relative">
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                      <Facebook className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                        সেরা বিক্রিত প্যাকেজ
                      </h4>
                      <p className="text-[11px] text-blue-600 font-semibold">১০০% Real Followers</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 uppercase">
                    100% Non-Drop
                  </span>
                </div>

                {/* Spotlight Package Details */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">
                        {featuredPackage.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Real Bangladeshi Followers
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black text-blue-700">
                        {formatBDT(featuredPackage.priceBDT)}
                      </div>
                      <div className="text-xs line-through text-slate-400 font-semibold">
                        {formatBDT(featuredPackage.oldPriceBDT)}
                      </div>
                    </div>
                  </div>

                  {/* Growth Simulation */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">পেজের রিচ ও গ্রোথ বৃদ্ধি</div>
                        <div className="text-[10px] text-slate-500">নিরাপদ অ্যালগরিদমিক ডেলিভারি</div>
                      </div>
                    </div>
                    <span className="text-emerald-600 font-extrabold">+১,০০০ Real Followers</span>
                  </div>

                  {/* Bullet features */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>সরাসরি বাংলাদেশি অ্যাক্টিভ প্রোফাইল</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>১০০% Non-Drop ও ফ্রি রিফিল সুবিধা</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>bKash / Nagad / Rocket এ সহজ পেমেন্ট</span>
                    </div>
                  </div>
                </div>

                {/* Instant Action Buttons */}
                <div className="space-y-2">
                  <a
                    id="hero-spotlight-whatsapp-order-btn"
                    href={`https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Noyon Online Service, আমি "${featuredPackage.name}" (${formatBDT(featuredPackage.priceBDT)}) প্যাকেজটি সরাসরি WhatsApp এ অর্ডার করতে চাই।`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>সরাসরি WhatsApp এ অর্ডার করুন</span>
                  </a>

                  <a
                    id="hero-buy-spotlight-btn"
                    href={CHECKOUT_CONFIG.getPackageCheckoutUrl(featuredPackage)}
                    onClick={(e) => {
                      if (onBuyPackage) {
                        e.preventDefault();
                        onBuyPackage(featuredPackage);
                      }
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs text-center"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Order Now ({featuredPackage.name} চেকআউট)</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                  </a>
                </div>

                {/* Payment Logos Badge */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] text-slate-500">
                  <span>পেমেন্ট মাধ্যম:</span>
                  <span className="font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded">bKash</span>
                  <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">Nagad</span>
                  <span className="font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Rocket</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
