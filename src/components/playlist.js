import React, { Component } from 'react';
import store from './../store';
import { connect } from 'react-redux';
<<<<<<< HEAD
import {
    changePlaylistAction,
    prevTrackAction,
    changeTrackAction
} from './../actions/index.js';
import { randomTrack } from './functions.js';
import fetchJsonp from 'fetch-jsonp'
const { DZ } = window;
=======
import { changePlaylistAction } from './../actions/index.js';
import { randomTrack } from './functions.js';
import fetchJsonp from 'fetch-jsonp';
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4

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
<<<<<<< HEAD
                past && past.classList.remove('active') 
                past && past.classList.add('fade');
=======
                if (past) {
                    past.classList.remove('active')
                    past.classList.add('fade');
                }
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
                _this.classList.add('active');
            }
        }, err => console.log(err));
    }

<<<<<<< HEAD
    thisplaylist = () => {
=======
    componentDidMount() {
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
        fetchJsonp(`https://api.deezer.com/playlist/${this.props.elem}?output=jsonp`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                data,
                picture: data.picture_small
            })
<<<<<<< HEAD
        })
    }

    componentDidMount() {
        this.thisplaylist();
=======
        });
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
    }

    render() {
        const { picture, data: { title } } = this.state;
<<<<<<< HEAD
        return (
            <div onClick={this.findPlaylist} className={this.props.elem === this.props.chosenPlaylist ? 'active' : ''}>
=======
        const { elem, chosenPlaylist } = this.props;
        return (
            <div onClick={this.findPlaylist} className={elem === chosenPlaylist ? 'active' : null}>
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
                <img src={picture && picture.replace(/(56)x\1/, '128x128')} alt={title}/>
			     <p>{title}</p>
            </div>
        );
    }
}


const mapStateToProps = ({ track, chosenPlaylist }) => ({ track, chosenPlaylist });

export default connect(mapStateToProps)(Playlist);
