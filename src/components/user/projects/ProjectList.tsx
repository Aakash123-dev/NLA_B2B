import { ProjectType } from './ProjectTypes';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  projects: ProjectType[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  handleEditProject: (project: ProjectType) => void;
  handleDeleteProject: (project: ProjectType) => void;
  handleDuplicateProject: (project: ProjectType) => void;
}

export default function ProjectList({
  projects,
  favorites,
  toggleFavorite,
  handleEditProject,
  handleDeleteProject,
  handleDuplicateProject
}: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          handleEditProject={handleEditProject}
          handleDeleteProject={handleDeleteProject}
          handleDuplicateProject={handleDuplicateProject}
        />
      ))}
    </div>
  );
}
