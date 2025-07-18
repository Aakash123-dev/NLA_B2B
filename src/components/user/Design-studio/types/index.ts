import { LucideIcon } from 'lucide-react';

// Design Studio Tab Types
export interface DesignStudioTab {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
  canvasItems: CanvasItem[];
  connections: Connection[];
  sourceItemId?: string;
}

export interface CanvasItem {
  id: string;
  type: string;
  name: string;
  version: number;
  x: number;
  y: number;
  config?: any;
}

export interface Connection {
  from: string;
  to: string;
  fromHandle: string;
  toHandle: string;
}

// Tool Categories and Tools
export interface ToolCategory {
  name: string;
  tools: Tool[];
}

export interface Tool {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

// Design Studio Props
export interface DesignStudioProps {
  selectedProject?: string | null;
  isSidebarCollapsed?: boolean;
}

// Insight Template Types
export interface InsightTemplate {
  id: string;
  name: string;
  type: string;
  dataSource: string;
  created: string;
}

// Data Tools Sidebar Types
export interface DataToolsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  toolType: 'import' | 'export' | null;
}

// Flow Node Data
export interface FlowNodeData {
  label: string;
  type: string;
  version: number;
  onDoubleClick?: () => void;
  onDelete: () => void;
  onConfigure?: () => void;
}

// Node Configuration Types
export interface NodeConfigProps {
  nodeId: string;
  nodeType: string;
  nodeName: string;
  onClose: () => void;
  connectedNodes?: any[];
}

// Configuration State
export interface ConfigurationState {
  isOpen: boolean;
  nodeId: string | null;
  nodeType: string | null;
  nodeName: string | null;
}
