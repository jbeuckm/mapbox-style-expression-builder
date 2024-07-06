import React, { memo, useCallback } from 'react'
import { Combination } from './Combination'
import { useNodeData } from './useNodeData'

export const LayerOutput = memo(({ data, isConnectable }) => {
  const [nodeData, setNodeData] = useNodeData()

  const handleChangeType = useCallback(event => {
    setNodeData('type', event.target.value)
  }, [])

  return (
    <Combination
      inputs={['fill-color']}
      getExpression={inputs => ({ paint: inputs, type: nodeData.type })}
      data={data}
      isConnectable={isConnectable}
    >
      <select name="type" id="type" value={nodeData.type} onChange={handleChangeType}>
        {['fill'].map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </Combination>
  )
})

LayerOutput.getDefaultNode = () => ({
  id: `${+new Date()}`,
  type: 'layerOutput',
  position: { x: 0, y: 0 },
  data: { type: 'fill' },
  style: { textAlign: 'center' },
})
