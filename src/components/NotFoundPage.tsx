import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Search, MessageCircle, AlertTriangle } from 'lucide-react';
import { CONTACT_CONFIG } from '../data/packagesData';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-slate-50/60">
      <div className="max-w-lg w-full text-center bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-xs">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight block">
            ৪০৪
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            পৃষ্ঠাটি খুঁজে পাওয়া যায়নি (Page Not Found)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
            আপনি যে ঠিকানাটিতে প্রবেশের চেষ্টা করছেন সেটি হয়তো পরিবর্তিত হয়েছে অথবা ভুল ইউআরএল দেওয়া হয়েছে।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>মূল পেজে ফিরে যান</span>
          </Link>

          <Link
            to="/track-order"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors border border-slate-200"
          >
            <Search className="w-4 h-4" />
            <span>অর্ডার ট্র্যাক করুন</span>
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-600 font-bold text-xs sm:text-sm transition-colors border border-slate-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>পেছনে</span>
          </button>
        </div>

        {/* Helpful links */}
        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
          <span>প্রয়োজনীয় লিংক:</span>
          <div className="flex flex-wrap items-center justify-center gap-3 font-semibold text-blue-600">
            <Link to="/#packages" className="hover:underline">প্যাকেজ সমূহ</Link>
            <span>•</span>
            <Link to="/admin" className="hover:underline">এডমিন প্যানেল</Link>
            <span>•</span>
            <a
              href={CONTACT_CONFIG.whatsappSupportLink}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-600 hover:underline flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp সাপোর্ট</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
