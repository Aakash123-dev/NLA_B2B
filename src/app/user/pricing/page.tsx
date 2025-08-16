'use client'

import { Suspense } from 'react'
import PricingModelPage from '@/components/user/pricing';

function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PricingModelPage />
      </Suspense>
    </div>
  );
}

export default page;
