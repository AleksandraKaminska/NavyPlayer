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
        <Title title={this.props.track.title_short} artist={this.props.track.artist.name} />
        <MainMiddle track={this.props.track} />
        <PlayerAndProgress
          randomTrack={this.props.randomTrack}
          track={this.props.track} />
        <Choose />
        <Footer />
      </div>
  }
}

export default MobileMain
