import React from 'react';

// Router
import {Router, Route, hashHistory, IndexRoute} from	'react-router';

// Redux
import store from './store';
import {connect} from 'react-redux';
import {changeTrackAction} from './actions/index.js';

// Components
import Title from './components/title.jsx';
import PlayerAndProgress from './components/playerAndProgress.jsx';
import Search from './components/search.jsx';
import Choose from './components/choose.jsx';
import Footer from './components/footer.jsx';
import MainMiddle from './components/mainMiddle.jsx';

//Routes
import Template from './components/template.jsx';
import Main from './components/main.jsx';
import MobileArtist from './components/mobileArtist.jsx';
import MobilePlaylist from './components/mobilePlaylist.jsx';
import MobileSearch from './components/mobileSearch.jsx';

class AppContainer extends React.Component {
  randomTrack = () => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/playlist/${this.props.chosenPlaylist}?output=jsonp`,
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
      url: `https://rest.bandsintown.com/artists/${this.props.track.artist.name}?app_id=NavyPlayer`,
      success: response => store.dispatch({ type: 'FIND_ARTIST', artistInfo: response })
    });
  }

  searchConcerts = () => {
    $.ajax({
      dataType: "json",
      url: `https://rest.bandsintown.com/artists/${this.props.track.artist.name}/events?app_id=NavyPlayer`,
      success: response => store.dispatch({ type: 'FIND_CONCERTS', concerts: response })
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
        <div className='desktop'>
          <Search />
          <Title />
          <MainMiddle randomTrack={this.randomTrack} />
          <PlayerAndProgress randomTrack={this.randomTrack} />
          <Choose />
          <Footer />
        </div>
        <div className='mobile'>
          <Router history={hashHistory}>
            <Route	path='/'	component={Template}>
              <IndexRoute component={Main} />
              <Route path="/artist" component={MobileArtist} />
              <Route path="/playlist" component={MobilePlaylist} />
              <Route path="/search" component={MobileSearch} />
            </Route>
          </Router>
        </div>
      </div>
  }
}

const mapStateToProps = store => {
  return {
    chosenPlaylist: store.chosenPlaylist,
    track: store.track
  };
};

export default connect(mapStateToProps)(AppContainer);
