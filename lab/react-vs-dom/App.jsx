
export default function App(props) {
  return (
    <>
      {props.list.map((node) => {
        return (
          <div
            key={node.id}
            id={node.id}
            style={{
              width: node.width,
              height: node.height,
              backgroundColor: node.backgroundColor,
            }}
          />
        )
      })}
    </>
  )
}
