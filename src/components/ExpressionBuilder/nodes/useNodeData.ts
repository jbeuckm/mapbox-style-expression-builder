import { assocPath } from 'ramda'
import { useNodeId, useNodes, useReactFlow } from 'reactflow'

export const useNodeData = () => {
  const nodeId = useNodeId()
  const nodes = useNodes()
  const { setNodes } = useReactFlow()

  return [
    nodes.find(({ id }) => id === nodeId)?.data,

    (key: string, value: any) =>
      setNodes(nodes =>
        nodes.map(node => {
          if (node.id === nodeId) {
            return assocPath(['data', key], value)(node)
          }
          return node
        })
      ),
  ]
}
