import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTrackAction, prevTrackAction } from './../../../actions/index.js';
import store from './../../../store';
import { searchArtistInfo, random } from './../../../helperFunctions';
import Rewind from './rewind';
import Forward from './forward';

const { DZ } = window;

const promise = new Promise((resolve, reject) => {
    true ? resolve("Stuff worked!") : reject(Error("It broke"));
});

class Controls extends Component {
    constructor() {
        super();
        this.state = { isPlaying: false }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.track.id && nextProps.track !== this.props.track ) {
            this.setState({ isPlaying: true });
        }
    }

    changeIsPlaying = () => {
        this.setState(
            { isPlaying: !DZ.player.isPlaying() },
            () => DZ.player.isPlaying() ? DZ.player.pause() : DZ.player.play()
        );
    }

    changeTrack = () => {
        this.setState({
            isPlaying: true
        }, () => {
            DZ.player.pause()
            random(this.props)
        });
    }

    rewind = () => {
        this.setState({
            isPlaying: true
        }, () => {
            DZ.player.pause();
            const { prev } = this.props;
            if (prev.length) {
                promise.then(result => {
                    store.dispatch(changeTrackAction(prev.slice(-1)[0]));
                    store.dispatch(prevTrackAction(prev.slice(-1)[0]));
                    DZ.player.playTracks([this.props.track.id]);
                    searchArtistInfo(this.props.track);
                }, err => console.log(err));
            } else {
                random(this.props)
            }
        });
    }

    render() {
        return (
            <div className="controls">
                <Rewind onClick={this.rewind} />
                <button onClick={this.changeIsPlaying} id="playOrPause">
                    <img src={this.state.isPlaying ? '/assets/images/pause.png' : '/assets/images/play.png'} alt="play or pause" />
                </button>
                <Forward onClick={this.changeTrack} />
            </div>
        );
    }
}

const mapStateToProps = ({ track, prev, chosenPlaylist, album, flow, artist, artistPlaylist }) => ({
    track,
    prev,
    chosenPlaylist,
    album,
    flow,
    artist,
    artistPlaylist
});

export default connect(mapStateToProps)(Controls);
