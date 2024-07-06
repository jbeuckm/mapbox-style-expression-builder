import { StoryFn, Meta } from '@storybook/react'
import { ExpressionBuilder } from './ExpressionBuilder'
import Map, { Source, Layer } from 'react-map-gl'
import { useEffect, useMemo, useState } from 'react'
import STATES from './fixtures/states.json'
import { FillLayer } from 'mapbox-gl'

export default {
  title: 'ExpressionBuilder',
  component: ExpressionBuilder,
} as Meta<typeof ExpressionBuilder>

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiamJldWNrbSIsImEiOiJjajhvOTdiaXAwMHFoMzNubnUyeWd5b3ZiIn0.qbmerZkVwFqby1cncanbvg'

const Template: StoryFn<typeof ExpressionBuilder> = args => {
  const [allData, setAllData] = useState(null)

  const [layers, setLayers] = useState([])

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <ExpressionBuilder properties={['name', 'density']} onChange={c => setLayers(c.layers)} />
      </div>
      <div style={{ width: '50%' }}>
        <Map
          initialViewState={{
            latitude: 40,
            longitude: -100,
            zoom: 3,
          }}
          mapStyle="mapbox://styles/mapbox/light-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={['data']}
        >
          <Source type="geojson" data={STATES}>
            {layers.map((layer, index) => (
              <Layer key={index} {...layer} />
            ))}
          </Source>
        </Map>
      </div>
    </div>
  )
}

export const ExpressionBuilderTest = Template.bind({})
ExpressionBuilderTest.args = {
  properties: ['p1', 'p2', 'p3'],
}
