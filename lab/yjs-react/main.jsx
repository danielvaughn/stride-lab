import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initDoc, nodes, styles, data, createNodes } from './doc'
import { randomId } from './utils'

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
  createNodes(5000)
}, 0)

// window.addEventListener('docwrite', (e) => {
//   render(e.detail)
// })

// window.addEventListener('append', (e) => {
//   updateTree(randomId(), e.detail)
// })

initDoc()
