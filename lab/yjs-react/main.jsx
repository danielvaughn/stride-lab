import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initDoc, createNodes } from './doc'

const root = ReactDOM.createRoot(document.getElementById('root'))

function render(doc) {
  root.render(
    <React.StrictMode>
      <App
        doc={doc}
      />
    </React.StrictMode>
  )
}

window.addEventListener('docwrite', (e) => {
  render(e.detail)
})

window.setTimeout(function nodeTimeout() {
  createNodes(1)
}, 0)

initDoc()
