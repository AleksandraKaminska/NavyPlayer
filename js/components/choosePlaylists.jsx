import React from 'react';
import Playlist from './playlist.jsx';

class ChoosePlaylists extends React.Component {
  render() {
    return <div className="playlists">
        {this.props.playlists.map((elem, i) =>
          <Playlist
          playlists={this.props.playlists}
          findPlaylist={this.props.findPlaylist}
          randomTrack={this.props.randomTrack}
          number={i} key={i} />
      )}
      </div>
  }
}

export default ChoosePlaylists
