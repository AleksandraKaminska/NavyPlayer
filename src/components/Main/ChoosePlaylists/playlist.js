import React, { Component } from 'react';
import store from './../../../store';
import { connect } from 'react-redux';
import {
    changePlaylistAction,
    changeAlbumAction,
    changeArtistPlaylistAction
} from './../../../actions/index.js';
import { randomTrack } from './../../../helperFunctions';
import fetchJsonp from 'fetch-jsonp';

const promise = new Promise((resolve, reject) => {
    true ? resolve("Stuff worked!") : reject(Error("It broke"));
});

class Playlist extends Component {
    constructor() {
        super();
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
            store.dispatch(changeAlbumAction(0))
            store.dispatch(changeArtistPlaylistAction([]))
            randomTrack(this.props);
            if (_this !== past) {
                if (past) {
                    past.classList.remove('active')
                    past.classList.add('fade');
                }
                _this.classList.add('active');
            }
        }, err => console.log(err));
    }

    componentDidMount() {
        fetchJsonp(`https://api.deezer.com/playlist/${this.props.elem}?output=jsonp`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                data,
                picture: data.picture_small
            })
        });
    }

    render() {
        const { picture, data: { title } } = this.state;
        const { elem, chosenPlaylist } = this.props;
        return (
            <div onClick={this.findPlaylist} className={elem === chosenPlaylist ? 'active' : null}>
                <img src={picture && picture.replace(/(56)x\1/, '128x128')} alt={title}/>
			     <p>{title}</p>
            </div>
        );
    }
}


const mapStateToProps = ({ track, chosenPlaylist }) => ({ track, chosenPlaylist });

export default connect(mapStateToProps)(Playlist);
