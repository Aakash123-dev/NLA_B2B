import { Suspense } from 'react';
import PricingModelPage from '@/components/user/pricing';

function Page() {
  return (
    <Suspense fallback={<div>Loading Pricing Model...</div>}>
      <PricingModelPage />
    </Suspense>
  );
}

export default Page;
