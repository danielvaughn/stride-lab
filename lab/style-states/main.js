/* eslint-disable no-prototype-builtins */

const root = document.getElementById('root')

const components = [
  {
    type: 'div',
    name: 'MySquare',
    variants: {
      size: {
        values: ['small', 'medium', 'large'],
        default: 'medium',
      },
      bg: {
        values: ['red', 'blue', 'orange'],
        default: 'orange',
      },
    },
    styles: [
      {
        query: '',
        rules: {},
      },
      {
        query: 'size:small',
        rules: {
          width: '50px',
          height: '50px',
          backgroundColor: '$bg',
        },
      },
      {
        query: 'size:medium',
        rules: {
          width: '100px',
          height: '100px',
          backgroundColor: 'lavender',
        },
      },
      {
        query: 'size:large',
        rules: {
          width: '200px',
          height: '200px',
          backgroundColor: 'black',
        },
      },
      {
        query: 'size:large',
        rules: {
          width: '200px',
          height: '200px',
        },
      },
    ],
  },
]

function render(component, params) {
  const computedParams = new Map()
  for (const variantKey in component.variants) {
    if (params.hasOwnProperty(variantKey)) {
      computedParams.set(variantKey, params[variantKey])
    } else {
      computedParams.set(variantKey, component.variants[variantKey].default)
    }
  }

  const element = document.createElement(component.type)

  const variants = []
  for (let [key, val] of computedParams) {
    variants.push(`${key}:${val}`)
  }

  const styleMap = new Map()
  for (const style of component.styles) {
    if (style.query === '' || variants.indexOf(style.query) >= 0) {
      for (const key in style.rules) {
        styleMap.set(key, style.rules[key])
      }
    }
  }

  styleMap.forEach((v, k) => {
    if (v.startsWith('$')) {
      element.style[k] = computedParams.get(v.substr(1))
    } else {
      element.style[k] = v
    }
  })

  root.appendChild(element)
}

render(components[0], { size: 'medium' })
