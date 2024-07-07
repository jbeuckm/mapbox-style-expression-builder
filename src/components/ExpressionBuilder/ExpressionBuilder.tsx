import { useCallback, useEffect, useMemo, useState } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow'

import { PropertySelectorNode } from './nodes/PropertySelectorNode'
import 'reactflow/dist/style.css'
import { Display } from './nodes/Display'
import './ExpressionBuilder.css'
import { BinaryCombination } from './nodes/BinaryCombination'
import { ContinuousPalette } from './nodes/ContinuousPalette'
import { Constant } from './nodes/Constant'
import { Slider } from './nodes/Slider'
import { FillLayer } from './nodes/FillLayer'
import { path, prop } from 'ramda'
import { String } from './nodes/String'

const nodeTypes = {
  propertySelector: PropertySelectorNode,
  display: Display,
  binaryCombination: BinaryCombination,
  continuousPalette: ContinuousPalette,
  constant: Constant,
  slider: Slider,
  fillLayer: FillLayer,
  string: String,
}

type ExpressionBuilderProps = {
  properties: string[]
  onChange?: (layers: any) => void
}

const flowKey = 'example-flow'

export const Impl = (context: ExpressionBuilderProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
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

  const [rfInstance, setRfInstance] = useState(null)
  const { setViewport } = useReactFlow()

  const [saveEnabled, setSaveEnabled] = useState(false)

  const onSave = useCallback(() => {
    if (!saveEnabled) return

    if (rfInstance) {
      const flow = rfInstance.toObject()

      const outputs = flow.nodes
        .filter(({ type }) => type === 'fillLayer')
        .map(path(['data', 'expression']))
      context.onChange?.({ layers: outputs })

      localStorage.setItem(flowKey, JSON.stringify(flow))
    }
  }, [rfInstance, saveEnabled])

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey))

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport
        setNodes(flow.nodes || [])
        setEdges(flow.edges || [])
        setViewport({ x, y, zoom })
      }
    }

    restoreFlow()
  }, [setNodes, setViewport])

  useEffect(() => {
    if (!rfInstance) return
    onRestore()

    setSaveEnabled(true)
  }, [!!rfInstance])

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
          onNodesChange={(...args) => {
            onSave()
            onNodesChange(...args)
          }}
          onEdgesChange={(...args) => {
            onSave()
            onEdgesChange(...args)
          }}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onInit={setRfInstance}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </>
  )
}

export const ExpressionBuilder = props => (
  <ReactFlowProvider>
    <Impl {...props} />
  </ReactFlowProvider>
)
