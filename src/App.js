import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './routes/Home'
import { random } from './helperFunctions'

import './sass/style.css'
const { DZ } = window

const Loader = () => (
  <div className="wrapper">
    <div className="loader">
      <div className="loader__part loader__part--1" />
      <div className="loader__part loader__part--2" />
      <div className="loader__part loader__part--3" />
    </div>
  </div>
)

class App extends Component {
  loadNextTrack = () => {
    let finished = false
    let counter = 0
    DZ.Event.subscribe('player_position', e => {
      if(Math.floor(e[0]) === Math.floor(e[1]) && counter) {
        finished = true
        counter = 0
      }
      counter++
    })
    this.intervalId	=	setInterval(() =>	{
      if(finished) {
        random(this.props)
        finished = false
      }
    }, 1000)
  }

  componentDidMount() {
    random(this.props)
    this.loadNextTrack()
  }

  componentDidUpdate() {
    const { title, artist: { name } } = this.props.track
    if (title && name) {
      document.title = `NavyPlayer | ${title} - ${name}`
    }
  }

  componentWillUnmount(){
	  clearInterval(this.intervalId)
	}

  render() {
    return !this.props.track.id ? <Loader /> : (
      <Router>
        <Route component={Home} />
      </Router>
    )
  }
}

const mapStateToProps = ({
  chosenPlaylist,
  track,
  prev,
  album,
  flow,
  artistPlaylist,
  artist
}) => ({ chosenPlaylist, track, prev, album, flow, artistPlaylist, artist })

export default connect(mapStateToProps)(App)
