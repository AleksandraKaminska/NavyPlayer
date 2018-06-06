import React, { Component } from 'react';
import store from 'store';
import { connect } from 'react-redux';
import Playlist from './Playlist';
import fetchJsonp from 'fetch-jsonp'
import * as actions from 'actions';
import { randomAlbumTrack } from 'helperFunctions'
import { NavLink } from 'react-router-dom';
import './style.css'

class Playlists extends Component {
    constructor() {
        super();
        this.state = {
            indexPlaylists: 20,
            indexAlbums: 20
        }
    }

    componentDidMount() {
        fetchJsonp(`https://api.deezer.com/chart?index=0&limit=20&output=jsonp`)
        .then(resp => resp.json())
        .then(({ albums, playlists }) => (
            store.dispatch({
                type: 'TOP',
                top: { albums, playlists }
            })
        ))
    }

    loadMorePlaylists = () => {
        fetchJsonp(`https://api.deezer.com/chart?index=${this.state.indexPlaylists}&limit=20&output=jsonp`)
        .then(resp => resp.json())
        .then(data => {
            const { top } = this.props
            store.dispatch({
                type: 'TOP',
                top: {
                    ...top,
                    playlists: {
                        data: [
                            ...top.playlists.data,
                            ...data.playlists.data
                        ]
                    }
                }
            })
            this.setState({
                indexPlaylists: this.state.indexPlaylists + 20
            })
        })
    }

    loadMoreAlbums = () => {
        fetchJsonp(`https://api.deezer.com/chart?index=${this.state.indexAlbums}&limit=20&output=jsonp`)
        .then(resp => resp.json())
        .then(data => {
            const { top } = this.props
            store.dispatch({
                type: 'TOP',
                top: {
                    ...top,
                    albums: {
                        data: [
                            ...top.albums.data,
                            ...data.albums.data
                        ]
                    }
                }
            })
            this.setState({
                indexAlbums: this.state.indexAlbums + 20
            })
        })
    }

    findAlbum = id => {
        fetchJsonp(`https://api.deezer.com/album/${id}?output=jsonp`)
        .then(resp => resp.json())
        .then(album => {
            store.dispatch(actions.changeAlbumAction(album))
            randomAlbumTrack({ ...this.props, album })
        })
        store.dispatch(actions.changePlaylistAction(0))
        store.dispatch(actions.changeArtistPlaylistAction([]))
    }

    render() {
        const { top: { playlists, albums } } = this.props
        if (!albums) return null;
        return (
            <div>
                <section className="playlists">
                    <h3>Top Charts</h3>
                    <ul>
                        {
                            playlists.data.map((elem, i) => <Playlist elem={elem} key={i} />)
                        }
                    </ul>
                    <button onClick={this.loadMorePlaylists} className="loadMore">Load more</button>
                </section>
                <section className="top-albums">
                    <h3>Trending Albums</h3>
                    <ul>
                        {
                            albums.data.map(({ id, cover_medium, title, artist: { name } }) => (
                                <li key={id}>
                                    <NavLink
                                        to={`/album/${id}`}
                                        onClick={() => this.findAlbum(id)}
                                    >
                                        <figure>
                                            <img src={cover_medium.replace(/(250)x\1/, '200x200')} alt='' />
                                            <figcaption>
                                                <p>{title}</p>
                                                <div className="album-artist">
                                                    <p>{name}</p>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                    <button onClick={this.loadMoreAlbums} className="loadMore">Load more</button>
                </section>
            </div>
        );
    }
}


const mapStateToProps = ({ top, track, album }) => ({ top, track, album });

export default connect(mapStateToProps)(Playlists);
