import React, { Component } from 'react';
import store from './../store';
import { connect } from 'react-redux';
<<<<<<< HEAD
import {
    changePlaylistAction,
    prevTrackAction,
    changeTrackAction
} from './../actions/index.js';
import fetchJsonp from 'fetch-jsonp';
=======
import { changePlaylistAction } from './../actions/index.js';
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
import { randomAlbumTrack } from './functions.js';

const promise = new Promise((resolve, reject) => {
    true ? resolve("Stuff worked!") : reject(Error("It broke"));
});

<<<<<<< HEAD
const { DZ } = window;

=======
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
class PlayAlbum extends Component {
    findAlbum = (event) => {
        event.preventDefault();
        store.dispatch(changePlaylistAction(0));
<<<<<<< HEAD
        promise.then(result => randomAlbumTrack(this.props), err => console.log(err));
=======
        promise.then(_ => randomAlbumTrack(this.props), err => console.log(err));
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
    }

    render() {
        return (
            <div onClick={this.findAlbum} className="playAlbum">Play album</div>
        );
    }
}


const mapStateToProps = ({ track, album, chosenPlaylist }) => ({ track, album, chosenPlaylist });

export default connect(mapStateToProps)(PlayAlbum);
