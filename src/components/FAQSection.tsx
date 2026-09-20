import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQS_DATA, CONTACT_CONFIG } from '../data/packagesData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wide">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>সচরাচর জিজ্ঞাসা</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            সাধারণ প্রশ্নোত্তর (FAQ)
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            ফেসবুক ফলোয়ার ক্রয়, নন-ড্রপ গ্যারান্টি, পেমেন্ট ও ডেলিভারি সংক্রান্ত প্রয়োজনীয় সকল তথ্যের উত্তর।
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-hidden cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Banner */}
        <div className="mt-10 p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">আরো কিছু জানার আছে?</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              আমাদের টিম ২৪/৭ হোয়াটসঅ্যাপে সক্রিয় আছে। সরাসরি মেসেজ দিন।
            </p>
          </div>

          <a
            href={CONTACT_CONFIG.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp এ কথা বলুন</span>
          </a>
        </div>
      </div>
    </section>
  );
};
