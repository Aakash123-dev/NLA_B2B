import DesignStudio from '@/components/user/Design-studio';
import '@/components/user/Design-studio/design-studio.css';

function page() {
  return (
    <div className="design-studio-container overflow-hidden">
      <DesignStudio selectedProject="My Analytics Project" />
    </div>
  );
}

export default page;
