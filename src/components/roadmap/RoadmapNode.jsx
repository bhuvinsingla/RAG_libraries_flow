import { Handle, Position } from '@xyflow/react'

export function RoadmapNode({ data, selected }) {
  return (
    <div
      className={`roadmap-node roadmap-node--${data.track}${selected ? ' roadmap-node--selected' : ''}`}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="l"
        className="roadmap-node__handle"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="r"
        className="roadmap-node__handle"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="t"
        className="roadmap-node__handle"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        className="roadmap-node__handle"
      />
      <span className="roadmap-node__text">{data.label}</span>
    </div>
  )
}
