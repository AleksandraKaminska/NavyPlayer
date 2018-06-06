import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions';
import store from 'store'
import { searchArtistInfo } from 'helperFunctions'
import fetchJsonp from 'fetch-jsonp'
import './style.css'

const { DZ } = window

class Similar extends Component {
    fetchData = id => dispatch => fetchJsonp(`https://api.deezer.com/artist/${id}/top?output=jsonp`)
        .then(response => response.json())
        .then(({ data }) => data && dispatch(actions.changeTrackAction(data[0])))

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
        const { similar } = this.props
        return similar ? (
            <section className="similar">
                <h2>Similar Artists</h2>
                <article>
                    <ul>
                        {
                            similar.map(({ name, picture_small, id }) => (
                                <li onClick={() => this.handleClick(id)} key={id}>
                                    <img src={picture_small} alt={name}/>
                                    <p>{name}</p>
                                </li>
                            ))
                        }
                    </ul>
                </article>
            </section>
        ) : null
    }
}

const mapStateToProps = ({ track, similar }) => ({ track, similar })

export default connect(mapStateToProps)(Similar)
