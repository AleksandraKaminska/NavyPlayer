import React from 'react';

import { connect } from 'react-redux';
import store from './../store';

import Albums from './albums.jsx';
import AlbumsTracks from './albumsTracks.jsx';
import { LeftArrow, RightArrow } from './arrows.jsx';

import InfiniteCarousel from 'react-leaf-carousel';

class Placehold extends React.Component {
  render() {
    return (
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=55b64e&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    );
  }
}

class Car extends React.Component {
  render() {
    return (
      <InfiniteCarousel
    dots={false}
    showSides={true}
    slidesToScroll={4}
    slidesToShow={4}
  >

    {this.props.children}
  </InfiniteCarousel>
    );
  }
}

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
        if (current <= 0) {
            this.setState({
                current: imageArray
            })
        }
    }

    nextSlide() {
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

    isLoaded() {
      let id = setInterval(()=> {
        if (this.props.albums.length) {
          clearInterval(id);
          console.log(this.props.albums.length);
          return true;
        }
      }, 500);
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
                {/*<Car albums={this.props.albums}>
                    <Placehold/>
                    <Placehold/>
                    <Placehold/>
                    {this.isLoaded() && li}
                </Car>*/}
                <article className="list">
                    {this.props.albums.length > 6 || this.state.current !== 0 ? <LeftArrow previousSlide={this.previousSlide.bind(this)} /> : null}
                    <ul>{li}</ul>
                    {this.props.albums.length > 6 || this.state.current !== 0 ? <RightArrow nextSlide={this.nextSlide.bind(this)} /> : null}
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
