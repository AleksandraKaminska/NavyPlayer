import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from './../store';
import { changeTrackAction, prevTrackAction } from './../actions/index.js';
import {
  searchArtist,
  searchAlbums,
  searchTopTracks,
  searchSimilarArtists
} from './functions.js';
import fetchJsonp from 'fetch-jsonp';

const { DZ } = window;

class AlbumsTracks extends Component {
    handleClick = () => {
        const { track, song: { id } } = this.props;
        fetchJsonp(`https://api.deezer.com/track/${id}?output=jsonp`)
        .then(response => response.json())
        .then(response => {
            store.dispatch(prevTrackAction(track));
            store.dispatch(changeTrackAction(response));
            DZ.player.pause();
            searchArtist(track.artist.id);
            searchAlbums(track.artist.id);
            searchTopTracks(track.artist.id);
            searchSimilarArtists(track.artist.id);
            DZ.player.playTracks([track.id]);
        })
    }

    render() {
        const { i, song: { title } } = this.props;
        return (
            <li onClick={this.handleClick}>
                {i < 9 ? '0' : null}{i + 1}. {title}
            </li>
        );
    }
}

const mapStateToProps = ({ track }) => ({ track });

export default connect(mapStateToProps)(AlbumsTracks);
