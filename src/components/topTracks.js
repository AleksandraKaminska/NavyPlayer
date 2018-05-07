import React from 'react';
import { connect } from 'react-redux';
import TopTrack from './topTrack';

const TopTracks = ({ topTracks }) => (
    <article id='topTracks'>
        <div className='topTracks'>
            <h2>Top tracks</h2>
            <ul>
                {topTracks && topTracks.map((elem, i) => <TopTrack key={i} elem={elem} />)}
            </ul>
        </div>
    </article>
);

const mapStateToProps = ({ topTracks }) => ({ topTracks });

export default connect(mapStateToProps)(TopTracks);
