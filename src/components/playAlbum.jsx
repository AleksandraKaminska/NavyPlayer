import React, { Component } from 'react';
import store from './../store';
import { connect } from 'react-redux';
import { changePlaylistAction } from './../actions/index.js';
import { randomAlbumTrack } from './functions.js';

const promise = new Promise((resolve, reject) => {
    true ? resolve("Stuff worked!") : reject(Error("It broke"));
});

class PlayAlbum extends Component {
    findAlbum = (event) => {
        event.preventDefault();
        store.dispatch(changePlaylistAction(0));
        promise.then(_ => randomAlbumTrack(this.props), err => console.log(err));
    }

    render() {
        return (
            <div onClick={this.findAlbum} className="playAlbum">Play album</div>
        );
    }
}


const mapStateToProps = ({ track, album, chosenPlaylist }) => ({ track, album, chosenPlaylist });

export default connect(mapStateToProps)(PlayAlbum);
