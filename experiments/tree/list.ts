import { randomId } from "./utils"

type ListNode = {
  id: string
  parentId: string
  children: string[]
}

export const tree: {[key:string]: ListNode} = {
  a: {
    id: 'a',
    parentId: '',
    children: ['b'],
  },
  b: {
    id: 'b',
    parentId: 'a',
    children: ['c', 'd'],
  },
  c: {
    id: 'c',
    parentId: 'b',
    children: [],
  },
  d: {
    id: 'd',
    parentId: 'b',
    children: [],
  }
}



function addNode(parentId: string) {
  if (!tree[parentId]) {
    throw new Error(`Unable to add node to parent ${parentId}`)
  }

  const id = randomId()

  tree[id] = {
    id: id,
    parentId: parentId,
    children: [],
  }

  tree[parentId].children.push(id)
}

function removeNode(id: string) {
  console.log(`removing node ${id}`)
  const node = tree[id]
  if (!node) {
    throw new Error(`Unable to remove node ${id}`)
  }

  const parent = tree[node.parentId]
  parent.children.splice(parent.children.indexOf(id), 1)
  node.children.forEach(removeNode)

  delete tree[id]
}

// addNode('c')
removeNode('b')

console.log(tree)

// const command = {
//   type: 'append',
//   targetId: 'c',
//   index: 0,
//   id: 'e',
// }
