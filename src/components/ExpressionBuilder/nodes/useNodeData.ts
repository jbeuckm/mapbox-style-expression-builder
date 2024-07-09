import { assocPath } from 'ramda'
import { useNodeId, useNodes, useReactFlow, Node } from 'reactflow'

export const useNodeData = () => {
  const nodeId = useNodeId()
  const nodes = useNodes()
  const { setNodes } = useReactFlow()

  return [
    nodes.find(({ id }) => id === nodeId)?.data,

    (key: string, value: any) =>
      setNodes(nodes =>
        nodes.map<Node<any>>((node: Node<any>) => {
          if (node.id === nodeId) {
            return assocPath(['data', key], value)(node) as Node<any>
          }
          return node
        })
      ),
  ]
}
