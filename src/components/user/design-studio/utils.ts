'use client'

import { CanvasNode, Handle, HandleCoords } from './types'
import { NODE_WIDTH, NODE_HEIGHT } from './constants'

export const getHandleCoords = (node: CanvasNode, handle: Handle): HandleCoords => {
  switch (handle) {
    case 'top':
      return { x: node.x + NODE_WIDTH / 2, y: node.y }
    case 'right':
      return { x: node.x + NODE_WIDTH, y: node.y + NODE_HEIGHT / 2 }
    case 'bottom':
      return { x: node.x + NODE_WIDTH / 2, y: node.y + NODE_HEIGHT }
    case 'left':
      return { x: node.x, y: node.y + NODE_HEIGHT / 2 }
    default:
      return { x: node.x, y: node.y }
  }
}
