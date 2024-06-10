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
