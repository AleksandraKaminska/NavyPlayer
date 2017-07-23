import React from 'react';

import ChoosePlaylists from './choosePlaylists.jsx';
import Cover from './cover.jsx';
import ArtistInfo from './artistInfo.jsx';
import Concerts from './concerts.jsx';

class MainMiddle extends React.Component {
  render() {
    return <main>
      <div className='mainMiddle'>
        <ChoosePlaylists randomTrack={this.props.randomTrack} />
        <Cover />
        <ArtistInfo />
        <Concerts/>
      </div>
    </main>
  }
}

export default MainMiddle
