import React from 'react';
import Sound from 'react-sound';
import Axios from 'axios';

import Title from './components/title.jsx';
import Cover from './components/cover.jsx';
import PlayerAndProgress from './components/playerAndProgress.jsx';
import Search from './components/search.jsx';
import Footer from './components/footer.jsx';

class AppContainer extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       track: {title: '', artist: {name: ''}, album: {cover_big: ''}},
       searchTracks: [],
       playStatus: Sound.status.STOPPED,
       elapsed: '00:00',
       duration: '00:00',
       position: 0,
       playFromPosition: 0,
       autoCompleteValue: ''
     };
  }

  componentDidMount() {
    this.randomTrack();
  }

  randomTrack = () => {
    Axios.get('https://api.deezer.com/playlist/950408095')
      .then(response => {
        const playlistTracks = response.data.tracks.data;
        const randomNumber = Math.floor(Math.random() * playlistTracks.length);
        this.setState({
          track: playlistTracks[randomNumber]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  playTrack = () => {
    DZ.player.playTracks([this.state.track.id]);
    this.setState({
      playStatus: Sound.status.PLAYING
    });
  }

  playOrPause = () => {
    this.setState({
      playStatus: (this.state.playStatus === Sound.status.PLAYING) ? Sound.status.PAUSED : Sound.status.PLAYING
    });
  }

  handleSelect = (value, item) => {
    this.setState({
      autoCompleteValue: value,
      track: item
    });
  }

  handleChange = (event, value) => {
    this.setState({
      autoCompleteValue: event.target.value
    });
    Axios.get(`http://api.deezer.com/search?q=${value}`)
      .then(response => {
        this.setState({
          searchTracks: response.data
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
          clientId={this.state.client_id}
          autoCompleteValue={this.state.autoCompleteValue}
          searchTracks={this.state.searchTracks}
          handleSelect={this.handleSelect.bind(this)}
          handleChange={this.handleChange.bind(this)}/>
        <Title title_short={this.state.track.title_short} artist={this.state.track.artist.name} />
        <Cover CoverStyle={CoverStyle} />

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
