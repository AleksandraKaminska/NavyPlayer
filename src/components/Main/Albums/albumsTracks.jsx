import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from './../../../store';
import { changeTrackAction, prevTrackAction } from './../../../actions/index.js';
import { searchArtistInfo } from './../../../helperFunctions';
import fetchJsonp from 'fetch-jsonp';

const { DZ } = window;

class AlbumsTracks extends Component {
    fetchData = (id) => {
        return dispatch => fetchJsonp(`https://api.deezer.com/track/${id}?output=jsonp`)
        .then(response => response.json())
        .then(data => dispatch(changeTrackAction(data)))
    };

    handleClick = () => {
        const { track, song: { id } } = this.props;
        store.dispatch(prevTrackAction(track));
        store.dispatch(this.fetchData(id))
        .then(({ track }) => {
            DZ.player.pause();
            searchArtistInfo(track);
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
