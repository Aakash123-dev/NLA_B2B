'use client'

import dynamic from 'next/dynamic'

const TpoDashboardPage = dynamic(() => import('@/components/user/tpo/dashboard').then(mod => ({ default: mod.TpoDashboardPage })), {
  loading: () => <div>Loading TPO Dashboard...</div>,
  ssr: false
})

export default function TpoDashboardPageRoute() {
  return <TpoDashboardPage />
}
