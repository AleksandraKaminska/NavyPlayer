import React from 'react';

import store from './../store';
import {changePlaylistAction} from './../actions/index.js';

class Playlist extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       data: {},
       picture: ''
     };
  }

  findPlaylist = () => {
    store.dispatch(changePlaylistAction(this.props.elem));
    this.props.randomTrack();
  }

  thisplaylist = () => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/playlist/${this.props.elem}?output=jsonp`,
        success : data => {
          this.setState({
            data: data,
            picture: data.picture_small
          })
        }
    });
  }

  componentDidMount() {
    this.thisplaylist();
  }

  render() {
    return <div onClick={this.findPlaylist} id={this.state.data.id}>
        <img src={this.state.picture} alt={this.state.data.title}/>
				<p>{this.state.data.title}</p>
      </div>
  }
}

export default Playlist
