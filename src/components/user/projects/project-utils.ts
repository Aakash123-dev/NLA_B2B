import { Project } from './project-actions';

// Function to duplicate a project (moved here from project-actions.tsx)
export function duplicateProject(project: Project, allProjects: Project[]): Project {
  // Find the highest ID to ensure the new ID is unique
  const highestId = Math.max(...allProjects.map(p => p.id));
  
  // Create a new project with a new ID and updated timestamps
  const now = new Date().toLocaleDateString('en-US', { 
    month: '2-digit', 
    day: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace(',', '');
  
  return {
    ...project,
    id: highestId + 1,
    title: `${project.title} (Copy)`,
    createdDate: now,
    updatedDate: now,
    version: '1'
  };
}
