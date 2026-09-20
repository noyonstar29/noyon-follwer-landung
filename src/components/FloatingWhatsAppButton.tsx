import React, { useState } from 'react';
import { MessageCircle, X, PhoneCall, Headphones, Sparkles } from 'lucide-react';
import { CONTACT_CONFIG } from '../data/packagesData';

export const FloatingWhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Quick Action Flyout */}
      {isOpen && (
        <div className="w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">WhatsApp হেল্পডেস্ক</h4>
                <p className="text-[11px] font-bold text-emerald-600">01831079416 (অনলাইন)</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <a
              id="flyout-order-whatsapp-btn"
              href={CONTACT_CONFIG.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 w-full p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>সরাসরি WhatsApp এ অর্ডার করুন</span>
            </a>

            <a
              id="flyout-talk-whatsapp-btn"
              href={CONTACT_CONFIG.whatsappTalkLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-blue-600 shrink-0" />
              <span>কথা বলতে চাই</span>
            </a>

            <a
              id="flyout-support-whatsapp-btn"
              href={CONTACT_CONFIG.whatsappSupportLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 w-full p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-bold transition-colors"
            >
              <Headphones className="w-4 h-4 text-blue-600 shrink-0" />
              <span>যেকোনো সমস্যায় যোগাযোগ করুন</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-3">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-white text-slate-900 px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <span>WhatsApp: 01831079416</span>
          </button>
        )}

        <button
          id="floating-whatsapp-toggle-btn"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle WhatsApp Menu"
          className="relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <>
              <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
              <MessageCircle className="w-7 h-7 fill-current relative z-10" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full shadow-xs" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
