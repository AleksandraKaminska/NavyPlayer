import React from 'react';
import Axios from 'axios';
import Autosuggest from 'react-autosuggest';

import Title from './components/title.jsx';
import Cover from './components/cover.jsx';
import ArtistInfo from './components/artistInfo.jsx';
import PlayerAndProgress from './components/playerAndProgress.jsx';
import Search from './components/search.jsx';
import Footer from './components/footer.jsx';

class AppContainer extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       track: {title: '', artist: {name: ''}, album: {cover_big: ''}},
       artistInfo: {},
       concerts: [],
       searchTracks: [],
       autoCompleteValue: ''
     };
  }

  searchArtist = () => {
    let url = 'https://rest.bandsintown.com/artists/' + this.state.track.artist.name + '?app_id=NavyPlayer';
    Axios.get(url)
      .then(response => {
        this.setState({
          artistInfo: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  searchConcerts = () => {
    let url = 'https://rest.bandsintown.com/artists/' + this.state.track.artist.name + '/events?app_id=NavyPlayer';
    Axios.get(url)
      .then(response => {
        this.setState({
          concerts: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  randomTrack = () => {
    Axios.get('https://api.deezer.com/playlist/950408095')
      .then(response => {
        const playlistTracks = response.data.tracks.data;
        const randomNumber = Math.floor(Math.random() * playlistTracks.length);
        this.setState({
          track: playlistTracks[randomNumber]
        }, () => {
          this.searchArtist();
          this.searchConcerts();
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
    Axios.get(`http://api.deezer.com/search/track?q=${this.state.autoCompleteValue}`)
      .then(response => {
        this.setState({
          searchTracks: response.data.data
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
