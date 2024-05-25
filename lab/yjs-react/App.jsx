/* eslint-disable no-case-declarations */
import CanvasNode from "./CanvasNode"

export default function App({ activeId, doc }) {
  if (!doc) {
    return null
  }

  return (
    <CanvasNode
      nodes={doc.get('nodes')}
      nodeId="root"
      styles={doc.get('styles')}
      data={doc.get('data')}
      activeId={activeId}
    />
  )
}
