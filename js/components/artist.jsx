import React from 'react';
import { connect } from 'react-redux';
import store from './../store';

import TopTracks from './topTracks.jsx';

class Artist extends React.Component {
  render() {
    return <div className="artist">
        <div className='info'>
          <img src={this.props.artist.picture_small} />
          <div>
            <p>{this.props.artist.name}</p>
          </div>
        </div>
        <TopTracks />
      </div>
  }
}

const mapStateToProps = function(store) {
  return {
    artist: store.artist
  };
};

export default connect(mapStateToProps)(Artist);
