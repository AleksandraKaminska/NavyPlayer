import React, { Component } from 'react';
import store from './../store';
import { connect } from 'react-redux';
import {
    changePlaylistAction,
    prevTrackAction,
    changeTrackAction
} from './../actions/index.js';
import { randomTrack } from './functions.js';
import fetchJsonp from 'fetch-jsonp'
const { DZ } = window;

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
            randomTrack(this.props);
            if (_this !== past) {
                past && past.classList.remove('active') 
                past && past.classList.add('fade');
                _this.classList.add('active');
            }
        }, err => console.log(err));
    }

    thisplaylist = () => {
        fetchJsonp(`https://api.deezer.com/playlist/${this.props.elem}?output=jsonp`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                data,
                picture: data.picture_small
            })
        })
    }

    componentDidMount() {
        this.thisplaylist();
    }

    render() {
        const { picture, data: { title } } = this.state;
        return (
            <div onClick={this.findPlaylist} className={this.props.elem === this.props.chosenPlaylist ? 'active' : ''}>
                <img src={picture && picture.replace(/(56)x\1/, '128x128')} alt={title}/>
			     <p>{title}</p>
            </div>
        );
    }
}


const mapStateToProps = ({ track, chosenPlaylist }) => ({ track, chosenPlaylist });

export default connect(mapStateToProps)(Playlist);
