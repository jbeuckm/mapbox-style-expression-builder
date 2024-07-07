import React, { memo, useCallback } from 'react'
import { Combination } from './Combination'
import { useNodeData } from './useNodeData'

const operations = ['+', '-', '*', '/', '%', '^', 'max', 'min', '!=', '==', '<', '<=', '>', '>=']

export const BinaryCombination = memo(({ data, isConnectable }) => {
  const [nodeData, setNodeData] = useNodeData()

  const handleChange = useCallback(event => {
    setNodeData('operation', event.target.value)
  }, [])

  return (
    <Combination
      inputs={[{ id: 'a' }, { id: 'b' }]}
      getExpression={({ a, b }) => [nodeData?.operation, a, b]}
      data={data}
      isConnectable={isConnectable}
    >
      {() => (
        <select name="property" id="property" value={nodeData.operation} onChange={handleChange}>
          {operations.map(operation => (
            <option key={operation} value={operation}>
              {operation}
            </option>
          ))}
        </select>
      )}
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
