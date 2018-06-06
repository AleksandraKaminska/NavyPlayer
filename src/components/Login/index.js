import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import * as actions from 'actions';
import { randomFlowTrack, login } from 'helperFunctions'
import fetchJsonp from 'fetch-jsonp'
import './style.css'
const { DZ } = window

class Login extends Component {
    constructor() {
        super()
        this.state= {
            logged: false
        }
    }
    
    getLoginStatus = () => {
        DZ.getLoginStatus(({ status, authResponse }) => {
            this.setState({
                logged: status === "connected"
            })
            DZ.api('/user/me', response => {
                if (response.id) {
                    const URL = `/user/${response.id}/flow?access_token=${authResponse.accessToken}&limit=100&output=jsonp`
                    fetchJsonp(`https://api.deezer.com${URL}`)
                    .then(resp => resp.json())
                    .then(data => {
                        if (data) {
                            data = data.data
                            if (data && data.length) {
                                store.dispatch({
                                    type: 'FLOW',
                                    data
                                })
                            }
                        }
                    })
                }
            })
        })
    }

    componentWillMount() {
        this.getLoginStatus()
    }

    componentDidUpdate() {
        this.getLoginStatus()
    }

    playFlow = () => {
        store.dispatch(actions.changePlaylistAction(0))
        store.dispatch(actions.changeAlbumAction(0))
        store.dispatch(actions.changeArtistPlaylistAction([]))
        randomFlowTrack(this.props)
    }

    render() {
        return (
            <button className="login" onClick={this.state.logged && this.props.flow.length ? this.playFlow : login}>
                {this.state.logged ? "FLOW" : "Log In"}
            </button>
        )
    }
}


const mapStateToProps = ({ track, flow, chosenPlaylist }) => ({ track, flow, chosenPlaylist })

export default connect(mapStateToProps)(Login)
