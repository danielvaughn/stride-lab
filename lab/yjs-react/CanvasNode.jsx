
export default function CanvasNode({ nodes, nodeId, data, styles }) {
  const node = nodes.get(nodeId)
  const nodeData = data.get(nodeId)
  const nodeStyles = styles.get(nodeId)

  if (!node || !nodeData || !nodeStyles) {
    return null
  }

  return (
    <div>
      <span
        style={nodeStyles.toJSON()}
      >
        {node.type}
      </span>
      <div>
        {node.map((childId) => {
          return (
            <CanvasNode
              key={childId}
              nodes={nodes}
              nodeId={childId}
              data={data}
              styles={styles}
            />
          )
        })}
      </div>
    </div>
  )
}
