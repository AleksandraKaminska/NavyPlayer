import React from 'react'
import Login from 'components/Login'
import Nav from 'components/Nav'
import Player from 'components/Player'
import Footer from 'components/Footer'
import Playlists from 'components/Playlists'
import './top.scss'

const TopRoutes = () => {
  return (
    <div className="top background">
      <header>
        <Nav />
        <Login />
      </header>
      <Playlists />
      <Player />
      <Footer />
    </div>
  )
}

export default TopRoutes
