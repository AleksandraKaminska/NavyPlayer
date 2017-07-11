import React from 'react';
import Autosuggest from 'react-autosuggest';

import Title from './components/title.jsx';
import ChoosePlaylists from './components/choosePlaylists.jsx';
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
       autoCompleteValue: '',
       playlists: [950408095, 1242572531, 975986691, 1266972311, 65490032, 1677006641],
       chosenPlaylist: 1677006641
     };
  }

  callback = data => {
      console.log(data);
  };

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
    let url = 'https://rest.bandsintown.com/artists/' + this.state.track.artist.name + '/events?app_id=NavyPlayer';
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
        jsonp : 'callback',
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
    });
  }

  handleChange = (event, value) => {
    this.setState({
      autoCompleteValue: event.target.value
    });
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/search/track?q=${this.state.autoCompleteValue}?output=jsonp`,
        data : {},
        jsonp : 'callback',
        success : response => {
          console.log(response.data);
          this.setState({
            searchTracks: response.data
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
        <ChoosePlaylists
          playlists={this.state.playlists}
          findPlaylist={this.findPlaylist}
          randomTrack={this.randomTrack} />
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
