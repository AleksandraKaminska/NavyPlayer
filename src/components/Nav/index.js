import React from 'react'
import PropTypes from 'prop-types'
import SearchInput from 'components/SearchInput'
import { NavLink } from 'react-router-dom'
import './style.scss'

function checkActive(_, location) {
  if (!location) return false
  const { pathname } = location
  return pathname === '/'
}

const Nav = ({ onChange, setRef }) => (
  <nav className="nav">
    <img src="/assets/logo/Logomark_white-resized.png" alt="" />
    <NavLink to="/" activeClassName="active" isActive={checkActive}>
      Explore
    </NavLink>
    <NavLink to="/artist" activeClassName="active">
      Artist
    </NavLink>
    <NavLink to="/search">
      <SearchInput placeholder="Search" onChange={onChange} setRef={setRef} />
    </NavLink>
  </nav>
)

export default Nav

Nav.propTypes = {
  onChange: PropTypes.func,
  setRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
}
