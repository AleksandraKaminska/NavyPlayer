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

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            picture: ''
        };
    }

    findPlaylist = (event) => {
        event.preventDefault();
        store.dispatch(changePlaylistAction(this.props.elem));
        let past = document.querySelector('.active');
        let _this = event.target;
        promise.then(result => {
            this.randomTrack();
            if (_this !== past) {
                past.classList.remove('active');
                past.classList.add('fade');
                _this.classList.add('active');
            }
        }, err => console.log(err));
    }

    thisplaylist = () => {
        $.ajax({
            dataType: "jsonp",
            url: `https://api.deezer.com/playlist/${this.props.elem}?output=jsonp`,
            success: data => {
                this.setState({
                    data: data,
                    picture: data.picture_small && data.picture_small.replace(/56x56/, '64x64')
                })
            }
        });
    }

    componentDidMount() {
        this.thisplaylist();
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
                searchAlbums(this.props.track.artist.id);
                searchTopTracks(this.props.track.artist.id);
                searchSimilarArtists(this.props.track.artist.id);
                DZ.player.playTracks([this.props.track.id]);
            }
        });
    }

    render() {
        return (
            <div onClick={this.findPlaylist} className={this.props.elem === this.props.chosenPlaylist ? 'active' : ''}>
                <img src={this.state.picture} alt={this.state.data.title}/>
			     	    <p>{this.state.data.title}</p>
            </div>
        );
    }
}


const mapStateToProps = function (store) {
    return {
        chosenPlaylist: store.chosenPlaylist,
        track: store.track,
    };
};

export default connect(mapStateToProps)(Playlist);
