import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTrackAction, prevTrackAction } from './../../../actions/index.js'
import store from './../../../store'
import { searchArtistInfo } from './../../../helperFunctions'
import fetchJsonp from 'fetch-jsonp'

const { DZ } = window

class Similar extends Component {
    fetchData = id => dispatch => fetchJsonp(`https://api.deezer.com/artist/${id}/top?output=jsonp`)
        .then(response => response.json())
        .then(({ data }) => data && dispatch(changeTrackAction(data[0])))

    handleClick = () => {
        const { elem: { id }, track } = this.props
        store.dispatch(prevTrackAction(track))
        store.dispatch(this.fetchData(id))
        .then(({ track }) => {
            DZ.player.pause()
            searchArtistInfo(track)
            DZ.player.playTracks([track.id])
        })
    }

    render() {
        const { name, picture_small } = this.props.elem
        return (
            <li onClick={this.handleClick}>
                <img src={picture_small} alt={name}/>
                <p>{name}</p>
            </li>
        )
    }
}

const mapStateToProps = ({ track }) => ({ track })

export default connect(mapStateToProps)(Similar)
