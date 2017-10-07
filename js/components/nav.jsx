import React from 'react';

class Nav extends React.Component {
    render() {
        return (
            <nav className='nav'>
                <a id='main_nav' href='#playlists' aria-expanded="false">main</a>
                <a id='similar_nav' href='#similar' aria-expanded="false">similar artists</a>
                <a id='albums_nav' href='#albums' aria-expanded="false">albums</a>
            </nav>
        );
    }
}

export default Nav;
