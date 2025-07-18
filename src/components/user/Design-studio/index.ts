// Design Studio Main Components
// Main Design Studio Component
import DesignStudio from './DesignStudio';
export { DesignStudio };

// Design Studio Provider
export { DesignStudioProvider, useDesignStudioContext } from './contexts/DesignStudioContext';

// Types
export type { DesignStudioTab, DesignStudioProps, Tool, ToolCategory } from './types';

// Hooks
export { useTabs } from './hooks/useTabs';
export { useToast } from './hooks/useToast';

// Components
export { TabBar, ToastContainer } from './components';

// Utilities
export * from './utils/tabUtils';
// Export DesignStudio as default
export default DesignStudio;
// Export specific components and types
export * from './components';
export * from './types';
export * from './data';
