import React from 'react';

// Redux
import store from './../store';
import { connect } from 'react-redux';

class Cover extends React.Component {
    render() {
        const CoverStyle = {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
            url(${this.props.cover})`
        }
        return (
            <section id='cover'>
                <div className="cover" style={CoverStyle}></div>
            </section>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        cover: store.track.album.cover_big && store.track.album.cover_big.replace(/500x500/, '400x400')
    };
};

export default connect(mapStateToProps)(Cover);
