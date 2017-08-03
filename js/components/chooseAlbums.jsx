import React from 'react';

import { connect } from 'react-redux';
import store from './../store';

import Albums from './albums.jsx';
import AlbumsTracks from './albumsTracks.jsx';

class ChooseAlbums extends React.Component {
  render() {
    let li = this.props.albums.map((elem, i) => <Albums key={i} elem={elem} />);
    let songs = this.props.albumsTracks.map((song, i) => <AlbumsTracks song={song} i={i} key={i} />);
    return <section id="albums">
        <h2>Albums</h2>
        <article className="list">
          <ul>
            {li}
          </ul>
        </article>
        <article className="songs">
          <ul>
            {songs}
          </ul>
        </article>
      </section>
  }
}

const mapStateToProps = store => {
  return {
    albums: store.albums,
    albumsTracks: store.albumsTracks
  };
};

export default connect(mapStateToProps)(ChooseAlbums);
