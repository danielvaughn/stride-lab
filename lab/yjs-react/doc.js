import * as Y from 'yjs'
import { randomColor, randomId } from './utils'

const doc = new Y.Doc()

// every document can have living forks - the main one is the source of truth
export const main = doc.getMap('main')
export const nodes = main.set('nodes', new Y.Map())
export const data = main.set('data', new Y.Map())
export const styles = main.set('styles', new Y.Map())

main.observeDeep(() => {
  const updateEvent = new CustomEvent('update')
  window.dispatchEvent(updateEvent)
})

function addNode(nodeId, type, parentId) {
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
  console.time('add_nodes')
  doc.transact(() => {
    addNode('root', 'html')
    // addNode('abc', 'shape', 'root')
    // addNode('def', 'shape', 'root')
    // addNode('ghi', 'shape', 'abc')
  })
}

export function createNodes(count = 1) {
  console.time('add_nodes')
  doc.transact(() => {
    for (let i = 0; i < count; i++) {
      addNode(randomId(), 'shape', 'root')
    }
  })
}
