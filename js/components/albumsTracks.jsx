import React from 'react';
import { connect } from 'react-redux';
import store from './../store';
import { changeTrackAction, prevTrackAction } from './../actions/index.js';
import {
  searchArtist,
  searchAlbums,
  searchTopTracks,
  searchSimilarArtists
} from './functions.js';

class AlbumsTracks extends React.Component {
    handleClick = () => {
        $.ajax({
            dataType: "jsonp",
            url :`https://api.deezer.com/track/${this.props.song.id}?output=jsonp`,
            success : response => {
                store.dispatch(prevTrackAction(this.props.track));
                store.dispatch(changeTrackAction(response));
                DZ.player.pause();
                searchArtist(this.props.track.artist.id);
                searchAlbums(this.props.track.artist.id);
                searchTopTracks(this.props.track.artist.id);
                searchSimilarArtists(this.props.track.artist.id);
                DZ.player.playTracks([this.props.track.id]);
            }
        });
    }

    render() {
        return (
            <li onClick={this.handleClick}>
                {this.props.i < 9 ? '0' : null}{this.props.i + 1}. {this.props.song.title}
            </li>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        track: store.track
    };
};

export default connect(mapStateToProps)(AlbumsTracks);
