import React from 'react';

class Nav extends React.Component {
  render() {
    return <nav className='nav'>
      <a href='#playlists' aria-expanded="false">main</a>
      <a href='#similar' aria-expanded="false">similar artists</a>
      <a href='#albums' aria-expanded="false">albums</a>
    </nav>
  }
}

export default Nav;
