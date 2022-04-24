export function App (props) {
  const handleIncrementCount = props.incrementCount

  return <h1 onClick={handleIncrementCount}>Hello: {props.state}</h1>
}
