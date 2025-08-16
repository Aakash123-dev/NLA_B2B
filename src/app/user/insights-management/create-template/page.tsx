import { Suspense } from 'react';
import { TemplateCreationPage } from '@/components/user/insights-management/components/TemplateCreationPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TemplateCreationPage />
    </Suspense>
  );
}
