import React, { memo, useCallback } from 'react'
import { Combination } from './Combination'
import { useNodeData } from './useNodeData'

export const FillLayer = memo(({ data, isConnectable }) => {
  const [nodeData, setNodeData] = useNodeData()

  return (
    <Combination
      inputs={[{ id: 'filter' }, { id: 'fill-color' }]}
      getExpression={inputs => {
        const exp = {
          type: 'fill',
          paint: { ['fill-color']: inputs['fill-color'] },
        }

        if (inputs['filter']) {
          exp.filter = inputs['filter']
        }

        return exp
      }}
      data={data}
      isConnectable={isConnectable}
    >
      {() => <>fillLayer</>}
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
