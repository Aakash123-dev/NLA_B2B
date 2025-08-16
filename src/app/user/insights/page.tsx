import InsightsPage from '@/components/user/insights';

interface PageProps {
  searchParams: Promise<{
    project?: string;
    model?: string;
  }>;
}

async function page({ searchParams }: PageProps) {
  const { project, model } = await searchParams;
  
  return (
    <div>
      <InsightsPage projectId={project} modelId={model} />
    </div>
  );
}

export default page;
