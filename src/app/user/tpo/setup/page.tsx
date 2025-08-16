'use client'

import dynamic from 'next/dynamic'

const TpoSetupPage = dynamic(() => import('@/components/user/tpo/setup').then(mod => ({ default: mod.TpoSetupPage })), {
  loading: () => <div>Loading TPO Setup...</div>,
  ssr: false
})

export default function TpoSetupPageRoute() {
  return <TpoSetupPage />
}
