import React from 'react';

// Router
import {	Router, Route, Link, IndexLink, IndexRoute, hashHistory} from	'react-router';

// Redux
import store from './store';
import { connect } from 'react-redux';
import {changeTrackAction} from './actions/index.js';

// Components
import Title from './components/title.jsx';
import PlayerAndProgress from './components/playerAndProgress.jsx';
import Search from './components/search.jsx';
import Choose from './components/choose.jsx';
import Footer from './components/footer.jsx';
import MainMiddle from './components/mainMiddle.jsx';
import MobileMain from './components/mobileMain.jsx';
import MobileArtist from './components/mobileArtist.jsx';
import MobilePlaylist from './components/mobilePlaylist.jsx';
import MobileSearch from './components/mobileSearch.jsx';

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

  componentDidMount() {
    this.randomTrack();
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
        this.randomTrack();
        finished = false;
      }
    }, 1000);
  }

	componentWillUnmount(){
		clearInterval(this.intervalId);
	}

  render () {
    return <div className="NavyPlayer">
        <Router history={hashHistory}>
            <Route path="/" component={MobileMain} />
            <Route path="/artist" component={MobileArtist} />
            <Route path="/playlist" component={MobilePlaylist} />
            <Route path="/search" component={MobileSearch} />
        </Router>
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
