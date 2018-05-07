import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './routes/Home';
import { randomAlbumTrack, randomTrack } from './components/functions.js';

import './sass/style.css';
const { DZ } = window;

const promise = new Promise((resolve, reject) => {
  true ? resolve("Stuff worked!") : reject(Error("It broke"));
});

class App extends Component {
  componentDidMount() {
    promise.then(result => randomTrack(this.props), err => console.log(err))
    // load next track
    let finished = false;
    let counter = 0;
    DZ.Event.subscribe('player_position', e => {
      if(Math.floor(e[0]) === Math.floor(e[1]) && counter) {
        finished = true;
        counter = 0;
      }
      counter++;
    });
    this.intervalId	=	setInterval(() =>	{
      if(finished) {
        this.props.chosenPlaylist ? randomTrack(this.props) : randomAlbumTrack(this.props);
        finished = false;
      }
    }, 1000);
  }

  componentWillUnmount(){
	  clearInterval(this.intervalId);
	}

  render() {
    return (
        <Router>
          <Route path="/:id?" exact component={Home} />
        </Router>
    );
  }
}

const mapStateToProps = ({ chosenPlaylist, track, prev, album }) => ({ chosenPlaylist, track, prev, album })

export default connect(mapStateToProps)(App);
