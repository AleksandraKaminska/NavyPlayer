import React from 'react';
import	{	Router,
		Route,
		Link,
		IndexLink,
		IndexRoute,
		hashHistory
}	from	'react-router';

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
      <ArtistInfo artistInfo={this.props.artistInfo} concerts={this.props.concerts} />
    </div>
  }
}

export default MainMiddle
