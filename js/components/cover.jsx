import React from 'react';

// Redux
import store from './../store';
import { connect } from 'react-redux';

class Cover extends React.Component {
  render(){
    const CoverStyle = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url(${this.props.cover})`
    }
    return <div className="cover" style={CoverStyle}></div>
  }
}

const mapStateToProps = function(store) {
  return {
		cover: store.track.album.cover_big
  };
};

export default connect(mapStateToProps)(Cover);
