import { z } from 'zod';

export const createProjectSchema = z.object({
  project_name: z.string().min(1, 'Project name is required'),
  type_of_project: z.string().min(1, 'Project type is required'),
  client_name: z.string().min(1, 'Client name is required'),
  product_name: z.string().min(1, 'Product name is required'),
  retailers: z.array(z.string()).optional(),
  brands: z.array(z.string()).optional(),
  products: z.array(z.string()).optional(),
  company_logo: z.string().optional(),
});

export const updateProjectSchema = z.object({
  project_name: z.string().min(1, 'Project name is required').optional(),
  type_of_project: z.string().min(1, 'Project type is required').optional(),
  client_name: z.string().min(1, 'Client name is required').optional(),
  product_name: z.string().min(1, 'Product name is required').optional(),
  retailers: z.array(z.string()).optional(),
  brands: z.array(z.string()).optional(),
  products: z.array(z.string()).optional(),
  company_logo: z.string().optional(),
  pin_project: z.string().optional(),
});

export const duplicateProjectSchema = z.object({
  project_id: z.number().positive('Project ID must be positive'),
  project_name: z.string().min(1, 'Project name is required'),
});

export const projectFiltersSchema = z.object({
  user_id: z.number().positive('User ID must be positive'),
  filter: z.enum(['all', 'pinned', 'recent']).default('all'),
  search: z.string().optional(),
  page: z.number().positive().default(1),
  limit: z.number().positive().max(100).default(10),
});

export const pinProjectSchema = z.object({
  project_id: z.number().positive('Project ID must be positive'),
  pin_project: z.enum(['1', '0']),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type DuplicateProjectInput = z.infer<typeof duplicateProjectSchema>;
export type ProjectFiltersInput = z.infer<typeof projectFiltersSchema>;
export type PinProjectInput = z.infer<typeof pinProjectSchema>; 