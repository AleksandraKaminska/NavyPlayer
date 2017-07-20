import React from 'react';
import store from './../store';
import { connect } from 'react-redux';

class Title extends React.Component {
  render() {
    return <div className="title">
      <div>
        <h3>{this.props.title} - {this.props.artist}</h3>
      </div>
    </div>
  }
}

const mapStateToProps = function(store) {
  return {
    title: store.track.title_short,
    artist: store.track.artist.name
  };
};

export default connect(mapStateToProps)(Title);
