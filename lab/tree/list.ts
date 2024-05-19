import { randomId } from "./utils"

type ListNode = {
  id: string
  parentId: string
  children: string[]
}

export const tree: {[key:string]: ListNode} = {
  root: {
    id: 'root',
    parentId: '',
    children: [],
  },
  // a: {
  //   id: 'a',
  //   parentId: '',
  //   children: ['b'],
  // },
  // b: {
  //   id: 'b',
  //   parentId: 'a',
  //   children: ['c', 'd'],
  // },
  // c: {
  //   id: 'c',
  //   parentId: 'b',
  //   children: [],
  // },
  // d: {
  //   id: 'd',
  //   parentId: 'b',
  //   children: [],
  // }
}

export function addNode(parentId: string = 'root'): string {
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

  return id
}

function removeNode(id: string) {
  const node = tree[id]
  if (!node) {
    throw new Error(`Unable to remove node ${id}`)
  }

  const parent = tree[node.parentId]
  parent.children.splice(parent.children.indexOf(id), 1)
  node.children.forEach(removeNode)

  delete tree[id]
}

const id1 = addNode()
const id2 = addNode()
const id3 = addNode()

console.log(id1)
console.log(id2)

removeNode(id3)

console.log(tree)

// const command = {
//   type: 'append',
//   targetId: 'c',
//   index: 0,
//   id: 'e',
// }
