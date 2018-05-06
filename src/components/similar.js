import React, { Component } from 'react';
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
import fetchJsonp from 'fetch-jsonp';

const { DZ } = window;

class Similar extends Component {
    handleClick = () => {
        const { elem: { id }, track } = this.props;
        fetchJsonp(`https://api.deezer.com/artist/${id}/top?output=jsonp`)
        .then(response => response.json())
        .then(response => {
            store.dispatch(prevTrackAction(track));
            store.dispatch(changeTrackAction(response.data[0]))
            DZ.player.pause();
            DZ.player.playTracks([track.id]);
            searchArtist(track.artist.id);
            searchAlbums(track.artist.id);
            searchTopTracks(track.artist.id);
            searchSimilarArtists(track.artist.id);
        })
    }

    render() {
        const { name, picture_small } = this.props.elem;
        return (
            <li onClick={this.handleClick}>
                <img src={picture_small} alt={name}/>
                <p>{name}</p>
            </li>
        );
    }
}

const mapStateToProps = ({ track }) => ({ track });

export default connect(mapStateToProps)(Similar);
