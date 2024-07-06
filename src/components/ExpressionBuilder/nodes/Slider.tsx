import React, { memo, useCallback } from 'react'
import { Handle, Position } from 'reactflow'
import { useNodeData } from './useNodeData'

export const Slider = memo(({ data, isConnectable }) => {
  const [nodeData, setNodeData] = useNodeData()

  const handleChange = useCallback(event => {
    const constant = event?.target.value

    setNodeData('expression', parseFloat(constant))
  }, [])

  const stopDrag = useCallback(event => {
    event.stopPropagation()
    event.preventDefault()
  }, [])

  return (
    <>
      <div
        onMouseDown={stopDrag}
        onDragStart={stopDrag}
        onDrag={stopDrag}
        onDragEnter={stopDrag}
        onDragExit={stopDrag}
        onDrop={stopDrag}
        onDragOver={stopDrag}
        style={{ display: 'flex', gap: 4 }}
      >
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
