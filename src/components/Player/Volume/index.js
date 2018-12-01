import React, { Component } from 'react'
import { connect } from 'react-redux'
import icons from 'const'

const { DZ } = window

export class Volume extends Component {
  constructor() {
    super()
    this.progress = React.createRef()
    this.line = React.createRef()
    this.ball = React.createRef()
  }

  setVolume = event => {
    const vol = this.getVolPercent(event)
    this.line.current.style.width = this.ball.current.style.left = vol + '%'
    DZ && DZ.player.setVolume(vol)
  }

  getVolPercent({ currentTarget, clientX }) {
    const { left, right, width } = currentTarget.getBoundingClientRect()
    if (clientX <= left) {
      return 0
    } else if (clientX >= right) {
      return 100
    }
    const vol = ((clientX - left) / width) * 100
    if (vol <= 6) {
      return 0
    } else if (vol >= 94) {
      return 100
    }
    return vol
  }

  render() {
    return (
      <div className="controls right">
        <button>
          <img
            src={this.props.repeat ? icons.repeatBlue : icons.repeatWhite}
            onClick={() => {
              DZ && DZ.player.setRepeat(this.props.repeat ? 0 : 2)
              this.props.changeRepeat()
            }}
            alt="repeat"
          />
        </button>
        <button>
          <img src={icons.volume} alt="set volume" />
          <div
            className="volumeSlider"
            ref={this.progress}
            onClick={ev => this.setVolume(ev)}
          >
            <div className="volumeSlider__bgLine" />
            <div className="volumeSlider__currentLine" ref={this.line} />
            <div className="volumeSlider__ball" ref={this.ball} />
          </div>
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({
  track,
  prev,
  chosenPlaylist,
  album,
  flow,
  artist,
  artistPlaylist
}) => ({
  track,
  prev,
  chosenPlaylist,
  album,
  flow,
  artist,
  artistPlaylist
})

export default connect(mapStateToProps)(Volume)
