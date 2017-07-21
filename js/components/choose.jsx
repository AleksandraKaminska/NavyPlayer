import React from 'react';

// Router
import { IndexLink } from	'react-router';

class Choose extends React.Component {
  render(){
    return <div className="choose">
        <div>
					<IndexLink to="/artist">
						<button>
		          <i className="fa fa-user" aria-hidden="true"></i>
							<p>Artist</p>
		        </button>
					</IndexLink>
        </div>
        <div>
					<IndexLink to="/playlist">
						<button>
		          <i className="fa fa-music" aria-hidden="true"></i>
							<p>Playlists</p>
		        </button>
					</IndexLink>
        </div>
        <div>
					<IndexLink to="/search">
						<button>
		          <i className="fa fa-search" aria-hidden="true"></i>
							<p>Search</p>
		        </button>
					</IndexLink>
        </div>
      </div>
  }
}

export default Choose
