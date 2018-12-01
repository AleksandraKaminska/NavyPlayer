import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

export const SmallCover = ({ cover, title, artist }) => (
  <Link to="/">
    <div className="small">
      <img className="smallCover" src={cover} alt="cover" />
      <div className="smallTitle">
        <p>{title}</p>
        <p>{artist}</p>
      </div>
    </div>
  </Link>
)

const mapStateToProps = ({ track }) => ({
  title: track.title_short,
  artist: track.artist.name,
  cover: track.album.cover_medium
})

export default connect(mapStateToProps)(SmallCover)
