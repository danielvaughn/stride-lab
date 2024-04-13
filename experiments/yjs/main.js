import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { randomId } from './utils'

const doc = new Y.Doc()
const wsProvider = new WebsocketProvider('ws://localhost:1234', randomId(), doc)

const tree = doc.getMap('tree')

wsProvider.on('status', event => {
  if (event.status === 'connected') {
    init()
  }
})

wsProvider.on('sync', () => {
  console.log('did get syneced')
})

function addNode(tree, parentId, index = 0, id = null) {
  const nodes = tree.get('nodes')
  const data = tree.get('data')

  const parent = nodes.get(parentId)

  if (parentId && !parent) {
    return
  }

  id = id !== null ? id : randomId()
  nodes.set(id, new Y.Map())

  const newNode = nodes.get(id)
  newNode.set('parentId', parentId)
  newNode.set('children', new Y.Array())

  data.set(id, { textContent: `hello this is id ${id}` })

  if (parent) {
    const children = parent.get('children')
    children.insert(index, [id])
  }

  return id
}

function renderTree(tree, nodeId, container) {
  const nodes = tree.get('nodes')
  const data = tree.get('data')

  const node = nodes.get(nodeId)
  const datum = data.get(nodeId)

  const element = document.createElement('div')
  element.textContent = datum['textContent'] || 'none'

  container.appendChild(element)

  const children = node.get('children')

  if (children) {
    children.forEach((childId) => {
      renderTree(tree, childId, element)
    })
  }
}

async function init() {
  tree.set('nodes', new Y.Map())
  tree.set('data', new Y.Map())

  addNode(tree, '', 0, 'root')
  addNode(tree, 'root')
  addNode(tree, 'root')
  addNode(tree, 'root')
  addNode(tree, 'root')

  const newId = addNode(tree, 'root')
  addNode(tree, newId)

  renderTree(tree, 'root', document.getElementById('tree-container'))

  const input = document.getElementById('text-input')
  input.addEventListener('blur', () => {
    addNode(tree, input.value.trim())
    input.value = ''

    const treeContainer = document.getElementById('tree-container')
    treeContainer.innerHTML = ''
    renderTree(tree, 'root', document.getElementById('tree-container'))
  })
}
