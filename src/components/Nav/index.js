import React from 'react'
import SearchInput from 'components/SearchInput';
import { NavLink } from 'react-router-dom'
import './style.scss'

const Nav = ({ onChange, setRef }) => (
  <nav className='nav'>
    <NavLink to='/'>
      <img src='/logo/Logomark_white-resized.png' alt='' />
    </NavLink>
    <NavLink to='/top' activeClassName='active'>Explore</NavLink>
    <NavLink to='/artist' activeClassName='active'>Artist</NavLink>
    <NavLink to='/search'>
      <SearchInput placeholder="Search" onChange={onChange} setRef={setRef} />
    </NavLink>
  </nav>
)

export default Nav
