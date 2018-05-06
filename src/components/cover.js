import React from 'react';
import { connect } from 'react-redux';

const Cover = ({ cover }) => {
    const CoverStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        url(${cover && cover.replace(/(500)x\1/, '400x400')})`
    }
    return (
        <section id='cover'>
            <div className="cover" style={CoverStyle}></div>
        </section>
    );
}

const mapStateToProps = ({ track: { album: { cover_big } } }) => ({
    cover: cover_big
});

export default connect(mapStateToProps)(Cover);
