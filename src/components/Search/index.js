import React, { Component } from 'react';
import store from './../../store';
import { connect } from 'react-redux';
import {
    searchTracksAction,
    autocompleteAction,
    changeTrackAction,
    prevTrackAction
} from './../../actions/index.js';
import { searchArtistInfo } from './../../helperFunctions';

const { DZ } = window;

const promise = new Promise((resolve, reject) => {
    true ? resolve("Stuff worked!") : reject(Error("It broke"));
});

class Search extends Component {
    handlerRenderItem = item => {
        return (
            <div
                key={item.id}
                className="result"
                onClick={() => this.handleSelect(item)}
            >
                <p>{item.title_short} - {item.artist.name}</p>
                <img src={item.album.cover_small} width='50em' height='50em' alt='cover'/>
            </div>
        );
    }

    handleSelect = item => {
        store.dispatch(prevTrackAction(this.props.track));
        store.dispatch(changeTrackAction(item));
        promise.then(result => {
            searchArtistInfo(this.props.track);
            DZ.player.pause();
            DZ.player.playTracks([this.props.track.id]);
            store.dispatch(autocompleteAction(""));
        }, err => console.log(err));
    }

    handleChange = event => {
        const value = event.target.value
        store.dispatch(autocompleteAction(value));
        if (value !== '') {
            DZ.api(`/search?q=${value}`, ({ data }) => {
                store.dispatch(searchTracksAction(data));
            });
        }
    }

    render() {
        return (
            <section className="search">
                <input
                    value={this.props.autocompleteValue}
                    onChange={this.handleChange}
                    placeholder="Search tracks"
                />
                {this.props.autocompleteValue && <div className="results">
                    {this.props.searchTracks.map(item => this.handlerRenderItem(item))}
                </div>}
            </section>
        );
    }
}

const mapStateToProps = ({ searchTracks, autocompleteValue, track }) => ({ searchTracks, autocompleteValue, track });

export default connect(mapStateToProps)(Search);
