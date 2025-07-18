'use client';

import React from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  NodeTypes,
  Node,
  Edge,
  Connection,
  ConnectionMode,
  ConnectionLineType,
  MarkerType
} from 'reactflow';
import { Plus, Maximize } from 'lucide-react';
import { FlowNode } from './FlowNode';
import { ToastContainer } from './Toast';
import { ToastNotification } from '../hooks/useToast';

const nodeTypes: NodeTypes = {
  customNode: FlowNode,
};

interface CanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  notifications: ToastNotification[];
  onRemoveToast: (id: string) => void;
}

export function Canvas({ 
  nodes, 
  edges, 
  onNodesChange, 
  onEdgesChange, 
  onConnect, 
  onDrop, 
  onDragOver,
  onDragLeave,
  notifications,
  onRemoveToast
}: CanvasProps) {
  // Connection validation function
  const isValidConnection = (connection: Connection | Edge) => {
    // Prevent self-connections
    if (connection.source === connection.target) {
      return false;
    }
    
    // Check if connection already exists
    const existingConnection = edges.find(
      (edge) => 
        edge.source === connection.source && 
        edge.target === connection.target &&
        edge.sourceHandle === connection.sourceHandle &&
        edge.targetHandle === connection.targetHandle
    );
    
    return !existingConnection;
  };

  return (
    <div 
      className="flex-1 relative overflow-hidden bg-white dark:bg-white transition-all duration-200"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="w-full h-full"
        deleteKeyCode={['Delete', 'Backspace']}
        panOnScroll={false}
        zoomOnScroll={false}
        preventScrolling={true}
        nodesDraggable={true}
        nodesConnectable={true}
        elementsSelectable={true}
        snapToGrid={true}
        snapGrid={[15, 15]}
        connectionMode={ConnectionMode.Loose}
        connectionLineStyle={{ stroke: '#3b82f6', strokeWidth: 2 }}
        connectionLineType={ConnectionLineType.Bezier}
        isValidConnection={isValidConnection}
        proOptions={{ hideAttribution: true }}
        fitViewOptions={{
          padding: 0.1,
          includeHiddenNodes: false,
          maxZoom: 1.2
        }}
        translateExtent={[[-1000, -1000], [2000, 2000]]}
        nodeExtent={[[-1000, -1000], [2000, 2000]]}
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          style: { strokeWidth: 2, stroke: '#3b82f6' },
          type: 'default',
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#3b82f6',
          },
        }}
        nodeOrigin={[0.5, 0.5]}
        selectNodesOnDrag={true}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          className="opacity-10"
        />
        <Controls 
          className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg"
          showZoom={false}
          showFitView={false}
          showInteractive={false}
        />
      </ReactFlow>
      
      {/* Empty State */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center max-w-lg">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <Plus className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Welcome to Your Design Studio
            </h3>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Create amazing analytical workflows by dragging tools from the left panel onto this canvas. 
              <span className="font-semibold text-purple-600"> Connect, customize, and create!</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <div className="text-2xl mb-2">🎨</div>
                <h4 className="font-bold text-blue-700 mb-1">Drag & Drop</h4>
                <p className="text-sm text-blue-600">Drag tools from the sidebar to start building</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                <div className="text-2xl mb-2">🔗</div>
                <h4 className="font-bold text-purple-700 mb-1">Connect</h4>
                <p className="text-sm text-purple-600">Link tools together to create data flows</p>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border border-pink-200">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-bold text-pink-700 mb-1">Analyze</h4>
                <p className="text-sm text-pink-600">Run your workflow and get insights</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-50 to-blue-50 px-4 py-2 rounded-full border border-cyan-200">
                <span className="text-lg">💡</span>
                <span className="text-cyan-700"><strong>Tip:</strong> Click connection points to link tools</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Canvas Controls Info */}
      {nodes.length > 0 && (
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-2 shadow-lg">
          <div className="space-y-1 text-xs text-gray-600">
            <p>Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Delete</kbd> to remove selected nodes</p>
            <p>Use <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">⌘/Ctrl + Scroll</kbd> to zoom</p>
            <p>Click <Maximize className="w-3 h-3 inline mx-1" /> to fit all nodes to view</p>
          </div>
        </div>
      )}

      {/* Toast Notifications - positioned inside canvas area */}
      {notifications.length > 0 && (
        <div className={`absolute z-50 pointer-events-none ${
          nodes.length > 0 ? 'top-20 right-4' : 'top-4 right-4'
        }`}>
          <div className="pointer-events-auto">
            <ToastContainer
              notifications={notifications}
              onRemove={onRemoveToast}
            />
          </div>
        </div>
      )}
    </div>
  );
}
