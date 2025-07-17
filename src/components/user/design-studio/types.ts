'use client'

import { ElementType } from 'react'

export type Handle = 'top' | 'right' | 'bottom' | 'left'

export interface Tool {
  name: string
  description: string
  type: string
  icon: ElementType
}

export interface CanvasNode {
  id: string
  type: string
  name: string
  version: number
  icon: ElementType
  x: number
  y: number
}

export interface Connection {
  from: string
  to: string
  fromHandle: Handle
  toHandle: Handle
}

export interface DrawingLine {
  startNodeId: string
  startHandle: Handle
  startX: number
  startY: number
  endX: number
  endY: number
}

export interface DraggingNode {
  id: string
  offsetX: number
  offsetY: number
}

export interface HandleCoords {
  x: number
  y: number
}
