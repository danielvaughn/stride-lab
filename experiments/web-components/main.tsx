import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './web-component.ts'
import { Tree } from './tree.ts'
import './index.css'

const tree = new Tree()

// for (let i = 0; i < 100; i++) {
//   tree.addFirstChild()
// }

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <App tree={tree} />
  </React.StrictMode>
)

window.addEventListener('keydown', (e) => {
  if (e.key === 'a') {
    tree.addFirstChild()
    root.render(
      <React.StrictMode>
        <App tree={tree} />
      </React.StrictMode>
    )
  }
})
