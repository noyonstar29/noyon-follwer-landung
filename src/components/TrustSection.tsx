import React from 'react';
import {
  CheckCircle2,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { FollowerPackage } from '../types';
import { CONTACT_CONFIG } from '../data/packagesData';

interface TrustSectionProps {
  onBuyPackage?: (pkg: FollowerPackage) => void;
}

export const TrustSection: React.FC<TrustSectionProps> = () => {
  const whatsappOrderLink = `${CONTACT_CONFIG.whatsappLink}`;
  const whatsappTalkLink = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'হ্যালো Noyon Online Service, আমি Facebook Followers নিয়ে কিছু জানতে চাই এবং কথা বলতে চাই।'
  )}`;

  const servicePoints = [
    'Real Facebook Followers',
    '100% Non-Drop Support',
    'Fast Delivery',
    'Trusted Service',
    'Customer Support',
  ];

  return (
    <section id="trust" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Trust Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12 space-y-10">
          
          {/* Part 1: The Eye-Opening Question & Hook */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold tracking-wide">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>একটি গুরুত্বপূর্ণ বিষয়</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              ১ হাজার Facebook Followers মাত্র ২০ টাকায়? 🤯
            </h2>

            <div className="space-y-3 pt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-800">
                হ্যাঁ, কম দামে পাওয়া যায়। কিন্তু প্রশ্ন হলো—এই follower কি সত্যিই আপনার Page-এর জন্য উপকারী?
              </p>
              <p className="text-slate-600 font-normal">
                সব follower এক রকম নয়। অনেক সময় কম দামের follower কিছুদিন পর চলে যেতে পারে এবং Page-এর growth ও trust ক্ষতিগ্রস্ত হতে পারে।
              </p>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          {/* Part 2: Our Service Section */}
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Noyon Online Service</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                তাই বেছে নিন নিরাপদ ও বিশ্বস্ত Service
              </h3>
            </div>

            {/* Points List */}
            <div className="bg-slate-50/90 rounded-2xl border border-slate-200/80 p-5 sm:p-7">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-sm sm:text-base font-bold text-slate-800">
                {servicePoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/70 shadow-2xs"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-slate-900">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Trust Paragraph */}
              <div className="mt-6 p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-center">
                <p className="text-sm sm:text-base text-blue-950 font-medium leading-relaxed">
                  আমরা দিচ্ছি বাংলাদেশি Real Followers সহ Non-Drop Service, যা আপনার Page-এর professional growth এবং online presence বাড়াতে সাহায্য করে।
                </p>
              </div>
            </div>
          </div>

          {/* Part 3: Why Trust Us */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-3 text-center sm:text-left relative overflow-hidden">
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  আমাদের কেন বিশ্বাস করবেন?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  আমরা স্বচ্ছতার সাথে কাজ করি। নিয়মিত customer feedback, review এবং trusted ordering system এর মাধ্যমে আপনাকে সহজ ও নিরাপদ service প্রদান করি।
                </p>
              </div>
            </div>
          </div>

          {/* Part 4: Direct CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <a
              id="trust-section-order-whatsapp-btn"
              href={whatsappOrderLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer text-center"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>সরাসরি WhatsApp এ অর্ডার করুন</span>
            </a>

            <a
              id="trust-section-talk-whatsapp-btn"
              href={whatsappTalkLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 font-bold text-sm sm:text-base shadow-xs transition-all cursor-pointer text-center"
            >
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>কথা বলতে চাই</span>
            </a>

            <a
              id="trust-section-support-whatsapp-btn"
              href={CONTACT_CONFIG.whatsappSupportLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-bold text-xs sm:text-sm transition-all cursor-pointer text-center"
            >
              <span>যেকোনো সমস্যায় যোগাযোগ করুন</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
