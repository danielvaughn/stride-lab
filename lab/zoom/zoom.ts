
window.setTimeout(() => {
  console.log('wat')
  const el = document.querySelector('.zoom-container')

  el?.classList.add('zoomed')

}, 5000)





const prefix = ''
const container = document.querySelector('#container') as HTMLElement
const settings = {
  MAX_SCALE: 5 // X times greater than the available resolution
}

// image must download before its naturalWidth is available
const imageChild = container.children[0] as HTMLImageElement
imageChild.onload = function() {
  const graph = {
    scale: 1,

    speed: 1.02,

    maxScale: 1.5,

    translate: {
      x: 0,
      y: 0,
    },

    elem: container,

    image: imageChild,

    baseSize: {
      w: container.offsetWidth,
      h: container.offsetHeight,
    },

    baseOffset: {
      x: container.offsetLeft,
      y: container.offsetTop,
    }
  }

  const allowedScale = (graph.image.naturalWidth / graph.baseSize.w) * settings.MAX_SCALE

  const scrollEvent = function(e) {
    e.stopPropagation()

    /***
      STEP 1: Determine the scroll direction
    ***/
    let zoomDirection;
    if ('wheelDelta' in e) {
      if (e.wheelDelta < 0) {
        zoomDirection = 'out'
      } else if (e.wheelDelta > 0) {
        zoomDirection = 'in'
      }
    } else if (('detail' in e) && !('wheelDelta' in e)) {
      if (e.detail > 0) {
        zoomDirection = 'out'
      } else if (e.detail < 0) {
        zoomDirection = 'in'
      }
    }

    /***
      STEP 2: Preemptively grab the new scale to measure against
    ***/
    const newScale = (zoomDirection && zoomDirection == 'in') ? (graph.scale * graph.speed) : (graph.scale / graph.speed)

    /***
      STEP 3: Get current image size
    ***/
    const currentGraphSize = {
      w: graph.baseSize.w * graph.scale,
      h: graph.baseSize.h * graph.scale,
    }

    /***
      STEP 4: Get current image coordinates
    ***/
    const currentGraphOffset = {
      x: graph.baseOffset.x + graph.translate.x,
      y: graph.baseOffset.y + graph.translate.y,
    }

    /***
      STEP 5: Get current mouse coordinates on the image
    ***/
    const currentMouseCoords = {
      x: e.pageX - currentGraphOffset.x,
      y: e.pageY - currentGraphOffset.y,
    }

    /***
      STEP 6: Convert mouse coordinates to percentage values
    ***/
    const percent = {
      x: (currentMouseCoords.x / currentGraphSize.w) * 100,
      y: (currentMouseCoords.y / currentGraphSize.h) * 100,
    }

    /***
      STEP 7: Determine the new size of the image after transformation
    ***/
    const newGraphSize = {
      w: graph.baseSize.w * newScale,
      h: graph.baseSize.h * newScale,
    }

    /***
      STEP 8: Get pixel value of transformation change
    ***/
    const diff = {
      x: newGraphSize.w - currentGraphSize.w,
      y: newGraphSize.h - currentGraphSize.h,
    }

    /***
      STEP 9: Determine the level of shift that has occurred
    ***/
    const translate = {
      x: graph.translate.x + -((percent.x / 100) * diff.x),
      y: graph.translate.y + -((percent.y / 100) * diff.y),
    }

    /***
      STEP 10: Determine whether zooming should be dis-allowed at current scale
    ***/
    let allowZoom
    if (zoomDirection == 'in') {
      if (graph.scale > allowedScale) {
        allowZoom = false
      } else {
        allowZoom = true
      }
    }
    if (zoomDirection == 'out') {
      if (graph.scale < 1) {
        allowZoom = false
      } else {
        allowZoom = true
      }
    }

    /***
      STEP 11: Perform transformation
    ***/
    if (allowZoom) {
      graph.elem.style[prefix + 'Transform'] = 'matrix(' + newScale + ', 0, 0,' + newScale + ',' + translate.x + ',' + translate.y + ')'
      graph.elem.style.transform = 'matrix(' + newScale + ', 0, 0,' + newScale + ',' + translate.x + ',' + translate.y + ')'
    } else {
      return false
    }

    /***
      STEP 12: Increment translation values
    ***/
    graph.translate.x = translate.x
    graph.translate.y = translate.y

    /***
      STEP 13: Increment scale values
    ***/
    graph.scale = newScale
  }

  // reset button
  // document.querySelector('#reset')!.addEventListener('click', function() {
  //   graph.elem.style[prefix + 'Transform'] = 'matrix(1, 0, 0, 1, 0, 0)'
  //   graph.elem.style.transform = 'matrix(1, 0, 0, 1, 0, 0)'
  //   graph.scale = 1
  //   graph.translate.x = 0
  //   graph.translate.y = 0
  //   graph.baseSize.w = container.offsetWidth
  //   graph.baseSize.h = container.offsetHeight
  //   graph.baseOffset.x = container.offsetLeft
  //   graph.baseOffset.y = container.offsetTop
  // })

  graph.elem.addEventListener('wheel', scrollEvent, false)
  // graph.elem.addEventListener('DOMMouseScroll', scrollEvent, false)
}
