import React, { Component } from 'react';
import store from 'store';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { searchArtistInfo } from 'helperFunctions';
import fetchJsonp from 'fetch-jsonp'
import './style.css'

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
                <p>
                    <span>{item.title_short}</span>
                    {item.artist.name}
                </p>
                <img src={item.album.cover_small && item.album.cover_small.replace(/(56)x\1/, '64x64')} width='50em' height='50em' alt='cover'/>
            </div>
        );
    }

    handleSelect = item => {
        store.dispatch(actions.prevTrackAction(this.props.track));
        store.dispatch(actions.changeTrackAction(item));
        promise.then(result => {
            searchArtistInfo(this.props.track);
            DZ.player.pause();
            DZ.player.playTracks([this.props.track.id]);
            store.dispatch(actions.autocompleteAction(""));
        }, err => console.log(err));
    }

    handleChange = event => {
        const value = event.target.value
        store.dispatch(actions.autocompleteAction(value));
        if (value !== '') {
            fetchJsonp(`https://api.deezer.com/search?q=${value}&output=jsonp`)
            .then(resp => resp.json())
            .then(data => {
                data && store.dispatch(actions.searchTracksAction(data.data));
            })
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
