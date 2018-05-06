import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTrackAction, prevTrackAction } from './../actions/index.js';
import store from './../store';
import {
  searchArtist,
  searchAlbums,
  searchTopTracks,
  searchSimilarArtists,
  randomAlbumTrack,
  randomTrack
} from './functions.js';
import fetchJsonp from 'fetch-jsonp';

const { DZ } = window;

const promise = new Promise((resolve, reject) => {
    true ? resolve("Stuff worked!") : reject(Error("It broke"));
});

class Player extends Component {
    constructor() {
        super();
        this.state = {
            isPlaying: !DZ.player.isPlaying()
        }
    }

    changeIsPlaying = () => {
        const { isPlaying } = this.state;
        this.setState({
            isPlaying: !isPlaying
        }, () => isPlaying ? DZ.player.pause() : DZ.player.play());
    }

    changeTrack = () => {
        this.setState({
            isPlaying: true
        }, () => {
            DZ.player.pause();
            this.props.chosenPlaylist ? randomTrack(this.props) : randomAlbumTrack(this.props);
        });
    }

    rewind = () => {
        this.setState({
            isPlaying: true
        }, () => {
            DZ.player.pause();
            const { prev, chosenPlaylist, track } = this.props;
            if (prev.title === '') {
                chosenPlaylist ? randomTrack(this.props) : randomAlbumTrack(this.props);
            } else {
                store.dispatch(prevTrackAction(track));
                store.dispatch(changeTrackAction(prev));
                promise.then(result => {
                    DZ.player.playTracks([track.id]);
                    searchArtist(track.artist.id);
                    searchTopTracks(track.artist.id);
                    searchAlbums(track.artist.id);
                    searchSimilarArtists(track.artist.id);
                }, err => console.log(err));
            }
        });
    }

    render() {
        return (
            <div className="player">
                <div className="playerMain">
                    <button onClick={this.rewind}>
                        <img src="./images/rewind.svg" alt='rewind'/>
                    </button>
                    <button onClick={this.changeIsPlaying} id='playOrPause'>
                        <img src={this.state.isPlaying ? './images/pause.png' : './images/play.png'} alt='play or pause'/>
                    </button>
                    <button onClick={this.changeTrack}>
                        <img src="./images/forward.svg" alt='forward'/>
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ track, prev, chosenPlaylist, album }) => ({ track, prev, chosenPlaylist, album });

export default connect(mapStateToProps)(Player);
