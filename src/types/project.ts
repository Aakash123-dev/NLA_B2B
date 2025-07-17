import { BaseEntity } from './common';
import { LucideIcon } from 'lucide-react';

// Project and Design Studio related types
export interface Project extends BaseEntity {
  title: string;
  description: string;
  version: string;
  logo: string;
  color: string;
  progress?: number;
  features: string[];
  status: 'Active' | 'Inactive' | 'Draft' | 'Archived';
  createdBy: string;
  updatedBy?: string;
  company?: string;
  targetBrand?: string;
  projectType?: string;
  retailers?: string[];
  brands?: string[];
  products?: string[];
}

// Design Studio Canvas Types
export interface CanvasNode extends BaseEntity {
  type: string;
  name: string;
  version: number;
  icon: LucideIcon;
  x: number;
  y: number;
  config?: NodeConfig;
}

export interface NodeConfig {
  [key: string]: any;
}

export interface Connection {
  from: string;
  to: string;
  fromHandle: Handle;
  toHandle: Handle;
}

export interface Handle {
  nodeId: string;
  side: 'top' | 'bottom' | 'left' | 'right';
  index: number;
}

export interface Tool {
  name: string;
  description: string;
  type: string;
  icon: LucideIcon;
}

export interface DrawingLine {
  startNodeId: string;
  startHandle: Handle;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface DraggingNode {
  id: string;
  offsetX: number;
  offsetY: number;
}

// Node Configuration Types
export interface DatabaseOption {
  id: string;
  name: string;
}

export interface RetailerOption {
  id: string;
  name: string;
}

export interface BrandOption {
  id: string;
  name: string;
}

export interface ProductOption {
  id: string;
  name: string;
}

export interface EventType {
  id: string;
  name: string;
  color: string;
}

export interface PriorityLevel {
  id: string;
  name: string;
  color: string;
}

export interface OptimizationGoal {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

export interface TimeHorizon {
  id: string;
  name: string;
  weight: number;
}
