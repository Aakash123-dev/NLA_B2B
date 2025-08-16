'use client'

import dynamic from 'next/dynamic'

const PromotionReportPage = dynamic(() => import('@/components/user/tpo/reports/PromotionReportPage'), {
  loading: () => <div>Loading TPO Reports...</div>,
  ssr: false
})

export default function TpoReportPageRoute() {
  return <PromotionReportPage />
}
