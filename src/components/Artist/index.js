import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from 'actions'
import { randomArtistTrack } from 'helperFunctions'
import store from 'store'
import { NavLink } from 'react-router-dom'
import './style.scss'

export class Artist extends Component {
  runArtistPlaylist = () => {
    const { artist, track, artistPlaylist } = this.props
    store.dispatch(actions.changePlaylistAction(0))
    store.dispatch(actions.changeAlbumAction(0))
    randomArtistTrack({ artist, track, artistPlaylist })
  }

  render() {
    const {
      artist: { name, id },
      data
    } = this.props

    return (
      <section className="artist__info">
        <h1 className="artist__info__name">
          {name}
          <NavLink to={`/artist/${id}`} className="artist__info__listen">
            <button onClick={this.runArtistPlaylist}>Listen</button>
          </NavLink>
        </h1>

        <p className="artist__info__bio">{(data && data.artistBio) || ''}</p>
        <div className="artist__info__genres">
          {data &&
            data.artistGeneres.map(e => (
              <div key={e} className="artist__info__genre">
                {e}
              </div>
            ))}
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ track, artist, artistPlaylist }) => ({
  track,
  artist,
  artistPlaylist
})

export default connect(mapStateToProps)(Artist)

Artist.propTypes = {
  track: PropTypes.object,
  artist: PropTypes.object,
  artistPlaylist: PropTypes.array
}
