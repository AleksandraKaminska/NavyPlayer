import React from 'react';
import Player from 'components/Player';
import Search from 'components/Search';
import Choose from 'components/Choose';
import Footer from 'components/Footer';
import './search.css'

const SearchRoute = () => {
    return (
        <div className="searchRoute">
            <Search />
            <Player />
            <Choose />
            <Footer />
        </div>
    );
}

export default SearchRoute