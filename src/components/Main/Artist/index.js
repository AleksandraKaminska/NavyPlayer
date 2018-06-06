import React from 'react';
import { connect } from 'react-redux';
import TopTracks from './topTracks';
import { randomArtistTrack } from './../../../helperFunctions';
import store from './../../../store'
import { changePlaylistAction, changeAlbumAction } from './../../../actions/index.js'

const Artist = ({ artist, track, artistPlaylist }) => (
    <section className="artist">
        <div onClick={() => {
            store.dispatch(changePlaylistAction(0))
            store.dispatch(changeAlbumAction(0))
            randomArtistTrack({ artist, track, artistPlaylist })
        }}>
            <img src={artist.picture_small} alt="artists" />
            <p>{artist.name}</p>
        </div>
        <TopTracks />
    </section>
);

const mapStateToProps = ({ artist, track, artistPlaylist }) => ({ artist, track, artistPlaylist });

export default connect(mapStateToProps)(Artist);
