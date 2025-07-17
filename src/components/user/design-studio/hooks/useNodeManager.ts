'use client'

import React, { useState, useEffect } from 'react'
import { CanvasNode, Connection } from '../types'

interface NodeManagerProps {
  nodeToDelete: CanvasNode | null;
  setNodeToDelete: React.Dispatch<React.SetStateAction<CanvasNode | null>>;
  nodes: CanvasNode[];
  setNodes: React.Dispatch<React.SetStateAction<CanvasNode[]>>;
  connections: Connection[];
  setConnections: React.Dispatch<React.SetStateAction<Connection[]>>;
  commit: (newNodes: CanvasNode[], newConnections: Connection[]) => void;
  openTabs: CanvasNode[];
  setOpenTabs: React.Dispatch<React.SetStateAction<CanvasNode[]>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function useNodeManager({
  nodeToDelete,
  setNodeToDelete,
  nodes,
  setNodes,
  connections,
  setConnections,
  commit,
  openTabs,
  setOpenTabs,
  activeTab,
  setActiveTab
}: NodeManagerProps) {
  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (!nodeToDelete) return;

    const newConnections = connections.filter(c => c.from !== nodeToDelete.id && c.to !== nodeToDelete.id);
    const newNodes = nodes.filter(n => n.id !== nodeToDelete.id);

    setNodes(newNodes);
    setConnections(newConnections);
    commit(newNodes, newConnections);

    // Close tab if open
    const tabIsOpen = openTabs.some(t => t.id === nodeToDelete.id);
    if (tabIsOpen) {
      const newTabs = openTabs.filter(tab => tab.id !== nodeToDelete.id);
      setOpenTabs(newTabs);

      if (activeTab === nodeToDelete.id) {
        if (newTabs.length > 0) {
          setActiveTab(newTabs[newTabs.length - 1].id);
        } else {
          setActiveTab('design-studio');
        }
      }
    }
    
    setNodeToDelete(null);
  };

  return {
    handleDeleteConfirm
  }
}
