
let db: IDBDatabase

const request = indexedDB.open('pasteImagesDB', 1)

request.onerror = function() {
  // console.error(`Error storing image: ${e.target.errorCode}`)
}

request.onsuccess = function(e) {
  if (!e.target) {
    return
  }

  db = (e.target as IDBOpenDBRequest).result

  console.log('db opened successfully')

  const customEvent = new CustomEvent('db_open')
  window.dispatchEvent(customEvent)
}

request.onupgradeneeded = function(e) {
  db = (e.target as IDBOpenDBRequest).result

  if (!db.objectStoreNames.contains('images')) {
    db.createObjectStore('images', { keyPath: 'id', autoIncrement: true })
  }
  console.log('Object store created')
}

export function saveFileToDB(file) {
  const transaction = db.transaction(['images'], 'readwrite')
  const store = transaction.objectStore('images')
  const request = store.add({ file })

  request.onsuccess = function() {
    console.log('Image saved')
    getFileAndCreateObjectURL()
  }

  // request.onerror = function(e) {
  //   console.error(`Error saving image to the database: ${(e as IDBOpenDBRequest).target.error}`)
  // }
}

export function getFileAndCreateObjectURL() {
  const transaction = db.transaction(['images'], 'readonly')
  const store = transaction.objectStore('images')
  const request = store.getAll()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request.onsuccess = function(e: any) {
    const files = e.target.result

    if (files.length > 0) {
      const objectURL = URL.createObjectURL(files[0].file)
      displayImage(objectURL)
    } else {
      console.log('No images found in the database')
    }
  }
}

export function getAllImages(): Promise<string[]> {
  return new Promise(function(resolve, reject) {
    const transaction = db.transaction(['images'], 'readonly')
    const store = transaction.objectStore('images')
    const request = store.getAll()
  
    request.onsuccess = function(e) {
      const files = (e.target as IDBRequest).result
  
      const urls: string[] = []

      for (const file of files) {
        console.log('got file from db:')
        console.log(file)

        urls.push(URL.createObjectURL(file.file))
      }
      resolve(urls)
    }

    request.onerror = function() {
      reject()
    }
  })
}

export function displayImage(src: string) {
  const targetImage = document.getElementById('target') as HTMLImageElement
  targetImage.src = src
}

window.addEventListener('db_open', async () => {
  const images = await getAllImages()

  renderToListItem(images)
})

function renderToListItem(items: string[]) {
  const ul = document.querySelector('main > ul')

  if (!ul) {
    return
  }

  for (const item of items) {
    const li = document.createElement('li')
    const button = document.createElement('button')

    button.setAttribute('type', 'button')
    button.innerHTML = item

    button.addEventListener('click', () => {
      const imageTarget = document.getElementById('target') as HTMLImageElement
      imageTarget.src = item
    })

    li.appendChild(button)
    ul.appendChild(li)
  }
}
