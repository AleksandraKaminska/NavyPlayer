import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from 'components/Login'
import Nav from 'components/Nav'
import Player from 'components/Player'
import Footer from 'components/Footer'
import ArtistInfo from 'components/Artist'
import Songs from 'components/Songs'
import ArtistPlaylists from 'components/ArtistPlaylist'
import Similar from 'components/Similar'
import Albums from 'components/Albums'
import fetchJsonp from 'fetch-jsonp'
import './artist.scss'

class Artist extends Component {
  constructor() {
    super()
    this.state = {
      artist: '',
      artistImage: '',
      artistGeneres: [],
      artistBio: ''
    }
  }

  fetchArtistInfo = artist => {
    fetchJsonp(`https://api.deezer.com/artist/${artist}?output=jsonp`)
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          artist,
          artistImage: data.picture_xl,
          artistGeneres: [],
          artistBio: ''
        })
      )
  }

  componentDidMount() {
    this.fetchArtistInfo(this.props.artist)
  }

  componentDidUpdate() {
    const { artist } = this.props
    if (artist !== this.state.artist || !artist) {
      this.fetchArtistInfo(artist)
    }
  }

  render() {
    const { artistImage: artist } = this.state
    return (
      <div
        className="artist background background__artist"
        style={{
          backgroundImage: `linear-gradient(to left,rgba(0,0,0,0) 5%, #000a11 92%), url(${artist &&
            artist.replace(/(300)x\1/, '1000x1000')})`
        }}
      >
        <header>
          <Nav />
          <Login />
        </header>
        <main>
          <ArtistInfo data={this.state} />
          <Songs />
          <ArtistPlaylists />
          <Similar />
          <Albums />
        </main>
        <Player />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({
  track: {
    artist: { id }
  }
}) => ({ artist: id })

export default connect(mapStateToProps)(Artist)
