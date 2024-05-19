import { Tree } from '../tree'
import EditorNode from './EditorNode'

interface AppProps {
  tree: Tree
}

function App({ tree }: AppProps) {
  return (
    <EditorNode
      tree={tree}
      nodeId={tree.rootId}
    />
  )
}

export default App
