import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initDoc, createNodes, main, addNode, undo, redo, restyle } from './doc'
import { randomId } from './utils'

const root = ReactDOM.createRoot(document.getElementById('app'))

let activeId = 'root'

function render() {
  root.render(
    <React.StrictMode>
      <App
        activeId={activeId}
        doc={main}
      />
    </React.StrictMode>
  )
}

window.addEventListener('keydown', (e) => {
  let el
  let setActiveIdEvent

  switch (e.key) {
    case 'ArrowDown':
      el = document.querySelector(`[data-id="${activeId}"]`)

      if (el && el.nextElementSibling && el.nextElementSibling.hasAttribute('data-id')) {
        setActiveIdEvent = new CustomEvent('set_active_id', { detail: el.nextElementSibling.getAttribute('data-id') })
        window.dispatchEvent(setActiveIdEvent)
      } else {
        window.dispatchEvent(new CustomEvent('set_active_id', { detail: 'root' }))
      }
      break
    case 'ArrowUp':
      el = document.querySelector(`[data-id="${activeId}"]`)
      if (el && el.previousElementSibling && el.previousElementSibling.hasAttribute('data-id')) {
        setActiveIdEvent = new CustomEvent('set_active_id', { detail: el.previousElementSibling.getAttribute('data-id') })
        window.dispatchEvent(setActiveIdEvent)
      } else {
        window.dispatchEvent(new CustomEvent('set_active_id', { detail: 'root' }))
      }
      break
    case 'ArrowRight':
      el = document.querySelector(`[data-id="${activeId}"]`)
      if (el && el.firstElementChild && el.firstElementChild.hasAttribute('data-id')) {
        setActiveIdEvent = new CustomEvent('set_active_id', { detail: el.firstElementChild.getAttribute('data-id') })
        window.dispatchEvent(setActiveIdEvent)
      } else {
        window.dispatchEvent(new CustomEvent('set_active_id', { detail: 'root' }))
      }
      break
    case 'ArrowLeft':
      el = document.querySelector(`[data-id="${activeId}"]`)
      if (el && el.parentElement && el.parentElement.hasAttribute('data-id')) {
        setActiveIdEvent = new CustomEvent('set_active_id', { detail: el.parentElement.getAttribute('data-id') })
        window.dispatchEvent(setActiveIdEvent)
      } else {
        window.dispatchEvent(new CustomEvent('set_active_id', { detail: 'root' }))
      }
      break
    case 's':
      addNode(randomId(), 'shape', activeId)
      break
    case 'u':
      undo()
      break
    case 'r':
      redo()
      break
    case 'l':
      restyle(activeId)
      break
    default:
      break
  }
})

window.addEventListener('docwrite', () => {
  render()
})

window.addEventListener('set_active_id', (e) => {
  activeId = e.detail
  render()
})

window.setTimeout(function nodeTimeout() {
  createNodes(1)
}, 0)

initDoc()
