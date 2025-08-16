'use client'

import { Suspense } from 'react'
import { PricingModelConfigLayout } from '@/components/user/pricing/config/PricingModelConfigLayout'

export default function PricingModelConfigPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PricingModelConfigLayout />
    </Suspense>
  )
}
