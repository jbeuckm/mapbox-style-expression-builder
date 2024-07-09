import React, { ChangeEvent, memo, useCallback, useEffect } from 'react'
import { Handle, Position } from 'reactflow'
import { useNodeData } from './useNodeData'
import { omit } from 'ramda'

export const PropertySelectorNode = memo(({ data, isConnectable }) => {
  const [nodeData, setNodeData] = useNodeData()

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const property = event?.target.value
      setNodeData('property', property)
    },
    [setNodeData]
  )

  useEffect(() => {
    setNodeData('property', nodeData.property)
  }, [])

  useEffect(() => {
    setNodeData('expression', ['get', nodeData.property])
  }, [JSON.stringify(omit(['expression'], nodeData))])

  return (
    <>
      <select name="property" id="property" value={nodeData.property} onChange={handleChange}>
        {data.properties.map(property => (
          <option key={property} value={property}>
            {property}
          </option>
        ))}
      </select>

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
