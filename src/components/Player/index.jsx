import React, { Component } from 'react'
import Controls from './Controls'
import Progress from './Progress'
import Volume from './Volume'
import SmallCover from './SmallCover'
import './style.scss'

class Player extends Component {
  constructor() {
      super()
      this.state = {
          repeat: false
      }
  }

  changeRepeat = () => {
    this.setState({ repeat: !this.state.repeat })
  }

  render() {
    return (
      <section className='player'>
        <SmallCover />
        <Controls repeat={this.state.repeat} />
        <Progress />
        <Volume repeat={this.state.repeat} changeRepeat={this.changeRepeat} />
      </section>
    )
  }
}

export default Player
