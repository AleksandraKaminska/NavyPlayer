import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import * as actions from 'actions';
import { randomFlowTrack, login } from 'helperFunctions'
import './style.css'

class Login extends Component {
    playFlow = () => {
        store.dispatch(actions.changePlaylistAction(0))
        store.dispatch(actions.changeAlbumAction(0))
        store.dispatch(actions.changeArtistPlaylistAction([]))
        randomFlowTrack(this.props)
    }

    render() {
        const flow = this.props.flow.length
        return (
            <button className="login" onClick={flow ? this.playFlow : login}>
                {flow ? "FLOW" : "Log In to Deezer"}
            </button>
        )
    }
}


const mapStateToProps = ({ track, flow, chosenPlaylist }) => ({ track, flow, chosenPlaylist })

export default connect(mapStateToProps)(Login)
