import { applyMiddleware, createStore } from 'redux'
import reducers from 'reducers'
import thunk from 'redux-thunk'

const store = createStore(reducers, applyMiddleware(thunk))
export default store
