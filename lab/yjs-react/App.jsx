import CanvasNode from "./CanvasNode"

export default function App({ doc }) {
  if (!doc) {
    return null
  }

  return (
    <CanvasNode
      nodes={doc.get('nodes')}
      nodeId="root"
      styles={doc.get('styles')}
      data={doc.get('data')}
    />
  )
}
