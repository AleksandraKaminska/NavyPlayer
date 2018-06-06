import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions';
import { randomArtistTrack } from 'helperFunctions';
import store from 'store'
import fetchJsonp from 'fetch-jsonp'
import { NavLink } from 'react-router-dom';
import './style.css'

const { DZ } = window

class Artist extends Component {
    fetchData = id => {
        return dispatch => fetchJsonp(`https://api.deezer.com/track/${id}?output=jsonp`)
        .then(response => response.json())
        .then(data => dispatch(actions.changeTrackAction(data)))
    }

    playTrack = id => {
        store.dispatch(actions.prevTrackAction(this.props.track))
        store.dispatch(this.fetchData(id)).then(() => {
            DZ.player.pause()
            DZ.player.playTracks([this.props.track.id])
        })
    }

    runArtistPlaylist = () => {
        const { artist, track, artistPlaylist } = this.props
        store.dispatch(actions.changePlaylistAction(0))
        store.dispatch(actions.changeAlbumAction(0))
        randomArtistTrack({ artist, track, artistPlaylist })
    }

    render() {
        const { topTracks, artist: { name, picture_small, id } } = this.props
        return (
            <section className="artist">
                <NavLink to='/artist'>
                    <img src={picture_small && picture_small.replace(/(56)x\1/, '80x80')} alt="" />
                    <p>{name}</p>
                </NavLink>
                <NavLink to={`/artist/${id}`}>
                    <button onClick={this.runArtistPlaylist}>Listen</button>
                </NavLink>
                { topTracks ? (
                    <div className="topTracks">
                        <h2>Popular Songs</h2>
                        <ul>
                            {
                                topTracks.map(({ id, title_short }) => (
                                    <li onClick={() => this.playTrack(id)} key={id}>{title_short}</li>
                                ))
                            }
                        </ul>
                    </div>
                ) : null }
            </section>
        )
    }
}

const mapStateToProps = ({ topTracks, track, artist, artistPlaylist }) => ({ topTracks, track, artist, artistPlaylist })

export default connect(mapStateToProps)(Artist)

