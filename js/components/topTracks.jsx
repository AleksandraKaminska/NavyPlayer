import React from 'react';

// Redux
import { connect } from 'react-redux';
import store from './../store';

import TopTrack from './topTrack.jsx';

class TopTracks extends React.Component {
    render() {
        let li = this.props.topTracks.map((elem, i) => <TopTrack key={i} elem={elem} />);
        return (
            <article id='topTracks'>
                <div className='topTracks'>
                    <h2>Top tracks</h2>
                    <ul>{li}</ul>
                </div>
            </article>
        );
    }
}

const mapStateToProps = store => {
    return {
        topTracks: store.topTracks
    };
};

export default connect(mapStateToProps)(TopTracks);
