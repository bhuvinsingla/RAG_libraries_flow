import { useEffect } from 'react'
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { getFlowDiagram } from '../../data/flowDiagrams.js'
import { DocFlowNode } from './DocFlowNode.jsx'

const nodeTypes = { doc: DocFlowNode }

const defaultEdgeOptions = {
  type: 'smoothstep',
  style: { stroke: '#94a3b8', strokeWidth: 1.75 },
}

function FitViewHelper() {
  const { fitView } = useReactFlow()

  useEffect(() => {
    const t = requestAnimationFrame(() => {
      fitView({ padding: 0.2, duration: 280 })
    })
    return () => cancelAnimationFrame(t)
  }, [fitView])

  return null
}

function FlowCanvas({ nodes: initialNodes, edges: initialEdges, minHeight }) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="section-flow" style={{ height: minHeight }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
        panOnScroll
        zoomOnScroll
        minZoom={0.35}
        maxZoom={1.35}
        proOptions={{ hideAttribution: true }}
      >
        <FitViewHelper />
        <Background gap={18} size={1} color="#cbd5e1" />
        <Controls
          className="section-flow__controls"
          showInteractive={false}
        />
        <MiniMap
          className="section-flow__minimap"
          pannable
          zoomable
          maskColor="rgba(30, 41, 59, 0.12)"
          nodeClassName="section-flow__minimap-node"
        />
      </ReactFlow>
    </div>
  )
}

export function SectionFlowDiagram({ sectionId }) {
  const spec = getFlowDiagram(sectionId)
  if (!spec) return null

  const { nodes, edges, minHeight = 300 } = spec

  return (
    <ReactFlowProvider>
      <FlowCanvas
        key={sectionId}
        nodes={nodes}
        edges={edges}
        minHeight={minHeight}
      />
    </ReactFlowProvider>
  )
}
