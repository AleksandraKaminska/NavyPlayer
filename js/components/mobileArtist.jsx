import React from 'react';
import ArtistInfo from './artistInfo.jsx';
import Concerts from './concerts.jsx';

class MobileArtist extends React.Component {
  render() {
    return <div className='mainMiddle'>
					<ArtistInfo />
          <Concerts />
				</div>
  }
}

export default MobileArtist;
