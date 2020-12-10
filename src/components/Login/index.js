import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from 'actions'
import { randomFlowTrack, login } from 'helperFunctions'
import './style.scss'
const { DZ } = window

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      loggedin: false
    }
  }

  getLoginStatus = () => {
    DZ &&
      DZ.getLoginStatus(({ status }) => {
        this.setState({
          loggedin: status === 'connected'
        })
        if (!this.state.loggedin && status === 'connected') {
          login()
        }
      })
  }

  componentDidMount() {
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
      <button
        className="login"
        onClick={
          this.state.loggedin && this.props.flow.length ? this.playFlow : login
        }
      >
        {this.state.loggedin ? 'FLOW' : 'Log In'}
      </button>
    )
  }
}

const mapStateToProps = ({ track, flow, chosenPlaylist }) => ({
  track,
  flow,
  chosenPlaylist
})

export default connect(mapStateToProps)(Login)

Login.propTypes = {
  track: PropTypes.object,
  flow: PropTypes.array,
  chosenPlaylist: PropTypes.number
}
