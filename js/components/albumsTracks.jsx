import React from 'react';
import { connect } from 'react-redux';
import store from './../store';
import { changeTrackAction, prevTrackAction } from './../actions/index.js';

class AlbumsTracks extends React.Component {
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

  searchAlbums = () => {
    $.ajax({
      dataType: "jsonp",
      url: `https://api.deezer.com/artist/${this.props.track.artist.id}/albums?output=jsonp`,
      success: response => store.dispatch({ type: 'FIND_ALBUMS', albums: response.data })
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
        url :`https://api.deezer.com/track/${this.props.song.id}?output=jsonp`,
        success : response => {
          store.dispatch(prevTrackAction(this.props.track));
          store.dispatch(changeTrackAction(response))
          DZ.player.pause();
          DZ.player.playTracks([this.props.track.id]);
        }
    });
  }

  render() {
    return <li onClick={this.handleClick}>{this.props.song.title}</li>;
  }
}

const mapStateToProps = (store) => {
  return {
    track: store.track
  };
};

export default connect(mapStateToProps)(AlbumsTracks);
