/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Y from 'yjs'
import { randomId } from './utils'

type AdjacencyList = {
  [key: string]: string[]
}

const initialTreeData = {
  tree: {
    html: ['body'],
    body: [],
  },
  attributes: {
    html: {},
    body: {},
  },
  styles: {
    html: {
      'box-sizing': 'border-box',
    },
    body: {
      'box-sizing': 'border-box',
      'margin': '0px',
    },
  },
}

type Attribute = {
  [key: string]: Y.Map<string>
}

export class NodeTree {
  doc: Y.Doc
  tree: Y.Map<Y.Array<string>>
  attributes: Y.Map<Y.Map<string>>
  styles: Y.Map<Y.Map<string>>

  constructor() {
    this.doc = new Y.Doc()
    this.tree = this.doc.getMap('tree')
    this.attributes = this.doc.getMap('attributes')
    this.styles = this.doc.getMap('styles')
  }

  addNode(id: string | null, type: string) {
    this.doc.transact(() => {
      const nodeId: string = id || randomId()

      const styles: Y.Map<string> = new Y.Map()
      this.styles.set(nodeId, styles)

      const attributes: Y.Map<string> = new Y.Map()
      this.attributes.set(nodeId, attributes)

      const node: Y.Array<string> = new Y.Array()
      this.tree.set(nodeId, node)
    })
  }

}

















/*

  private convertToYJSMap(key: string, data: any) {
    const yMap = this.doc.getMap(key)

    for (const [k, v] of Object.entries(data[key])) {
      yMap.set(k, v)
    }

    return yMap
  }

  private convertToYJSAdjacencyList(key: string, data: {[key:string]: any}, callback) {
    const yAdj = this.doc.getMap(key)

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

  private setDoc() {

  }

  public setAttribute(nodeId: string, attributeKey: string, attributeValue: string) {

  }

  public setStyle(nodeId: string, property: string, value: string) {

  }

  public addNode() {}

  public batchExecute() {

  }

*/