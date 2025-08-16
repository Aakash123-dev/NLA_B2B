'use client'

import { Suspense } from 'react'
import { PromoOptimizationPage } from '@/components/user/promo-optimization/PromoOptimizationPage'

export default function PromoOptimizationPageRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PromoOptimizationPage />
    </Suspense>
  )
}
