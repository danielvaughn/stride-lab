/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { randomColor } from './utils'

type KeyConfig = {
  [key:string]: string | (() => void) | KeyConfig,
}

const canvas = document.getElementById('canvas')!

const keyMap: KeyConfig = {
  name: '',
  a: {
    name: 'append',
    s: {
      name: 'append_shape',
      ArrowRight: appendShapeRight,
      ArrowDown: appendShapeDown,
      Escape: exitScope,
    },
    t: {
      name: 'append_text',
      ArrowRight: appendTextRight,
      ArrowDown: appendTextDown,
      Escape: exitScope,
    },
    i: {
      name: 'append_image',
      ArrowRight: appendImageRight,
      ArrowDown: appendImageDown,
      Escape: exitScope,
    },
    Escape: exitScope,
  },
  ArrowDown: selectNextSibling,
  ArrowUp: selectPreviousSibling,
  ArrowLeft: selectParent,
  ArrowRight: selectFirstChild,
  s: {
    builders: {
      block: styleBlock,
      flex: styleFlex,
    },
  },
}

let currentScope: any = keyMap

function styleBlock() {
  const targetElement = getTargetElement()
  targetElement.style.display = 'block'
}

function styleFlex() {
  const targetElement = getTargetElement()
  targetElement.style.display = 'flex'
}

function selectFirstChild() {
  if (!document.activeElement) {
    canvas.focus()
    return
  }

  const firstChild = document.activeElement.firstElementChild as HTMLElement
  if (firstChild) {
    firstChild.focus()
  }
}

function selectParent() {
  if (!document.activeElement) {
    canvas.focus()
    return
  }

  const parent = document.activeElement.parentElement as HTMLElement
  if (parent) {
    parent.focus()
  }
}

function selectPreviousSibling() {
  if (!document.activeElement) {
    canvas.focus()
    return
  }

  const previousSibling = document.activeElement.previousElementSibling as HTMLElement
  if (previousSibling) {
    previousSibling.focus()
  }
}

function selectNextSibling() {
  if (!document.activeElement) {
    canvas.focus()
    return
  }

  const nextSibling = document.activeElement.nextElementSibling as HTMLElement
  if (nextSibling) {
    nextSibling.focus()
  }
}

function exitScope() {
  currentScope = keyMap
}

function getTargetElement(): HTMLElement {
  let targetElement = document.activeElement as HTMLElement

  if (!targetElement || targetElement.getAttribute('data-type') === null) {
    return canvas
  }

  return targetElement
}

function appendShapeRight() {
  const el = document.createElement('div')
  el.style.width = '100%'
  el.style.padding = '10px'
  el.style.backgroundColor = randomColor()
  el.setAttribute('tabindex', '0')
  el.setAttribute('data-type', 'shape')

  const targetElement = getTargetElement()

  targetElement.appendChild(el)
  el.focus()
}

function appendShapeDown() {
  const el = document.createElement('div')
  el.style.width = '100%'
  el.style.padding = '10px'
  el.style.backgroundColor = randomColor()
  el.setAttribute('tabindex', '0')
  el.setAttribute('data-type', 'shape')

  const targetElement = getTargetElement()

  if (targetElement.id === 'canvas') {
    targetElement.appendChild(el)
  } else {
    targetElement.insertAdjacentElement('afterend', el)
  }
  el.focus()
}

function appendTextRight() {
  const el = document.createElement('p')
  el.style.width = '100%'
  el.style.padding = '10px'
  el.style.backgroundColor = randomColor()
  el.setAttribute('tabindex', '0')
  el.setAttribute('data-type', 'text')

  el.innerHTML = 'lorem ipsum'

  const targetElement = getTargetElement()

  targetElement.appendChild(el)
  el.focus()
}

function appendTextDown() {
  const el = document.createElement('p')
  el.style.width = '100px'
  el.style.padding = '10px'
  el.style.backgroundColor = randomColor()
  el.setAttribute('tabindex', '0')
  el.setAttribute('data-type', 'text')

  el.innerHTML = 'lorem ipsum'

  const targetElement = getTargetElement()

  if (targetElement.id === 'canvas') {
    targetElement.appendChild(el)
  } else {
    targetElement.insertAdjacentElement('afterend', el)
  }
  el.focus()
}

function appendImageRight() {
  const el = document.createElement('img')
  el.setAttribute('tabindex', '0')
  el.setAttribute('data-type', 'image')

  el.src = 'https://picsum.photos/100/100'

  const targetElement = getTargetElement()

  targetElement.appendChild(el)
  el.focus()
}

function appendImageDown() {
  const el = document.createElement('img')
  el.style.width = '100px'
  el.setAttribute('tabindex', '0')
  el.setAttribute('data-type', 'image')

  el.src = 'https://picsum.photos/100/100'

  const targetElement = getTargetElement()

  if (targetElement.id === 'canvas') {
    targetElement.appendChild(el)
  } else {
    targetElement.insertAdjacentElement('afterend', el)
  }
  el.focus()
}

let charMatch = ''

window.addEventListener('keydown', (e) => {
  switch (typeof currentScope[e.key]) {
    case 'object':
      currentScope = currentScope[e.key]
      break
    case 'function':
      currentScope[e.key]()
      currentScope = keyMap
      break
    default:
      if (typeof currentScope.builders === 'object') {
        charMatch += e.key
        console.log(charMatch)
        for (const key in currentScope.builders) {
          if (typeof currentScope.builders[charMatch] === 'function') {
            currentScope.builders[charMatch]()
            charMatch = ''
            currentScope = keyMap
          }

          if (!key.startsWith(charMatch)) {
            charMatch = ''
            currentScope = keyMap
          }
        }
      } else {
        charMatch = ''
        currentScope = keyMap
      }

      break
  }
})
