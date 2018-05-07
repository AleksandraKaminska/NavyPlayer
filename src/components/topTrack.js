import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTrackAction, prevTrackAction } from './../actions/index.js';
import store from './../store';
import fetchJsonp from 'fetch-jsonp';

const { DZ } = window;

class TopTrack extends Component {
    handleClick = () => {
        const { elem: { id }, track} = this.props;
        fetchJsonp(`https://api.deezer.com/track/${id}?output=jsonp`)
        .then(response => response.json())
        .then(response => {
            store.dispatch(prevTrackAction(track));
            store.dispatch(changeTrackAction(response))
            DZ.player.pause();
            DZ.player.playTracks([track.id]);
        })
    }

    render() {
        return (
            <li onClick={this.handleClick}>
                {this.props.elem.title_short}
            </li>
        );
    }
}

const mapStateToProps = ({ track }) => ({ track })

export default connect(mapStateToProps)(TopTrack);
