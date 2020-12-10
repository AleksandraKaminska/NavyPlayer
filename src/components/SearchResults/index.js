import React, { Component } from 'react'
import store from 'store'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from 'actions'
import {
  searchArtistInfo,
  randomAlbumTrack,
  randomArtistTrack,
  choosePlaylist
} from 'helperFunctions'
import './style.scss'

const { DZ } = window

export class SearchResults extends Component {
  options = ['track', 'album', 'artist', 'playlist']

  handlerRenderItem = (item, type) => {
    return type === 'track' ? (
      <NavLink
        to="/"
        key={item.id}
        className="result"
        onClick={() => this.selectSong(item)}
      >
        <p>
          <span>{item.title_short}</span>
          {item.artist.name}
        </p>
        <img src={item.album.cover_medium && item.album.cover_medium} alt="" />
      </NavLink>
    ) : type === 'album' ? (
      <NavLink
        to={`/album/${item.id}`}
        key={item.id}
        className="result"
        onClick={() =>
          randomAlbumTrack({ album: item, track: this.props.track })
        }
      >
        <p>
          <span>{item.title}</span>
          {item.artist.name}
        </p>
        <img src={item.cover_medium} alt="" />
      </NavLink>
    ) : type === 'artist' ? (
      <NavLink
        to={`/artist/${item.id}`}
        key={item.id}
        className="result"
        onClick={() =>
          randomArtistTrack({ artist: item, track: this.props.track })
        }
      >
        <p>
          <span>{item.name}</span>
        </p>
        <img src={item.picture_medium} alt="" />
      </NavLink>
    ) : (
      <NavLink
        to={`/playlist/${item.id}`}
        key={item.id}
        className="result"
        onClick={() => choosePlaylist(item.id, this.props)}
      >
        <p>
          <span>{item.title}</span>
        </p>
        <img src={item.picture_medium} alt="" />
      </NavLink>
    )
  }

  selectSong = item => {
    store.dispatch(actions.prevTrackAction(this.props.track))
    store.dispatch(actions.changeTrackAction(item))
    searchArtistInfo(item)
    DZ && DZ.player.pause()
    DZ && DZ.player.playTracks([item.id])
  }

  render() {
    const { results, value } = this.props

    return (
      <section className="search">
        {value && (
          <div className="results">
            {this.options.map(el =>
              results[el + 's'] ? (
                <div key={el}>
                  <h2>{el + 's'}</h2>
                  <div>
                    {results[el + 's'].map(item =>
                      this.handlerRenderItem(item, el)
                    )}
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}
      </section>
    )
  }
}

const mapStateToProps = ({ track }) => ({ track })

export default connect(mapStateToProps)(SearchResults)
