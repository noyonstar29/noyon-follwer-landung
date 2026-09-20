import React from 'react';
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
} from 'lucide-react';
import { CONTACT_CONFIG, CHECKOUT_CONFIG } from '../data/packagesData';

interface FinalCTASectionProps {
  onOrderNowClick: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onOrderNowClick,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-blue-50/50 relative overflow-hidden border-b border-slate-200">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-200 text-xs font-bold tracking-wide mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Noyon Online Service • বিশ্বস্ত গ্রোথ পার্টনার</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
            আজই আপনার Facebook Page-এর বৃদ্ধি শুরু করুন
          </h2>

          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
            আপনার পেজের জন্য নিন Real Followers এবং ১০০% Non-Drop সার্ভিস। কোনো পাসওয়ার্ড ছাড়াই মাত্র ১৫-৩০ মিনিটে ডেলিভারি শুরু হবে।
          </p>

          {/* Buttons: Direct WhatsApp Order, Talk, Support & Order Now */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 flex-wrap">
            <a
              id="final-cta-whatsapp-order-btn"
              href={CONTACT_CONFIG.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base shadow-xl shadow-emerald-950/30 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>সরাসরি WhatsApp এ অর্ডার করুন</span>
            </a>

            <a
              id="final-cta-whatsapp-talk-btn"
              href={CONTACT_CONFIG.whatsappTalkLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-base transition-all"
            >
              <span>কথা বলতে চাই</span>
            </a>

            <a
              id="final-cta-order-now-btn"
              href={CHECKOUT_CONFIG.defaultCheckoutUrl}
              onClick={(e) => {
                if (onOrderNowClick) {
                  e.preventDefault();
                  onOrderNowClick();
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-slate-100 text-blue-950 font-black text-base shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 text-center"
            >
              <span>Order Now (চেকআউট করুন)</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="pt-4">
            <a
              id="final-cta-whatsapp-support-btn"
              href={CONTACT_CONFIG.whatsappSupportLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-200 hover:text-white underline underline-offset-4"
            >
              <span>যেকোনো সমস্যায় যোগাযোগ করুন (WhatsApp: 01831079416)</span>
            </a>
          </div>

          {/* Trust Guarantees row */}
          <div className="mt-10 pt-8 border-t border-blue-700/50 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-blue-200">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>১০০% Non-Drop রিফিল গ্যারান্টি</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-blue-300 shrink-0" />
              <span>কোনো পাসওয়ার্ড লাগবে না</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>১৫-৩০ মিনিটে দ্রুত শুরু</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
