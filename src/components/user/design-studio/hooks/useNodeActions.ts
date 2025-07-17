'use client'

import React from 'react'
import { CanvasNode, Connection, Handle, DraggingNode, DrawingLine } from '../types'
import { getHandleCoords } from '../utils'

interface NodeActionsProps {
  nodes: CanvasNode[]
  setNodes: React.Dispatch<React.SetStateAction<CanvasNode[]>>
  connections: Connection[]
  setConnections: React.Dispatch<React.SetStateAction<Connection[]>>
  setDraggingNode: React.Dispatch<React.SetStateAction<DraggingNode | null>>
  setDrawingLine: React.Dispatch<React.SetStateAction<DrawingLine | null>>
  commit: (newNodes: CanvasNode[], newConnections: Connection[]) => void
  openTabs: CanvasNode[]
  setOpenTabs: React.Dispatch<React.SetStateAction<CanvasNode[]>>
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  setIsConfigDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
  setActiveConfigNode: React.Dispatch<React.SetStateAction<CanvasNode | null>>
  setNodeToDelete: React.Dispatch<React.SetStateAction<CanvasNode | null>>
  canvasRef: React.RefObject<HTMLDivElement>
}

export default function useNodeActions({
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
}: NodeActionsProps) {
  // Node mouse down handler
  const handleNodeMouseDown = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!canvasRef.current) return
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return

    const canvasRect = canvasRef.current.getBoundingClientRect()
    setDraggingNode({
      id: nodeId,
      offsetX: e.clientX - canvasRect.left - node.x,
      offsetY: e.clientY - canvasRect.top - node.y,
    })
    setDrawingLine(null)
  }

  // Connector mouse down handler
  const handleConnectorMouseDown = (nodeId: string, handle: Handle, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!canvasRef.current) return
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return

    const canvasRect = canvasRef.current.getBoundingClientRect()
    const startCoords = getHandleCoords(node, handle)

    setDrawingLine({
      startNodeId: nodeId,
      startHandle: handle,
      startX: startCoords.x,
      startY: startCoords.y,
      endX: e.clientX - canvasRect.left,
      endY: e.clientY - canvasRect.top,
    })
    setDraggingNode(null)
  }

  // Node double click handler
  const handleNodeDoubleClick = (node: CanvasNode) => {
    if (node.type === 'pricing' || node.type === 'forecasting') {
      setActiveConfigNode(node);
      setIsConfigDrawerOpen(true);
    } else {
      if (!openTabs.some((t) => t.id === node.id)) {
        setOpenTabs((prev) => [...prev, node]);
      }
      setActiveTab(node.id);
    }
  };

  // Node mouse up handler
  const handleNodeMouseUp = (nodeId: string, e: React.MouseEvent) => {
    if (setDrawingLine && canvasRef.current) {
      const drawingLineValue = e.currentTarget.hasAttribute('data-drawing-line') 
        ? JSON.parse(e.currentTarget.getAttribute('data-drawing-line') || 'null')
        : null;
        
      if (drawingLineValue && drawingLineValue.startNodeId !== nodeId) {
        const fromNode = nodes.find((n) => n.id === drawingLineValue.startNodeId)
        const toNode = nodes.find((n) => n.id === nodeId)
        
        if (!fromNode || !toNode) return

        if (fromNode.type === toNode.type) {
          setDrawingLine(null);
          return;
        }

        const handles: Handle[] = ['top', 'right', 'bottom', 'left']
        let closestHandle: Handle = 'left'
        let minDistance = Infinity

        const canvasRect = canvasRef.current.getBoundingClientRect()
        const mouseX = e.clientX - canvasRect.left
        const mouseY = e.clientY - canvasRect.top

        handles.forEach((handle) => {
          const handleCoords = getHandleCoords(toNode, handle)
          const distance = Math.sqrt(
            Math.pow(mouseX - handleCoords.x, 2) + Math.pow(mouseY - handleCoords.y, 2)
          )
          if (distance < minDistance) {
            minDistance = distance
            closestHandle = handle
          }
        })
        
        const newConnection = { 
          from: drawingLineValue.startNodeId, 
          to: nodeId, 
          fromHandle: drawingLineValue.startHandle, 
          toHandle: closestHandle 
        };
        
        const newConnections = [...connections, newConnection];
        setConnections(newConnections);
        commit(nodes, newConnections);
      }
      setDrawingLine(null);
    }
  }

  // Open node tab
  const openNodeTab = (nodeId: string) => {
    const nodeToOpen = nodes.find((n) => n.id === nodeId)
    if (nodeToOpen) {
      handleNodeDoubleClick(nodeToOpen)
    }
  }

  // Close tab handler
  const handleCloseTab = (e: React.MouseEvent, nodeIdToClose: string) => {
    e.stopPropagation();
    const newTabs = openTabs.filter((tab) => tab.id !== nodeIdToClose);
    setOpenTabs(newTabs);
    
    if (activeTab === nodeIdToClose) {
      if (newTabs.length > 0) {
        setActiveTab(newTabs[newTabs.length - 1].id);
      } else {
        setActiveTab('design-studio');
      }
    }
  };

  // Delete request handler
  const handleDeleteRequest = (node: CanvasNode) => {
    setNodeToDelete(node);
  };

  return {
    handleNodeMouseDown,
    handleConnectorMouseDown,
    handleNodeDoubleClick,
    handleNodeMouseUp,
    openNodeTab,
    handleCloseTab,
    handleDeleteRequest,
  }
}
