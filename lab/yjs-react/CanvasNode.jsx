
export default function CanvasNode({ activeId, nodes, nodeId, data, styles }) {
  const node = nodes.get(nodeId)
  const nodeData = data.get(nodeId)
  const nodeStyles = styles.get(nodeId).toJSON()
  const className = nodeId === activeId ? 'active' : ''

  if (!node || !nodeData || !nodeStyles) {
    return null
  }

  return (
    <div
      data-id={nodeId}
      style={nodeStyles}
      className={className}
    >
      {node.map((childId) => {
        return (
          <CanvasNode
            activeId={activeId}
            key={childId}
            nodes={nodes}
            nodeId={childId}
            data={data}
            styles={styles}
          />
        )
      })}
    </div>
  )
}
