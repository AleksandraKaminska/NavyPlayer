import React from 'react'
import { connect } from 'react-redux'
import TopTrack from './topTrack'

const TopTracks = ({ topTracks }) => topTracks ? (
    <div className="topTracks">
        <h2>Top tracks</h2>
        <ul>
            {topTracks.map((elem, i) => <TopTrack key={i} elem={elem} />)}
        </ul>
    </div>
) : null

const mapStateToProps = ({ topTracks }) => ({ topTracks })

export default connect(mapStateToProps)(TopTracks)
