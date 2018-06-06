import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from './../../../store';
import PlayAlbum from './playAlbum';
import AlbumsTracks from './albumsTracks';
import fetchJsonp from 'fetch-jsonp';
import { changeAlbumAction } from './../../../actions/index.js';

const windowWidth = window.innerWidth;
const showCount = windowWidth <= 414 ? 2 : windowWidth > 414 && windowWidth <= 768 ? 3 : 7;

class Albums extends Component {
    constructor() {
        super();
        this.slider = React.createRef();
        this.close = React.createRef();
        this.songs = React.createRef();
        this.state = {
            currentSliderCount: 0,
            scrollWidth: 0
        }
    }

    handleNext = () => {
        const { currentSliderCount, scrollWidth } = this.state;
        this.sliderCount = this.props.albums.length / showCount - 1;
        this.setState({
            scrollWidth: scrollWidth + windowWidth
        }, () => {
            if ( currentSliderCount >= this.sliderCount ) {
                this.slider.current.style.left = 0;
                this.setState({
                    currentSliderCount: 0,
                    scrollWidth: 0
                });
            } else {
                this.slider.current.style.left = `${-this.state.scrollWidth}px`;
                this.setState({
                    currentSliderCount: currentSliderCount + 1
                });
            }
        });
    }

    handlePrev = () => {
        const { currentSliderCount, scrollWidth } = this.state;
        this.sliderCount = this.props.albums.length / showCount;
        this.setState({
            scrollWidth: scrollWidth - windowWidth
        }, () => {
            if ( currentSliderCount ) {
                this.slider.current.style.left = `${-this.state.scrollWidth}px`;
                this.setState({
                    currentSliderCount: currentSliderCount - 1
                });
            } else {
                this.slider.current.style.left = 0;
                this.setState({
                    currentSliderCount: 0,
                    scrollWidth: 0
                });
            }
        });
    }

    showAlbumsTracks = e => {
        e.preventDefault();
        fetchJsonp(`https://api.deezer.com/album/${e.currentTarget.dataset.id}?output=jsonp`)
        .then(response => response.json())
        .then(album => store.dispatch(changeAlbumAction(album)))
        if (windowWidth >= 870 && this.songs.current.style.right !== '0em') {
            this.songs.current.classList.remove('slidein');
            this.songs.current.classList.add('slideout');
            this.close.current.classList.remove('buttonSlidein');
            this.close.current.classList.add('buttonSlideout');
        }
    }

    render() {
        const { album: { tracks }, albums } = this.props;
        let songs = tracks && tracks.data.map((song, i) => <AlbumsTracks song={song} i={i} key={i} />);
        return (
            <section id="albums" className="albums">
                <h2>Albums</h2>
                <div className="slider-frame">
                    <div className="btn prev" onClick={this.handlePrev}>
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                    </div>
                    <div className="btn next" onClick={this.handleNext}>
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                    <div className="slider-container" ref={this.slider}>
                        {albums && albums.map((elem, i) => (
                            <div key={i}
                                data-i={i}
                                data-id={elem.id}
                                className="slide"
                                onClick={this.showAlbumsTracks}
                                style={{ backgroundImage: `url(${elem.cover_big})` }}
                            >
                                <p>{elem.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {windowWidth >= 870 ? (
                    <div
                        className="close"
                        ref={this.close}
                        onClick={() => {
                            this.close.current.classList.remove('buttonSlideout', 'buttonSlidein')
                            this.songs.current.classList.remove('slideout')
                            this.songs.current.classList.add('slidein')
                        }}
                    >
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    </div>
                ) : null}
                <div
                    className="songs"
                    style={windowWidth >= 870 ? { width: '25em', right: '-27em' } : { width: '100%' }}
                    ref={this.songs}
                >
                    <PlayAlbum/>
                    {songs && <ul>{songs}</ul>}
                </div>
            </section>
        );
    }
}

const mapStateToProps = ({ albums, album }) => ({ albums, album })

export default connect(mapStateToProps)(Albums);
