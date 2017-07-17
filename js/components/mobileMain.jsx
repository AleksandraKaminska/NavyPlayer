import React from 'react';
import	{	Router,
		Route,
		Link,
		IndexLink,
		IndexRoute,
		hashHistory
}	from	'react-router';

import Title from './title.jsx';
import MainMiddle from './mainMiddle.jsx';
import PlayerAndProgress from './playerAndProgress.jsx';
import Choose from './choose.jsx';
import Footer from './footer.jsx';

class MobileMain extends React.Component {
  render() {
    return <div className="mobileMain">
        <Title title={this.props.route.track.title_short} artist={this.props.route.track.artist.name} />
        <MainMiddle track={this.props.route.track} />
        <PlayerAndProgress
          randomTrack={this.props.route.randomTrack}
          track={this.props.route.track} />
        <Choose />
        <Footer />
      </div>
  }
}

export default MobileMain
