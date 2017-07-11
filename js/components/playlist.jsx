import React from 'react';

let obj = {
  mode: 'cors',
  redirect:	'follow',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With'
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
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/playlist/${this.props.playlists[this.props.number]}?output=jsonp`,
        data : {},
        jsonp : 'callback',
        success : data => {
          this.setState({
            picture: data.picture_small.replace(/56x56/, '95x95'),
            playlistId: data.id
          })
        }
    });
  }

  callback = data => {
      console.log(data);
  };

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
