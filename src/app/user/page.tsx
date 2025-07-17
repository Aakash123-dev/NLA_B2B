'use client';

import {
  AuroraBackground,
  CTASection,
  DemoProjectsSection,
  DemoVideosSection,
  FAQSection,
  GazelleAISection,
  ProductsSection,
  ProjectCreationSection,
  WelcomeSection,
} from '@/components/user/page/components';
import { useState } from 'react';

export default function UserDashboard() {
  const [activeSection, setActiveSection] = useState('welcome');

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0C0E22] text-white">
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
