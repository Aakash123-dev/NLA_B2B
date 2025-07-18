'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useTabs } from '../hooks/useTabs';
import { DesignStudioTab } from '../types';

interface DesignStudioContextType {
  tabs: DesignStudioTab[];
  activeTab: DesignStudioTab;
  handleTabClick: (tabId: string) => void;
  handleTabClose: (tabId: string) => void;
  handleTabCloseAll: () => void;
  handleTabCloseOthers: (tabId: string) => void;
  handleCreateTab: (nodeId: string, toolType: string, toolName: string) => void;
  handleTabRemoveByNodeId: (nodeId: string) => void;
  handleBackToStudio: () => void;
  handleTabRename: (tabId: string, newName: string) => void;
}

const DesignStudioContext = createContext<DesignStudioContextType | undefined>(undefined);

export const useDesignStudioContext = () => {
  const context = useContext(DesignStudioContext);
  if (context === undefined) {
    throw new Error('useDesignStudioContext must be used within a DesignStudioProvider');
  }
  return context;
};

interface DesignStudioProviderProps {
  children: ReactNode;
}

export const DesignStudioProvider: React.FC<DesignStudioProviderProps> = ({ children }) => {
  const tabsHook = useTabs();

  const contextValue: DesignStudioContextType = {
    tabs: tabsHook.tabs,
    activeTab: tabsHook.activeTab,
    handleTabClick: tabsHook.handleTabClick,
    handleTabClose: tabsHook.handleTabClose,
    handleTabCloseAll: tabsHook.handleTabCloseAll,
    handleTabCloseOthers: tabsHook.handleTabCloseOthers,
    handleCreateTab: tabsHook.handleCreateTab,
    handleTabRemoveByNodeId: tabsHook.handleTabRemoveByNodeId,
    handleBackToStudio: tabsHook.handleBackToStudio,
    handleTabRename: tabsHook.handleTabRename
  };

  return (
    <DesignStudioContext.Provider value={contextValue}>
      {children}
    </DesignStudioContext.Provider>
  );
};
