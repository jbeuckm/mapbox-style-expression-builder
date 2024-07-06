import React, { memo, useCallback } from 'react'
import { Combination } from './Combination'
import { useNodeData } from './useNodeData'
import * as d3 from 'd3'

const palettes = ['viridis']
const SCHEMES = {
  Blues: 'interpolateBlues',
  Greens: 'interpolateGreens',
  Greys: 'interpolateGreys',
  Oranges: 'interpolateOranges',
  Purples: 'interpolatePurples',
  Reds: 'interpolateReds',
  Turbo: 'interpolateTurbo',
  Viridis: 'interpolateViridis',
  Inferno: 'interpolateInferno',
  Magma: 'interpolateMagma',
  Plasma: 'interpolatePlasma',
  Cividis: 'interpolateCividis',
  Warm: 'interpolateWarm',
  Cool: 'interpolateCool',
  CubehelixDefault: 'interpolateCubehelixDefault',
  BuGn: 'interpolateBuGn',
  BuPu: 'interpolateBuPu',
  GnBu: 'interpolateGnBu',
  OrRd: 'interpolateOrRd',
  PuBuGn: 'interpolatePuBuGn',
  PuBu: 'interpolatePuBu',
  PuRd: 'interpolatePuRd',
  RdPu: 'interpolateRdPu',
  YlGnBu: 'interpolateYlGnBu',
  YlGn: 'interpolateYlGn',
  YlOrBr: 'interpolateYlOrBr',
  YlOrRd: 'interpolateYlOrRd',
}
const SCHEME_NAMES = Object.keys(SCHEMES)

export const ContinuousPalette = memo(({ data, isConnectable }) => {
  const [nodeData, setNodeData] = useNodeData()

  const handleChange = useCallback(event => {
    setNodeData('scheme', event.target.value)
  }, [])

  return (
    <Combination
      inputs={['value', 'min', 'center', 'max']}
      getExpression={inputExpressions => {
        const min = Number(inputExpressions.min)
        const max = Number(inputExpressions.max)
        const center = inputExpressions.center ? Number(inputExpressions.center) : (min + max) / 2

        const schemeFnName = SCHEMES[nodeData.scheme]
        const fn = d3[schemeFnName]

        const exp = [
          'interpolate',
          ['linear'],
          inputExpressions.value,
          min,
          ['to-color', fn(0)],
          (center + min) / 2,
          ['to-color', fn(0.25)],
          center,
          ['to-color', fn(0.5)],
          (center + max) / 2,
          ['to-color', fn(0.75)],
          max,
          ['to-color', fn(1)],
        ]

        return exp
      }}
      data={data}
      isConnectable={isConnectable}
    >
      <select name="property" id="property" value={nodeData.scheme} onChange={handleChange}>
        {SCHEME_NAMES.map(scheme => (
          <option key={scheme} value={scheme}>
            {scheme}
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
  data: { scheme: 'Viridis' },
})
