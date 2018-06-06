import React from 'react'
import { connect } from 'react-redux'
import Similar from './similar'

const SimilarArtists = ({ similar }) => similar ? (
    <section id="similar" className="similar">
        <h2>Similar Artists</h2>
        <article>
            <ul>
                {similar.map((elem, i) => <Similar key={i} elem={elem} />)}
            </ul>
        </article>
    </section>
) : null

const mapStateToProps = ({ similar }) => ({ similar })

export default connect(mapStateToProps)(SimilarArtists)
