import React, { memo } from 'react'
import {
  Handle,
  Position,
  getConnectedEdges,
  getIncomers,
  useEdges,
  useNodeId,
  useNodes,
} from 'reactflow'

export const ExpressionNode = memo(({ data, isConnectable }) => {
  const nodeId = useNodeId()
  const nodes = useNodes()

  const edges = useEdges()

  const sources = edges.filter(({ source, target }) => target === nodeId)

  const connections = sources.map(edge => ({
    edge,
    node: nodes.find(({ id }) => id === edge.source),
  }))

  const inputNode = connections.find(({ edge }) => edge.targetHandle === 'input')?.node

  return (
    <>
      <span style={{ display: 'flex', gap: 4 }}>
        <div>
          {inputNode?.data?.expression || <span style={{ fontStyle: 'italic' }}>(empty)</span>}
        </div>
      </span>

      <Handle type="target" position={Position.Top} id="input" isConnectable={isConnectable} />
    </>
  )
})

ExpressionNode.getDefaultNode = (context: any) => ({
  id: `${new Date()}`,
  type: 'expression',
  position: { x: 0, y: 0 },
  data: {},
})
