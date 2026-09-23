import React from 'react';
import { HeroSection } from './HeroSection';
import { TrustSection } from './TrustSection';
import { ProductCardsSection } from './ProductCardsSection';
import { WhyChooseUsSection } from './WhyChooseUsSection';
import { HowItWorksSection } from './HowItWorksSection';
import { ReviewsSection } from './ReviewsSection';
import { FAQSection } from './FAQSection';
import { FinalCTASection } from './FinalCTASection';
import { WhatsAppCalloutCTA } from './WhatsAppCalloutCTA';
import { FollowerPackage } from '../types';

interface HomePageProps {
  onOrderNowClick: () => void;
  onBuyPackage: (pkg: FollowerPackage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOrderNowClick,
  onBuyPackage,
}) => {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection
        onOrderNowClick={onOrderNowClick}
        onBuyPackage={onBuyPackage}
      />

      {/* 2. Trust Section (Follower Comparison: Global vs Bangladeshi with Quantity Selector) */}
      <TrustSection onBuyPackage={onBuyPackage} />

      {/* 3. Services/Product Section (Attractive product cards with ৳ prices) */}
      <ProductCardsSection onBuyPackage={onBuyPackage} />

      {/* 3.1 WhatsApp Callout CTA: কথা বলতে চান? */}
      <WhatsAppCalloutCTA />

      {/* 4. Why Choose Us (Real customer support, Non-Drop service, Fast delivery, Trusted website) */}
      <WhyChooseUsSection />

      {/* 5. How It Works (4 steps: Page Link Submit, Select Package, Payment, Delivery) */}
      <HowItWorksSection onOrderNowClick={onOrderNowClick} />

      {/* 6. Customer Review Section (Space for review screenshots & growth proofs) */}
      <ReviewsSection />

      {/* 7. FAQ Section (Common customer questions) */}
      <FAQSection />

      {/* 8. Final CTA (Start Growing Your Facebook Page Today) */}
      <FinalCTASection onOrderNowClick={onOrderNowClick} />
    </>
  );
};
