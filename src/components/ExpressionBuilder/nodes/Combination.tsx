import React, { memo, useEffect } from 'react'
import { Handle, Position, useEdges, useNodeId, useNodes } from 'reactflow'
import { omit } from 'ramda'
import { useNodeData } from './useNodeData'

export const Combination = memo(({ inputs, children, getExpression, data, isConnectable }) => {
  const nodeId = useNodeId()
  const nodes = useNodes()
  const edges = useEdges()

  const [nodeData, setNodeData] = useNodeData()

  const expressionInputs = edges.reduce((acc, edge) => {
    if (!edge.targetHandle || edge.target !== nodeId) return acc

    const node = nodes.find(node => node.id === edge.source)
    if (!node) return acc

    return {
      ...acc,
      [edge.targetHandle]: node?.data.expression,
    }
  }, {})

  useEffect(() => {
    setNodeData('expression', getExpression(expressionInputs))
  }, [JSON.stringify(expressionInputs), JSON.stringify(omit(['expression'], nodeData))])

  return (
    <>
      {inputs.map((input, index) => (
        <Handle
          key={input}
          className="tooltip"
          type="target"
          position={Position.Top}
          id={input}
          isConnectable={isConnectable}
          style={{ left: 20 + 20 * index }}
        >
          <span className="tooltiptext">{input}</span>
        </Handle>
      ))}

      <div style={{ minWidth: (inputs.length + 1) * 20 }}>{children}</div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="expression"
        isConnectable={isConnectable}
      />
    </>
  )
})
