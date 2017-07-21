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
        <MainMiddle />
        <PlayerAndProgress />
        <Choose />
        <Footer />
      </div>
  }
}

export default MobileArtist
