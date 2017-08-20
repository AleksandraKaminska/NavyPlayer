import React from 'react';
import Playlist from './playlist.jsx';

class ChoosePlaylists extends React.Component {
  constructor(props) {
     super(props);
     this.playlists = [
	1266972311, 1362270355, 1282483245, 2734448044, 1282495565, 		1306931615, 2178064502, 1927928822, 1977689462, 1964028802, 		1677006641, 1182263621, 2265794682, 1661692771, 2558770224, 		975986691
     ];
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
