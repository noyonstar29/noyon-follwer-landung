import React from 'react';
import {
  ShieldCheck,
  Zap,
  Lock,
  RotateCcw,
  Users,
  Headphones,
  TrendingUp,
  Award,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: '100% Risk-Free & Meta Safe',
      description:
        'We adhere strictly to Facebook algorithmic safety standards. Your account will never be restricted, shadowbanned, or flagged.',
    },
    {
      icon: <Lock className="w-6 h-6 text-emerald-600" />,
      title: 'Zero Passwords Required',
      description:
        'Your security is paramount. We only require your public profile handle or page link. Never share credentials with anyone.',
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-indigo-600" />,
      title: '30-Day Auto Refill Guarantee',
      description:
        'In the rare event of follower drops, our automated system monitors and replenishes your count for 30 days completely free.',
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: 'Natural Algorithmic Drip-Feed',
      description:
        'Followers are distributed in natural, organic waves to mimic authentic viral expansion that search and feeds reward.',
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: 'Real High-Retention Profiles',
      description:
        'High-trust profiles complete with bios, profile pictures, and active posts to ensure optimal profile authority.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-rose-500" />,
      title: '24/7 Dedicated Priority Support',
      description:
        'Questions about your campaign? Our social growth specialists are reachable around the clock via WhatsApp and Email.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide">
            Industry Leading Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Creators &amp; Brands Choose Noyon Online Service
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We bridge the gap between initial obscurity and viral social proof with reliable,
            privacy-first social growth infrastructure.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 hover:bg-white hover:shadow-lg hover:border-blue-200 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-5 shadow-2xs group-hover:scale-105 transition-transform">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Callout */}
        <div className="mt-14 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                The Noyon Difference
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Authentic Growth vs. Dangerous Bot Farms
              </h3>
              <p className="text-sm text-slate-200 max-w-2xl leading-relaxed">
                Cheap bot services blast 10,000 ghost accounts in 3 minutes, triggering Facebook
                security sweeps and account suspensions. We use smart human-paced delivery, active profile networks,
                and genuine device footprints to safeguard your digital asset.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                href="#packages"
                className="px-6 py-3.5 bg-white hover:bg-slate-100 text-blue-950 font-black text-sm rounded-xl shadow-lg transition-colors whitespace-nowrap"
              >
                Get Started Safely
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
