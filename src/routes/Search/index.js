import React from 'react'
import Login from 'components/Login'
import Nav from 'components/Nav'
import Player from 'components/Player'
import Search from 'components/Search'
import Choose from 'components/Choose'
import Footer from 'components/Footer'
import './search.css'

const SearchRoute = () => {
  return (
    <div className='searchRoute'>
      {
        window.innerWidth >= 870 && (
          <header>
            <Nav />
            <Login />
          </header>
        )
      }
      <Search />
      <Player />
      <Choose />
      <Footer />
    </div>
  )
}

export default SearchRoute
