import React from 'react';

class Nav extends React.Component {
  render() {
    return <nav className='nav'>
      <a href='#playlists'>main</a>
      <a href='#similar'>similar artists</a>
      <a href='#albums'>albums</a>
    </nav>
  }
}

export default Nav;
