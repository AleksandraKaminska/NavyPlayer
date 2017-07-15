import React from 'react';

class Choose extends React.Component {
	showArtist = () => {
		document.querySelector('.search').style.display = 'none';
		document.querySelector('.playlists').style.display = 'none';
		document.querySelector('.artistInfo').style.display = 'block';

		document.querySelector('.cover').style.display = 'none';
		document.querySelector('.small').style.display = 'flex';
		document.querySelector('.title').style.display = 'none';
		document.querySelector('.time').style.display = 'none';
		document.querySelector('.playerAndProgress').style.position = 'relative';
		document.querySelector('.choose').style.position = 'static';
		document.querySelector('.footer').style.position = 'static';
		document.querySelector('.choose').style.background = 'rgba(0,0,0,0.5)';
		document.querySelector('.footer').style.background = 'rgba(0,0,0,0.5)';
	}
	showPlaylists = () => {
		document.querySelector('.search').style.display = 'none';
		document.querySelector('.playlists').style.display = 'block';
		document.querySelector('.artistInfo').style.display = 'none';

		document.querySelector('.cover').style.display = 'none';
		document.querySelector('.small').style.display = 'flex';
		document.querySelector('.title').style.display = 'none';
		document.querySelector('.time').style.display = 'none';
		document.querySelector('.playerAndProgress').style.position = 'relative';
		document.querySelector('.choose').style.position = 'static';
		document.querySelector('.footer').style.position = 'static';
		document.querySelector('.choose').style.background = 'rgba(0,0,0,0.5)';
		document.querySelector('.footer').style.background = 'rgba(0,0,0,0.5)';
	}
	showSearch = () => {
		document.querySelector('.search').style.display = 'block';
		document.querySelector('.playlists').style.display = 'none';
		document.querySelector('.artistInfo').style.display = 'none';

		document.querySelector('.cover').style.display = 'none';
		document.querySelector('.small').style.display = 'flex';
		document.querySelector('.title').style.display = 'none';
		document.querySelector('.time').style.display = 'none';
		document.querySelector('.playerAndProgress').style.position = 'relative';
		document.querySelector('.choose').style.position = 'static';
		document.querySelector('.footer').style.position = 'static';
		document.querySelector('.choose').style.background = 'rgba(0,0,0,0.5)';
		document.querySelector('.footer').style.background = 'rgba(0,0,0,0.5)';
	}
  render(){
    return <div className="choose">
        <div>
					<button onClick={this.showArtist}>
	          <i className="fa fa-user" aria-hidden="true"></i>
						<p>Artist</p>
	        </button>
        </div>
        <div>
					<button onClick={this.showPlaylists}>
	          <i className="fa fa-music" aria-hidden="true"></i>
						<p>Playlists</p>
	        </button>
        </div>
        <div>
					<button onClick={this.showSearch}>
	          <i className="fa fa-search" aria-hidden="true"></i>
						<p>Search</p>
	        </button>
        </div>
      </div>
  }
}

export default Choose
