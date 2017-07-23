import React from 'react';

// Redux
import store from './../store';
import { connect } from 'react-redux';
import {changeTrackAction} from './../actions/index.js';

import ChoosePlaylists from './choosePlaylists.jsx';

class MobilePlaylist extends React.Component {
	randomTrack = () => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/playlist/${this.props.chosenPlaylist}?output=jsonp`,
        success : response => {
          const playlistTracks = response.tracks.data;
          const randomNumber = Math.floor(Math.random() * playlistTracks.length);
          store.dispatch(changeTrackAction(playlistTracks[randomNumber]));
          this.searchArtist();
          this.searchTopTracks();
          this.searchAlbums();
          this.searchConcerts();
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

  searchAlbums = () => {
    $.ajax({
      dataType: "jsonp",
      url: `https://api.deezer.com/artist/${this.props.track.artist.id}/albums?output=jsonp`,
      success: response => {
        store.dispatch({ type: 'FIND_ALBUMS', albums: response.data })
      }
    });
  }

  searchTopTracks = () => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/artist/${this.props.track.artist.id}/top?output=jsonp`,
        success : response => store.dispatch({ type: 'FIND_TOP_TRACKS', topTracks: response.data })
    });
  }

  searchConcerts = () => {
    $.ajax({
      dataType: "json",
      url: `https://rest.bandsintown.com/artists/${this.props.track.artist.name}/events?app_id=NavyPlayer`,
      success: response => store.dispatch({ type: 'FIND_CONCERTS', concerts: response })
    });
  }

  render() {
    return <div className='mainMiddle'>
			<ChoosePlaylists randomTrack={this.randomTrack} />
		</div>
  }
}

const mapStateToProps = function(store) {
  return {
    chosenPlaylist: store.chosenPlaylist,
    track: store.track,
  };
};

export default connect(mapStateToProps)(MobilePlaylist);
