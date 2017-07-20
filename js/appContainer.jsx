import React from 'react';

import store from './store';
import { connect } from 'react-redux';

import {
  changeTrackAction
} from './actions/index.js';

import Title from './components/title.jsx';
import PlayerAndProgress from './components/playerAndProgress.jsx';
import Search from './components/search.jsx';
import Choose from './components/choose.jsx';
import Footer from './components/footer.jsx';
import MainMiddle from './components/mainMiddle.jsx';
import MobileMain from './components/mobileMain.jsx';
import MobileArtist from './components/mobileArtist.jsx';

class AppContainer extends React.Component {
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
      let url = `https://rest.bandsintown.com/artists/${this.props.track.artist.name}/events?app_id=NavyPlayer`;
      $.ajax({
          dataType: "json",
          url : url,
          success : response => {
            store.dispatch({
                type: 'FIND_CONCERTS',
                concerts: response
            });
          }
      });
  }

  componentDidMount() {
    this.randomTrack();
  }

  render () {
    return <div className="NavyPlayer">
        <Search searchArtist={this.searchArtist} searchConcerts={this.searchConcerts} />
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

export default connect(mapStateToProps)(AppContainer);
