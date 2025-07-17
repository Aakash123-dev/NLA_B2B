'use client'

import React, { Suspense } from 'react'
import { TabsContent, Tabs } from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'

import './design-studio.css'

// Import refactored components
import ToolPalette from './ToolPalette'
import Toolbar from './Toolbar'
import CanvasArea from './CanvasArea'
import NodeTabs from './NodeTabs'
import ConfigDrawer from './ConfigDrawer'
import DeleteNodeDialog from './DeleteNodeDialog'

// Import hooks
import { 
  DesignStudioProvider, 
  useDesignStudio, 
  useCanvasActions, 
  useNodeActions, 
  useNodeManager 
} from './hooks'

function DesignStudioContent() {
  const {
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
    canvasRef,
    tools,
    commit,
    undo,
    redo,
    canUndo,
    canRedo
  } = useDesignStudio();

  // Canvas actions
  const {
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleMouseMove,
    handleCanvasMouseUp
  } = useCanvasActions({
    setDrawingLine,
    setDraggingNode,
    nodes,
    setNodes,
    connections,
    commit,
    tools,
    canvasRef
  });

  // Node actions
  const {
    handleNodeMouseDown,
    handleConnectorMouseDown,
    handleNodeDoubleClick,
    handleNodeMouseUp,
    openNodeTab,
    handleCloseTab,
    handleDeleteRequest,
  } = useNodeActions({
    nodes,
    setNodes,
    connections,
    setConnections,
    setDraggingNode,
    setDrawingLine,
    commit,
    openTabs,
    setOpenTabs,
    activeTab,
    setActiveTab,
    setIsConfigDrawerOpen,
    setActiveConfigNode,
    setNodeToDelete,
    canvasRef
  });

  // Node manager
  const { handleDeleteConfirm } = useNodeManager({
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
  });

  return (
    <div className="design-studio-container">
      <TooltipProvider>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full flex-col">
          
          <TabsContent value="design-studio" className="mt-0 flex-grow overflow-hidden">
            <div className="flex h-full">
              {/* Tool Palette */}
              <ToolPalette tools={tools} />
              
              <div className="flex flex-1 flex-col">
                {/* Toolbar */}
                <Toolbar
                  undo={undo}
                  redo={redo}
                  canUndo={canUndo}
                  canRedo={canRedo}
                />
                
                {/* Canvas Area */}
                <CanvasArea
                  canvasRef={canvasRef}
                  nodes={nodes}
                  connections={connections}
                  drawingLine={drawingLine}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDrop={handleDrop}
                  handleMouseMove={handleMouseMove}
                  handleCanvasMouseUp={handleCanvasMouseUp}
                  handleNodeMouseDown={handleNodeMouseDown}
                  handleConnectorMouseDown={handleConnectorMouseDown}
                  handleNodeMouseUp={handleNodeMouseUp}
                  handleNodeDoubleClick={handleNodeDoubleClick}
                  handleDeleteRequest={handleDeleteRequest}
                />
              </div>
            </div>
          </TabsContent>

          {/* Node Tabs */}
          <NodeTabs
            openTabs={openTabs}
            nodes={nodes}
            connections={connections}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            openNodeTab={openNodeTab}
            handleCloseTab={handleCloseTab}
          />
        </Tabs>

        {/* Delete Node Dialog */}
        <DeleteNodeDialog
          nodeToDelete={nodeToDelete}
          setNodeToDelete={setNodeToDelete}
          handleDeleteConfirm={handleDeleteConfirm}
        />

        {/* Configuration Drawer */}
        <ConfigDrawer
          isConfigDrawerOpen={isConfigDrawerOpen}
          setIsConfigDrawerOpen={setIsConfigDrawerOpen}
          activeConfigNode={activeConfigNode}
          nodes={nodes}
          connections={connections}
          openNodeTab={openNodeTab}
        />
      </TooltipProvider>
    </div>
  )
}

function DesignStudio() {
  return (
    <DesignStudioProvider>
      <DesignStudioContent />
    </DesignStudioProvider>
  )
}

export default function DesignStudioPage() {
  return (
    <Suspense fallback={<div className="flex h-full w-full items-center justify-center p-4"><p className="text-slate-600">Loading Project...</p></div>}>
      <DesignStudio />
    </Suspense>
  )
}
