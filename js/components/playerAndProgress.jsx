import React from 'react';

import Player from './player.jsx';
import Progress from './progress.jsx';
import SmallCover from './smallCover.jsx';

class PlayerAndProgress extends React.Component {
  render(){
    return <div className="playerAndProgress">
				<SmallCover />
        <Player randomTrack={this.props.randomTrack} />
        <Progress />
    </div>
  }
}

export default PlayerAndProgress
