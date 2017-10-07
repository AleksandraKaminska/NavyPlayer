import React from 'react';

import ChoosePlaylists from './choosePlaylists.jsx';
import Cover from './cover.jsx';
import Artist from './artist.jsx';
import ChooseAlbums from './chooseAlbums.jsx';
import SimilarArtists from './similarArtists.jsx';

class MainMiddle extends React.Component {
    render() {
        return (
            <main className='mainMiddle'>
                <ChoosePlaylists />
                <Cover />
                <Artist />
                <SimilarArtists />
                <ChooseAlbums />
            </main>
        );
    }
}

export default MainMiddle;
