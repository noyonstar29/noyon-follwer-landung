import React from 'react';
import { Facebook, ShieldCheck, Lock, Award, Heart, MessageCircle } from 'lucide-react';
import { CONTACT_CONFIG } from '../data/packagesData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Facebook className="w-5 h-5 fill-current" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                Noyon Online Service
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              বাংলাদেশের বিশ্বস্ত ফেসবুক ফলোয়ার ও সোশ্যাল সার্ভিস প্ল্যাটফর্ম। ১০০% নন-ড্রপ গ্যারান্টি, কোনো পাসওয়ার্ড ছাড়া নিরাপদ ডেলিভারি ও সার্বক্ষণিক কাস্টমার সাপোর্ট।
            </p>

            {/* Payment & Security Badges representation */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                গৃহীত পেমেন্ট মাধ্যম
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-bold text-[10px] text-pink-400">
                  bKash
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-bold text-[10px] text-orange-400">
                  Nagad
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-bold text-[10px] text-purple-400">
                  Rocket
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-bold text-[10px] text-emerald-400">
                  🔒 ১০০% নিরাপদ
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              ফলোয়ার প্যাকেজ
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  ১কে বাংলাদেশি Followers
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  ৫কে বাংলাদেশি Followers
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  ১০কে বাংলাদেশি Followers
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  ১কে গ্লোবাল Followers
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  কাস্টম / বাল্ক অর্ডার
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              নিরাপত্তা ও বিশ্বাসযোগ্যতা
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#trust" className="hover:text-white transition-colors">
                  ১০০% Non-Drop রিফিল গ্যারান্টি
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-white transition-colors">
                  পাসওয়ার্ড পলিসি (লাগবে না)
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-white transition-colors">
                  কেন আমাদের সার্ভিস নেবেন?
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  কিভাবে অর্ডার করবেন?
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  কাস্টমার রিভিউ ও প্রমাণ
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              যোগাযোগ ও সহায়তা
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              WhatsApp: <span className="text-emerald-400 font-bold">01831079416</span> (সরাসরি চ্যাট ও হেল্প)
            </p>
            <div className="space-y-2 pt-1">
              <a
                id="footer-whatsapp-order-btn"
                href={CONTACT_CONFIG.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors text-xs font-bold shadow-xs text-center"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>সরাসরি WhatsApp এ অর্ডার করুন</span>
              </a>

              <a
                id="footer-whatsapp-talk-btn"
                href={CONTACT_CONFIG.whatsappTalkLink}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors text-xs font-bold text-center"
              >
                <span>কথা বলতে চাই</span>
              </a>

              <a
                id="footer-whatsapp-support-btn"
                href={CONTACT_CONFIG.whatsappSupportLink}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-blue-400 hover:text-blue-300 transition-colors text-[11px] font-semibold text-center"
              >
                <span>যেকোনো সমস্যায় যোগাযোগ করুন</span>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 space-y-4 text-slate-500 text-[11px] leading-relaxed">
          <p>
            <strong className="text-slate-400">সতর্কবার্তা ও তথ্য:</strong> Noyon Online Service একটি স্বাধীন ডিজিটাল সোশ্যাল গ্রোথ প্রোভাইডার। আমরা মেটা বা ফেসবুক (Meta Platforms, Inc.) এর সাথে প্রত্যক্ষ বা পরোক্ষভাবে যুক্ত নই।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-900">
            <p>© {new Date().getFullYear()} Noyon Online Service. সর্বস্বত্ব সংরক্ষিত।</p>
            <div className="flex items-center gap-4">
              <a href="#trust" className="hover:text-slate-400">
                গোপনীয়তা ও নিরাপত্তা
              </a>
              <span>•</span>
              <a href="#trust" className="hover:text-slate-400">
                Non-Drop শর্তাবলী
              </a>
              <span>•</span>
              <a href="#faq" className="hover:text-slate-400">
                প্রশ্নোত্তর
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
