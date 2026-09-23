import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProductCardsSection } from './ProductCardsSection';
import { FollowerPackage } from '../types';

interface PackagesListPageProps {
  onBuyPackage: (pkg: FollowerPackage) => void;
}

export const PackagesListPage: React.FC<PackagesListPageProps> = ({ onBuyPackage }) => {
  return (
    <div className="py-8 bg-slate-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>মূল পেজে ফিরে যান</span>
          </Link>
          <nav className="text-xs font-semibold text-slate-500">
            <Link to="/" className="hover:text-blue-600">হোম</Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-900 font-bold">প্যাকেজ সমূহ</span>
          </nav>
        </div>
      </div>
      <ProductCardsSection onBuyPackage={onBuyPackage} />
    </div>
  );
};
