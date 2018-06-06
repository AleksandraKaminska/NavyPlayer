import React, { Component } from 'react';
import Login from './../components/Login';
import Nav from './../components/Nav';
import Title from './../components/Title';
import Player from './../components/Player';
import Search from './../components/Search';
import Choose from './../components/Choose';
import Footer from './../components/Footer';
import Main from './../components/Main';

export default class Home extends Component {
    render() {
        let path = window.location.pathname.match(/(playlist|simialar|albums|artist|search)(?!\/\d+)/);
        return (
            <div className="NavyPlayer">
			     <div className={path ? '/' + path[1] : '/'}>
                    <Nav />
                    <Login />
                    <Search />
                    <Title />
                    <Main />
                    <Player />
          			<Choose />
          			<Footer />
		        </div>
            </div>
        );
    }
}