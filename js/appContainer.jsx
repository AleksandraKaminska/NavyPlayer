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
       elapsed: '00:00',
       duration: '00:00',
       position: 0,
       playFromPosition: 0,
       suggestions: [],
       value: ''
     };
  }

  searchArtist = () => {
    let url = 'https://rest.bandsintown.com/artists/' + this.state.track.artist.name + '?app_id=NavyPlayer';
    Axios.get(url, {
	     mode: 'cors',
	     redirect: 'follow',
	     headers: new Headers({
		       'Access-Control-Allow-Origin':'*',
           'Content-Type': 'multipart/form-data','Content-Type': 'multipart/form-data'
	     })
    })
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
    Axios.get(url, {
	     mode: 'cors',
	     redirect: 'follow',
	     headers: new Headers({
		       'Access-Control-Allow-Origin':'*',
           'Content-Type': 'multipart/form-data','Content-Type': 'multipart/form-data'
	     })
    })
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
    Axios.get('https://api.deezer.com/playlist/950408095', {
	     mode: 'cors',
	     redirect: 'follow',
	     headers: new Headers({
		       'Access-Control-Allow-Origin':'*',
           'Content-Type': 'multipart/form-data'
	     })
     })
      .then(response => {
        const playlistTracks = response.data.tracks.data;
        const randomNumber = Math.floor(Math.random() * playlistTracks.length);
        this.setState({
          track: playlistTracks[randomNumber]
        });
        this.searchArtist();
        this.searchConcerts();
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.randomTrack();
  }

  playTrack = () => {
    DZ.player.playTracks([this.state.track.id]);
  }

  handleSelect = (value, item) => {
    this.setState({
      value: value,
      track: item
    });
  }

  onChange = (event) => {
    this.setState({
      value: event.target.value
    });
    Axios.get(`http://api.deezer.com/search/track?q=${this.state.value}`, {
	    mode: 'cors',
	    redirect: 'follow',
	    headers: new Headers({
		      'Access-Control-Allow-Origin':'*',
          'Content-Type': 'multipart/form-data'
	    })
    })
      .then(response => {
        this.setState({
          suggestions: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  showTime = (ms) => {
     let min = Math.floor(ms / 60000);
     ms %= 60000;
     let s = Math.floor(ms / 1000);
     return (min < 10 ? '0' : '') + min + ':' + (s < 10 ? '0' : '') + s;
  }

  handleSongPlaying(audio) {
     this.setState({
       elapsed: this.showTime(audio.position),
       duration: this.showTime(audio.duration),
       position: audio.position / audio.duration
     });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions = (value) => {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp('^' + escapedValue, 'i');
    return this.state.suggestions.filter(elem => regex.test(elem.title_short));
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render () {
    const CoverStyle = {
      height: '400px',
      width: '400px',
      backgroundSize: 'cover',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
      url(${this.state.track.album.cover_big})`
    }

    return <div className="NavyPlayer">
        <Search
          value={this.state.value}
          suggestions={this.state.suggestions}
          state={this.state}
          onChange={this.onChange}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}/>
        <Title title_short={this.state.track.title_short} artist={this.state.track.artist.name} />
        <Cover CoverStyle={CoverStyle} />
        <ArtistInfo artistInfo={this.state.artistInfo} concerts={this.state.concerts} />
        <PlayerAndProgress
          playStatus={this.state.playStatus}
          playOrPause={this.playOrPause}
          randomTrack={this.randomTrack}
          track={this.state.track}
          playTrack={this.playTrack}
          elapsed={this.state.elapsed}
          duration={this.state.duration}
          position={this.state.position} />
        <Footer />
      </div>
  }
}

export default AppContainer
