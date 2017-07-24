import React from 'react';

// Redux
import { connect } from 'react-redux';
import { changeTrackAction } from './../actions/index.js';
import store from './../store';

class Similar extends React.Component {
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
  
  handleClick = () => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/artist/${this.props.elem.id}/top?output=jsonp`,
        success : response => {
          store.dispatch(changeTrackAction(response.data[0]))
          DZ.player.pause();
          DZ.player.playTracks([this.props.track.id]);
          this.searchArtist();
          this.searchConcerts();
          this.searchTopTracks();
          this.searchSimilarArtists();
        }
    });
  }

  render(){
      return <li id={this.props.elem.id}
          onClick={this.handleClick}>
          <img src={this.props.elem.picture_medium} alt={this.props.elem.name}/>
          <p>{this.props.elem.name}</p>
      </li>
  }
}

const mapStateToProps = store => {
  return {
    track: store.track
  };
};

export default connect(mapStateToProps)(Similar);
