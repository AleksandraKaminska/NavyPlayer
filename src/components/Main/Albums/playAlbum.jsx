import React, { Component } from 'react';
import store from './../../../store';
import { connect } from 'react-redux';
import {
    changePlaylistAction,
    changeArtistPlaylistAction
} from './../../../actions/index.js';
import { randomAlbumTrack } from './../../../helperFunctions';

class PlayAlbum extends Component {
    findAlbum = () => {
        store.dispatch(changePlaylistAction(0))
        store.dispatch(changeArtistPlaylistAction([]))
        randomAlbumTrack(this.props);
    }

    render() {
        return (
            <div onClick={this.findAlbum} className="playAlbum">Play album</div>
        );
    }
}


const mapStateToProps = ({ track, album }) => ({ track, album });

export default connect(mapStateToProps)(PlayAlbum);
