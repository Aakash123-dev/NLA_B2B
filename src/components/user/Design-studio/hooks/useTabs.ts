'use client';

import { useState, useCallback, useEffect } from 'react';
import { DesignStudioTab } from '../types';
import { 
  loadTabsFromStorage, 
  saveTabsToStorage, 
  findActiveTab, 
  ensureActiveTab,
  createStudioTab,
  canCloseTab,
  generateUniqueTabId
} from '../utils/tabUtils';
import { useToast } from './useToast';

export const useTabs = () => {
  const [tabs, setTabs] = useState<DesignStudioTab[]>(() => loadTabsFromStorage());
  const { showToast } = useToast();

  const activeTab = findActiveTab(tabs);

  // Save tabs to localStorage whenever they change
  useEffect(() => {
    const validTabs = ensureActiveTab(tabs);
    if (validTabs !== tabs) {
      setTabs(validTabs);
    }
    saveTabsToStorage(validTabs);
  }, [tabs]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'w':
            e.preventDefault();
            if (activeTab.id !== 'studio') {
              handleTabClose(activeTab.id);
            }
            break;
          case 'Tab':
            e.preventDefault();
            const currentIndex = tabs.findIndex(tab => tab.isActive);
            const nextIndex = e.shiftKey 
              ? (currentIndex - 1 + tabs.length) % tabs.length
              : (currentIndex + 1) % tabs.length;
            handleTabClick(tabs[nextIndex].id);
            break;
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
            e.preventDefault();
            const tabIndex = parseInt(e.key) - 1;
            if (tabs[tabIndex]) {
              handleTabClick(tabs[tabIndex].id);
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tabs, activeTab]);

  const handleTabClick = useCallback((tabId: string) => {
    setTabs(prevTabs => prevTabs.map(tab => ({ 
      ...tab, 
      isActive: tab.id === tabId 
    })));
  }, []);

  const handleTabClose = useCallback((tabId: string) => {
    if (tabs.length === 1 || !canCloseTab(tabId)) {
      showToast({
        title: 'Cannot close tab',
        message: 'The studio tab cannot be closed',
        type: 'warning'
      });
      return;
    }

    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    if (tabIndex === -1) return; // Tab not found
    
    const tabToClose = tabs[tabIndex];
    const isActiveTab = tabToClose.isActive;
    
    setTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== tabId);
      
      if (isActiveTab && newTabs.length > 0) {
        const studioTab = newTabs.find(tab => tab.id === 'studio');
        if (studioTab) {
          studioTab.isActive = true;
        } else {
          const newActiveIndex = Math.min(tabIndex, newTabs.length - 1);
          newTabs[newActiveIndex].isActive = true;
        }
      }
      
      return newTabs;
    });

    showToast({
      title: 'Tab closed',
      message: `"${tabToClose.name}" tab has been closed`,
      type: 'info'
    });
  }, [tabs, showToast]);

  const handleTabCloseAll = useCallback(() => {
    const closedTabsCount = tabs.filter(tab => canCloseTab(tab.id)).length;
    
    setTabs([createStudioTab()]);
    
    if (closedTabsCount > 0) {
      showToast({
        title: 'All tabs closed',
        message: `Closed ${closedTabsCount} tab${closedTabsCount > 1 ? 's' : ''}`,
        type: 'info'
      });
    }
  }, [tabs, showToast]);

  const handleTabCloseOthers = useCallback((keepTabId: string) => {
    const currentTabsCount = tabs.length;
    
    setTabs(prevTabs => {
      const studioTab = prevTabs.find(tab => tab.id === 'studio');
      const keepTab = prevTabs.find(tab => tab.id === keepTabId);
      
      if (keepTabId === 'studio') {
        return studioTab ? [{ ...studioTab, isActive: true }] : [createStudioTab()];
      }
      
      return [
        studioTab ? { ...studioTab, isActive: false } : createStudioTab(),
        keepTab ? { ...keepTab, isActive: true } : null
      ].filter(Boolean) as DesignStudioTab[];
    });

    const closedCount = currentTabsCount - (keepTabId === 'studio' ? 1 : 2);
    if (closedCount > 0) {
      showToast({
        title: 'Other tabs closed',
        message: `Closed ${closedCount} other tab${closedCount > 1 ? 's' : ''}`,
        type: 'info'
      });
    }
  }, [tabs, showToast]);

  const handleCreateTab = useCallback((nodeId: string, toolType: string, toolName: string, suppressToast: boolean = false) => {
    if (toolType === 'import-file' || toolType === 'export-file') {
      return;
    }

    setTabs(prevTabs => {
      // Check if a tab already exists for this specific node ID
      const existingTab = prevTabs.find(tab => tab.sourceItemId === nodeId);
      
      if (existingTab) {
        // Tab already exists for this exact node, just activate it
        if (!suppressToast) {
          showToast({
            title: 'Tab activated',
            message: `Switched to existing "${existingTab.name}" tab`,
            type: 'info'
          });
        }
        return prevTabs.map(tab => ({ 
          ...tab, 
          isActive: tab.id === existingTab.id 
        }));
      }

      // No existing tab found for this node, create a new one
      const newTab: DesignStudioTab = {
        id: generateUniqueTabId(`tab-${nodeId}`),
        name: toolName,
        type: toolType,
        isActive: true,
        canvasItems: [],
        connections: [],
        sourceItemId: nodeId
      };

      showToast({
        title: 'New tab created',
        message: `Created "${toolName}" tab`,
        type: 'success'
      });

      return [
        ...prevTabs.map(tab => ({ ...tab, isActive: false })),
        newTab
      ];
    });
  }, [showToast]);

  const handleTabRemoveByNodeId = useCallback((nodeId: string) => {
    setTabs(prevTabs => {
      const tabToRemove = prevTabs.find(tab => tab.sourceItemId === nodeId);
      if (tabToRemove) {
        const newTabs = prevTabs.filter(tab => tab.id !== tabToRemove.id);
        
        // If the removed tab was active, switch to studio tab
        if (tabToRemove.isActive && newTabs.length > 0) {
          const studioTab = newTabs.find(tab => tab.id === 'studio');
          if (studioTab) {
            studioTab.isActive = true;
          } else if (newTabs.length > 0) {
            newTabs[0].isActive = true;
          }
        }
        
        return newTabs;
      }
      return prevTabs;
    });
  }, []);

  const handleBackToStudio = useCallback(() => {
    setTabs(prevTabs => prevTabs.map(tab => ({ 
      ...tab, 
      isActive: tab.id === 'studio' 
    })));
  }, []);

  const handleTabRename = useCallback((tabId: string, newName: string) => {
    if (!newName.trim()) {
      showToast({
        title: 'Invalid name',
        message: 'Tab name cannot be empty',
        type: 'error'
      });
      return;
    }
    
    const oldTab = tabs.find(tab => tab.id === tabId);
    if (!oldTab) return;
    
    setTabs(prevTabs => prevTabs.map(tab => 
      tab.id === tabId ? { ...tab, name: newName.trim() } : tab
    ));

    showToast({
      title: 'Tab renamed',
      message: `"${oldTab.name}" renamed to "${newName.trim()}"`,
      type: 'success'
    });
  }, [tabs, showToast]);

  return {
    tabs,
    activeTab,
    handleTabClick,
    handleTabClose,
    handleTabCloseAll,
    handleTabCloseOthers,
    handleCreateTab,
    handleTabRemoveByNodeId,
    handleBackToStudio,
    handleTabRename,
    toastNotifications: showToast
  };
};
