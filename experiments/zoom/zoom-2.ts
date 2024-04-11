
// Assuming an iframe with the id 'your-iframe-id'
const iframeContainer = document.getElementById('zoom-container')!;

// Initial scale level
let scale = 1;

// Control the zoom intensity
const zoomIntensity = 0.02;

const iframe = iframeContainer.firstElementChild as HTMLElement

iframeContainer.addEventListener('wheel', function(event) {
  console.log('wheeeel')

  event.preventDefault(); // Prevent default scrolling

  // Calculate cursor's position relative to the iframe
  const rect = iframe.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  // Determine the direction of the scroll (up or down)
  const delta = event.deltaY < 0 ? zoomIntensity : -zoomIntensity;

  // Calculate new scale
  const newScale = scale + delta;

  // Adjust scale and transform origin for zooming into the cursor position
  iframe.style.transformOrigin = `${offsetX}px ${offsetY}px`;
  iframe.style.transform = `scale(${newScale})`;

  // Update scale
  scale = newScale;
}, {passive: false});

