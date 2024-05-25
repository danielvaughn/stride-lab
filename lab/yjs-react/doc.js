import * as Y from 'yjs'
import { randomColor, randomId, randomNumber } from './utils'

const doc = new Y.Doc()

export const main = doc.getMap('main')
export const nodes = main.set('nodes', new Y.Map())
export const data = main.set('data', new Y.Map())
export const styles = main.set('styles', new Y.Map())

let undoManager

doc.on('afterTransaction', () => {
  const docWriteEvent = new CustomEvent('docwrite')
  window.dispatchEvent(docWriteEvent)
})

export function addNode(nodeId, type, parentId) {
  const nodeStyles = styles.set(nodeId, new Y.Map())
  nodeStyles.set('display', 'block')
  nodeStyles.set('padding', '5px')
  nodeStyles.set('backgroundColor', randomColor())
  nodeStyles.set('border', `2px solid ${randomColor()}`)

  const nodeData = data.set(nodeId, new Y.Map())
  nodeData.set('data-type', type)
  nodeData.set('content', new Y.Text())

  nodes.set(nodeId, new Y.Array())
  const parentNode = nodes.get(parentId)
  if (parentNode) {
    parentNode.push([nodeId])
  }
}

export function initDoc() {
  doc.transact(() => {
    addNode('root', 'html')
  })
  undoManager = new Y.UndoManager(main, { captureTimeout: 5 })
}

export function undo() {
  if (undoManager) {
    undoManager.undo()
  }
}

export function redo() {
  if (undoManager) {
    undoManager.redo()
  }
}

export function restyle(nodeId) {
  const nodeStyles = styles.get(nodeId)

  if (!nodeStyles) {
    return
  }

  nodeStyles.set('padding', `${randomNumber(40, 5)}px`)
  nodeStyles.set('height', `${randomNumber(400, 20)}px`)
  nodeStyles.set('backgroundColor', randomColor(false))
  nodeStyles.set('border', `2px solid ${randomColor(false)}`)
}

export function createNodes(count = 1) {
  doc.transact(() => {
    for (let i = 0; i < count; i++) {
      addNode(randomId(), 'shape', 'root')
    }
  })
}
