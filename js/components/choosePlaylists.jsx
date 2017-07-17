import React from 'react';

import Playlist from './playlist.jsx';

class ChoosePlaylists extends React.Component {
  render() {
    return <div className="playlists">
      <div>
        {this.props.playlists.map((elem, i) =>
          <Playlist
          elem={elem}
          findPlaylist={this.props.findPlaylist}
          key={i} />
        )}
      </div>
    </div>
  }
}

export default ChoosePlaylists
