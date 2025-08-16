'use client';

import dynamic from 'next/dynamic';

const SimulatorPage = dynamic(() => import('@/components/user/simulator/SimulatorPage'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

function page() {
  return (
    <div>
      <SimulatorPage />
    </div>
  );
}

export default page;
