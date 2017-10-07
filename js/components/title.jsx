import React from 'react';

// Redux
import store from './../store';
import { connect } from 'react-redux';

class Title extends React.Component {
    render() {
        return (
            <header id="title">
                <h1>{this.props.title} - {this.props.artist}</h1>
            </header>
        );
    }
}

const mapStateToProps = store => {
    return {
        title: store.track.title_short,
        artist: store.track.artist.name
    };
};

export default connect(mapStateToProps)(Title);
