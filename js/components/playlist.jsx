import React from 'react';

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
