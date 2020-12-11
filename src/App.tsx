import React, { useState, useReducer } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { Context } from './context/Context'
import { mainReducer, initialState } from './reducers'
import Player from './components/Player/Player'
import Search from './components/Search/Search'
import Homepage from './components/Homepage/Homepage'
import ArtistPage from './components/ArtistPage'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.scss'
import 'antd/dist/antd.css'

declare global {
  interface Window {
    DZ: any
  }
}

const App = () => {
  const [state, dispatch] = useReducer(mainReducer, initialState)
  const [repeat, setRepeat] = useState(false)
  const { Content } = Layout

  return (
    <div className="App">
      <Context.Provider value={{ state, dispatch }}>
        <Router>
          <Layout>
            <Header />
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                <Switch>
                  <Route exact path="/artist">
                    <ArtistPage />
                  </Route>
                  <Route exact path="/search">
                    <Search />
                  </Route>
                  <Route>
                    <Homepage />
                  </Route>
                </Switch>
              </div>
            </Content>
            <Player />
            <Footer />
          </Layout>
        </Router>
      </Context.Provider>
    </div>
  )
}

export default App
