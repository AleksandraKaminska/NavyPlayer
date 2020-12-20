import React, { useReducer } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout, Space, Button } from 'antd'
import { login } from './helpers/login'
import DeezerLogo from './deezerLogo.svg'
import { StateContext, DispatchContext } from './context/Context'
import { reducer, initialState } from './reducers'
import Search from './components/Search/Search'
import Homepage from './components/Homepage/Homepage'
import ArtistPage from './components/ArtistPage/ArtistPage'
import AlbumPage from './components/AlbumPage/AlbumPage'
import PlaylistPage from './components/PlaylistPage/PlaylistPage'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.less'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { Content } = Layout

  return (
    <div className="App">
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <Router>
            <Layout>
              <Header />
              <Content className="site-layout">
                <div className="site-layout-background">
                  <Switch>
                    <Route exact path="/artists/:id">
                      <ArtistPage />
                    </Route>
                    <Route exact path="/albums/:id">
                      <AlbumPage />
                    </Route>
                    <Route exact path="/playlists/:id">
                      <PlaylistPage />
                    </Route>
                    <Route exact path="/search">
                      <Search />
                    </Route>
                    <Route>
                      <Homepage />
                    </Route>
                  </Switch>
                </div>
                <div onClick={login} className="deezer">
                  <Space align="baseline">
                    <p>Powered by Deezer</p>
                    <Button type="link" href="https://deezer.com" target="_blank" name="deezer logo">
                      <img src={DeezerLogo} alt="Deezer Logo" className="deezerLogo" />
                    </Button>
                  </Space>
                </div>
              </Content>
              <Footer />
            </Layout>
          </Router>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </div>
  )
}

export default App
