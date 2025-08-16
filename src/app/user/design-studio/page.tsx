'use client';

import { Suspense } from 'react';
import DesignStudio from '@/components/user/Design-studio';
import '@/components/user/Design-studio/design-studio.css';

// Wrapper component that uses useSearchParams
function DesignStudioWrapper() {
  const { useSearchParams, useRouter } = require('next/navigation');
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const projectId = searchParams.get('project');
  const modelId = searchParams.get('model');

  const { useEffect } = require('react');
  useEffect(() => {
    // If project or model parameters are missing, set default values
    if (!projectId || !modelId) {
      const params = new URLSearchParams(searchParams.toString());
      
      if (!projectId) {
        params.set('project', '1009');
      }
      if (!modelId) {
        params.set('model', '1195');
      }
      
      router.replace(`/user/design-studio?${params.toString()}`);
    }
  }, [projectId, modelId, searchParams, router]);

  return (
    <div className="design-studio-container overflow-hidden">
      <DesignStudio selectedProject="My Analytics Project" />
    </div>
  );
}

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DesignStudioWrapper />
    </Suspense>
  );
}

export default page;
