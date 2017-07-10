import React from 'react';

let obj = {
  mode: 'cors',
  redirect:	'follow',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
    'Access-Control-Allow-Credentials': 'true'
  }
};

class Playlist extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       picture: '',
       playlistId: ''
     };
  }

  thisplaylist = () => {
    fetch(`https://api.deezer.com/playlist/${this.props.playlists[this.props.number]}`, obj)
      .then(response => response.json())
      .then(response => {
        this.setState({
          picture: response.picture_small.replace(/56x56/, '95x95'),
          playlistId: response.id
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.thisplaylist();
  }

  render() {
    return <div onClick={this.props.findPlaylist} >
        <img src={this.state.picture} id={this.state.playlistId} />
      </div>
  }
}

export default Playlist
