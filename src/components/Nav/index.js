import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'

const Nav = () => (
  <nav className='nav'>
    <NavLink to='/'>
      <img src='/logo/Logomark_white-resized.png' alt='' />
    </NavLink>
    <NavLink to='/top' activeClassName='active'>What's New</NavLink>
    <NavLink to='/artist' activeClassName='active'>Artist</NavLink>
    <NavLink to='/search'>Search</NavLink>
  </nav>
)

export default Nav
