/* eslint-disable no-case-declarations */

function updateRule (stylesheet, selectorText, property, value) {
  const rules = Array.from(stylesheet.cssRules)
  const index = rules.findIndex((rule) => rule.selectorText === selectorText)

  const rule = rules[index]

  const newStyles = {}

  if (index !== -1) {
    stylesheet.deleteRule(index)
    Array.from(rule.style).forEach((p) => {
      newStyles[p] = rule.style[p]
    })
  }

  newStyles[property] = value

  const cssString = Object.entries(newStyles).map(([p, v]) => `${p}: ${v};`).join('\n')

  stylesheet.insertRule(`${selectorText} { ${cssString} }`)
}

export function listen(targetNode) {
  const stylesheet = new CSSStyleSheet()

  stylesheet.replaceSync('')

  document.adoptedStyleSheets = [stylesheet]

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      switch (mutation.type) {
        case 'childList':
          for (const addedNode of mutation.addedNodes) {
            const styles = {}

            for (const attribute of Object.values(addedNode.attributes)) {
              if (attribute.name.startsWith('data-style')) {
                styles[attribute.name.replace('data-style-', '')] = attribute.value
              }
            }

            stylesheet.insertRule(`
              #${addedNode.id} {
                ${
                  Object.entries(styles).map(([k, v]) => {
                    return `${k}: ${v};`
                  }).join(' ')
                }
              }
            `)
          }

          break
        case 'attributes':
          if (mutation.attributeName.startsWith('data-style')) {
            const styleProperty = mutation.attributeName.replace('data-style-', '')
            const styleValue = mutation.target.getAttribute(mutation.attributeName)

            updateRule(stylesheet, `#${mutation.target.id}`, styleProperty, styleValue)
          }

          break
        case 'characterData':
          break
        default:
          break
      }
    })
  })

  observer.observe(targetNode, {
    attributes: true,
    childList: true,
    subtree: true,
  })
}
