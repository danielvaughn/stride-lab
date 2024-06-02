/* eslint-disable no-unreachable */
/* eslint-disable no-case-declarations */

function updateRules(stylesheet, styleUpdates) {
  for (const cssRule of stylesheet.cssRules) {
    if (styleUpdates.has(cssRule.selectorText)) {
      let styles = styleUpdates.get(cssRule.selectorText)
      for (const styleProp in styles) {
        let styleVal = styles[styleProp]
        if (styleVal !== cssRule.styleMap.get(styleProp)) {
          cssRule.styleMap.delete(styleProp)
          cssRule.styleMap.set(styleProp, styles[styleProp])
        }
      }
    }
  }
}

function updateRule(stylesheet, selectorText, property, value) {
  for (const cssRule of stylesheet.cssRules) {

    if (cssRule.selectorText === selectorText) {
      cssRule.styleMap.delete(property)
      cssRule.styleMap.set(property, value)
    }
  }

  // const rules = Array.from(stylesheet.cssRules)
  // const index = rules.findIndex((rule) => rule.selectorText === selectorText)

  // const rule = rules[index]

  // const newStyles = {}

  // if (index !== -1) {
  //   stylesheet.deleteRule(index)
  //   Array.from(rule.style).forEach((p) => {
  //     newStyles[p] = rule.style[p]
  //   })
  // }

  // newStyles[property] = value

  // const cssString = Object.entries(newStyles).map(([p, v]) => `${p}: ${v};`).join('\n')

  // stylesheet.insertRule(`${selectorText} { ${cssString} }`)
}

export function listen(targetNode) {
  const stylesheet = new CSSStyleSheet()

  stylesheet.replaceSync('')

  document.adoptedStyleSheets = [stylesheet]

  const observer = new MutationObserver(function mutationRender(mutations) {
    const styleUpdates = new Map()

    for (const mutation of mutations) {
      switch (mutation.type) {
        case 'childList':
          for (const addedNode of mutation.addedNodes) {
            let styles = {}

            for (const attribute of Object.values(addedNode.attributes)) {
              if (attribute.name.startsWith('data-styles')) {
                styles = JSON.parse(attribute.value)
                // styles[attribute.name.replace('data-style-', '')] = attribute.value
              }
            }

            stylesheet.insertRule(`
              #${addedNode.id} {
                ${
                  Object.entries(styles).map(function updateObjectRule([k, v]) {
                    return `${k}: ${v};`
                  }).join(' ')
                }
              }
            `)
          }

          break
        case 'attributes':
          if (mutation.attributeName === 'data-styles') {
            const styles = JSON.parse(mutation.target.dataset.styles)
            styleUpdates.set(`#${mutation.target.id}`, styles)

            // for (const property in styles) {
              // updateRule(stylesheet, `#${mutation.target.id}`, property, styles[property])
            // }

            // Object.entries(styles).map(function updateObjectRule([k, v]) {
            //   updateRule(stylesheet, `#${mutation.target.id}`, k, v)
            // })

            // const styleProperty = mutation.attributeName.replace('data-style-', '')
            // const styleValue = mutation.target.getAttribute(mutation.attributeName)
          }

          break
        case 'characterData':
          break
        default:
          break
      }
    }

    updateRules(stylesheet, styleUpdates)

    console.timeEnd('render')
  })

  observer.observe(targetNode, {
    attributes: true,
    childList: true,
    subtree: true,
  })
}
