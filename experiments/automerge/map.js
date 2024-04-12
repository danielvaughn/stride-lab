import * as A from '@automerge/automerge/next'

let doc = A.from({
  map: {
    key: 'value',
    nested_map: { key: 'value' },
    nested_list: [1],
  },
  list: ['a', 'b', 'c', {nested: 'map'}, ['nested list']],
  text: 'some text',
  integer: 1,
  float: 2.3,
  boolean: true,
  bytes: new Uint8Array([1, 2, 3]),
  date: new Date(),
  counter: new A.Counter(1),
  none: null,
})

doc = A.change(doc, (d) => {
  A.splice(d, ['text'], 0, 0, 'hello ')
  d.counter.increment(20)
  d.map.key = 'new value'
  d.map.nested_map.key = 'new nested value'
  d.list[0] = 'A'
  d.list.insertAt(0, 'Z')
  d.list[4].nested = 'MAP'
  d.list[5][0] = 'NESTED LIST'
})

console.log(doc)
