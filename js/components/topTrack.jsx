import React from 'react';

// Redux
import { connect } from 'react-redux';
import {
    changeTrackAction,
    prevTrackAction
} from './../actions/index.js';
import store from './../store';

class TopTrack extends React.Component {
    handleClick = () => {
        $.ajax({
            dataType: "jsonp",
            url: `https://api.deezer.com/track/${this.props.elem.id}?output=jsonp`,
            success: response => {
                store.dispatch(prevTrackAction(this.props.track));
                store.dispatch(changeTrackAction(response))
                DZ.player.pause();
                DZ.player.playTracks([this.props.track.id]);
            }
        });
    }

    render() {
        return (
            <li onClick={this.handleClick}>
                {this.props.elem.title_short}
            </li>
        );
    }
}

const mapStateToProps = store => {
    return {
        track: store.track
    };
};

export default connect(mapStateToProps)(TopTrack);
