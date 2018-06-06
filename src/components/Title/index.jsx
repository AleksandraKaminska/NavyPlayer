import React from 'react'
import { connect } from 'react-redux'
import './style.css'

const Title = ({ title, artist }) => {
  return (
    <div className='title'>
      <h1>
        <span>{title}</span>
        {artist}
      </h1>
    </div>
  )
}

const mapStateToProps = ({ track: { title_short: title, artist } }) => ({
  title,
  artist: artist.name
})

export default connect(mapStateToProps)(Title)
