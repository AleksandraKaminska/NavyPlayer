import React from 'react';
import Playlist from './playlist.jsx';

class ChoosePlaylists extends React.Component {
  render() {
    return <div className="playlists">
        <Playlist
          playlists={this.props.playlists}
          chosenPlaylist={this.props.chosenPlaylist}
          randomTrack={this.props.randomTrack}
          searchArtist={this.props.searchArtist}
          searchConcerts={this.props.searchConcerts}
          track={this.props.track}
          key={1}/>
        <Playlist
          playlists={this.props.playlists}
          chosenPlaylist={this.props.chosenPlaylist}
          randomTrack={this.props.randomTrack}
          searchArtist={this.props.searchArtist}
          searchConcerts={this.props.searchConcerts}
          track={this.props.track}
          key={2}/>
        <Playlist
          playlists={this.props.playlists}
          chosenPlaylist={this.props.chosenPlaylist}
          randomTrack={this.props.randomTrack}
          searchArtist={this.props.searchArtist}
          searchConcerts={this.props.searchConcerts}
          track={this.props.track}
          key={3}/>
      </div>
  }
}

export default ChoosePlaylists
