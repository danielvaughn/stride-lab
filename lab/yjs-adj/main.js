import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { randomId } from './utils'
import { initialData } from './data'

// const doc = new Y.Doc()
// const wsProvider = new WebsocketProvider('ws://localhost:1234', randomId(), doc)
// const tree = doc.getMap('tree')
// const undoManager = new Y.UndoManager(tree)

function convertToYJSMap(ydoc, key, data) {
  const yMap = ydoc.getMap(key)

  for (const [k, v] of Object.entries(data[key])) {
    yMap.set(k, v)
  }

  return yMap
}

function convertToYJSAdjacencyList(ydoc, key, data, callback) {
  const yAdj = ydoc.getMap(key)

  if (typeof callback === 'function') {
    yAdj.observeDeep(callback)
  }

  for (const [k, v] of Object.entries(data[key])) {
    const yArray = new Y.Array()

    v.forEach((item) => {
      yArray.push([item])
    })

    yAdj.set(k, yArray)
  }

  return yAdj
}

function hierarchyDidUpdate(events) {
  // console.log('hierarchyDidUpdate')
  // console.log(events)

  for (const event of events) {
    console.log('>')
    console.log(event)
    console.log('<')
  }
}

function initDoc() {
  const ydoc = new Y.Doc()
  const undoManager = new Y.UndoManager(ydoc)

  ydoc.on('update', (_, __, doc, transaction) => {
    console.log(transaction)
  })

  ydoc.transact(() => {
    const hierarchy = convertToYJSAdjacencyList(ydoc, 'hierarchy', initialData)
    const attributes = convertToYJSMap(ydoc, 'attributes', initialData)
    const content = convertToYJSMap(ydoc, 'content', initialData)
    const styles = convertToYJSMap(ydoc, 'styles', initialData)
  
    // todo: do something with these
  })

  const wsProvider = new WebsocketProvider('ws://localhost:1234', randomId(), ydoc)
  wsProvider.on('sync', () => {
    console.log('did get syneced')
  })
}

initDoc()

// wsProvider.on('status', event => {
//   if (event.status === 'connected') {
//     init()
//   }
// })

// // wsProvider.on('sync', () => {
// //   console.log('did get syneced')
// // })

// // doc.on('update', (_, __, doc, ___) => {
// //   console.log('ok now updated')
// // })

// function updateTree(event) {
//   event.transaction.changed.forEach((changeSet, container) => {
//     if (container instanceof Y.Map) {
//       changeSet.forEach((value, key) => {
//         console.log(` -${key}=${value}`)
//       })
//     }

//     if (container instanceof Y.Array) {
//       console.log(event.transaction)
//     }
//   })
// }

// function updateMap(event) {
//   // const mapKey = event.keysChanged.values().next().value
//   // console.log(event)
//   // event.transaction.changed.forEach((changeSet, container) => {
//   //   changeSet.forEach((val, key) => {
//   //     console.log(` -${key}=${val}`)
//   //   })
//   // })
// }

// function updateArray(event) {
//   // event.transaction.changed.forEach((changeSet, container) => {
//   //   console.log('change set:')
//   //   console.log(changeSet)
//   //   console.log(container)
//   // })
// }

// // tree.observeDeep((event) => {
// //   console.log('e:')
// //   console.log(event)
// // })

// function addNode(tree, parentId, index = 0, id = 'root') {
//   const nodes = tree.get('nodes')
//   const styles = tree.get('styles')

//   const parent = nodes.get(parentId)

//   if (parentId && !parent) {
//     return
//   }

//   id = id || randomId()
//   nodes.set(id, new Y.Array())
//   styles.set(id, new Y.Map())
//   parent.insert(index, [id])

//   return {
//     nodes,
//     styles,
//   }
// }

// async function init() {
//   tree.set('nodes', new Y.Map())
//   tree.set('styles', new Y.Map())

//   tree.observeDeep((events) => {
//     for (const event of events) {
//       updateTree(event)
//     }
//   })

//   const nodes = tree.get('nodes')

//   nodes.observeDeep((events) => {
//     console.log('did observe nodes')
//     for (const event of events) {
//       switch (event.constructor.name) {
//         case 'YMapEvent':
//           updateMap(event)
//           break
//         case 'YArrayEvent':
//           console.log('array:')
//           console.log(event)
//           updateArray(event)
//           break
//         default:
//           break
//       }
//     }
//   })

//   nodes.set('root', new Y.Array())

//   const styles = tree.get('styles')

//   styles.observeDeep((events) => {
//     console.log('did observe styles')
//     for (const event of events) {
//       switch (event.constructor.name) {
//         case 'YMapEvent':
//           updateMap(event)
//           break
//         case 'YArrayEvent':
//           // console.log('array:')
//           // console.log(event)
//           break
//         default:
//           break
//       }
//     }
//   })

//   styles.set('root', new Y.Map())

//   addNode(tree, 'root', 0, '')
//   // addNode(tree, 'root', 0, '')
//   // addNode(tree, 'root', 0, '')
//   // addNode(tree, 'root', 0, '')

//   // addNode(tree, '', 0, 'root')
//   // addNode(tree, 'root', 0, '')
//   // addNode(tree, 'root')
//   // addNode(tree, 'root')
//   // addNode(tree, 'root')

//   // const newId = addNode(tree, 'root')
//   // addNode(tree, newId)

//   // renderTree(tree, 'root', document.getElementById('tree-container'))

//   // const input = document.getElementById('text-input')
//   // input.addEventListener('blur', () => {
//   //   addNode(tree, input.value.trim())
//   //   input.value = ''

//   //   const treeContainer = document.getElementById('tree-container')
//   //   treeContainer.innerHTML = ''
//   //   renderTree(tree, 'root', document.getElementById('tree-container'))
//   // })
// }

// function addElementDown() {
//   const activeElement = document.activeElement

//   if (!activeElement) {
//     return
//   }

//   console.log(activeElement)
// }

// window.addEventListener('keydown', (e) => {
//   switch (e.key) {
//     case 'KeyU':
//       undoManager.undo()
//       break
//     case 'KeyR':
//       undoManager.redo()
//       break
//     case 'ArrowUp':
//       // implement add previous sibling
//       break
//     case 'ArrowDown':
//       addElementDown()
//       break
//     default:
//       break
//   }
// })
