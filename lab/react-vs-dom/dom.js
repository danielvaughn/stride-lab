import { randomColor, randomId, randomNumber } from "./utils"

const root = document.getElementById('root')

const button = document.getElementById('run')

const list = []

button.onclick = function bclick() {
  for (let i = 0; i < 10000; i++) {
    appendToList()
  }
}

function appendToList() {
  const node = {
    id: randomId(),
    width: `${randomNumber(300, 50)}px`,
    height: `${randomNumber(300, 50)}px`,
    backgroundColor: randomColor(),
  }

  list.push(node)

  const e = new CustomEvent('added_node', { detail: node })
  window.dispatchEvent(e)
}

window.addEventListener('added_node', function didAddNode(e) {
  const node = e.detail

  render(node)
})

function render(node) {
  const element = document.createElement('div')
  element.id = node.id
  element.style.width = node.width
  element.style.height = node.height
  element.style.backgroundColor = node.backgroundColor
  root.appendChild(element)
}
