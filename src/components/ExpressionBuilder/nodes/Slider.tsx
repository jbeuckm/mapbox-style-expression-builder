import React, { memo, useCallback, useState } from 'react'
import { Handle, Position, useNodeId, useNodes, useReactFlow } from 'reactflow'
import { useNodeData } from './useNodeData'
import { assocPath } from 'ramda'

export const Slider = memo(({ data, isConnectable }) => {
  const [nodeData, setNodeData] = useNodeData()

  const handleChange = useCallback(event => {
    const constant = event?.target.value

    setNodeData('expression', parseFloat(constant))
  }, [])

  return (
    <>
      <div style={{ display: 'flex', gap: 4 }}>
        <input type="range" value={nodeData.expression} onChange={handleChange} />
        <span>{nodeData.expression}</span>
      </div>

      <Handle type="source" position={Position.Bottom} id="source" isConnectable={isConnectable} />
    </>
  )
})

Slider.getDefaultNode = (context: any) => ({
  id: `${+new Date()}`,
  type: 'slider',
  position: { x: 0, y: 0 },
  data: { expression: 1 },
  style: { padding: 4, border: '1px solid black' },
})
