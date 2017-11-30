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
        let songs = document.querySelector('.songs');
        if (innerWidth >= 870 && songs.style.right !== '0em') {
            songs.style.right = '0em';
            document.querySelector('.close').style.right = '25em';
            /*songs.style.right = songs.style.right !== '0em' ? '0em' : '-25em';*/
        }
    }

    render() {
        let i = this.props.i;
        let current = this.props.current;

        let display = i <= current + 8 && i >= current;
        let style = {
            display: display ? 'inline-block' : 'none'
        };

        return (
            <li style={style} onClick={this.showAlbumsTracks.bind(this)}>
                <img src={this.props.elem.cover_medium.replace(/250x250/, '150x150')} alt=''/>
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
