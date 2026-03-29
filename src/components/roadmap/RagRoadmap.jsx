import { useCallback, useEffect, useMemo } from 'react'
import {
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { buildRoadmapGraph } from '../../data/roadmapGraph.js'
import { RoadmapLabelNode } from './RoadmapLabelNode.jsx'
import { RoadmapNode } from './RoadmapNode.jsx'

const nodeTypes = {
  roadmap: RoadmapNode,
  roadmapLabel: RoadmapLabelNode,
}

const defaultEdgeOptions = {
  type: 'smoothstep',
  style: { stroke: '#6b7280', strokeWidth: 2 },
}

function FitRoadmap() {
  const { fitView } = useReactFlow()
  useEffect(() => {
    const t = requestAnimationFrame(() => {
      fitView({ padding: 0.12, duration: 400 })
    })
    return () => cancelAnimationFrame(t)
  }, [fitView])
  return null
}

function RoadmapInner({ sections, onSelectTopic }) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => buildRoadmapGraph(sections),
    [sections],
  )

  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  const onNodeClick = useCallback(
    (_evt, node) => {
      if (node.type === 'roadmap' && node.data?.sectionId) {
        onSelectTopic(node.data.sectionId)
      }
    },
    [onSelectTopic],
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable
      panOnDrag
      panOnScroll
      zoomOnScroll
      zoomOnPinch
      minZoom={0.08}
      maxZoom={1.25}
      proOptions={{ hideAttribution: true }}
      className="rag-roadmap__flow"
    >
      <FitRoadmap />
      <Background gap={20} size={1} color="#374151" />
      <Controls
        className="rag-roadmap__controls"
        showInteractive={false}
      />
      <MiniMap
        className="rag-roadmap__minimap"
        pannable
        zoomable
        maskColor="rgba(0,0,0,0.45)"
        nodeClassName="rag-roadmap__minimap-node"
      />
      <Panel position="top-left" className="rag-roadmap__panel-title">
        <p className="rag-roadmap__panel-kicker">Learning path</p>
        <p className="rag-roadmap__panel-head">RAG production roadmap</p>
        <p className="rag-roadmap__panel-sub">
          Click any topic to open detail, flow, and notes — same idea as{' '}
          <a
            href="https://roadmap.sh/react"
            target="_blank"
            rel="noreferrer"
          >
            roadmap.sh
          </a>
          .
        </p>
      </Panel>
    </ReactFlow>
  )
}

export function RagRoadmap({ sections, onSelectTopic }) {
  return (
    <div className="rag-roadmap">
      <ReactFlowProvider>
        <RoadmapInner sections={sections} onSelectTopic={onSelectTopic} />
      </ReactFlowProvider>
    </div>
  )
}
