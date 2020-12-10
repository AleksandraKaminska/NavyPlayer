import React, { useState, useReducer, createContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout, Menu, Image } from 'antd'
import { mainReducer } from './reducers'
import { ContactsStateType, initialContactsState } from './reducers/contactsReducer'
import Search from './components/Search'
import Top from './components/Homepage/Homepage'
import ArtistPage from './components/ArtistPage'
import Footer from './components/Footer/Footer'
import './App.scss'
import 'antd/dist/antd.css'

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
  const { Header, Content } = Layout

  const delContact = (id) => {
    dispatch({
      type: 'DEL_CONTACT',
      payload: id
    })
  }

  return (
    <div className="App">
      <Context.Provider value={{ state, dispatch }}>
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="1">
                <Image src="/assets/images/logo.png" alt="navy player logo" />
              </Menu.Item>
              <Menu.Item key="2">Artist</Menu.Item>
              <Menu.Item key="3">Login</Menu.Item>
            </Menu>
          </Header>
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
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
            </div>
          </Content>
          <Footer />
        </Layout>
      </Context.Provider>
    </div>
  )
}

export default App
