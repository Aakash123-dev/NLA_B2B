// Types used across the projects components
import { Project } from './project-actions';

// Export the Project type for reuse
export type ProjectType = Project;

// Define the feature styling props
export interface FeatureStyle {
  bg: string;
  text: string;
  hover: string;
  border: string;
  icon: string;
  gradient: string;
}

// Form data for new project creation
export interface NewProjectData {
  projectName: string;
  company: string;
  targetBrand: string;
  projectType: string;
  version: string;
  description: string;
  bannerColor: string;
  icon: string;
  logo: string;
  retailers: string[];
  brands: string[];
  products: string[];
  status: string;
  createdBy: string;
}

// Custom inputs state type
export interface CustomInputsState {
  retailers: Record<number, string>;
  brands: Record<number, string>;
  products: Record<number, string>;
}
