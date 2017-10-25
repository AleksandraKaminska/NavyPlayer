import React from 'react';

import { connect } from 'react-redux';
import store from './../store';

import Albums from './albums.jsx';
import AlbumsTracks from './albumsTracks.jsx';
import { LeftArrow, RightArrow } from './arrows.jsx';

import InfiniteCarousel from 'react-leaf-carousel';

/*class Car extends React.Component {
  render() {
    return (
      <InfiniteCarousel
    dots={false}
    showSides={true}
    slidesToScroll={4}
    slidesToShow={4}
  >
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=55b64e&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=904098&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=ef4d9c&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=00f3d1&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=00ffff&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=ee1f34&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=91b4c0&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=ff6347&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=ebbfbf&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=def1f9&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=cdf2c6&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=9fa616&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=2c4caa&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=44e3e1&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=ff6666&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=94e1e3&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=29083c&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=ffff99&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=616161&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://placeholdit.imgix.net/~text?txtsize=20&bg=ed7ebe&txtclr=ffffff&txt=215%C3%97215&w=215&h=215'
      />
    </div>
  </InfiniteCarousel>
    );
  }
}*/

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
                {/*<Car albums={this.props.albums}/>*/}
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
