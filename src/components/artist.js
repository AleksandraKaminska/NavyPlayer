import React from 'react';
import { connect } from 'react-redux';
import TopTracks from './topTracks';

const Artist = ({ artist: { name, picture_small } }) => (
    <section id="artist">
        <article className="info">
            <img src={picture_small} alt="artists" />
            <div><p>{name}</p></div>
        </article>
        <TopTracks />
    </section>
);

const mapStateToProps = ({ artist }) => ({ artist });

export default connect(mapStateToProps)(Artist);
