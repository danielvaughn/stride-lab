import { listen } from './objects-observer'
import { randomId, randomColor, randomNumber, randomChar } from './random'

const root = document.getElementById('root')
// const domRoot = document.getElementById('root')

listen(root)

console.time('render')
// create a bunch of elements with some random styles
for (let i = 0; i < 10000; i++) {
  const size = randomNumber(50, 16)
  const bgColor = randomColor()
  const borderColor = randomColor()
  const id = randomId()
  const char = randomChar()

  const element = document.createElement('div')

  element.id = id
  element.innerHTML = char

  element.setAttribute('data-styles', JSON.stringify({
    width: `${size}px`,
    height: `${size}px`,
    'background-color': bgColor,
    border: `1px solid ${borderColor}`,
    margin: '1px',
  }))

  // element.setAttribute('data-style-width', `${size}px`)
  // element.setAttribute('data-style-height', `${size}px`)
  // element.setAttribute('data-style-background-color', bgColor)
  // element.setAttribute('data-style-border', `1px solid ${borderColor}`)
  // element.setAttribute('data-style-margin', '1px')

  root.appendChild(element)
}

// domRoot.appendChild(root)

// wait about 5 seconds and then update all of them

const button = document.getElementById('button')
button.addEventListener('click', function handleClick() {
  window.requestAnimationFrame(function runFrame() {
    const elements = document.querySelectorAll('#root *')
    elements.forEach(function updateElement(element) {
      const styles = JSON.parse(element.getAttribute('data-styles'))

      styles['background-color'] = randomColor(false)
      styles.color = randomColor()

      element.setAttribute('data-styles', JSON.stringify(styles))

      // element.setAttribute('data-style-background-color', randomColor(false))
      // element.setAttribute('data-style-color', randomColor())
    })
    console.time('render')
  })
})
