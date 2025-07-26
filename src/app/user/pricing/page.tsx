'use client'

import { Suspense } from 'react'
import PricingModelPage from '@/components/user/pricing';

function PricingContent() {
  return (
    <div>
      <PricingModelPage />
    </div>
  );
}

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PricingContent />
    </Suspense>
  );
}

export default page;
