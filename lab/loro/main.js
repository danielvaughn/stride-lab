import { Loro } from 'loro-crdt'

const doc = new Loro()

const text = doc.getText('text')

text.insert(0, 'Hello World!')

console.log(doc.toJson())

class NodeTree {

  constructor() {
    this.doc = new Loro()
    this.main = this.doc.getMap('main')
  }

}
