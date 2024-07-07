import React, { memo, useCallback, useState } from 'react'
import { Handle, Position, useNodeId, useNodes, useReactFlow } from 'reactflow'
import { useNodeData } from './useNodeData'
import { assocPath } from 'ramda'
import { Combination } from './Combination'

export const Slider = memo(({ data, isConnectable }) => {
  const [nodeData, setNodeData] = useNodeData()

  const handleChange = useCallback(event => {
    const constant = event?.target.value

    setNodeData('constant', parseFloat(constant))
  }, [])

  return (
    <Combination
      inputs={[
        { id: 'min', default: 0 },
        { id: 'max', default: 100 },
      ]}
      getExpression={({ min, max }) => nodeData.constant}
      data={data}
      isConnectable={isConnectable}
    >
      {() => (
        <>
          <div style={{ display: 'flex', gap: 4 }}>
            <input type="range" value={nodeData.constant} onChange={handleChange} />
            <span>{nodeData.constant}</span>
          </div>

          <Handle
            type="source"
            position={Position.Bottom}
            id="source"
            isConnectable={isConnectable}
          />
        </>
      )}
    </Combination>
  )
})

Slider.getDefaultNode = (context: any) => ({
  id: `${+new Date()}`,
  type: 'slider',
  position: { x: 0, y: 0 },
  data: { expression: 1 },
  style: { padding: 4, border: '1px solid black' },
})
