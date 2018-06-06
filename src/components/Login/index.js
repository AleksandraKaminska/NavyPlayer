import React, { Component } from 'react'
import store from './../../store'
import { connect } from 'react-redux'
import { changePlaylistAction, changeAlbumAction, changeArtistPlaylistAction } from './../../actions/index.js'
import { randomFlowTrack, login } from './../../helperFunctions'

class Login extends Component {
    playFlow = () => {
        store.dispatch(changePlaylistAction(0))
        store.dispatch(changeAlbumAction(0))
        store.dispatch(changeArtistPlaylistAction([]))
        randomFlowTrack(this.props)
    }

    componentWillMount() {
        window.location.pathname.match(/^\/?$/) && login()
    }

    render() {
        const flow = !!this.props.flow.length
        return (
            <section id='login'>
                <button className="login" onClick={flow ? this.playFlow : login}>
                    {flow ? "FLOW" : "Log In to Deezer"}
                </button>
            </section>
        )
    }
}


const mapStateToProps = ({ track, flow, chosenPlaylist }) => ({ track, flow, chosenPlaylist })

export default connect(mapStateToProps)(Login)
