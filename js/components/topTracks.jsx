import React from 'react';

// Redux
import { connect } from 'react-redux';
import { changeTrackAction } from './../actions/index.js';
import store from './../store';

class TopTracks extends React.Component {
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
      let li = this.props.topTracks.map((elem, i) => {
        return <li
          id={elem.id}
          onClick={this.handleClick}
          key={i}>
          {elem.title_short}
        </li>
      });
      return <div className='topTracks'>
        <ul>{li}</ul>
      </div>
  }
}

const mapStateToProps = store => {
  return {
    topTracks: store.topTracks,
    track: store.track,
  };
};

export default connect(mapStateToProps)(TopTracks);
