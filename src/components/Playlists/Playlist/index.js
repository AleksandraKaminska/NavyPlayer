import React, { Component } from 'react';
import store from 'store';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { randomPlaylistTrack } from 'helperFunctions';
import { NavLink } from 'react-router-dom';

class Playlist extends Component {
    choosePlaylist = () => {
        const { id } = this.props.elem
        store.dispatch(actions.changePlaylistAction(id))
        randomPlaylistTrack({ 
            ...this.props, 
            chosenPlaylist: id
        })
        store.dispatch(actions.changeAlbumAction(0))
        store.dispatch(actions.changeArtistPlaylistAction([]))
    }

    render() {
        const { elem, chosenPlaylist } = this.props;
        return (
            <NavLink to={`/playlist/${elem.id}`} onClick={this.choosePlaylist}>
                <li className={`playlist${elem.id === chosenPlaylist ? ' active' : ''}`}>
                    <img src={elem.picture_medium} alt={elem.title} />
                    <p>{elem.title}</p>
                </li>
            </NavLink>
        );
    }
}


const mapStateToProps = ({ track, chosenPlaylist }) => ({ track, chosenPlaylist });

export default connect(mapStateToProps)(Playlist);
