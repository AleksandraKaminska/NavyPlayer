import React from 'react';

// Redux
import { connect } from 'react-redux';
import { changeTrackAction } from './../actions/index.js';
import store from './../store';

class TopTrack extends React.Component {
  handleClick = (event) => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/track/${event.target.id}?output=jsonp`,
        success : response => {
          store.dispatch(changeTrackAction(response))
          DZ.player.pause();
          DZ.player.playTracks([this.props.track.id]);
        }
    });
  }

  render(){
      return <li id={this.props.elem.id}
        onClick={this.handleClick}>
        {this.props.elem.title_short}
      </li>
  }
}

const mapStateToProps = store => {
  return {
    track: store.track
  };
};

export default connect(mapStateToProps)(TopTrack);
