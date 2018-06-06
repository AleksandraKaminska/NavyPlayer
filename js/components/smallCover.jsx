import React from 'react';

// Router
import { IndexLink } from 'react-router';

// Redux
import store from './../store';
import { connect } from 'react-redux';

class SmallCover extends React.Component {
    render() {
        const CoverStyle = {
            backgroundImage: `url(${this.props.cover})`
        }
        return (
            <IndexLink to="/">
			          <div className="small">
				            <div className="smallCover" style={CoverStyle}></div>
				            <div className="smallTitle">
		                    <p>{this.props.title}</p>
				       	        <p>{this.props.artist}</p>
		                </div>
	              </div>
		        </IndexLink>
        );
    }
}

const mapStateToProps = store => {
    return {
        title: store.track.title_short,
        artist: store.track.artist.name,
        cover: store.track.album.cover_small
    };
};

export default connect(mapStateToProps)(SmallCover);
