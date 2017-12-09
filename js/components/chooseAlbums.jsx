import React from 'react';

import { connect } from 'react-redux';
import store from './../store';

import Albums from './albums.jsx';
import PlayAlbum from './playAlbum.jsx';
import AlbumsTracks from './albumsTracks.jsx';
import { LeftArrow, RightArrow } from './arrows.jsx';

class ChooseAlbums extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 0
        }
    }

    previousSlide(e) {
        e.preventDefault();
        let current = this.state.current;
        let imageArray = this.props.albums.length - 1;

        if (current >= 1) {
            this.setState({
                current: current - 1
            })
        }
        if (current <= 0) {
            this.setState({
                current: imageArray
            })
        }
    }

    nextSlide(e) {
        e.preventDefault();
        let current = this.state.current;
        let imageArray = this.props.albums.length - 1;

        if ((current >= 0) && (current < imageArray)) {
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
                                    length={this.props.albums.length}
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
                        {this.props.albums.length > 9 || this.state.current !== 0 ? <LeftArrow previousSlide={this.previousSlide.bind(this)} /> : null}
                        <ul>{li}</ul>
                        {this.props.albums.length > 9 || this.state.current !== 0 ? <RightArrow nextSlide={this.nextSlide.bind(this)} /> : null}
                </article>
                {innerWidth >= 870 ? <div className="close" onClick={()=>{
                  document.querySelector('.close').classList.remove('buttonSlideout');
                  document.querySelector('.close').classList.remove('buttonSlidein');
                  document.querySelector('.songs').classList.remove('slideout');
                  document.querySelector('.songs').classList.add('slidein');
                }}><i className="fa fa-arrow-right" aria-hidden="true"></i></div> : null}
                <div className="songs" style={innerWidth >= 870 ? {width: '25em', right: '-27em'} : {width: '100%'}}>
                    {/*<PlayAlbum/>*/}
                    <ul>{songs}</ul>
                </div>
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
