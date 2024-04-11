
export const renderer = ({ minScale, maxScale, element, scaleSensitivity = 10 }) => {
  const state = {
    element,
    minScale,
    maxScale,
    scaleSensitivity,
    transformation: {
      originX: 0,
      originY: 0,
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
  }

  return Object.assign({}, canZoom(state), canPan(state))
}

const pan = ({ state, originX, originY }) => {
  state.transformation.translateX += originX
  state.transformation.translateY += originY
  state.element.style.transform = getMatrix({
    scale: state.transformation.scale,
    translateX: state.transformation.translateX,
    translateY: state.transformation.translateY,
  })
}

const canPan = (state) => {
  return {
    panBy: ({ originX, originY }) => pan({ state, originX, originY }),
    panTo: ({ originX, originY, scale }) => {
      state.transformation.scale = scale
      pan({
        state,
        originX: originX - state.transformation.translateX,
        originY: originY - state.transformation.translateY,
      })
    }
  }
}

const getMatrix = ({ scale, translateX, translateY }) => {
  return `matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`
}

const canZoom = (state) => {
  return {
    zoom: ({ x, y, deltaScale }) => {
      const { element, transformation, minScale, maxScale, scaleSensitivity } = state
      const { top, left } = element.getBoundingClientRect()
      const [scale, newScale] = getScale({ scale: transformation.scale, deltaScale, minScale, maxScale, scaleSensitivity })
      const originX = x - left
      const originY = y - top
      const newOriginX = originX / scale
      const newOriginY = originY / scale
      const translate = getTranslate({ scale, minScale, maxScale })
      const translateX = translate({ pos: originX, prevPos: transformation.originX, translate: transformation.translateX })
      const translateY = translate({ pos: originY, prevPos: transformation.originY, translate: transformation.translateY })

      state.element.style.transformOrigin = `${newOriginX}px ${newOriginY}px`
      state.element.style.transform = getMatrix({ scale: newScale, translateX, translateY })
      state.transformation = { originX: newOriginX, originY: newOriginY, translateX, translateY, scale: newScale }
    },
  }
}

const getScale = ({ scale, minScale, maxScale, scaleSensitivity, deltaScale }) => {
  let newScale = scale + (deltaScale / (scaleSensitivity / scale))
  newScale = Math.max(minScale, Math.min(newScale, maxScale))
  return [scale, newScale]
}

const hasPositionChanged = ({ pos, prevPos }) => pos !== prevPos

const valueInRange = ({ minScale, maxScale, scale }) => scale <= maxScale && scale >= minScale

const getTranslate = ({ minScale, maxScale, scale }) => ({ pos, prevPos, translate }) => {
  return valueInRange({ minScale, maxScale, scale }) && hasPositionChanged({ pos, prevPos })
    ? translate + (pos - prevPos * scale) * (1 - 1 / scale)
    : translate
}
