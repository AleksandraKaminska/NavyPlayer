import React from 'react';
import	{	Router,
		Route,
		Link,
		IndexLink,
		IndexRoute,
		hashHistory
}	from	'react-router';

import Search from './search.jsx';
import PlayerAndProgress from './playerAndProgress.jsx';
import Choose from './choose.jsx';
import Footer from './footer.jsx';

class MobileSearch extends React.Component {
  render() {
    return <div className="mobile mobileSearch">
        <Search />
        <PlayerAndProgress randomTrack={this.randomTrack} />
        <Choose />
        <Footer />
      </div>
  }
}

export default MobileSearch;
