'use client'

import { useState } from 'react'
import { CanvasNode, Connection } from '../types'

interface UseHistoryReturn {
  history: { nodes: CanvasNode[]; connections: Connection[] }[];
  historyIndex: number;
  commit: (newNodes: CanvasNode[], newConnections: Connection[]) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function useHistory(
  initialNodes: CanvasNode[] = [], 
  initialConnections: Connection[] = []
): UseHistoryReturn {
  const [history, setHistory] = useState<{ nodes: CanvasNode[]; connections: Connection[] }[]>([
    { nodes: initialNodes, connections: initialConnections }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const commit = (newNodes: CanvasNode[], newConnections: Connection[]) => {
    const newHistory = history.slice(0, historyIndex + 1);

    const currentStateInHistory = history[historyIndex];
    if (
      currentStateInHistory && 
      JSON.stringify(currentStateInHistory.nodes) === JSON.stringify(newNodes) && 
      JSON.stringify(currentStateInHistory.connections) === JSON.stringify(newConnections)
    ) {
      return;
    }

    newHistory.push({ nodes: newNodes, connections: newConnections });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      return history[newIndex];
    }
    return history[historyIndex];
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      return history[newIndex];
    }
    return history[historyIndex];
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return {
    history,
    historyIndex,
    commit,
    undo,
    redo,
    canUndo,
    canRedo
  };
}
