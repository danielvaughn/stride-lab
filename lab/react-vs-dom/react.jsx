import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { randomColor, randomId, randomNumber } from './utils'

const list = []

const root = ReactDOM.createRoot(document.getElementById('root'))

function render() {
  root.render(
    <React.StrictMode>
      <App list={list} />
    </React.StrictMode>
  )
}

const button = document.getElementById('run')

button.onclick = () => {
  for (let i = 0; i < 10000; i++) {
    appendToList()
  }
}

function appendToList() {
  list.push({
    id: randomId(),
    width: `${randomNumber(300, 50)}px`,
    height: `${randomNumber(300, 50)}px`,
    backgroundColor: randomColor(),
  })

  render()
}
