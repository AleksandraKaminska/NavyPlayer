import React from 'react';

// Redux
import store from './../store';
import { connect } from 'react-redux';
import {changeTrackAction} from './../actions/index.js';

import Search from './search.jsx';
import Title from './title.jsx';
import MainMiddle from './mainMiddle.jsx';
import PlayerAndProgress from './playerAndProgress.jsx';
import Choose from './choose.jsx';
import Footer from './footer.jsx';

class MobileMain extends React.Component {
	randomTrack = () => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/playlist/${this.props.chosenPlaylist}?output=jsonp`,
        data : {},
        success : response => {
          const playlistTracks = response.tracks.data;
          const randomNumber = Math.floor(Math.random() * playlistTracks.length);
          store.dispatch(changeTrackAction(playlistTracks[randomNumber]));
          this.searchArtist();
          this.searchConcerts();
          DZ.player.playTracks([this.props.track.id]);
        }
    });
  }

  searchArtist = () => {
    $.ajax({
      dataType: "json",
      url :`https://rest.bandsintown.com/artists/${this.props.track.artist.name}?app_id=NavyPlayer`,
      success : response => {
        store.dispatch({
          type: 'FIND_ARTIST',
          artistInfo: response
        });
      }
    });
  }

  searchConcerts = () => {
    $.ajax({
      dataType: "json",
      url : `https://rest.bandsintown.com/artists/${this.props.track.artist.name}/events?app_id=NavyPlayer`,
      success : response => {
        store.dispatch({
          type: 'FIND_CONCERTS',
          concerts: response
        });
      }
    });
  }

  render() {
    return <div className="mobileMain">
				<Search />
				<Title />
				<MainMiddle randomTrack={this.randomTrack} />
				<PlayerAndProgress randomTrack={this.randomTrack} />
				<Choose />
				<Footer />
      </div>
  }
}

const mapStateToProps = function(store) {
  return {
    chosenPlaylist: store.chosenPlaylist,
    track: store.track
  };
};

export default connect(mapStateToProps)(MobileMain);
