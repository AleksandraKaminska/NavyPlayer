import React from 'react';

import ChoosePlaylists from './choosePlaylists';
import Cover from './cover';
import Artist from './artist';
import ChooseAlbums from './chooseAlbums';
import SimilarArtists from './similarArtists';

const MainMiddle = () => (
    <main className='mainMiddle'>
        <ChoosePlaylists />
        <Cover />
        <Artist />
        <SimilarArtists />
        <ChooseAlbums />
    </main>
);

export default MainMiddle;
