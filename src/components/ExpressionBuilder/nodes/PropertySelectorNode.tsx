import React, { memo, useCallback } from 'react'
import { Handle, Position, useNodeId, useReactFlow } from 'reactflow'
import { assocPath } from 'ramda'
import { useSetNodeData } from './useSetNodeData'

export const PropertySelectorNode = memo(({ data, isConnectable }) => {
  const { setNodes } = useReactFlow()
  const nodeId = useNodeId()

  const setNodeData = useSetNodeData()

  const handleChange = useCallback(event => {
    const property = event?.target.value

    setNodeData('property', property)
    setNodeData('expression', `["get", "${property}"]`)
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
  id: `${new Date()}`,
  type: 'propertySelector',
  position: { x: 0, y: 0 },
  data: { properties: context.properties },
  style: { padding: 4, border: '1px solid black' },
})
