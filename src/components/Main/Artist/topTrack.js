import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTrackAction, prevTrackAction } from './../../../actions/index.js'
import store from './../../../store'
import fetchJsonp from 'fetch-jsonp'

const { DZ } = window

class TopTrack extends Component {
    fetchData = (id) => {
        return dispatch => fetchJsonp(`https://api.deezer.com/track/${id}?output=jsonp`)
        .then(response => response.json())
        .then(data => dispatch(changeTrackAction(data)))
    }

    handleClick = () => {
        const { id } = this.props.elem
        store.dispatch(prevTrackAction(this.props.track))
        store.dispatch(this.fetchData(id)).then(() => {
            DZ.player.pause()
            DZ.player.playTracks([this.props.track.id])
        })
    }

    render() {
        return (
            <li onClick={this.handleClick}>
                {this.props.elem.title_short}
            </li>
        )
    }
}

const mapStateToProps = ({ track }) => ({ track })

export default connect(mapStateToProps)(TopTrack)
