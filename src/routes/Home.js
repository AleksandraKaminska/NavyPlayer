import React, { Component } from 'react';
<<<<<<< HEAD

=======
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
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
<<<<<<< HEAD
    let path = window.location.pathname;
=======
        let path = window.location.pathname;
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
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