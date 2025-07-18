import InsightsPage from '@/components/user/insights';

interface PageProps {
  searchParams: {
    project?: string;
    model?: string;
  };
}

function page({ searchParams }: PageProps) {
  const { project, model } = searchParams;
  
  return (
    <div>
      <InsightsPage projectId={project} modelId={model} />
    </div>
  );
}

export default page;
