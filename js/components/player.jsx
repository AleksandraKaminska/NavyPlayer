import React from 'react';

// Redux
import { connect } from 'react-redux';
import { changeTrackAction, prevTrackAction } from './../actions/index.js';
import store from './../store';

const promise = new Promise((resolve, reject) => {
  true ? resolve("Stuff worked!") : reject(Error("It broke"));
});

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: !DZ.player.isPlaying()
    }
  }

  changeIsPlaying = () => {
    if (this.state.isPlaying) {
      this.setState({
        isPlaying: false
      }, () => DZ.player.pause());
    } else {
      this.setState({
        isPlaying: true
      }, () => DZ.player.play());
    }
  }

  changeTrack = () => {
    this.setState({
      isPlaying: true
    }, () => {
      DZ.player.pause();
      this.randomTrack();
    });
  }

  rewind = () => {
    this.setState({
      isPlaying: true
    }, () => {
      DZ.player.pause();
      if(this.props.prev.title === '') {
        this.randomTrack();
      }
      else {
        store.dispatch(prevTrackAction(this.props.track));
        store.dispatch(changeTrackAction(this.props.prev));
        promise.then(result => {
          DZ.player.playTracks([this.props.track.id]);
          this.searchArtist();
          this.searchTopTracks();
          this.searchAlbums();
          this.searchSimilarArtists();
        }, err => console.log(err));
      }
    });
  }

  randomTrack = () => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/playlist/${this.props.chosenPlaylist}?output=jsonp`,
        success : response => {
          const playlistTracks = response.tracks.data;
          const randomNumber = Math.floor(Math.random() * playlistTracks.length);
          store.dispatch(prevTrackAction(this.props.track));
          store.dispatch(changeTrackAction(playlistTracks[randomNumber]));
          this.searchArtist();
          this.searchTopTracks();
          this.searchAlbums();
          this.searchSimilarArtists();
          DZ.player.playTracks([this.props.track.id]);
        }
    });
  }

  searchArtist = () => {
    $.ajax({
      dataType: "jsonp",
      url: `https://api.deezer.com/artist/${this.props.track.artist.id}?output=jsonp`,
      success: response => store.dispatch({ type: 'FIND_ARTIST', artist: response })
    });
  }

  searchTopTracks = () => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/artist/${this.props.track.artist.id}/top?output=jsonp`,
        success : response => store.dispatch({ type: 'FIND_TOP_TRACKS', topTracks: response.data })
    });
  }

  searchAlbums = () => {
    $.ajax({
      dataType: "jsonp",
      url: `http://api.deezer.com/artist/${this.props.track.artist.id}/albums?output=jsonp`,
      success: response => store.dispatch({ type: 'FIND_ALBUMS', albums: response.data })
    });
  }

  searchSimilarArtists = () => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/artist/${this.props.track.artist.id}/related?limit=10&output=jsonp`,
        success : response => store.dispatch({ type: 'FIND_SIMILAR_ARTISTS', similar: response.data })
    });
  }

  render() {
    return <div className="player">
      <div className="playerMain">
        <button onClick={this.rewind}>
          <img src="./images/rewind.svg" alt='rewind'/>
        </button>
        <button onClick={this.changeIsPlaying} id='playOrPause'>
          <img src={this.state.isPlaying ? './images/pause.png' : './images/play.png'} alt='play or pause'/>
        </button>
        <button onClick={this.changeTrack}>
          <img src="./images/forward.svg" alt='forward'/>
        </button>
      </div>
    </div>
  }
}

const mapStateToProps = store => {
  return {
    track: store.track,
    prev: store.prev,
    chosenPlaylist: store.chosenPlaylist,
  };
};

export default connect(mapStateToProps)(Player);
