import React, { memo, useCallback, useEffect } from 'react'
import { Handle, Position } from 'reactflow'
import { useNodeData } from './useNodeData'

export const PropertySelectorNode = memo(({ data, isConnectable }) => {
  const [nodeData, setNodeData] = useNodeData()

  const handleChange = useCallback(event => {
    const property = event?.target.value

    setNodeData('property', property)
    setNodeData('expression', ['get', property])
  }, [])

  useEffect(() => {
    setNodeData('property', nodeData.property)
    setNodeData('expression', ['get', nodeData.property])
  }, [])

  return (
    <>
      <span style={{ display: 'flex', gap: 4 }}>
        <div>property</div>

        <select name="property" id="property" onChange={handleChange}>
          {data.properties.map(property => (
            <option key={property} value={property}>
              {property}
            </option>
          ))}
        </select>
      </span>

      <Handle type="source" position={Position.Bottom} id="source" isConnectable={isConnectable} />
    </>
  )
})

PropertySelectorNode.getDefaultNode = (context: any) => ({
  id: `${+new Date()}`,
  type: 'propertySelector',
  position: { x: 0, y: 0 },
  data: {
    properties: context.properties,
    property: context.properties[0],
  },
  style: { padding: 4, border: '1px solid black' },
})
