import React from 'react';
import { NavLink } from 'react-router-dom';

const Choose = () => (
<<<<<<< HEAD
    <nav className="choose">
=======
  <nav className="choose">
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
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
