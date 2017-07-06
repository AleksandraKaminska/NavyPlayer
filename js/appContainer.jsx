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
       searchTracks: [],
       autoCompleteValue: ''
     };
     this.obj = {
 	     mode: 'cors',
 	     headers: new Headers({
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH',
         'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
         'Access-Control-Allow-Credentials': 'true'
 	     })
     };
  }

  searchArtist = () => {
    let url = 'https://crossorigin.me/https://rest.bandsintown.com/artists/' + this.state.track.artist.name + '?app_id=NavyPlayer';
    Axios.get(url, this.obj)
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
    let url = 'https://crossorigin.me/https://rest.bandsintown.com/artists/' + this.state.track.artist.name + '/events?app_id=NavyPlayer';
    Axios.get(url, this.obj)
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
    Axios.get('https://crossorigin.me/https://api.deezer.com/playlist/950408095', this.obj)
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
    let id = setInterval(DZ.Event.subscribe('player_position', function(evt_name){
       this.setState({
         elapsed: this.showTime(evt_name[0]),
         duration: this.showTime(evt_name[1]),
         position: evt_name[0] / evt_name[1]
       });
       console.log('ELAPSED', this.state.elapsed);
    }), 1000);
  }

  playTrack = () => {
    DZ.player.playTracks([this.state.track.id]);
  }

  handleSelect = (value, item) => {
    this.setState({
      autoCompleteValue: value,
      track: item
    });
    this.searchArtist();
    this.searchConcerts();
  }

  handleChange = (event, value) => {
    this.setState({
      autoCompleteValue: event.target.value
    });
    Axios.get(`https://crossorigin.me/http://api.deezer.com/search/track?q=${this.state.autoCompleteValue}`, this.obj)
      .then(response => {
        this.setState({
          searchTracks: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  showTime = (time) => {
     let min = Math.floor(time / 60);
     let s = time % 60;
     return (min < 10 ? '0' : '') + min + ':' + (s < 10 ? '0' : '') + s;
  }

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
          autoCompleteValue={this.state.autoCompleteValue}
          searchTracks={this.state.searchTracks}
          handleSelect={this.handleSelect}
          handleChange={this.handleChange}/>
        <Title title_short={this.state.track.title_short} artist={this.state.track.artist.name} />
        <Cover CoverStyle={CoverStyle} />
        <ArtistInfo artistInfo={this.state.artistInfo} concerts={this.state.concerts} />
        <PlayerAndProgress
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
