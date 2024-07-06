import React, { memo, useCallback } from 'react'
import { Handle, Position } from 'reactflow'
import { useNodeData } from './useNodeData'

export const Constant = memo(({ data, isConnectable }) => {
  const [nodeData, setNodeData] = useNodeData()

  const handleChange = useCallback(event => {
    const constant = event?.target.value

    setNodeData('expression', parseFloat(constant))
  }, [])

  return (
    <>
      <input
        type="number"
        style={{ width: 50 }}
        value={nodeData.expression}
        onChange={handleChange}
      />

      <Handle type="source" position={Position.Bottom} id="source" isConnectable={isConnectable} />
    </>
  )
})

Constant.getDefaultNode = (context: any) => ({
  id: `${+new Date()}`,
  type: 'constant',
  position: { x: 0, y: 0 },
  data: { expression: 1 },
  style: { padding: 4, border: '1px solid black' },
})
