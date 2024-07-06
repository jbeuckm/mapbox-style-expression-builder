import React, { memo, useEffect } from 'react'
import { Handle, Position, useEdges, useNodeId, useNodes } from 'reactflow'
import { useSetNodeExpression } from './useSetNodeExpression'
import { omit } from 'ramda'
import { useNodeData } from './useNodeData'

export const Combination = memo(({ inputs, children, getExpression, data, isConnectable }) => {
  const nodeId = useNodeId()
  const nodes = useNodes()
  const edges = useEdges()

  const expressionInputs = edges.reduce((acc, edge) => {
    if (!edge.targetHandle || edge.target !== nodeId) return acc

    const node = nodes.find(node => node.id === edge.source)
    if (!node) return acc

    return {
      ...acc,
      [edge.targetHandle]: node?.data.expression,
    }
  }, {})

  const setExpression = useSetNodeExpression()
  const nodeData = useNodeData()

  useEffect(() => {
    setExpression(getExpression(expressionInputs))
  }, [JSON.stringify(expressionInputs), JSON.stringify(omit(['expression'], nodeData))])

  return (
    <>
      {inputs.map((input, index) => (
        <Handle
          className="tooltip"
          type="target"
          position={Position.Top}
          id={input}
          isConnectable={isConnectable}
          style={{ left: 20 + 20 * index }}
        >
          <span class="tooltiptext">{input}</span>
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
