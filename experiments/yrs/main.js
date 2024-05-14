import * as Y from 'ywasm'

const doc = new Y.Doc()
const text = doc.getText('name')

text.insert(0, 'hello world', { bold: true })

const str = text.toString()

console.log('string:')
console.log(str)
