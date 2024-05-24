import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initDoc, nodes, styles, data, createNodes } from './doc'

const root = ReactDOM.createRoot(document.getElementById('root'))

function render() {
  root.render(
    <React.StrictMode>
      <App
        nodes={nodes}
        data={data}
        styles={styles}
      />
    </React.StrictMode>
  )
}

window.addEventListener('update', () => {
  render()
  console.timeEnd('add_nodes')
})

window.setTimeout(() => {
  createNodes(5)
}, 0)

initDoc()
