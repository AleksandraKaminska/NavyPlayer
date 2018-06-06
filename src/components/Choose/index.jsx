import React from 'react';
import { NavLink } from 'react-router-dom';

const Choose = () => (
  <nav className="choose">
		<div>
			<NavLink to="/artist" activeClassName="active">
				<button>
					<i className="fa fa-user" aria-hidden="true"></i>
					<p>Artist</p>
				</button>
			</NavLink>
		</div>
		<div>
			<NavLink to="/playlist" activeClassName="active">
				<button>
					<i className="fa fa-music" aria-hidden="true"></i>
					<p>Playlists</p>
				</button>
			</NavLink>
		</div>
		<div>
			<NavLink to="/search" activeClassName="active">
				<button>
					<i className="fa fa-search" aria-hidden="true"></i>
					<p>Search</p>
				</button>
			</NavLink>
		</div>
	</nav>
);

export default Choose
