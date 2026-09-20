import React, { useState, useEffect } from 'react';
import {
  Facebook,
  ShieldCheck,
  Zap,
  Menu,
  X,
  MessageCircle,
  Search,
} from 'lucide-react';
import { CONTACT_CONFIG, CHECKOUT_CONFIG } from '../data/packagesData';

interface NavbarProps {
  onOpenTrackOrder: () => void;
  onOrderNowClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTrackOrder,
  onOrderNowClick,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'তুলনা', href: '#trust' },
    { label: 'প্যাকেজ সমূহ', href: '#packages' },
    { label: 'কেন আমাদের সার্ভিস?', href: '#why-choose-us' },
    { label: 'কিভাবে অর্ডার করবেন?', href: '#how-it-works' },
    { label: 'রিভিউ', href: '#reviews' },
    { label: 'প্রশ্নোত্তর', href: '#faq' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-slate-900 text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">
              <strong className="text-white font-semibold">SPECIAL OFFER:</strong> ১০০% নন-ড্রপ বাংলাদেশি ফলোয়ার সার্ভিস শুরু মাত্র ৳১২০ থেকে!
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              পাসওয়ার্ড লাগে না
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              ১৫-৩০ মিনিটে শুরু
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        id="navbar-header"
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200 py-3'
            : 'bg-white border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            id="nav-brand-logo"
            href="#hero"
            className="flex items-center gap-2.5 group focus:outline-hidden"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">
                  Noyon Online Service
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                  BD
                </span>
              </div>
              <span className="text-[11px] font-semibold text-blue-600 tracking-wide mt-0.5">
                ফেসবুক গ্রোথ পার্টনার
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Quick Button */}
            <a
              id="nav-whatsapp-link"
              href={CONTACT_CONFIG.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-2 rounded-xl transition-colors shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 fill-current text-emerald-600" />
              <span>WhatsApp: 01831079416</span>
            </a>

            {/* Track Order Button */}
            <button
              id="nav-track-order-btn"
              type="button"
              onClick={onOpenTrackOrder}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">অর্ডার ট্র্যাক</span>
            </button>

            {/* Order Now CTA */}
            <a
              id="nav-order-now-btn"
              href={CHECKOUT_CONFIG.defaultCheckoutUrl}
              onClick={(e) => {
                if (onOrderNowClick) {
                  e.preventDefault();
                  onOrderNowClick();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer text-center"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Order Now (অর্ডার করুন)</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              id="nav-mobile-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div id="nav-mobile-drawer" className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={CONTACT_CONFIG.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>সরাসরি WhatsApp এ অর্ডার করুন</span>
              </a>
              <a
                href={CONTACT_CONFIG.whatsappTalkLink}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-2 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-200"
              >
                <span>কথা বলতে চাই (01831079416)</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrackOrder();
                }}
                className="w-full py-2 px-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl border border-slate-200"
              >
                🔍 অর্ডার স্ট্যাটাস ট্র্যাক করুন
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
