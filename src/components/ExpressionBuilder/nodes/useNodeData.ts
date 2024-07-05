import { useNodeId, useNodes } from 'reactflow'

export const useNodeData = () => {
  const nodeId = useNodeId()
  const nodes = useNodes()

  return nodes.find(({ id }) => id === nodeId)?.data
}
