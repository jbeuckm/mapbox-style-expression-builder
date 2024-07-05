import { assocPath } from 'ramda'
import { useNodeId, useReactFlow } from 'reactflow'

export const useSetNodeExpression = () => {
  const nodeId = useNodeId()
  const { setNodes } = useReactFlow()

  return (expression: string) =>
    setNodes(nodes =>
      nodes.map(node => {
        if (node.id === nodeId) {
          return assocPath(['data', 'expression'], expression)(node)
        }
        return node
      })
    )
}
