import { createRoot } from 'react-dom/client'
import { App } from './components/App'
import { createStore } from 'redux'

// Get the element in the dom with id 'app'
const app = document.getElementById('app')
// Create the react root which has the `render` function on it.
const reactRoot = createRoot(app)

// Our store initial state
const initialState = 0

// Our reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENTED_COUNT': return state + 1
  }
  return state
}

// Create the redux store
const store = createStore(reducer)

// Define our redux actions.
// I think I read that it's good practice to name your action types in the past tense.
const actions = {
  incrementCount: () => ({ type: 'INCREMENTED_COUNT' })
}

// Define a function that knows how to dispatch the `incrementCount` action to the store
const dispatchIncrementCount = () => {
  const action = actions.incrementCount()
  store.dispatch(action)
}

// Define a function that knows how to get the state and `render` it using react
const renderState = () => {
  const state = store.getState()
  // Now the App component is a "purely functional" component with no internal state that just renders whatever is passed as props.
  reactRoot.render(<App state={state} incrementCount={dispatchIncrementCount} />)
}

// Do the initial render
// We need to do this because redux won't notify its subscribers until the state changes.
// So we need to get something in the browser so the user can dispatch an action to create new state
renderState()

// If this is confusing, it could be written with a fat arrow (see below)
// Either way, whenever the state changes we want to re-render the react.
store.subscribe(renderState)
// store.subscribe(() => renderState())
