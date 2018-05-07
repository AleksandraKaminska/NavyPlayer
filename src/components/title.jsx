import React from 'react';
import { connect } from 'react-redux';

const Title = ({ title, artist }) => (
    <header id="title">
        <h1>{title} - {artist}</h1>
    </header>
);

const mapStateToProps = ({ track: { title_short, artist } }) => ({
    title: title_short,
    artist: artist.name
})

export default connect(mapStateToProps)(Title);
