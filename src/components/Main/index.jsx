import React from 'react';
import ChoosePlaylists from './ChoosePlaylists';
import Cover from './Cover';
import Artist from './Artist';
import Albums from './Albums';
import SimilarArtists from './SimilarArtists';

const Main = () => (
    <main>
        <ChoosePlaylists />
        <Cover />
        <Artist />
        <SimilarArtists />
        <Albums />
    </main>
);

export default Main;
