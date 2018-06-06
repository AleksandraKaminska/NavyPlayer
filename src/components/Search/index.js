import React, { Component } from 'react';
import store from 'store';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { searchArtistInfo, randomAlbumTrack, randomArtistTrack } from 'helperFunctions';
import fetchJsonp from 'fetch-jsonp'
import './style.css'

const { DZ } = window;

class Search extends Component {
    constructor() {
        super()
        this.options = ['track', 'album', 'artist']
        this.state = {
            results: {},
            value: ''
        }
    }

    handlerRenderItem = (item, type) => {
        return type === "track" ? (
            <NavLink
                to='/'
                key={item.id}
                className="result"
                onClick={() => this.selectSong(item)}
            >
                <p>
                    <span>{item.title_short}</span>
                    {item.artist.name}
                </p>
                <img src={item.album.cover_medium && item.album.cover_medium} alt="" />
            </NavLink>
        ) : type === "album" ? (
            <NavLink
                to={`/album/${item.id}`}
                key={item.id}
                className="result"
                onClick={() => this.selectAlbum(item)}
            >
                <p>
                    <span>{item.title}</span>
                    {item.artist.name}
                </p>
                <img src={item.cover_medium} alt="" />
            </NavLink>
        ) : (
            <NavLink
                to={`/artist/${item.id}`}
                key={item.id}
                className="result"
                onClick={() => this.selectArtist(item)}
            >
                <p>
                    <span>{item.name}</span>
                </p>
                <img src={item.picture_medium} alt="" />
            </NavLink>
        );
    }

    selectSong = item => {
        this.setState({ value: "" })
        store.dispatch(actions.prevTrackAction(this.props.track));
        store.dispatch(actions.changeTrackAction(item));
        searchArtistInfo(item);
        DZ.player.pause();
        DZ.player.playTracks([item.id]);
    }

    selectAlbum = album => {
        this.setState({ value: "" })
        const { track } = this.props
        randomAlbumTrack({ album, track })
    }

    selectArtist = artist => {
        this.setState({ value: "" })
        const { track } = this.props
        randomArtistTrack({ artist, track })
    }

    handleChange = event => {
        const value = event.target.value
        this.setState({ value })
        if (value !== '') {
            fetchJsonp(`https://api.deezer.com/search/track?q=${value}&output=jsonp`)
            .then(resp => resp.json())
            .then(({ data }) => (
                this.setState({
                    results: {
                        tracks: data
                    }
                })
            ))
            fetchJsonp(`https://api.deezer.com/search/album?q=${value}&output=jsonp`)
            .then(resp => resp.json())
            .then(({ data }) => (
                this.setState({
                    results: {
                        ...this.state.results,
                        albums: data
                    }
                })
            ))
            fetchJsonp(`https://api.deezer.com/search/artist?q=${value}&output=jsonp`)
            .then(resp => resp.json())
            .then(({ data }) => (
                this.setState({
                    results: {
                        ...this.state.results,
                        artists: data
                    }
                })
            ))
            fetchJsonp(`https://api.deezer.com/search/playlist?q=${value}&output=jsonp`)
            .then(resp => resp.json())
            .then(({ data }) => (
                this.setState({
                    results: {
                        ...this.state.results,
                        playlists: data
                    }
                })
            ))
        }
    }

    render() {
        const { results, value } = this.state
        return (
            <section className="search">
                <form className="searchForm">
                    <div className="searchWrapper">
                        <input
                            type="text"
                            className="searchField"
                            value={value}
                            onChange={this.handleChange}
                            placeholder="Search"
                            autoFocus={true}
                        />
                        <button type="submit" className="fa fa-search searchIcon" />
                    </div>
                </form>
                {value && (
                    <div className="results">
                        {
                            this.options.map(el => (
                                results[el + 's'] ? (
                                    <div key={el}>
                                        <h2>{el + 's'}</h2>
                                        <div>
                                            {results[el + 's'].map(item => this.handlerRenderItem(item, el))}
                                        </div> 
                                    </div> 
                                ) : null 
                            ))
                        }
                    </div>
                )}
            </section>
        );
    }
}

const mapStateToProps = ({ track }) => ({ track });

export default connect(mapStateToProps)(Search);
