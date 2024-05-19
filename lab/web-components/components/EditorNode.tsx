import { useEffect, useRef } from 'react'
import { Tree } from '../tree'
import { EditorComponent } from '../web-component'

interface EditorNodeProps {
  tree: Tree
  nodeId: string
}

export default function EditorNode({ tree, nodeId }: EditorNodeProps) {
  const nodeObject = tree.findById(nodeId)!

  const ref = useRef<EditorComponent>()

  useEffect(() => {
    if (ref.current) {
      ref.current.styles = nodeObject.styles
    }
  }, [nodeObject.styles])

  return (
    <editor-component
      ref={ref}
      id={nodeId}
      type="div"
    >
      {nodeObject.children.map((childNodeId: string) => {
        return (
          <EditorNode key={childNodeId} tree={tree} nodeId={childNodeId} />
        )
      })}
    </editor-component>
  )
}
