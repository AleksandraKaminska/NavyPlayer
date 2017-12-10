import React from 'react';

// Redux
import store from './../store';
import { connect } from 'react-redux';
import {
    changePlaylistAction,
    prevTrackAction,
    changeTrackAction
} from './../actions/index.js';
import {
  searchArtist,
  searchAlbums,
  searchTopTracks,
  searchSimilarArtists
} from './functions.js';

const promise = new Promise((resolve, reject) => {
    true ? resolve("Stuff worked!") : reject(Error("It broke"));
});

class PlayAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }

    findAlbum = (event) => {
        event.preventDefault();
        store.dispatch(changePlaylistAction(0));
        promise.then(result => {
            this.randomTrack();
        }, err => console.log(err));
    }

    randomTrack = () => {
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
            <div onClick={this.findAlbum} className="playAlbum">Play album</div>
        );
    }
}


const mapStateToProps = function (store) {
    return {
        track: store.track,
        album: store.album,
        chosenPlaylist: store.chosenPlaylist
    };
};

export default connect(mapStateToProps)(PlayAlbum);
