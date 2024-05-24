import CanvasNode from "./CanvasNode"

export default function App({ nodes, styles, data }) {
  if (!nodes || !styles || !data) {
    return null
  }

  return (
    <CanvasNode
      nodes={nodes}
      nodeId="root"
      styles={styles}
      data={data}
    />
  )
}
