import { DesignStudioTab } from '../types';

export const TAB_STORAGE_KEY = 'design-studio-tabs';

export const createStudioTab = (): DesignStudioTab => ({
  id: 'studio',
  name: 'Studio',
  type: 'canvas',
  isActive: true,
  canvasItems: [],
  connections: []
});

export const validateTab = (tab: any): tab is DesignStudioTab => {
  return (
    typeof tab === 'object' &&
    typeof tab.id === 'string' &&
    typeof tab.name === 'string' &&
    typeof tab.type === 'string' &&
    typeof tab.isActive === 'boolean' &&
    Array.isArray(tab.canvasItems) &&
    Array.isArray(tab.connections)
  );
};

export const validateTabs = (tabs: any[]): DesignStudioTab[] => {
  if (!Array.isArray(tabs)) return [createStudioTab()];
  
  const validTabs = tabs.filter(validateTab);
  
  // Ensure studio tab exists
  if (!validTabs.find(tab => tab.id === 'studio')) {
    validTabs.unshift(createStudioTab());
  }
  
  // Ensure at least one tab is active
  const hasActiveTab = validTabs.some(tab => tab.isActive);
  if (!hasActiveTab && validTabs.length > 0) {
    validTabs[0].isActive = true;
  }
  
  return validTabs;
};

export const loadTabsFromStorage = (): DesignStudioTab[] => {
  if (typeof window === 'undefined') return [createStudioTab()];
  
  try {
    const savedTabs = localStorage.getItem(TAB_STORAGE_KEY);
    if (savedTabs) {
      const parsedTabs = JSON.parse(savedTabs);
      return validateTabs(parsedTabs);
    }
  } catch (error) {
    console.error('Error loading tabs from localStorage:', error);
  }
  
  return [createStudioTab()];
};

export const saveTabsToStorage = (tabs: DesignStudioTab[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(TAB_STORAGE_KEY, JSON.stringify(tabs));
  } catch (error) {
    console.error('Error saving tabs to localStorage:', error);
  }
};

export const generateUniqueTabId = (baseId: string): string => {
  return `${baseId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const findActiveTab = (tabs: DesignStudioTab[]): DesignStudioTab => {
  return tabs.find(tab => tab.isActive) || tabs[0];
};

export const ensureActiveTab = (tabs: DesignStudioTab[]): DesignStudioTab[] => {
  const hasActiveTab = tabs.some(tab => tab.isActive);
  
  if (!hasActiveTab && tabs.length > 0) {
    // Make the first tab active if none are active
    return tabs.map((tab, index) => ({ ...tab, isActive: index === 0 }));
  }
  
  return tabs;
};

export const getTabIcon = (tabType: string): string => {
  switch (tabType) {
    case 'canvas':
      return 'home';
    case 'pricing':
      return 'bar-chart-3';
    case 'forecasting':
      return 'filter';
    case 'trade-plan-optimization':
      return 'settings';
    default:
      return 'database';
  }
};

export const canCloseTab = (tabId: string): boolean => {
  return tabId !== 'studio';
};

export const getTabDisplayName = (name: string, maxLength: number = 30): string => {
  if (name.length <= maxLength) return name;
  return name.substring(0, maxLength - 3) + '...';
};
