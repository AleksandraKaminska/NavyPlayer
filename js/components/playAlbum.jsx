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
        console.log("FIND_ALBUM: this.props: ", this.props.album.id);
        /*store.dispatch(changePlaylistAction(this.props.elem));*/
        /*let past = document.querySelector('.active');
        let _this = event.target;*/
        promise.then(result => {
            this.randomTrack();
            /*if (_this !== past) {
                past.classList.remove('active');
                past.classList.add('fade');
                _this.classList.add('active');
            }*/
        }, err => console.log(err));
    }

    /*thisAlbum = () => {
        $.ajax({
            dataType: "jsonp",
            url: `https://api.deezer.com/album/${this.props.album.id}?output=jsonp`,
            success: data => {
                console.log("THIS_ALBUM: data: ", data);
                this.setState({
                    data: data,
                })
            }
        });
    }

    componentDidMount() {
        this.thisAlbum();
    }*/

    randomTrack = () => {
        $.ajax({
            dataType: "jsonp",
            url: `https://api.deezer.com/album/${this.props.album.id}?output=jsonp`,
            success: response => {
                const albumTracks = response.tracks.data;
                console.log(this.props.album);
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
        album: store.album
    };
};

export default connect(mapStateToProps)(PlayAlbum);
