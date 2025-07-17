'use client'

import { useRef } from 'react'
import { CanvasNode, Connection, DrawingLine, DraggingNode, Tool } from '../types'

interface UseCanvasActionsProps {
  setDrawingLine: React.Dispatch<React.SetStateAction<DrawingLine | null>>
  setDraggingNode: React.Dispatch<React.SetStateAction<DraggingNode | null>>
  nodes: CanvasNode[]
  setNodes: React.Dispatch<React.SetStateAction<CanvasNode[]>>
  connections: Connection[]
  commit: (newNodes: CanvasNode[], newConnections: Connection[]) => void
  tools: { [key: string]: Tool[] }
  canvasRef: React.RefObject<HTMLDivElement>
}

export default function useCanvasActions({
  setDrawingLine,
  setDraggingNode,
  nodes,
  setNodes,
  connections,
  commit,
  tools,
  canvasRef
}: UseCanvasActionsProps) {
  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add('bg-blue-50')
  }

  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('bg-blue-50')
  }

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove('bg-blue-50')
    if (!canvasRef.current) return

    const toolType = e.dataTransfer.getData('toolType')
    const toolName = e.dataTransfer.getData('toolName')
    
    const allTools = Object.values(tools).flat()
    const tool = allTools.find((t) => t.type === toolType)

    if (!tool) {
      console.warn('No tool found with type:', toolType)
      return
    }

    const canvasRect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - canvasRect.left
    const y = e.clientY - canvasRect.top

    const existingNodesOfType = nodes.filter((n) => n.type === toolType).length
    const version = existingNodesOfType + 1

    const newNode: CanvasNode = {
      id: `node-${Date.now()}`,
      type: toolType,
      name: toolName,
      version: version,
      icon: tool.icon,
      x: x - 96,  // Half of NODE_WIDTH
      y: y - 36,  // Half of NODE_HEIGHT
    }

    const newNodes = [...nodes, newNode]
    setNodes(newNodes)
    commit(newNodes, connections)
  }

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return
    const canvasRect = canvasRef.current.getBoundingClientRect()
    const mouseX = e.clientX - canvasRect.left
    const mouseY = e.clientY - canvasRect.top

    setDrawingLine((prev) => prev && { ...prev, endX: mouseX, endY: mouseY })

    setDraggingNode((prev) => {
      if (!prev) return null;
      setNodes((ns) =>
        ns.map((n) =>
          n.id === prev.id
            ? { ...n, x: mouseX - prev.offsetX, y: mouseY - prev.offsetY }
            : n
        )
      )
      return prev;
    })
  }

  // Handle canvas mouse up
  const handleCanvasMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setDraggingNode((prev) => {
      if (prev) {
        commit(nodes, connections);
      }
      return null;
    })
    setDrawingLine(null)
  }

  return {
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleMouseMove,
    handleCanvasMouseUp
  }
}
