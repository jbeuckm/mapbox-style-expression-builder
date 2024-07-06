import React, { memo, useCallback } from 'react'
import { Combination } from './Combination'
import { useNodeData } from './useNodeData'

export const FillLayer = memo(({ data, isConnectable }) => {
  const [nodeData, setNodeData] = useNodeData()

  return (
    <Combination
      inputs={['filter', 'fill-color']}
      getExpression={inputs => ({
        filter: inputs['filter'],
        paint: { ['fill-color']: inputs['fill-color'] },
        type: 'fill',
      })}
      data={data}
      isConnectable={isConnectable}
    >
      Fill Layer
    </Combination>
  )
})

FillLayer.getDefaultNode = () => ({
  id: `${+new Date()}`,
  type: 'fillLayer',
  position: { x: 0, y: 0 },
  data: { type: 'fill' },
  style: { textAlign: 'center' },
})
