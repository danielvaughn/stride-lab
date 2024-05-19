import * as Y from 'yjs'

export class NodeTree {
  constructor() {
    this.doc = new Y.Doc()

  }

  createNode(id, type, parentId = null, styles = {}, attributes = {}) {
    const node = new Y.Map()

    node.set('id', id)
    node.set('type', type)
    node.set('parent_id', parentId)
    node.set('styles', new Y.Map(styles))
    node.set('attributes', new Y.Map(attributes))
    node.set('children', new Y.Array())

    return node
  }

}
