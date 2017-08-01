import React from 'react';

// Components
import Login from './../components/login.jsx';
import Title from './../components/title.jsx';
import PlayerAndProgress from './../components/playerAndProgress.jsx';
import Search from './../components/search.jsx';
import Choose from './../components/choose.jsx';
import Footer from './../components/footer.jsx';
import MainMiddle from './../components/mainMiddle.jsx';

class Template extends React.Component {
  render() {
		let path = this.props.children.props.location.pathname;
    return <div className="NavyPlayer">
        <div className='desktop'>
          <Login />
          <Search />
          <Title />
          <MainMiddle />
          <PlayerAndProgress />
          <Footer />
        </div>
        <div className='mobile'>
					<div className={path}>
							{this.props.children}
							<PlayerAndProgress />
							<Choose />
							<Footer />
			     </div>
        </div>
      </div>
  }
}

export default Template;
