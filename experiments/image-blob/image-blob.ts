import { saveFileToDB } from "./indexeddb"

window.addEventListener('paste', (e: ClipboardEvent) => {
  e.preventDefault()

  if (!e.clipboardData) {
    return
  }

  for (const file of e.clipboardData.files) {
    console.log('found file:')
    console.log(file)
    saveFileToDB(file)
  }
})

// window.onload = () => {
//   getFileAndCreateObjectURL()
// }
