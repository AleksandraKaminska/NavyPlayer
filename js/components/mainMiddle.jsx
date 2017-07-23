import React from 'react';

import ChoosePlaylists from './choosePlaylists.jsx';
import Cover from './cover.jsx';
import Artist from './artist.jsx';
import Concerts from './concerts.jsx';
import SimilarArtists from './similarArtists.jsx';

class MainMiddle extends React.Component {
  render() {
    return <main>
      <div className='mainMiddle'>
        <ChoosePlaylists randomTrack={this.props.randomTrack} />
        <Cover />
        <Artist />
        <Concerts/>
        <SimilarArtists />
      </div>
    </main>
  }
}

export default MainMiddle
