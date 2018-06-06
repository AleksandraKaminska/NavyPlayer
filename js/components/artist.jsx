import React from 'react';
import { connect } from 'react-redux';
import store from './../store';

import TopTracks from './topTracks.jsx';

class Artist extends React.Component {
    render() {
        return (
            <section id="artist">
                <article className='info'>
                    <img src={this.props.artist.picture_small} alt='artists picture'/>
                    <div>
                      <p>{this.props.artist.name}</p>
                    </div>
                </article>
                <TopTracks />
            </section>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        artist: store.artist
    };
};

export default connect(mapStateToProps)(Artist);
