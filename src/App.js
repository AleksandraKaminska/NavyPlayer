import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import Home from 'routes/Home'
import Search from 'routes/Search'
import Top from 'routes/Top'
import Artist from 'routes/Artist'
import { random } from 'helperFunctions'

import 'sass/style.css'
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
  constructor() {
    super()
    this.state = {
      repeat: false
    }
  }

  loadNextTrack = () => {
    let finished = false
    let counter = 0
    let init = true

    DZ.Event.subscribe('track_end', e => {
      if(counter) {
        finished = true
        counter = 0
      }
      counter++
      if(finished || init) {
        this.state.repeat ? DZ.player.playTracks([this.props.track.id]) : random(this.props)
        finished = false
        init = false
      }
    });
  }

  componentDidMount() {
    random(this.props)
    DZ.Event.subscribe('repeat_changed', e => this.setState({ repeat: !!e }));
    this.loadNextTrack()
  }

  componentDidUpdate() {
    const { title, artist } = this.props.track
    if (title && artist) {
      document.title = `NavyPlayer | ${title} - ${artist.name}`
    }
  }

  render() {
    return !this.props.track.id ? <Loader /> : (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/artist" component={Artist} />
          <Route path="/search" component={Search} />
          <Route path="/top" component={Top} />
          <Route component={Home} />
        </Switch>
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
