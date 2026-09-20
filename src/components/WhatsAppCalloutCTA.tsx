import React from 'react';
import { MessageCircle, ShieldCheck, Clock, PhoneCall, Headphones } from 'lucide-react';
import { CONTACT_CONFIG } from '../data/packagesData';

export const WhatsAppCalloutCTA: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-slate-800">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-center lg:text-left">
            {/* Left Column: Icon and Texts */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
                </div>
                {/* Active online pulse dot */}
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900" />
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                  <Clock className="w-3 h-3" />
                  <span>দ্রুত রেসপন্স • ২৪/৭ সাপোর্ট • WhatsApp: 01831079416</span>
                </div>
                {/* Exact Title Requested */}
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  কথা বলতে চান?
                </h3>
                {/* Exact Text Requested */}
                <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
                  যেকোনো প্রশ্ন বা সমস্যার জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।
                </p>
              </div>
            </div>

            {/* Right Column: Requested Action Buttons */}
            <div className="shrink-0 w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
              <a
                id="callout-whatsapp-order-btn"
                href={CONTACT_CONFIG.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>সরাসরি WhatsApp এ অর্ডার করুন</span>
              </a>

              <a
                id="callout-whatsapp-talk-btn"
                href={CONTACT_CONFIG.whatsappTalkLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-all whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>কথা বলতে চাই</span>
              </a>

              <a
                id="callout-whatsapp-support-btn"
                href={CONTACT_CONFIG.whatsappSupportLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-400/30 font-bold text-xs transition-all whitespace-nowrap"
              >
                <Headphones className="w-3.5 h-3.5 text-blue-300" />
                <span>যেকোনো সমস্যায় যোগাযোগ করুন</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
