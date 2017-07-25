import React from 'react';
import Playlist from './playlist.jsx';

class ChoosePlaylists extends React.Component {
  constructor(props) {
     super(props);
     this.playlists = [950408095, 1282483245, 2734448044, 1242572531, 1306931615, 2178064502, 1927928822, 975986691, 1266972311, 65490032, 1677006641, 1182263621];
  }

  render() {
    return <section id="playlists">
        <div>
          {this.playlists.map((elem, i) => <Playlist elem={elem} key={i} />)}
        </div>
      </section>
  }
}

export default ChoosePlaylists
