import { Handle, Position } from '@xyflow/react'

export function DocFlowNode({ data }) {
  return (
    <div className="doc-flow-node">
      <Handle
        type="target"
        position={Position.Left}
        className="doc-flow-node__handle"
      />
      <div className="doc-flow-node__body">{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        className="doc-flow-node__handle"
      />
    </div>
  )
}
