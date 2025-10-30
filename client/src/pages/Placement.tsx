// In: /src/pages/Placement.tsx

import React from 'react';
// CORRECTED IMPORTS:
import HeroSection from './Placement/HeroSection';
import HighlightsSection from './Placement/HighlightsSection';
import HiringPartnersSection from './Placement/HiringPartnersSection';
import PlacementProcessSection from './Placement/PlacementProcessSection';
import PlacementSupportSection from './Placement/PlacementSupportSection';
import RecruiterTestimonials from './Placement/RecruiterTestimonials';
import StatsSection from './Placement/StatsSection';
import SuccessStoriesSection from './Placement/SuccessStoriesSection';
import FAQSection from './Placement/FAQSection';


export default function PlacementPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <HighlightsSection />
      <SuccessStoriesSection />
      <HiringPartnersSection />
      <PlacementProcessSection />
      <PlacementSupportSection />
      <RecruiterTestimonials />
      <FAQSection />
    </div>
  );
}