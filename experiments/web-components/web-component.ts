/* eslint-disable @typescript-eslint/no-explicit-any */

export class EditorComponent extends HTMLElement {
  static observedAttributes = ['type']

  cssStyles: {[key:string]:string}

  constructor() {
    super()
    this.cssStyles = {}
  }

  get styles() {
    return this.cssStyles
  }

  set styles(styleObject) {
    Object.assign(this.cssStyles, styleObject)

    const sheet = this.shadowRoot?.adoptedStyleSheets[0]
    const styles = this.getStyles(this.cssStyles)

    sheet?.insertRule(`
      :host {
        ${styles}
      }
    `, 0)
  }

  getStyles(cssStyles: {[key:string]:string}) {
    const styles = []

    for (const style in cssStyles) {
      styles.push(`${style}: ${cssStyles[style]};`)
    }

    return styles.join('\n')
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
      <p>hello world</p>
      <slot></slot>
    `

    const sheet = new CSSStyleSheet()
    shadow.adoptedStyleSheets = [sheet]
  }
}

window.customElements.define('editor-component', EditorComponent)
