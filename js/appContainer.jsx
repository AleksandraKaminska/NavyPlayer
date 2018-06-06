import React from 'react';

// Router
import {Router, Route, hashHistory, IndexRoute} from	'react-router';

// Redux
import store from './store';
import {connect} from 'react-redux';
import {changeTrackAction, prevTrackAction} from './actions/index.js';

//Routes
import Template from './components/template.jsx';
import Main from './components/main.jsx';
import Search from './components/search.jsx';

import {
  searchArtist,
  searchAlbums,
  searchTopTracks,
  searchSimilarArtists
} from './components/functions.js';

class AppContainer extends React.Component {
  randomTrack = () => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/playlist/${this.props.chosenPlaylist}?output=jsonp`,
        success : response => {
          const playlistTracks = response.tracks.data;
          const randomNumber = Math.floor(Math.random() * playlistTracks.length);
          store.dispatch(prevTrackAction(this.props.track));
          store.dispatch(changeTrackAction(playlistTracks[randomNumber]));
          searchArtist(this.props.track.artist.id);
          searchAlbums(this.props.track.artist.id);
          searchTopTracks(this.props.track.artist.id);
          searchSimilarArtists(this.props.track.artist.id);
          DZ.player.playTracks([this.props.track.id]);
        }
    });
  }

  randomAlbumTrack = () => {
      $.ajax({
          dataType: "jsonp",
          url: `https://api.deezer.com/album/${this.props.album.id}?output=jsonp`,
          success: response => {
              const albumTracks = response.tracks.data;
              const randomNumber = Math.floor(Math.random() * albumTracks.length);
              store.dispatch(prevTrackAction(this.props.track));
              store.dispatch(changeTrackAction(albumTracks[randomNumber], this.props.album.cover_big));
              DZ.player.playTracks([this.props.track.id]);
          }
      });
  }

  componentDidMount() {
    this.randomTrack();

    // load next track
    let finished = false;
    let counter = 0;
    DZ.Event.subscribe('player_position', function(e){
      if(Math.floor(e[0]) === Math.floor(e[1]) && counter % 2) {
        finished = true;
        counter = 0;
      }
      counter++;
    });
    this.intervalId	=	setInterval(() =>	{
      if(finished) {
        this.props.chosenPlaylist ? this.randomTrack() : this.randomAlbumTrack();
        finished = false;
      }
    }, 1000);
  }

	componentWillUnmount(){
	  clearInterval(this.intervalId);
	}

  render() {
    return (
        <Router history={hashHistory}>
            <Route path='/' component={Template}>
                <IndexRoute component={Main} />
                <Route path="*" component={Main} />
            </Route>
        </Router>
    );
  }
}

const mapStateToProps = store => {
  return {
      chosenPlaylist: store.chosenPlaylist,
      track: store.track,
      prev: store.prev,
      album: store.album
  };
};

export default connect(mapStateToProps)(AppContainer);
