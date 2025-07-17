'use client';

import { useState } from 'react';
import {
  AuroraBackground,
  WelcomeSection,
  DemoProjectsSection,
  DemoVideosSection,
  GazelleAISection,
  ProjectCreationSection,
  ProductsSection,
  FAQSection,
  CTASection
} from './page/components';

export default function UserDashboard() {
  const [activeSection, setActiveSection] = useState('welcome');

  return (
    <div className="min-h-screen bg-[#0C0E22] text-white relative overflow-hidden">
      {/* Aurora Background */}
      <AuroraBackground />
      
      {/* Content Layer */}
      <div className="relative z-10">
        {/* Welcome Section */}
        <WelcomeSection />

        {/* Demo Projects Section */}
        <DemoProjectsSection />

        {/* Demo Videos Section */}
        <DemoVideosSection />

        {/* Gazelle AI Section */}
        <GazelleAISection />

        {/* Project Creation Section */}
        <ProjectCreationSection />

        {/* All Products Section */}
        <ProductsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <CTASection />
      </div>
    </div>
  );
}
