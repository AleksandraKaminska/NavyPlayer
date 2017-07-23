import React from 'react';

import ChoosePlaylists from './choosePlaylists.jsx';
import Cover from './cover.jsx';
import Artist from './artist.jsx';
import Concerts from './concerts.jsx';
import Albums from './albums.jsx';

class MainMiddle extends React.Component {
  render() {
    return <main>
      <div className='mainMiddle'>
        <ChoosePlaylists randomTrack={this.props.randomTrack} />
        <Cover />
        <Artist />
        <Concerts/>
      </div>
    </main>
  }
}

export default MainMiddle
