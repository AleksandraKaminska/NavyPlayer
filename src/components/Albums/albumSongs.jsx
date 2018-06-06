import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchJsonp from 'fetch-jsonp'
import store from 'store'
import * as actions from 'actions';
import { randomAlbumTrack, searchArtistInfo } from 'helperFunctions'
import { NavLink } from 'react-router-dom';

const { DZ } = window

class AlbumSongs extends Component {
    findAlbum = () => {
        store.dispatch(actions.changePlaylistAction(0))
        store.dispatch(actions.changeArtistPlaylistAction([]))
        randomAlbumTrack(this.props)
    }

    fetchData = id => {
        return dispatch => fetchJsonp(`https://api.deezer.com/track/${id}?output=jsonp`)
        .then(response => response.json())
        .then(data => dispatch(actions.changeTrackAction(data)))
    }

    handleClick = id => {
        const { track } = this.props
        store.dispatch(actions.prevTrackAction(track))
        store.dispatch(this.fetchData(id))
        .then(({ track }) => {
            DZ.player.pause()
            searchArtistInfo(track)
            DZ.player.playTracks([track.id])
        })
    }

    render() {
        const { tracks, id } = this.props.album
        let songs = tracks && tracks.data.map(({ id, title }, i) => (
            <li onClick={() => this.handleClick(id)} key={i}>
                {i < 9 ? '0' : null}{i + 1}. {title}
            </li>
        ))

        return (
            <div
                className="songs"
                style={window.innerWidth >= 870 ? { width: '25em', right: '-27em' } : { width: '100%' }}
                ref={this.props.songs}
            >
                <NavLink
                    to={`/album/${id}`}
                    onClick={this.findAlbum}
                    className="playAlbum"
                    style={{ visibility: songs && 'visible' }}
                >
                    Play album
                </NavLink>
                {songs && <ul>{songs}</ul>}
            </div>
        )
    }
}


const mapStateToProps = ({ track, album }) => ({ track, album })

export default connect(mapStateToProps)(AlbumSongs)
