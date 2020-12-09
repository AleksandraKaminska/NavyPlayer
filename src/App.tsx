import React, { useState, useReducer, createContext, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { contactsReducer, StateType, mainReducer } from './reducers'
import './App.scss'

declare global {
  interface Window {
    DZ: any
  }
}

const { DZ } = window

function Top() {
  return <h2>TOP</h2>
}

function Artist() {
  return <h2>Artist</h2>
}

function Search() {
  return <h2>Search</h2>
}

const initialState: StateType = {
  contacts: [
    {
      id: '098',
      name: 'Diana Prince',
      email: 'diana@us.army.mil'
    },
    {
      id: '099',
      name: 'Bruce Wayne',
      email: 'bruce@batmail.com'
    },
    {
      id: '100',
      name: 'Clark Kent',
      email: 'clark@metropolitan.com'
    }
  ],
  loading: false,
  error: null
}

export const Context = createContext<{
  state: StateType
  dispatch: React.Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null
})

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>
}

const App = () => {
  const [state, dispatch] = useContext(Context)
  const [repeat, setRepeat] = useState(false)

  const delContact = (id) => {
    dispatch({
      type: 'DEL_CONTACT',
      payload: id
    })
  }

  return (
    <div className="App">
      <ContextProvider>
        <Router>
          <Switch>
            <Route exact path="/artist">
              <Artist />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route>
              <Top />
            </Route>
          </Switch>
        </Router>
      </ContextProvider>
    </div>
  )
}

export default App
