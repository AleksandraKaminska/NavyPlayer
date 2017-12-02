import React from 'react';

// Redux
import { connect } from 'react-redux';
import {
    changeTrackAction,
    prevTrackAction
} from './../actions/index.js';
import store from './../store';
import {
  searchArtist,
  searchAlbums,
  searchTopTracks,
  searchSimilarArtists
} from './functions.js';

class Similar extends React.Component {
    handleClick = () => {
        $.ajax({
            dataType: "jsonp",
            url: `https://api.deezer.com/artist/${this.props.elem.id}/top?output=jsonp`,
            success: response => {
                store.dispatch(prevTrackAction(this.props.track));
                store.dispatch(changeTrackAction(response.data[0]))
                DZ.player.pause();
                DZ.player.playTracks([this.props.track.id]);
                searchArtist(this.props.track.artist.id);
                searchAlbums(this.props.track.artist.id);
                searchTopTracks(this.props.track.artist.id);
                searchSimilarArtists(this.props.track.artist.id);
            }
        });
    }

    render() {
        return (
            <li onClick={this.handleClick}>
                <img src={this.props.elem.picture_small} alt={this.props.elem.name}/>
                <p>{this.props.elem.name}</p>
            </li>
        );
    }
}

const mapStateToProps = store => {
    return {
        track: store.track
    };
};

export default connect(mapStateToProps)(Similar);
