import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css'

const Nav = () => (
    <nav className="nav">
        <NavLink to='/' exact activeClassName="active">Main</NavLink>
        <NavLink to='/top' activeClassName="active">What's New</NavLink>
        <NavLink to='/artist' activeClassName="active">Artist</NavLink>
    </nav>
);

export default Nav;
