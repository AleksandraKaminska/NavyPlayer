import React from 'react';
import	{	Router,
		Route,
		Link,
		IndexLink,
		IndexRoute,
		hashHistory
}	from	'react-router';

import MainMiddle from './mainMiddle.jsx';
import PlayerAndProgress from './playerAndProgress.jsx';
import Choose from './choose.jsx';
import Footer from './footer.jsx';

class MobileArtist extends React.Component {
  render() {
    return <div className="mobileArtist">
        <MainMiddle
					artistInfo={this.props.route.artistInfo}
					albums={this.props.route.albums}
					concerts={this.props.route.concerts} />
        <PlayerAndProgress
          randomTrack={this.props.route.randomTrack}
          track={this.props.route.track} />
        <Choose />
        <Footer />
      </div>
  }
}

export default MobileArtist
