import React, { useState, useReducer, createContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { mainReducer } from './reducers'
import { ContactsStateType, initialContactsState } from './reducers/contactsReducer'
import Search from './components/Search'
import Top from './components/Top'
import ArtistPage from './components/ArtistPage'
import './App.scss'

declare global {
  interface Window {
    DZ: any
  }
}

const { DZ } = window

const Loader = () => (
  <div className="wrapper">
    <div className="loader">
      <div className="loader__part loader__part--1" />
      <div className="loader__part loader__part--2" />
      <div className="loader__part loader__part--3" />
    </div>
  </div>
)

export const Context = createContext<{
  state: ContactsStateType
  dispatch: React.Dispatch<any>
}>({
  state: initialContactsState,
  dispatch: () => null
})

type ContextProviderProps = {
  reducer: React.Reducer<ContactsStateType, any>
  initState: ContactsStateType
  children: any
}

const App = () => {
  const [state, dispatch] = useReducer(mainReducer, initialContactsState)
  const [repeat, setRepeat] = useState(false)

  const delContact = (id) => {
    dispatch({
      type: 'DEL_CONTACT',
      payload: id
    })
  }

  return (
    <div className="App">
      <Context.Provider value={{ state, dispatch }}>
        <Router>
          <Switch>
            <Route exact path="/artist">
              <ArtistPage />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route>
              <Top />
            </Route>
          </Switch>
        </Router>
      </Context.Provider>
    </div>
  )
}

export default App
