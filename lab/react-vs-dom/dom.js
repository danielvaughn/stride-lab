import { randomColor, randomId, randomNumber } from "./utils"

const root = document.getElementById('root')

const button = document.getElementById('run')

button.onclick = () => {
  for (let i = 0; i < 10000; i++) {
    appendToList()
  }
}

function appendToList() {
  const element = document.createElement('div')
  element.id = randomId()
  element.style.width = `${randomNumber(300, 50)}px`
  element.style.height = `${randomNumber(300, 50)}px`
  element.style.backgroundColor = randomColor()
  root.appendChild(element)
}
