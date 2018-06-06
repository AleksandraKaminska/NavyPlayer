import React from 'react';

// Redux
import { connect } from 'react-redux';
import { changeTrackAction, prevTrackAction } from './../actions/index.js';
import store from './../store';
import {
  searchArtist,
  searchAlbums,
  searchTopTracks,
  searchSimilarArtists
} from './functions.js';

const promise = new Promise((resolve, reject) => {
    true ? resolve("Stuff worked!") : reject(Error("It broke"));
});

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: !DZ.player.isPlaying()
        }
    }

    changeIsPlaying = () => {
        if (this.state.isPlaying) {
            this.setState({
                isPlaying: false
            }, () => DZ.player.pause());
        } else {
            this.setState({
                isPlaying: true
            }, () => DZ.player.play());
        }
    }

    changeTrack = () => {
        this.setState({
            isPlaying: true
        }, () => {
            DZ.player.pause();
            this.props.chosenPlaylist ? this.randomTrack() : this.randomAlbumTrack();
        });
    }

    rewind = () => {
        this.setState({
            isPlaying: true
        }, () => {
            DZ.player.pause();
            if (this.props.prev.title === '') {
                this.props.chosenPlaylist ? this.randomTrack() : this.randomAlbumTrack();
            } else {
                store.dispatch(prevTrackAction(this.props.track));
                store.dispatch(changeTrackAction(this.props.prev));
                promise.then(result => {
                    DZ.player.playTracks([this.props.track.id]);
                    searchArtist(this.props.track.artist.id);
                    searchTopTracks(this.props.track.artist.id);
                    searchAlbums(this.props.track.artist.id);
                    searchSimilarArtists(this.props.track.artist.id);
                }, err => console.log(err));
            }
        });
    }

    randomTrack = () => {
        $.ajax({
            dataType: "jsonp",
            url: `https://api.deezer.com/playlist/${this.props.chosenPlaylist}?output=jsonp`,
            success: response => {
                const playlistTracks = response.tracks.data;
                const randomNumber = Math.floor(Math.random() * playlistTracks.length);
                store.dispatch(prevTrackAction(this.props.track));
                store.dispatch(changeTrackAction(playlistTracks[randomNumber]));
                searchArtist(this.props.track.artist.id);
                searchTopTracks(this.props.track.artist.id);
                searchAlbums(this.props.track.artist.id);
                searchSimilarArtists(this.props.track.artist.id);
                DZ.player.playTracks([this.props.track.id]);
            }
        });
    }

    randomAlbumTrack = () => {
        $.ajax({
            dataType: "jsonp",
            url: `https://api.deezer.com/album/${this.props.album.id}?output=jsonp`,
            success: response => {
                const albumTracks = response.tracks.data;
                const randomNumber = Math.floor(Math.random() * albumTracks.length);
                store.dispatch(prevTrackAction(this.props.track));
                store.dispatch(changeTrackAction(albumTracks[randomNumber], this.props.album.cover_big));
                DZ.player.playTracks([this.props.track.id]);
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

const mapStateToProps = store => {
    return {
        track: store.track,
        prev: store.prev,
        chosenPlaylist: store.chosenPlaylist,
        album: store.album
    };
};

export default connect(mapStateToProps)(Player);
