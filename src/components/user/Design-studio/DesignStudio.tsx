'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ReactFlowProvider, Node, Edge, addEdge, Connection, useNodesState, useEdgesState, useReactFlow, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import { Undo, Redo, Save, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

import { 
  FlowNode, 
  DataToolsSidebar, 
  ToolPalette, 
  Canvas,
  ToastContainer,
  ForecastingNodeConfig
} from './components';
import { getToolCategories } from './data';
import { DesignStudioProps, FlowNodeData, ConfigurationState } from './types';
import { useTabs } from './hooks';
import { useToast } from './hooks/useToast';

// Inner component that uses ReactFlow hooks
function DesignStudioInner({ selectedProject }: DesignStudioProps) {
  const {
    handleCreateTab,
    handleTabRemoveByNodeId
  } = useTabs();

  const { notifications, removeToast, showToast } = useToast();
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  const [dataToolsSidebar, setDataToolsSidebar] = useState<{
    isOpen: boolean;
    toolType: 'import' | 'export' | null;
  }>({ isOpen: false, toolType: null });

  // Configuration state
  const [configuration, setConfiguration] = useState<ConfigurationState>({
    isOpen: false,
    nodeId: null,
    nodeType: null,
    nodeName: null
  });

  // Track tool versions
  const [toolVersions, setToolVersions] = useState<Record<string, number>>({});

  // Undo/Redo state
  const [history, setHistory] = useState<{
    nodes: Node[];
    edges: Edge[];
  }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isSaving, setIsSaving] = useState(false);

  const { zoomIn, zoomOut, fitView, project, getViewport } = useReactFlow();

  const toolCategories = getToolCategories();

  // Initialize history with empty state
  useEffect(() => {
    if (history.length === 0) {
      const initialState = { nodes: [], edges: [] };
      setHistory([initialState]);
      setHistoryIndex(0);
    }
  }, []);

  // Save current state to history
  const saveToHistory = useCallback((nodes: Node[], edges: Edge[]) => {
    const newHistoryEntry = { nodes: [...nodes], edges: [...edges] };
    
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newHistoryEntry);
      
      // Keep only last 50 states to prevent memory issues
      if (newHistory.length > 50) {
        newHistory.shift();
        return newHistory;
      }
      
      return newHistory;
    });
    
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  // Undo functionality
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const state = history[newIndex];
      if (state) {
        setNodes(state.nodes);
        setEdges(state.edges);
        setHistoryIndex(newIndex);
      }
    }
  }, [history, historyIndex, setNodes, setEdges]);

  // Redo functionality
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const state = history[newIndex];
      if (state) {
        setNodes(state.nodes);
        setEdges(state.edges);
        setHistoryIndex(newIndex);
      }
    }
  }, [history, historyIndex, setNodes, setEdges]);

  // Save project functionality
  const handleSave = useCallback(async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    
    try {
      const projectData = {
        name: selectedProject || 'Untitled Project',
        nodes: nodes,
        edges: edges,
        toolVersions: toolVersions,
        lastModified: new Date().toISOString()
      };
      
      // Save to localStorage as a fallback
      localStorage.setItem(`project_${selectedProject || 'untitled'}`, JSON.stringify(projectData));
      
      // Here you would typically save to your backend
      // await saveProjectToBackend(projectData);
      
      showToast({
        title: 'Project Saved',
        message: `"${selectedProject || 'Untitled Project'}" has been saved successfully`,
        type: 'success'
      });
      
    } catch (error) {
      console.error('Save failed:', error);
      showToast({
        title: 'Save Failed',
        message: 'Failed to save project. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  }, [nodes, edges, toolVersions, selectedProject, isSaving, showToast]);

  // Handle insights template navigation
  const handleInsightsTemplateNavigation = () => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');
    
    if (projectId && modelId) {
      const insightsUrl = `/user/insights?project=${projectId}&model=${modelId}`;
      window.location.href = insightsUrl;
    } else {
      // Use default values if parameters are missing to ensure insights page works
      const defaultProjectId = projectId || '1009';
      const defaultModelId = modelId || '1195';
      const insightsUrl = `/user/insights?project=${defaultProjectId}&model=${defaultModelId}`;
      window.location.href = insightsUrl;
      
      showToast({
        title: 'Navigation Info',
        message: `Navigating to insights with default project (${defaultProjectId}) and model (${defaultModelId})`,
        type: 'info'
      });
    }
  };

  const handleNodeConfigure = useCallback((nodeId: string, nodeType: string, nodeName: string) => {
    // For insights-template nodes, navigate directly to insights page
    if (nodeType === 'insights-template') {
      handleInsightsTemplateNavigation();
      return;
    }
    
    // For pricing nodes, navigate directly to pricing model page
    if (nodeType === 'pricing') {
      // Get URL parameters and preserve them when navigating to pricing
      const urlParams = new URLSearchParams(window.location.search);
      const projectId = urlParams.get('project');
      const modelId = urlParams.get('model');
      
      const params = new URLSearchParams();
      if (projectId) params.set('project', projectId);
      if (modelId) params.set('model', modelId);
      
      window.location.href = `/user/pricing-model?${params.toString()}`;
      return;
    }
    
    // For other nodes, open configuration panel
    setConfiguration({
      isOpen: true,
      nodeId,
      nodeType,
      nodeName
    });
  }, []);

  const handleConfigurationClose = useCallback(() => {
    setConfiguration({
      isOpen: false,
      nodeId: null,
      nodeType: null,
      nodeName: null
    });
  }, []);

  const getNextVersion = useCallback((toolId: string) => {
    const currentVersion = toolVersions[toolId] || 0;
    const nextVersion = currentVersion + 1;
    setToolVersions(prev => ({ ...prev, [toolId]: nextVersion }));
    return nextVersion;
  }, [toolVersions]);

  const onConnect = useCallback(
    (params: Connection) => {
      // Validate connection
      if (params.source === params.target) {
        return;
      }
      
      // Check if connection already exists
      const existingConnection = edges.find(
        (edge) => 
          edge.source === params.source && 
          edge.target === params.target &&
          edge.sourceHandle === params.sourceHandle &&
          edge.targetHandle === params.targetHandle
      );
      
      if (existingConnection) {
        return;
      }
      
      const newEdges = addEdge({
        ...params,
        animated: true,
        style: { strokeWidth: 2, stroke: '#3b82f6' },
        type: 'default',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      }, edges);
      
      setEdges(newEdges);
      
      // Save to history after connecting
      setTimeout(() => {
        saveToHistory(nodes, newEdges);
      }, 0);
    },
    [setEdges, nodes, edges, saveToHistory]
  );

  const handleNodeDelete = useCallback((nodeId: string) => {
    const newNodes = nodes.filter((node) => node.id !== nodeId);
    const newEdges = edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
    
    setNodes(newNodes);
    setEdges(newEdges);
    
    // Save to history after deletion
    setTimeout(() => {
      saveToHistory(newNodes, newEdges);
    }, 0);
    
    // Remove associated tab if it exists
    handleTabRemoveByNodeId(nodeId);
  }, [nodes, edges, setNodes, setEdges, handleTabRemoveByNodeId, saveToHistory]);

  const handleDragStart = (e: React.DragEvent, toolId: string, toolName: string) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ toolId, toolName }));
    e.dataTransfer.effectAllowed = 'move';
    
    // Add visual feedback
    const dragImage = document.createElement('div');
    dragImage.textContent = toolName;
    dragImage.style.cssText = `
      position: absolute;
      top: -1000px;
      left: -1000px;
      padding: 8px 12px;
      background: rgba(59, 130, 246, 0.9);
      color: white;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(8px);
      z-index: 1000;
    `;
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 50, 25);
    
    // Clean up after drag
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      const reactFlowBounds = e.currentTarget.getBoundingClientRect();
      
      // Get the current viewport to calculate proper position
      const viewport = getViewport();
      
      // Calculate position relative to the viewport with proper offset
      const position = project({
        x: e.clientX - reactFlowBounds.left,
        y: e.clientY - reactFlowBounds.top,
      });
      
      // Snap to grid for better alignment
      const snappedPosition = {
        x: Math.round(position.x / 15) * 15,
        y: Math.round(position.y / 15) * 15,
      };
      
      // Handle special tool types
      if (data.toolId === 'import-file') {
        setDataToolsSidebar({ isOpen: true, toolType: 'import' });
        return;
      }
      
      if (data.toolId === 'export-file') {
        setDataToolsSidebar({ isOpen: true, toolType: 'export' });
        return;
      }
      
      const version = getNextVersion(data.toolId);
      const versionedName = `${data.toolName} v${version}`;
      const nodeId = `${data.toolId}-v${version}-${Date.now()}`;
      
      const newNode: Node<FlowNodeData> = {
        id: nodeId,
        type: 'customNode',
        position: snappedPosition,
        data: {
          label: versionedName,
          type: data.toolId,
          version,
          onDoubleClick: () => handleCreateTab(nodeId, versionedName, data.toolId),
          onDelete: () => handleNodeDelete(nodeId),
          onConfigure: () => handleNodeConfigure(nodeId, data.toolId, versionedName)
        },
        dragHandle: '.drag-handle',
        selectable: true,
        deletable: true,
        draggable: true,
      };
      
      setNodes((nds) => {
        const updatedNodes = nds.concat(newNode);
        
        // Save to history after adding node - use current edges
        setTimeout(() => {
          saveToHistory(updatedNodes, edges);
        }, 0);
        
        return updatedNodes;
      });
      
      
    } catch (error) {
      console.error('Error dropping tool:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    // Add visual feedback to canvas during drag
    const canvas = e.currentTarget as HTMLElement;
    canvas.style.backgroundColor = 'rgba(59, 130, 246, 0.02)';
    canvas.style.borderColor = 'rgba(59, 130, 246, 0.3)';
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    
    // Remove visual feedback
    const canvas = e.currentTarget as HTMLElement;
    canvas.style.backgroundColor = '';
    canvas.style.borderColor = '';
  };

  const getConnectedNodes = (currentNodeId: string) => {
    const connectedNodeIds = new Set<string>();

    edges.forEach(edge => {
      if (edge.source === currentNodeId) {
        connectedNodeIds.add(edge.target);
      }
      if (edge.target === currentNodeId) {
        connectedNodeIds.add(edge.source);
      }
    });

    return nodes.filter(node => connectedNodeIds.has(node.id));
  };

  // Enhanced zoom in with toast feedback
  const handleZoomIn = useCallback(() => {
    zoomIn();
  }, [zoomIn]);

  // Enhanced zoom out with toast feedback
  const handleZoomOut = useCallback(() => {
    zoomOut();
  }, [zoomOut]);

  // Enhanced fit view with toast feedback
  const handleFitView = useCallback(() => {
    fitView({ 
      padding: 0.1, 
      includeHiddenNodes: false,
      duration: 800,
      maxZoom: 1.2
    });
  }, [fitView]);

  // Keyboard shortcuts for toolbar actions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case 'y':
            e.preventDefault();
            handleRedo();
            break;
          case 's':
            e.preventDefault();
            handleSave();
            break;
          case '=':
          case '+':
            e.preventDefault();
            handleZoomIn();
            break;
          case '-':
            e.preventDefault();
            handleZoomOut();
            break;
          case '0':
            e.preventDefault();
            handleFitView();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, handleSave, handleZoomIn, handleZoomOut, handleFitView]);

  return (
    <div className="flex flex-col overflow-hidden h-full">

      {/* Project Title and Toolbar */}
      <div className="flex-shrink-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {selectedProject || 'Untitled Project'}
          </h1>
          
          {/* Studio Toolbar */}
          <div className="flex items-center space-x-2">
            <Button 
              onClick={handleUndo}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              variant="ghost"
              size="sm"
            >
              <Undo className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </Button>
            <Button 
              onClick={handleRedo}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              variant="ghost"
              size="sm"
            >
              <Redo className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </Button>
            <Button 
              onClick={handleSave}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              variant="ghost"
              size="sm"
            >
              <Save className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </Button>
            <Button 
              onClick={handleZoomIn}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              variant="ghost"
              size="sm"
            >
              <ZoomIn className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </Button>
            <Button 
              onClick={handleZoomOut}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              variant="ghost"
              size="sm"
            >
              <ZoomOut className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </Button>
            <Button 
              onClick={handleFitView}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              variant="ghost"
              size="sm"
              title="Fit all nodes to view"
            >
              <Maximize className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </Button>
          </div>
        </div>
      </div>

      {/* Two-Section Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Section: Tool Palette */}
        <ToolPalette
          toolCategories={toolCategories}
          toolVersions={toolVersions}
          onDragStart={handleDragStart}
        />

        {/* Right Section: Canvas */}
        <Canvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          notifications={notifications}
          onRemoveToast={removeToast}
        />
      </div>

      {/* Data Tools Sidebar */}
      <DataToolsSidebar
        isOpen={dataToolsSidebar.isOpen}
        onClose={() => setDataToolsSidebar({ isOpen: false, toolType: null })}
        toolType={dataToolsSidebar.toolType}
      />

      {/* Configuration Panel */}
      {configuration.isOpen && (
        <div className="design-studio-config-panel">
          {configuration.nodeType === 'forecasting' && (
            <ForecastingNodeConfig 
              nodeId={configuration.nodeId!}
              nodeType={configuration.nodeType!}
              nodeName={configuration.nodeName!}
              onClose={handleConfigurationClose}
              connectedNodes={getConnectedNodes(configuration.nodeId!)}
            />
          )}
          {/* Add more configuration components as needed */}
        </div>
      )}
    </div>
  );
}

// Main component with ReactFlow provider
export default function DesignStudio({ selectedProject }: DesignStudioProps) {
  return (
    <ReactFlowProvider>
      <DesignStudioInner selectedProject={selectedProject} />
    </ReactFlowProvider>
  );
}
