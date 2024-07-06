import React, { memo, useCallback } from 'react'
import { useEdges, useNodeId, useNodes } from 'reactflow'
import { Combination } from './Combination'
import { useSetNodeData } from './useSetNodeData'
import { useNodeData } from './useNodeData'

const operations = ['+', '-', '*', '/', '%', '^', 'max', 'min']

export const BinaryCombination = memo(({ data, isConnectable }) => {
  const nodeId = useNodeId()
  const nodes = useNodes()
  const edges = useEdges()

  const setNodeData = useSetNodeData()

  const handleChange = useCallback(event => {
    setNodeData('operation', event.target.value)
  }, [])

  const nodeData = useNodeData()

  return (
    <Combination
      inputs={['a', 'b']}
      getExpression={({ a, b }) => [nodeData?.operation, a, b]}
      data={data}
      isConnectable={isConnectable}
    >
      <select name="property" id="property" onChange={handleChange}>
        {operations.map(operation => (
          <option key={operation} value={operation}>
            {operation}
          </option>
        ))}
      </select>
    </Combination>
  )
})

BinaryCombination.getDefaultNode = () => ({
  id: `${+new Date()}`,
  type: 'binaryCombination',
  position: { x: 0, y: 0 },
  data: { operation: '+' },
  style: { textAlign: 'center' },
})
