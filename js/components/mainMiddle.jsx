import React from 'react';

import ChoosePlaylists from './choosePlaylists.jsx';
import Cover from './cover.jsx';
import ArtistInfo from './artistInfo.jsx';

class MainMiddle extends React.Component {
  render() {
    return <div className='mainMiddle'>
      <ChoosePlaylists
        playlists={this.props.playlists}
        findPlaylist={this.props.findPlaylist}
        randomTrack={this.props.randomTrack} />
      <Cover track={this.props.track} />
      <ArtistInfo
				artistInfo={this.props.artistInfo}
				albums={this.props.albums}
				concerts={this.props.concerts} />
    </div>
  }
}

export default MainMiddle
