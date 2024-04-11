import { randomId } from './utils'
import './list'

type NodeData = {
  [key: string]: string | number | NodeData
}

class TreeNode {
  id: string
  data: NodeData
  children: TreeNode[]

  constructor(data: NodeData) {
    this.id = randomId()
    this.data = data
    this.children = []
  }
}

export class Tree {
  root: TreeNode;

  constructor(rootData: NodeData) {
    this.root = new TreeNode(rootData)
  }

  findById(targetId: string, currentNode: TreeNode = this.root): TreeNode | null {
    if (!currentNode) {
      return null
    }

    if (currentNode.id === targetId) {
      return currentNode
    }

    for (const childNode of currentNode.children) {
      const foundNode = this.findById(targetId, childNode)
      if (foundNode) {
        return foundNode
      }
    }

    return null
  }

  addNode(parentId: string, data: NodeData) {
    const parentNode = this.findById(parentId)

    if (parentNode) {
      const newNode = new TreeNode(data)
      parentNode.children.push(newNode)
    }
  }
}
