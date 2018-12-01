import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const SmallCover = ({ cover, title, artist }) => (
  <Link to='/'>
    <div className='small'>
      <img className='smallCover' src={cover} alt='cover' />
      <div className='smallTitle'>
        <p>{title}</p>
        <p>{artist}</p>
      </div>
    </div>
  </Link>
)

const mapStateToProps = ({ track: { title_short: title, artist, album } }) => ({
  title,
  artist: artist.name,
  cover: album.cover_medium
})

export default connect(mapStateToProps)(SmallCover)
