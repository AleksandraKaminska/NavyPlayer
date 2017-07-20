import React from 'react';

import store from './store';
import { connect } from 'react-redux';

import {
  changePlaylistAction,
  searchTracksAction,
  autocompleteAction,
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
  constructor(props) {
     super(props);
     this.playlists = [950408095, 2734448044, 1242572531, 2178064502, 1927928822, 975986691, 1266972311, 65490032, 1677006641];
     this.pom = [];
  }

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

  findPlaylist = (event) => {
    store.dispatch(changePlaylistAction(event.target.id));
    this.randomTrack();
  }

  handleSelect = (value, item) => {
    store.dispatch(changeTrackAction(item));
    store.dispatch(autocompleteAction(value));
    this.searchArtist();
    this.searchConcerts();
    DZ.player.pause();
    DZ.player.playTracks([this.props.track.id]);
    store.dispatch(autocompleteAction(""));
  }

  handleChange = (event) => {
    store.dispatch(autocompleteAction(event.target.value));
      if(this.props.autocompleteValue !== '') {
        DZ.api(`/search?q=${this.props.autocompleteValue}`, response => {
            this.pom = response.data;
        });
        store.dispatch(searchTracksAction(this.pom));
      }
  }

  render () {
    return <div className="NavyPlayer">
        <Search
          autocompleteValue={this.props.autocompleteValue}
          handleSelect={this.handleSelect}
          handleChange={this.handleChange} />
        <Title />
        <MainMiddle
          playlists={this.playlists}
          findPlaylist={this.findPlaylist}
          randomTrack={this.randomTrack} />
        <PlayerAndProgress
          randomTrack={this.randomTrack} />
        <Choose />
        <Footer />
      </div>
  }
}

const mapStateToProps = function(store) {
  return {
    chosenPlaylist: store.chosenPlaylist,
    autocompleteValue: store.autocompleteValue,
    track: store.track
  };
};

export default connect(mapStateToProps)(AppContainer);
