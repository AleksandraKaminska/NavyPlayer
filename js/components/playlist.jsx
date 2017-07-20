import React from 'react';

import store from './../store';
import {changePlaylistAction} from './../actions/index.js';

class Playlist extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       picture: '',
       playlistId: '',
			 playlistTitle: ''
     };
  }

  findPlaylist = (event) => {
    store.dispatch(changePlaylistAction(event.target.id));
    this.props.randomTrack();
  }

  thisplaylist = () => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/playlist/${this.props.elem}?output=jsonp`,
        success : data => {
          this.setState({
            picture: data.picture_small.replace(/56x56/, '95x95'),
            playlistId: data.id,
						playlistTitle: data.title
          })
        }
    });
  }

  componentDidMount() {
    this.thisplaylist();
  }

  render() {
    return <div onClick={this.findPlaylist} >
        <img src={this.state.picture} id={this.state.playlistId} />
				<p id={this.state.playlistId}>{this.state.playlistTitle}</p>
      </div>
  }
}

export default Playlist
