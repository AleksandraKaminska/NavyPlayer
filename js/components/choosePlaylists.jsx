import React from 'react';

import Playlist from './playlist.jsx';

class ChoosePlaylists extends React.Component {
  constructor(props) {
     super(props);
     this.playlists = [950408095, 2734448044, 1242572531, 2178064502, 1927928822, 975986691, 1266972311, 65490032, 1677006641];
  }

  render() {
    return <div className="playlists">
      <div>
        {this.playlists.map((elem, i) => <Playlist
          elem={elem}
          randomTrack={this.props.randomTrack}
          key={i} />
        )}
      </div>
    </div>
  }
}

export default ChoosePlaylists
