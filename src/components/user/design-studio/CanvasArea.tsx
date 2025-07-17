'use client'

import React, { RefObject } from 'react'
import CanvasNodeComponent from './CanvasNodeComponent'
import { CanvasNode, Connection, DrawingLine, Handle } from './types'
import { getHandleCoords } from './utils'

interface CanvasAreaProps {
  canvasRef: RefObject<HTMLDivElement>
  nodes: CanvasNode[]
  connections: Connection[]
  drawingLine: DrawingLine | null
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
  handleCanvasMouseUp: (e: React.MouseEvent<HTMLDivElement>) => void
  handleNodeMouseDown: (nodeId: string, e: React.MouseEvent) => void
  handleConnectorMouseDown: (nodeId: string, handle: Handle, e: React.MouseEvent) => void
  handleNodeMouseUp: (nodeId: string, e: React.MouseEvent) => void
  handleNodeDoubleClick: (node: CanvasNode) => void
  handleDeleteRequest: (node: CanvasNode) => void
}

export default function CanvasArea({
  canvasRef,
  nodes,
  connections,
  drawingLine,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleMouseMove,
  handleCanvasMouseUp,
  handleNodeMouseDown,
  handleConnectorMouseDown,
  handleNodeMouseUp,
  handleNodeDoubleClick,
  handleDeleteRequest
}: CanvasAreaProps) {
  return (
    <main
      ref={canvasRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseMove={handleMouseMove}
      onMouseUp={handleCanvasMouseUp}
      className="canvas-area"
    >
      <svg className="pointer-events-none absolute top-0 left-0 h-full w-full">
        {connections.map((conn, index) => {
          const fromNode = nodes.find((n) => n.id === conn.from)
          const toNode = nodes.find((n) => n.id === conn.to)
          if (!fromNode || !toNode) return null

          const startCoords = getHandleCoords(fromNode, conn.fromHandle)
          const endCoords = getHandleCoords(toNode, conn.toHandle)
          
          const C_OFFSET = 80
          let c1x, c1y, c2x, c2y
          
          switch (conn.fromHandle) {
            case 'top': c1x = startCoords.x; c1y = startCoords.y - C_OFFSET; break;
            case 'bottom': c1x = startCoords.x; c1y = startCoords.y + C_OFFSET; break;
            case 'left': c1x = startCoords.x - C_OFFSET; c1y = startCoords.y; break;
            case 'right': c1x = startCoords.x + C_OFFSET; c1y = startCoords.y; break;
          }
          switch (conn.toHandle) {
            case 'top': c2x = endCoords.x; c2y = endCoords.y - C_OFFSET; break;
            case 'bottom': c2x = endCoords.x; c2y = endCoords.y + C_OFFSET; break;
            case 'left': c2x = endCoords.x - C_OFFSET; c2y = endCoords.y; break;
            case 'right': c2x = endCoords.x + C_OFFSET; c2y = endCoords.y; break;
          }

          const d = `M ${startCoords.x} ${startCoords.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endCoords.x} ${endCoords.y}`

          return (
            <path
              key={index}
              d={d}
              className="node-connection"
            />
          )
        })}
        {drawingLine && (
          <line
            x1={drawingLine.startX}
            y1={drawingLine.startY}
            x2={drawingLine.endX}
            y2={drawingLine.endY}
            className="drawing-line"
          />
        )}
      </svg>

      {nodes.map((node) => (
        <CanvasNodeComponent
          key={node.id}
          node={node}
          onNodeMouseDown={handleNodeMouseDown}
          onConnectorMouseDown={handleConnectorMouseDown}
          onNodeMouseUp={handleNodeMouseUp}
          onNodeDoubleClick={handleNodeDoubleClick}
          onNodeDelete={handleDeleteRequest}
        />
      ))}
    </main>
  )
}
