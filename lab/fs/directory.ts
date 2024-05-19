
async function readFiles(handle: FileSystemDirectoryHandle) {
  const writeHandle = await handle.getFileHandle('test-file', { create: true })
  const writeable = await writeHandle.createWritable()

  await writeable.write('test content')
  await writeable.close()

  // for await (const entry of handle.values()) {

  // }
}

async function openDirectory() {
  if (window.self !== window.top) {
    return
  }

  if (!('showDirectoryPicker' in window)) {
    return
  }

  try {
    // @ts-expect-error typescript sucks
    const handle = await showDirectoryPicker({ mode: 'readwrite' })
    await readFiles(handle)
  } catch (error) {
    console.error(error)
  }
}

window.onload = () => {

  const btn = document.createElement('button')
  btn.innerHTML = 'choose a directory'
  btn.addEventListener('click', openDirectory)
  document.body.appendChild(btn)

  // openDirectory()
}
