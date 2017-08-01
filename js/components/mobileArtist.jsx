import React from 'react';
import Artist from './artist.jsx';
import ChooseAlbums from './chooseAlbums.jsx';
import SimilarArtists from './similarArtists.jsx';

class MobileArtist extends React.Component {
  render() {
    return <div className='mainMiddle'>
					<Artist />
          <SimilarArtists />
          <ChooseAlbums />
				</div>
  }
}

export default MobileArtist;
