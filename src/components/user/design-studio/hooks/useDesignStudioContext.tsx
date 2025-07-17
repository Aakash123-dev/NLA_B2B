'use client'

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'
import { CanvasNode, Connection, DrawingLine, DraggingNode } from '../types'
import { staticTools } from '../constants'
import useHistory from './useHistory'

interface DesignStudioContextType {
  nodes: CanvasNode[];
  setNodes: React.Dispatch<React.SetStateAction<CanvasNode[]>>;
  connections: Connection[];
  setConnections: React.Dispatch<React.SetStateAction<Connection[]>>;
  drawingLine: DrawingLine | null;
  setDrawingLine: React.Dispatch<React.SetStateAction<DrawingLine | null>>;
  draggingNode: DraggingNode | null;
  setDraggingNode: React.Dispatch<React.SetStateAction<DraggingNode | null>>;
  openTabs: CanvasNode[];
  setOpenTabs: React.Dispatch<React.SetStateAction<CanvasNode[]>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  isConfigDrawerOpen: boolean;
  setIsConfigDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeConfigNode: CanvasNode | null;
  setActiveConfigNode: React.Dispatch<React.SetStateAction<CanvasNode | null>>;
  nodeToDelete: CanvasNode | null;
  setNodeToDelete: React.Dispatch<React.SetStateAction<CanvasNode | null>>;
  welcomeClosed: boolean;
  setWelcomeClosed: React.Dispatch<React.SetStateAction<boolean>>;
  canvasRef: React.RefObject<HTMLDivElement>;
  tools: { [key: string]: any[] };
  commit: (newNodes: CanvasNode[], newConnections: Connection[]) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const DesignStudioContext = createContext<DesignStudioContextType | undefined>(undefined)

export function DesignStudioProvider({ children }: { children: ReactNode }) {
  // State management
  const [nodes, setNodes] = useState<CanvasNode[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [drawingLine, setDrawingLine] = useState<DrawingLine | null>(null)
  const [draggingNode, setDraggingNode] = useState<DraggingNode | null>(null)
  const [openTabs, setOpenTabs] = useState<CanvasNode[]>([])
  const [activeTab, setActiveTab] = useState('design-studio')
  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState(false)
  const [activeConfigNode, setActiveConfigNode] = useState<CanvasNode | null>(null)
  const [nodeToDelete, setNodeToDelete] = useState<CanvasNode | null>(null)
  const [welcomeClosed, setWelcomeClosed] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  
  const tools = staticTools;
  
  // History management
  const {
    commit,
    undo,
    redo,
    canUndo,
    canRedo
  } = useHistory(nodes, connections);
  
  // Load saved preferences
  useEffect(() => {
    const welcomeWasClosed = localStorage.getItem('design-studio-welcome-closed')
    if (welcomeWasClosed === 'true') {
      setWelcomeClosed(true)
    }
  }, [])
  
  const value: DesignStudioContextType = {
    nodes,
    setNodes,
    connections,
    setConnections,
    drawingLine,
    setDrawingLine,
    draggingNode,
    setDraggingNode,
    openTabs,
    setOpenTabs,
    activeTab,
    setActiveTab,
    isConfigDrawerOpen,
    setIsConfigDrawerOpen,
    activeConfigNode,
    setActiveConfigNode,
    nodeToDelete,
    setNodeToDelete,
    welcomeClosed,
    setWelcomeClosed,
    canvasRef,
    tools,
    commit,
    undo,
    redo,
    canUndo,
    canRedo
  }
  
  return (
    <DesignStudioContext.Provider value={value}>
      {children}
    </DesignStudioContext.Provider>
  )
}

export function useDesignStudio() {
  const context = useContext(DesignStudioContext)
  if (context === undefined) {
    throw new Error('useDesignStudio must be used within a DesignStudioProvider')
  }
  return context
}
