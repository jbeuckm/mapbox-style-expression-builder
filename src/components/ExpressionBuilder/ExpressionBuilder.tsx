import { useCallback, useMemo, useState } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from 'reactflow'

import { PropertySelectorNode } from './nodes/PropertySelectorNode'
import 'reactflow/dist/style.css'
import { ExpressionNode } from './nodes/ExpressionNode'
import './ExpressionBuilder.css'
import { BinaryCombination } from './nodes/BinaryCombination'
import { ContinuousPalette } from './nodes/ContinuousPalette'
import { Constant } from './nodes/Constant'

const nodeTypes = {
  propertySelector: PropertySelectorNode,
  expression: ExpressionNode,
  binaryCombination: BinaryCombination,
  continuousPalette: ContinuousPalette,
  constant: Constant,
}

type ExpressionBuilderProps = {
  properties: string[]
}

export const ExpressionBuilder = (context: ExpressionBuilderProps) => {
  const initialNodes = useMemo(
    () => [
      PropertySelectorNode.getDefaultNode(context),
      {
        id: '2',
        type: 'expression',
        position: { x: 0, y: 100 },
        data: { label: '2' },
      },
    ],
    []
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback(
    params => {
      setEdges(eds => addEdge(params, eds))
    },
    [setEdges]
  )

  const [addNodeType, setAddNodeType] = useState('propertySelector')
  const handleSelectNodeType = useCallback(event => {
    setAddNodeType(event.target.value)
  }, [])
  const handleAddNode = useCallback(() => {
    setNodes(nodes => [...nodes, nodeTypes[addNodeType].getDefaultNode(context)])
  }, [addNodeType])

  return (
    <>
      <select value={addNodeType} onChange={handleSelectNodeType}>
        {Object.entries(nodeTypes).map(([type]) => (
          <option key={type}>{type}</option>
        ))}
      </select>

      <button onClick={handleAddNode}>add node</button>

      <div style={{ height: 500 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </>
  )
}
