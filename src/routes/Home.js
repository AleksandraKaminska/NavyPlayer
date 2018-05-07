import React, { Component } from 'react';
import Login from './../components/login';
import Nav from './../components/nav';
import Title from './../components/title';
import PlayerAndProgress from './../components/playerAndProgress';
import Search from './../components/search';
import Choose from './../components/choose';
import Footer from './../components/footer';
import MainMiddle from './../components/mainMiddle';

export default class Home extends Component {
    render() {
        let path = window.location.pathname;
        return (
            <div className="NavyPlayer">
			     <div className={path}>
                    <Nav />
                    <Login />
                    <Search />
                    <Title />
                    <MainMiddle />
                    <PlayerAndProgress />
          			<Choose />
          			<Footer />
		        </div>
            </div>
        );
    }
}