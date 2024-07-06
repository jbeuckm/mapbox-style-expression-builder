import React, { memo, useCallback } from 'react'
import { useEdges, useNodeId, useNodes } from 'reactflow'
import { Combination } from './Combination'
import { useSetNodeData } from './useSetNodeData'
import { useNodeData } from './useNodeData'
import * as d3 from 'd3'

const palettes = ['viridis']

export const ContinuousPalette = memo(({ data, isConnectable }) => {
  const nodeId = useNodeId()
  const nodes = useNodes()
  const edges = useEdges()

  const setNodeData = useSetNodeData()

  const handleChange = useCallback(event => {
    setNodeData('palette', event.target.value)
  }, [])

  const nodeData = useNodeData()

  return (
    <Combination
      inputs={['value', 'min', 'mean', 'max']}
      getExpression={inputExpressions => {
        const min = Number(inputExpressions.min)
        const mean = Number(inputExpressions.mean)
        const max = Number(inputExpressions.max)

        const exp = [
          'interpolate',
          ['linear'],
          inputExpressions.value,
          min,
          ['to-color', d3.interpolateViridis(0)],
          (mean + min) / 2,
          ['to-color', d3.interpolateViridis(0.25)],
          mean,
          ['to-color', d3.interpolateViridis(0.5)],
          (mean + max) / 2,
          ['to-color', d3.interpolateViridis(0.75)],
          max,
          ['to-color', d3.interpolateViridis(1)],
        ]

        console.log(exp)

        return exp
      }}
      data={data}
      isConnectable={isConnectable}
    >
      <select name="property" id="property" onChange={handleChange}>
        {palettes.map(palette => (
          <option key={palette} value={palette}>
            {palette}
          </option>
        ))}
      </select>
    </Combination>
  )
})

ContinuousPalette.getDefaultNode = () => ({
  id: `${+new Date()}`,
  type: 'continuousPalette',
  position: { x: 0, y: 0 },
  data: { palette: 'viridis' },
})
