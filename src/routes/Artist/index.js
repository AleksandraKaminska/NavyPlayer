import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from 'components/Login'
import Nav from 'components/Nav'
import Player from 'components/Player'
import Choose from 'components/Choose'
import Footer from 'components/Footer'
import ArtistTop from 'components/Artist'
import Similar from 'components/Similar'
import Albums from 'components/Albums'
import './artist.css'

class Artist extends Component {
  constructor () {
    super()
    this.state = {
      artist: '',
      artistImage: ''
    }
  }

  componentDidMount () {
    const { artist } = this.props
    fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&api_key=65d425fd474110ff88a87831da65d6da&format=json`)
      .then(resp => resp.json())
      .then(({ results }) => this.setState({
        artist,
        artistImage: results.artistmatches.artist[0].image.find(e => e.size === 'mega')['#text']
      }))
  }

  componentDidUpdate () {
    const { artist } = this.props
    if (artist !== this.state.artist || !artist) {
      fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&api_key=65d425fd474110ff88a87831da65d6da&format=json`)
        .then(resp => resp.json())
        .then(({ results }) => this.setState({
          artist,
          artistImage: results.artistmatches.artist[0].image.find(e => e.size === 'mega')['#text']
        }))
    }
  }

  render () {
    const { artistImage: artist } = this.state
    if (window.innerWidth <= 870) {
      return (
        <div className='artistRoute'>
          <main>
            <div
              className='artistPicture'
              style={{
                backgroundImage: `url(${artist})`
              }}
            />
            <ArtistTop />
            <Similar />
            <Albums />
          </main>
          <Player />
          <Choose />
        </div>
      )
    }

    return (
      <div>
        <div
          className='background'
          style={{
            backgroundImage: `url(${artist.replace(/(300)x\1/, '1000x1000')})`
          }}
        />
        <div className='artistRoute'>
          <header>
            <Nav />
            <Login />
          </header>
          <main style={{ justifyContent: 'flex-end' }}>
            <ArtistTop />
            <Similar />
            <Albums />
          </main>
          <Player />
          <Choose />
          <Footer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ track: { artist: { name } } }) => ({ artist: name })

export default connect(mapStateToProps)(Artist)
