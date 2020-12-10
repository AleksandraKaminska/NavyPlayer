import React, { Component } from 'react'
import { connect } from 'react-redux'
import { choosePlaylist } from 'helperFunctions'
import { NavLink } from 'react-router-dom'

export class Playlist extends Component {
  render() {
    const { elem } = this.props
    return (
      <NavLink
        to={`/playlist/${elem.id}`}
        onClick={() => choosePlaylist(elem.id, this.props)}
      >
        <div className="playlist">
          <img src={elem.picture_medium} alt={elem.title} />
          <p>{elem.title}</p>
        </div>
      </NavLink>
    )
  }
}

const mapStateToProps = ({ track, chosenPlaylist }) => ({
  track,
  chosenPlaylist
})

export default connect(mapStateToProps)(Playlist)
