import { assocPath } from 'ramda'
import { useNodeId, useReactFlow } from 'reactflow'

export const useSetNodeData = () => {
  const nodeId = useNodeId()
  const { setNodes } = useReactFlow()

  return (key: string, value: any) =>
    setNodes(nodes =>
      nodes.map(node => {
        if (node.id === nodeId) {
          return assocPath(['data', key], value)(node)
        }
        return node
      })
    )
}
