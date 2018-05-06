import React from 'react';
import { connect } from 'react-redux';
import Similar from './similar';

const SimilarArtists = ({ similar }) => (
    <section id="similar">
        <h2>Similar Artists</h2>
        <article>
            <ul>
                {similar && similar.map((elem, i) => <Similar key={i} elem={elem} />)}
            </ul>
        </article>
    </section>
);

const mapStateToProps = ({ similar }) => ({ similar });

export default connect(mapStateToProps)(SimilarArtists);
