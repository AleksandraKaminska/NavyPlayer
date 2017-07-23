import React from 'react';
import Artist from './artist.jsx';
import Concerts from './concerts.jsx';
import SimilarArtists from './similarArtists.jsx';

class MobileArtist extends React.Component {
  render() {
    return <div className='mainMiddle'>
					<Artist />
          <Concerts />
          <SimilarArtists />
				</div>
  }
}

export default MobileArtist;
