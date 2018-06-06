import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const SmallCover = ({ cover, title, artist }) => (
    <Link to="/">
        <div className="small">
            <div className="smallCover" style={{ backgroundImage: `url(${cover})` }} />
            <div className="smallTitle">
                <p>{title}</p>
                <p>{artist}</p>
            </div>
        </div>
    </Link>
)

const mapStateToProps = ({ track: { title_short, artist, album } }) => ({
    title: title_short,
    artist: artist.name,
    cover: album.cover_small
})

export default connect(mapStateToProps)(SmallCover)
