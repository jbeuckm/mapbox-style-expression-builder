import React, { memo } from 'react'
import { Handle, Position, useEdges, useNodeId, useNodes } from 'reactflow'

export const Display = memo(({ data, isConnectable }) => {
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
          {typeof inputNode?.data?.expression !== 'undefined' ? (
            JSON.stringify(inputNode?.data?.expression)
          ) : (
            <span style={{ fontStyle: 'italic' }}>(empty)</span>
          )}
        </div>
      </span>

      <Handle type="target" position={Position.Top} id="input" isConnectable={isConnectable} />
    </>
  )
})

Display.getDefaultNode = (context: any) => ({
  id: `${+new Date()}`,
  type: 'display',
  position: { x: 0, y: 0 },
  data: {},
})
