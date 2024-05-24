import { listen } from './observer'
import { randomId, randomColor, randomNumber, randomChar } from './random'

const root = document.getElementById('root')

listen(root)

// create a bunch of elements with some random styles
for (let i = 0; i < 5000; i++) {
  const size = randomNumber(50, 16)
  const bgColor = randomColor()
  const borderColor = randomColor()
  const id = randomId()
  const char = randomChar()

  const element = document.createElement('div')

  element.id = id
  element.innerHTML = char
  element.setAttribute('data-style-width', `${size}px`)
  element.setAttribute('data-style-height', `${size}px`)
  element.setAttribute('data-style-background-color', bgColor)
  element.setAttribute('data-style-border', `1px solid ${borderColor}`)
  element.setAttribute('data-style-margin', '1px')

  root.appendChild(element)
}


// wait about 5 seconds and then update all of them

let count = 0

const int = window.setTimeout(() => {

  if (count > 10) {
    window.clearInterval(int)
    return
  }

  window.requestAnimationFrame(() => {
    const elements = document.querySelectorAll('#root *')
    elements.forEach((element) => {
      element.setAttribute('data-style-background-color', randomColor(false))
      element.setAttribute('data-style-color', randomColor())
    })
    console.time('render')
  })
  count += 1
}, 2000)
