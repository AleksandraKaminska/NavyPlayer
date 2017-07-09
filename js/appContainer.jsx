import React from 'react';
import Autosuggest from 'react-autosuggest';

import Title from './components/title.jsx';
import ChoosePlaylists from './components/choosePlaylists.jsx';
import Cover from './components/cover.jsx';
import ArtistInfo from './components/artistInfo.jsx';
import PlayerAndProgress from './components/playerAndProgress.jsx';
import Search from './components/search.jsx';
import Footer from './components/footer.jsx';

let obj = {
  mode: 'cors',
  redirect:	'follow',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
    'Access-Control-Allow-Credentials': 'true'
  }
};

class AppContainer extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       track: {title: '', artist: {name: ''}, album: {cover_big: ''}},
       artistInfo: {},
       concerts: [],
       searchTracks: [],
       autoCompleteValue: '',
       playlists: [950408095, 1242572531, 975986691, 1266972311, 65490032, 1677006641],
       chosenPlaylist: 950408095
     };
  }

  searchArtist = () => {
    let url = 'https://rest.bandsintown.com/artists/' + this.state.track.artist.name + '?app_id=NavyPlayer';
    fetch(url, obj)
      .then(response => response.json())
      .then(response => {
        this.setState({
          artistInfo: response
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  searchConcerts = () => {
    let url = 'https://rest.bandsintown.com/artists/' + this.state.track.artist.name + '/events?app_id=NavyPlayer';
    fetch(url, obj)
      .then(response => response.json())
      .then(response => {
        this.setState({
          concerts: response
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  randomTrack = () => {
    fetch(`https://api.deezer.com/playlist/${this.state.chosenPlaylist}`, obj)
      .then(response => response.json())
      .then(response => {
        const playlistTracks = response.tracks.data;
        const randomNumber = Math.floor(Math.random() * playlistTracks.length);
        this.setState({
          track: playlistTracks[randomNumber]
        }, () => {
          this.searchArtist();
          this.searchConcerts();
          DZ.player.playTracks([this.state.track.id]);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.randomTrack();
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
    });
  }

  handleChange = (event, value) => {
    this.setState({
      autoCompleteValue: event.target.value
    });
    fetch(`http://api.deezer.com/search/track?q=${this.state.autoCompleteValue}`, obj)
      .then(response => response.json())
      .then(response => {
        this.setState({
          searchTracks: response.data
        });
      })
      .catch(err => {
        console.log(err);
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
        <ChoosePlaylists
          playlists={this.state.playlists}
          chosenPlaylist={this.state.chosenPlaylist}
          randomTrack={this.randomTrack}
          searchArtist={this.searchArtist}
          searchConcerts={this.searchConcerts} />
        <Cover track={this.state.track} />
        <ArtistInfo artistInfo={this.state.artistInfo} concerts={this.state.concerts} />
        <PlayerAndProgress
          randomTrack={this.randomTrack}
          track={this.state.track} />
        <Footer />
      </div>
  }
}

export default AppContainer
