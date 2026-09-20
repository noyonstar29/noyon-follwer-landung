import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustSection } from './components/TrustSection';
import { ProductCardsSection } from './components/ProductCardsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTASection } from './components/FinalCTASection';
import { WhatsAppCalloutCTA } from './components/WhatsAppCalloutCTA';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderStatusModal } from './components/OrderStatusModal';
import { FollowerPackage, OrderDetails } from './types';
import { PACKAGES_DATA, CHECKOUT_CONFIG } from './data/packagesData';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<FollowerPackage | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderDetails[]>([]);

  // When customer clicks Order Now for a specific package, redirect directly to existing product checkout page
  const handleBuyPackage = (pkg: FollowerPackage) => {
    CHECKOUT_CONFIG.redirectToCheckout(pkg);
  };

  // When customer clicks general Order Now button, smoothly scroll to packages to select specific product
  const handleOrderNowClick = () => {
    const el = document.getElementById('packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      CHECKOUT_CONFIG.redirectToCheckout(PACKAGES_DATA[0]);
    }
  };

  // Save placed order (if needed locally)
  const handleOrderPlaced = (order: OrderDetails) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Header & Navigation */}
      <Navbar
        onOpenTrackOrder={() => setIsTrackingOpen(true)}
        onOrderNowClick={handleOrderNowClick}
      />

      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection
          onOrderNowClick={handleOrderNowClick}
          onBuyPackage={handleBuyPackage}
        />

        {/* 2. Trust Section (Follower Comparison: Global vs Bangladeshi with Quantity Selector) */}
        <TrustSection onBuyPackage={handleBuyPackage} />

        {/* 3. Services/Product Section (Attractive product cards with ৳ prices) */}
        <ProductCardsSection
          onBuyPackage={handleBuyPackage}
        />

        {/* 3.1 WhatsApp Callout CTA: কথা বলতে চান? */}
        <WhatsAppCalloutCTA />

        {/* 4. Why Choose Us (Real customer support, Non-Drop service, Fast delivery, Trusted website) */}
        <WhyChooseUsSection />

        {/* 5. How It Works (4 steps: Page Link Submit, Select Package, Payment, Delivery) */}
        <HowItWorksSection
          onOrderNowClick={handleOrderNowClick}
        />

        {/* 6. Customer Review Section (Space for review screenshots & growth proofs) */}
        <ReviewsSection />

        {/* 7. FAQ Section (Common customer questions) */}
        <FAQSection />

        {/* 8. Final CTA (Start Growing Your Facebook Page Today) */}
        <FinalCTASection
          onOrderNowClick={handleOrderNowClick}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Checkout Modal (4-step checkout flow) */}
      {isCheckoutOpen && selectedPackage && (
        <CheckoutModal
          pkg={selectedPackage}
          onClose={() => {
            setIsCheckoutOpen(false);
            setSelectedPackage(null);
          }}
          onOrderPlaced={handleOrderPlaced}
        />
      )}

      {/* Order Status & Tracking Modal */}
      {isTrackingOpen && (
        <OrderStatusModal
          orders={orders}
          onClose={() => setIsTrackingOpen(false)}
        />
      )}

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsAppButton />
    </div>
  );
}
