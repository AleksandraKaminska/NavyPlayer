import React from 'react';
import Playlist from './playlist.jsx';

class ChoosePlaylists extends React.Component {
  render() {
    return <div className="playlists">
        {this.props.playlists.map((elem, i) =>
          <Playlist
          playlists={this.props.playlists}
          chosenPlaylist={this.props.chosenPlaylist}
          randomTrack={this.props.randomTrack}
          searchArtist={this.props.searchArtist}
          searchConcerts={this.props.searchConcerts}
          number={i} key={i} />
      )}
      </div>
  }
}

export default ChoosePlaylists
