import { Suspense } from 'react';
import DesignStudio from '@/components/user/Design-studio';
import '@/components/user/Design-studio/design-studio.css';
import DesignStudioClient from './DesignStudioClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Design Studio...</div>}>
      <DesignStudioClient />
    </Suspense>
  );
}
