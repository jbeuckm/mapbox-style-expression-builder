import React, { ChangeEvent, memo, useCallback, useEffect } from 'react'
import { Handle, Position } from 'reactflow'
import { useNodeData } from './useNodeData'
import { omit } from 'ramda'

export const Source = memo(({ data, isConnectable }) => {
  const [nodeData, setNodeData] = useNodeData()

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const tileUrl = event?.target.value
      setNodeData('tileUrl', tileUrl)
    },
    [setNodeData]
  )

  useEffect(() => {
    setNodeData('tileUrl', nodeData.tileUrl)
  }, [])

  useEffect(() => {
    // setNodeData('expression', ['get', nodeData.property])
  }, [JSON.stringify(omit(['expression'], nodeData))])

  return (
    <>
      <input value={nodeData.tileUrl} onChange={handleChange} width={150} />

      <Handle type="source" position={Position.Bottom} id="source" isConnectable={isConnectable} />
    </>
  )
})

Source.getDefaultNode = (context: any) => ({
  id: `${+new Date()}`,
  type: 'source',
  position: { x: 0, y: 0 },
  data: {
    tileUrl: '',
  },
  style: { padding: 4, border: '1px solid black' },
})
