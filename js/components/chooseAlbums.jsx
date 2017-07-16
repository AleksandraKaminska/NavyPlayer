import React from 'react';

import Playlist from './playlist.jsx';

class ChoosePlaylists extends React.Component {
  render() {
    return <div className="playlists">
      <div>
        {this.props.albums.map((elem, i) =>
          <Album
          albums={this.props.albums}
          findPlaylist={this.props.findPlaylist}
          randomTrack={this.props.randomTrack}
          number={i} key={i} />
        )}
      </div>
    </div>
  }
}

export default ChoosePlaylists
