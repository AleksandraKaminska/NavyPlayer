import React from 'react';

import ChoosePlaylists from './choosePlaylists.jsx';
import Cover from './cover.jsx';
import ArtistInfo from './artistInfo.jsx';

class MainMiddle extends React.Component {
  render() {
    return <div className='mainMiddle'>
      <ChoosePlaylists randomTrack={this.props.randomTrack} />
      <Cover />
      <ArtistInfo />
    </div>
  }
}

export default MainMiddle
