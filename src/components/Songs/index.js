import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import store from 'store'
import fetchJsonp from 'fetch-jsonp'
import './style.scss'

const { DZ } = window

class Songs extends Component {
  fetchData = id => {
    return dispatch => fetchJsonp(`https://api.deezer.com/track/${id}?output=jsonp`)
    .then(response => response.json())
    .then(data => dispatch(actions.changeTrackAction(data)))
  }

  playTrack = id => {
    store.dispatch(actions.prevTrackAction(this.props.track))
    store.dispatch(this.fetchData(id)).then(() => {
      DZ && DZ.player.pause()
      DZ && DZ.player.playTracks([this.props.track.id])
    })
  }

  render() {
    const { topTracks } = this.props

    return topTracks && topTracks.length ? (
      <section className="artist__songs">
        <h2>Popular Songs</h2>
        <ul>
          {
            topTracks.map(track => (
              <li onClick={() => this.playTrack(track.id)} key={track.id}>
                <div className="artist__song">
                  <img src={track.album.cover_small} alt="" className="artist__songs__cover" />
                  <div>
                    <p className="artist__songs__title">{track.title_short}</p>
                    <p className="artist__songs__contributors">
                      {track.contributors.map(e => e.name).join(', ')}
                    </p>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </section>
    ) : null
  }
}

const mapStateToProps = ({ topTracks, track }) => ({ topTracks, track })

export default connect(mapStateToProps)(Songs)

