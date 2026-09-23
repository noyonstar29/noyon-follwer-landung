import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Star,
  MessageCircle,
  ExternalLink,
  Award,
  Lock,
  Clock,
  Sparkles,
  Users,
} from 'lucide-react';
import { PACKAGES_DATA, CONTACT_CONFIG, CHECKOUT_CONFIG, findPackageByIdOrCode } from '../data/packagesData';
import { formatBDT, calculateSavings } from '../utils/format';
import { FollowerPackage } from '../types';

interface ProductDetailPageProps {
  onBuyPackage?: (pkg: FollowerPackage) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onBuyPackage }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const pkg = findPackageByIdOrCode(id);

  // If not found, show helpful state
  if (!pkg) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">প্যাকেজটি খুঁজে পাওয়া যায়নি</h2>
          <p className="text-slate-600 text-sm">
            আপনি যে প্যাকেজটিতে প্রবেশের চেষ্টা করছেন তা হয়তো স্থানান্তরিত হয়েছে অথবা ভুল লিঙ্ক দিয়েছেন।
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/#packages"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors text-center"
            >
              সব প্যাকেজ দেখুন
            </Link>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
            >
              পেছনে যান
            </button>
          </div>
        </div>
      </div>
    );
  }

  const savings = pkg.oldPriceBDT ? calculateSavings(pkg.oldPriceBDT, pkg.priceBDT) : 0;
  const savingsAmount = pkg.oldPriceBDT ? pkg.oldPriceBDT - pkg.priceBDT : 0;
  const checkoutUrl = CHECKOUT_CONFIG.getPackageCheckoutUrl(pkg);
  const otherPackages = PACKAGES_DATA.filter((p) => p.id !== pkg.id);

  return (
    <div className="bg-slate-50/60 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Back */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate('/#packages');
              }
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 bg-white hover:bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>সকল প্যাকেজে ফিরে যান</span>
          </button>

          <nav className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Link to="/" className="hover:text-blue-600 transition-colors">হোম</Link>
            <span>/</span>
            <Link to="/#packages" className="hover:text-blue-600 transition-colors">প্যাকেজ সমূহ</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{pkg.name}</span>
          </nav>
        </div>

        {/* Main Product Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Visual Column */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
              {/* Decorative radial glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide bg-blue-600 text-white shadow-xs">
                    {pkg.badge || 'অফিসিয়াল প্যাকেজ'}
                  </span>

                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1">
                    {pkg.serviceType === 'bangladeshi' ? '🇧🇩 বাংলাদেশি সার্ভিস' : '🌐 গ্লোবাল সার্ভিস'}
                  </span>
                </div>

                <div className="space-y-2 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-300 block">
                    Noyon Online Service • Facebook Growth
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                    {pkg.name}
                  </h1>
                </div>

                {/* Followers Graphic counter */}
                <div className="py-6 border-y border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">ফলোয়ার সংখ্যা</span>
                      <span className="text-2xl font-black text-white">{pkg.amount.toLocaleString('en-US')} Followers</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                    <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                      <span className="text-slate-400 block text-[10px]">ডেলিভারি সময়</span>
                      <span className="font-bold text-white flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {pkg.deliveryTime}
                      </span>
                    </div>

                    <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                      <span className="text-slate-400 block text-[10px]">নিরাপত্তা লেভেল</span>
                      <span className="font-bold text-emerald-300 flex items-center gap-1 mt-0.5">
                        <Lock className="w-3.5 h-3.5" />
                        পাসওয়ার্ড মুক্ত
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Guarantee Banner */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-white block">১০০% নন-ড্রপ রিফিল নিশ্চয়তা</span>
                  <span className="text-slate-400">লাইফটাইম সাপোর্ট ও দ্রুততম ডেলিভারি সার্ভিস</span>
                </div>
              </div>
            </div>

            {/* Right Details & Action Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                {/* Rating & Review summary */}
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span className="font-black text-amber-900">{pkg.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-slate-500 font-semibold">
                    ({pkg.reviewsCount} টি ভেরিফাইড গ্রাহক রিভিউ)
                  </span>
                  <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">
                    ✓ ইন-স্টক (ইনস্ট্যান্ট শুরু)
                  </span>
                </div>

                {/* Price Display */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-baseline gap-4">
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block">মূল্য তালিকা</span>
                    <div className="flex items-baseline gap-2.5 mt-0.5">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900">
                        {formatBDT(pkg.priceBDT)}
                      </span>
                      {pkg.oldPriceBDT && (
                        <span className="text-lg text-slate-400 line-through font-bold">
                          {formatBDT(pkg.oldPriceBDT)}
                        </span>
                      )}
                    </div>
                  </div>

                  {savings > 0 && (
                    <span className="px-3 py-1 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-black self-center">
                      {savings}% ছাড় • সাশ্রয় {formatBDT(savingsAmount)}
                    </span>
                  )}
                </div>

                {/* Included Features */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    প্যাকেজে অন্তর্ভুক্ত সুবিধাসমূহ
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {pkg.features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-xs text-slate-700 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust highlight box */}
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/70 text-xs text-blue-900 space-y-1">
                  <span className="font-black flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-600" />
                    কিভাবে অর্ডার নেওয়া হয়?
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    অর্ডার করতে শুধু আপনার ফেসবুক পেজের লিঙ্ক প্রয়োজন হবে। কোনো পাসওয়ার্ড বা অ্যাডমিন অ্যাক্সেসের প্রয়োজন নেই।
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Order Now (Direct Checkout) */}
                  <a
                    id={`product-page-checkout-btn-${pkg.id}`}
                    href={checkoutUrl}
                    onClick={(e) => {
                      if (onBuyPackage) {
                        e.preventDefault();
                        onBuyPackage(pkg);
                      }
                    }}
                    className="py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md hover:shadow-lg cursor-pointer text-center"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Order Now (অনলাইন চেকআউট)</span>
                    <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
                  </a>

                  {/* WhatsApp Direct Buy */}
                  <a
                    id={`product-page-whatsapp-btn-${pkg.id}`}
                    href={`https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Noyon Online Service, আমি "${pkg.name}" (${formatBDT(pkg.priceBDT)}) প্যাকেজটি অর্ডার করতে চাই।`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md cursor-pointer text-center"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>সরাসরি WhatsApp এ অর্ডার</span>
                  </a>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 px-1">
                  <span>🔒 বিকাশ, নগদ, রকেট গ্রহণযোগ্য</span>
                  <a
                    href={CONTACT_CONFIG.whatsappTalkLink}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-blue-600 hover:underline"
                  >
                    কথা বলতে চান? হেল্পলাইন: {CONTACT_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Packages Section */}
        <div className="pt-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                অন্যান্য জনপ্রিয় প্যাকেজ সমূহ
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                আপনার প্রয়োজন অনুযায়ী অন্য যেকোনো প্যাকেজ নির্বাচন করুন
              </p>
            </div>

            <Link
              to="/#packages"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:underline"
            >
              সবগুলো দেখুন →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherPackages.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-600">
                      {item.serviceType === 'bangladeshi' ? '🇧🇩 বাংলাদেশি' : '🌐 গ্লোবাল'}
                    </span>
                    <span className="font-black text-slate-900">{formatBDT(item.priceBDT)}</span>
                  </div>

                  <h3 className="font-black text-slate-900 text-base">{item.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {item.features[0]} • {item.deliveryTime}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <Link
                    to={`/product/${item.code || item.id}`}
                    className="flex-1 text-center py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    বিস্তারিত দেখুন
                  </Link>

                  <a
                    href={CHECKOUT_CONFIG.getPackageCheckoutUrl(item)}
                    onClick={(e) => {
                      if (onBuyPackage) {
                        e.preventDefault();
                        onBuyPackage(item);
                      }
                    }}
                    className="flex-1 text-center py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
