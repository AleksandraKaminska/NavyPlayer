import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import store from 'store'
import { searchArtistInfo, random } from 'helperFunctions'
import Rewind from './rewind'
import Forward from './forward'
import icons from '../../../icons'

const { DZ } = window

const promise = new Promise((resolve, reject) => {
  true ? resolve('Stuff worked!') : reject(Error('It broke'))
})

export class Controls extends Component {
  constructor() {
    super()
    this.state = {
      isPlaying: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.track.id && nextProps.track !== this.props.track) {
      this.setState({ isPlaying: true })
    }
  }

  changeIsPlaying = () => {
    this.setState(
      {
        isPlaying: DZ && DZ.player.isPlaying()
      },
      () => (DZ && DZ.player.isPlaying() ? DZ && DZ.player.pause() : DZ && DZ.player.play())
    )
  }

  changeTrack = () => {
    this.setState(
      {
        isPlaying: true
      },
      () => {
        DZ && DZ.player.pause()
        this.props.repeat ? DZ && DZ.player.playTracks([this.props.track.id]) : random(this.props)
      }
    )
  }

  rewind = () => {
    this.setState(
      {
        isPlaying: true
      },
      () => {
        DZ && DZ.player.pause()
        const { prev } = this.props
        if (prev.length) {
          promise.then(
            () => {
              store.dispatch(actions.changeTrackAction(prev.slice(-1)[0]))
              store.dispatch(actions.prevTrackAction(prev.slice(-1)[0]))
              DZ && DZ.player.playTracks([this.props.track.id])
              searchArtistInfo(this.props.track)
            },
            (err) => console.log(err)
          )
        } else {
          random(this.props)
        }
      }
    )
  }

  render() {
    return (
      <div className="controls">
        <button>
          <Rewind onClick={this.rewind} />
        </button>
        <button onClick={this.changeIsPlaying}>
          <img src={this.state.isPlaying ? '/assets/images/pause.png' : icons.play} alt="play" />
        </button>
        <button>
          <Forward onClick={this.changeTrack} />
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({ track, prev, playlist, album, flow, artist, artistPlaylist }) => ({
  track,
  prev,
  playlist,
  album,
  flow,
  artist,
  artistPlaylist
})

export default connect(mapStateToProps)(Controls)
