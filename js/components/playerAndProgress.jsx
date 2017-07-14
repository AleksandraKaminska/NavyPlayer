import React from 'react';
import	{	Router,
		Route,
		Link,
		IndexLink,
		IndexRoute,
		hashHistory
}	from	'react-router';

import Player from './player.jsx';
import Progress from './progress.jsx';

class PlayerAndProgress extends React.Component {
  render(){
    return <div className="playerAndProgress">
        <Player
          randomTrack={this.props.randomTrack}
          track={this.props.track} />
        <Progress />
    </div>
  }
}

export default PlayerAndProgress
