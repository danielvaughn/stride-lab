
const jsonRoot = document.getElementById('json-root')
const rawRoot = document.getElementById('raw-root')

const OP_TIMES = 1000

console.time('json-render')
for (let i = 0; i < OP_TIMES; i++) {
  // do something
  const element = document.createElement('div')

  element.setAttribute('data-json', JSON.stringify({
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
  }))

  jsonRoot.appendChild(element)
}
console.timeEnd('json-render')

console.time('raw-render')
for (let i = 0; i < OP_TIMES; i++) {
  // do something
  const element = document.createElement('div')

  element.setAttribute('data-a', 1)
  element.setAttribute('data-b', 2)
  element.setAttribute('data-c', 3)
  element.setAttribute('data-d', 4)
  element.setAttribute('data-e', 5)

  rawRoot.appendChild(element)
}
console.timeEnd('raw-render')

console.time('json-get')
const jsonElements = document.querySelectorAll('#json-root *')
jsonElements.forEach((element) => {
  const data = JSON.parse(element.dataset['json'])
})
console.timeEnd('json-get')

console.time('raw-get')
const rawElements = document.querySelectorAll('#raw-root *')
rawElements.forEach((element) => {
  const a = element.getAttribute('data-a')
  const b = element.getAttribute('data-b')
  const c = element.getAttribute('data-c')
  const d = element.getAttribute('data-d')
  const e = element.getAttribute('data-e')
})
console.timeEnd('raw-get')
