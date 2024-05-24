
type Directory = {
  [key: string]: string | Directory
}

const directory: Directory = {}

async function createFile(handle: FileSystemDirectoryHandle, initialContent: string = '') {
  const writeHandle = await handle.getFileHandle('test-file', { create: true })
  const writeable = await writeHandle.createWritable()

  await writeable.write(initialContent)
  await writeable.close()
}

async function readFiles(handle: FileSystemDirectoryHandle) {
  console.log(`reading the ${handle.name} directory`)

  for await (const entry of handle.values()) {
    let entryHandle: FileSystemFileHandle | FileSystemDirectoryHandle | null = null

    if (entry.kind === 'file') {
      entryHandle = await handle.getFileHandle(entry.name)
      const file = await entryHandle.getFile()

    } else if (entry.kind === 'directory') {
      entryHandle = await handle.getDirectoryHandle(entry.name)
      await readFiles(entryHandle)
    }
  }
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
  const btn = document.getElementById('open')
  btn?.addEventListener('click', openDirectory)
}
