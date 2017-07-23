import React from 'react';

// Redux
import { connect } from 'react-redux';
import { changeTrackAction } from './../actions/index.js';
import store from './../store';

import Album from './album.jsx';

class Albums extends React.Component {
  handleClick = (event) => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/album/${event.target.id}?output=jsonp`,
        success : response => {
          console.log('klik',response);
          store.dispatch(changeTrackAction(response))
          DZ.player.pause();
          DZ.player.playTracks([this.props.track.id]);
        }
    });
  }

  render(){
      let li = this.props.albums.map((elem, i) => <Album key={i} elem={elem} />);
      return <section id='albums'>
        <div className='albums'>
          <h4>Albums</h4>
          <ul>{li}</ul>
        </div>
      </section>
  }
}

const mapStateToProps = store => {
  return {
    albums: store.albums
  };
};

export default connect(mapStateToProps)(Albums);
