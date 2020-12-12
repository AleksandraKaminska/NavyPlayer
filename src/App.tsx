import React, { useReducer } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { Context } from './context/Context'
import { mainReducer, initialState } from './reducers'
import Search from './components/Search/Search'
import Homepage from './components/Homepage/Homepage'
import ArtistPage from './components/ArtistPage/ArtistPage'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.less'

const App = () => {
  const [state, dispatch] = useReducer(mainReducer, initialState)
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
            <Footer />
          </Layout>
        </Router>
      </Context.Provider>
    </div>
  )
}

export default App
