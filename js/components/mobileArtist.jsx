import React from 'react';
import Artist from './artist.jsx';
import Concerts from './concerts.jsx';

class MobileArtist extends React.Component {
  render() {
    return <div className='mainMiddle'>
					<Artist />
          <Concerts />
				</div>
  }
}

export default MobileArtist;
