import React, { memo, useCallback } from 'react'
import { Handle, Position } from 'reactflow'
import { useNodeData } from './useNodeData'

export const String = memo(({ data, isConnectable }) => {
  const [nodeData, setNodeData] = useNodeData()

  const handleChange = useCallback(event => {
    const constant = event?.target.value

    setNodeData('expression', constant)
  }, [])

  return (
    <>
      <input style={{ width: 100 }} value={nodeData.expression} onChange={handleChange} />

      <Handle type="source" position={Position.Bottom} id="source" isConnectable={isConnectable} />
    </>
  )
})

String.getDefaultNode = (context: any) => ({
  id: `${+new Date()}`,
  type: 'string',
  position: { x: 0, y: 0 },
  data: { expression: '' },
  style: { padding: 4, border: '1px solid black' },
})
