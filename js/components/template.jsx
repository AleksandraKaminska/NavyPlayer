import React from 'react';

// Redux
import store from './../store';
import { connect } from 'react-redux';
import {changeTrackAction} from './../actions/index.js';

// Components
import Login from './../components/login.jsx';
import Title from './../components/title.jsx';
import PlayerAndProgress from './../components/playerAndProgress.jsx';
import Search from './../components/search.jsx';
import Choose from './../components/choose.jsx';
import Footer from './../components/footer.jsx';
import MainMiddle from './../components/mainMiddle.jsx';

class Template extends React.Component {
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
          this.searchConcerts();
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

  searchConcerts = () => {
    $.ajax({
      dataType: "json",
      url: `https://rest.bandsintown.com/artists/${this.props.track.artist.name}/events?app_id=NavyPlayer`,
      success: response => store.dispatch({ type: 'FIND_CONCERTS', concerts: response })
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
		let path = this.props.children.props.location.pathname;
    return <div className="NavyPlayer">
        <div className='desktop'>
          <Login />
          <Search />
          <Title />
          <MainMiddle randomTrack={this.randomTrack} />
          <PlayerAndProgress randomTrack={this.randomTrack} />
          <Choose />
          <Footer />
        </div>
        <div className='mobile'>
					<div className={path}>
							{this.props.children}
							<PlayerAndProgress randomTrack={this.randomTrack} />
							<Choose />
							<Footer />
			     </div>
        </div>
      </div>
  }
}

const mapStateToProps = function(store) {
  return {
    chosenPlaylist: store.chosenPlaylist,
    track: store.track
  };
};

export default connect(mapStateToProps)(Template);
