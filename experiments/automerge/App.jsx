import { useDocument } from '@automerge/automerge-repo-react-hooks'

export default function App({ docUrl }) {
  const [doc, setDoc] = useDocument(docUrl)

  return (
    <div>
      hello
      <p>paragraph</p>
      <p>{docUrl}</p>
      <button
        onClick={() => {
          setDoc((d) => {
            return d.counter.increment(1)
          })
        }}
      >
        count is {doc && doc.counter.value}
      </button>
    </div>
  )
}
