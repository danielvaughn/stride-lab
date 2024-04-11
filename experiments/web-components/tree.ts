import { randomColor, randomId } from './utils'

type NodeAttributes = {
  [key:string]: string
}

type NodeStyles = {
  [key:string]: string
}

export class TreeNode {
  id: string
  parent: string
  attributes: NodeAttributes
  styles: NodeStyles
  children: string[]

  constructor(parent: string = '', attributes: NodeAttributes = {}, styles: NodeStyles = {}) {
    this.id = randomId()
    this.parent = parent
    this.attributes = attributes
    this.styles = styles
    this.children = []
  }
}

export class Tree {
  rootId: string = 'root'
  nodeMap: Map<string, TreeNode>

  constructor() {
    this.nodeMap = new Map()
    this.nodeMap.set(this.rootId, new TreeNode(this.rootId, {}, {}))
  }

  findById(targetId: string): TreeNode | null {
    return this.nodeMap.get(targetId) || null
  }

  findParent(targetId: string): TreeNode | null {
    const parentId = this.nodeMap.get(targetId)?.parent

    if (!parentId) {
      return null
    }

    return this.findById(parentId)
  }

  addFirstChild(targetId: string = this.rootId): TreeNode {
    const targetNode = this.findById(targetId)
    if (!targetNode) {
      throw new Error(`Failed to addFirstChild: targetNode ${targetId} not found`)
    }

    const attributes: NodeAttributes = {
      element_type: 'div',
    }

    const styles: NodeStyles = {
      'background-color': randomColor(),
      'padding': '10px',
      'font-family': 'sans-serif',
      'display': 'block',
    }

    const newNode = new TreeNode(targetNode.id, attributes, styles)
    targetNode.children.unshift(newNode.id)
    this.nodeMap.set(newNode.id, newNode)

    return newNode
  }

}
