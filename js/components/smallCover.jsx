import React from 'react';

class SmallCover extends React.Component {
	showBigCover = () => {
		document.querySelector('.search').style.display = 'none';
		document.querySelector('.playlists').style.display = 'none';
		document.querySelector('.artistInfo').style.display = 'none';
		document.querySelector('.small').style.display = 'none';

		document.querySelector('.cover').style.display = 'block';
		document.querySelector('.title').style.display = 'block';
		document.querySelector('.time').style.display = 'block';
	}
  render(){
    const CoverStyle = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
      url(${this.props.track.album.cover_small})`
    }
    return <div className="small" onClick={this.showBigCover}>
			<div className="smallCover" style={CoverStyle}></div>
			<div className="smallTitle">
	      <p>{this.props.title}</p>
				<p>{this.props.artist}</p>
	    </div>
    </div>

  }
}

export default SmallCover
