import React from 'react';

import { connect } from 'react-redux';
import store from './../store';

import Albums from './albums.jsx';
import AlbumsTracks from './albumsTracks.jsx';
import { LeftArrow, RightArrow } from './arrows.jsx';

class ChooseAlbums extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 0
        }
    }


    previousSlide() {
        let current = this.state.current;
        let imageArray = this.props.albums.length - 1;

        if (current >= 1) {
            this.setState({
                current: current - 1
            })
        }
        if (current === 0) {
            this.setState({
                current: imageArray
            })
        }
    }

    nextSlide() {
        let current = this.state.current;
        let imageArray = this.props.albums.length - 1;

        if ((current >= 0) && (current !== imageArray)) {
            this.setState({
                current: current + 1
            })
        }
        if (current >= imageArray) {
            this.setState({
                current: 0
            })
        }
    }

    render() {
        let li = this.props.albums
                 .map((elem, i) => <Albums
                                    key={i}
                                    elem={elem}
                                    current={this.state.current}
                                    i={i} />);

        let songs = this.props.albumsTracks
                    .map((song, i) => <AlbumsTracks
                                       song={song}
                                       i={i}
                                       key={i} />);

        return (
            <section id="albums">
                <h2>Albums</h2>
                <article className="list">
                    <LeftArrow previousSlide={this.previousSlide.bind(this)} />
                    <ul>{li}</ul>
                    <RightArrow nextSlide={this.nextSlide.bind(this)} />
                </article>
                <article className="songs">
                    <ul>{songs}</ul>
                </article>
            </section>
        );
    }
}

const mapStateToProps = store => {
    return {
        albums: store.albums,
        albumsTracks: store.albumsTracks
    };
};

export default connect(mapStateToProps)(ChooseAlbums);
