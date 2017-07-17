import React from 'react';
import	{	Router,
		Route,
		Link,
		IndexLink,
		IndexRoute,
		hashHistory
}	from	'react-router';

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
     this.state = {
       track: {title: '', artist: {name: ''}, album: {cover_big: ''}},
       artistInfo: {},
       concerts: [],
       albums: [],
       searchTracks: [],
       autoCompleteValue: '',
       playlists: [950408095, 2734448044, 1242572531, 2178064502, 1927928822, 975986691, 1266972311, 65490032, 1677006641],
       chosenPlaylist: 1677006641
     };
     this.pom = [];
  }

  searchArtist = () => {
    $.ajax({
        dataType: "json",
        url :`https://rest.bandsintown.com/artists/${this.state.track.artist.name}?app_id=NavyPlayer`,
        success : response => {
          this.setState({
            artistInfo: response
          });
        }
    });
  }

  searchConcerts = () => {
    let url = `https://rest.bandsintown.com/artists/${this.state.track.artist.name}/events?app_id=NavyPlayer`;
    $.ajax({
        dataType: "json",
        url : url,
        success : response => {
          this.setState({
            concerts: response
          });
        }
    });
  }

  randomTrack = () => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/playlist/${this.state.chosenPlaylist}?output=jsonp`,
        data : {},
        success : response => {
          const playlistTracks = response.tracks.data;
          const randomNumber = Math.floor(Math.random() * playlistTracks.length);
          this.setState({
            track: playlistTracks[randomNumber]
          }, () => {
            this.searchArtist();
            this.searchConcerts();
            DZ.player.playTracks([this.state.track.id]);
          });
        }
    });
  }

  componentDidMount() {
    this.randomTrack();
  }

  findPlaylist = (event) => {
    this.setState({
      chosenPlaylist: event.target.id
    }, () => {
      this.randomTrack();
    })
  }

  handleSelect = (value, item) => {
    this.setState({
      autoCompleteValue: value,
      track: item
    }, () => {
      this.searchArtist();
      this.searchConcerts();
      DZ.player.pause();
      DZ.player.playTracks([this.state.track.id]);
      this.setState({
        autoCompleteValue: ''
      });
    });
  }

  handleChange = (event) => {
    this.setState({
      autoCompleteValue: event.target.value
    }, () => {
      if(this.state.autoCompleteValue !== '') {
        DZ.api(`/search?q=${this.state.autoCompleteValue}`, response => {
            this.pom = response.data;
        });
        this.setState({
          searchTracks: this.pom
        });
      }
    });
  }

  render () {
    return <div className="NavyPlayer">
        <Search
          autoCompleteValue={this.state.autoCompleteValue}
          searchTracks={this.state.searchTracks}
          handleSelect={this.handleSelect}
          handleChange={this.handleChange} />
        <Title title={this.state.track.title_short} artist={this.state.track.artist.name} />
        <MainMiddle
          playlists={this.state.playlists}
          findPlaylist={this.findPlaylist}
          randomTrack={this.randomTrack}
          track={this.state.track}
          artistInfo={this.state.artistInfo}
          concerts={this.state.concerts} />
        <PlayerAndProgress
          randomTrack={this.randomTrack}
          track={this.state.track}
          title={this.state.track.title_short}
          artist={this.state.track.artist.name} />
        <Choose />
        <Footer />
      </div>

  }
}

export default AppContainer
