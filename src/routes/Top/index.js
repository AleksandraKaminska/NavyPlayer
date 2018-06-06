import React from 'react'
import Login from 'components/Login'
import Nav from 'components/Nav'
import Player from 'components/Player'
import Choose from 'components/Choose'
import Footer from 'components/Footer'
import Playlists from 'components/Playlists'
import './top.css'

const TopRoutes = () => {
  return (
    <div className='top'>
      {
        window.innerWidth >= 870 && (
          <header>
            <Nav />
            <Login />
          </header>
        )
      }
      <main>
        <Playlists />
      </main>
      <Player />
      <Choose />
      <Footer />
    </div>
  )
}

export default TopRoutes
