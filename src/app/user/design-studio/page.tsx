'use client';

import DesignStudio from '@/components/user/Design-studio';
import '@/components/user/Design-studio/design-studio.css';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

function page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const projectId = searchParams.get('project');
  const modelId = searchParams.get('model');

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

export default page;
