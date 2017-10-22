import React from 'react';
import { connect } from 'react-redux';
import store from './../store';

class Albums extends React.Component {
    showAlbumsTracks() {
        $.ajax({
            dataType: "jsonp",
            url: `https://api.deezer.com/album/${this.props.elem.id}?output=jsonp`,
            success: response => store.dispatch({
                type: 'FIND_ALBUMSTRACKS',
                albumsTracks: response.tracks.data
            })
        });
    }

    render() {
        let display = this.props.i <= this.props.current + 5 && this.props.i >= this.props.current;
        let style = {
            display: display ? 'inline-block' : 'none'
        };

        return (
            <li style={style} onClick={this.showAlbumsTracks.bind(this)}>
                <img src={this.props.elem.cover_small.replace(/56x56/, '100x100')} alt='albums cover'/>
                <p>{this.props.elem.title}</p>
            </li>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        albumsTracks: store.albumsTracks
    };
};

export default connect(mapStateToProps)(Albums);
