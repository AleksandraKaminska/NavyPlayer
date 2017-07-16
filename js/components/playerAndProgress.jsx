import React from 'react';

import Player from './player.jsx';
import Progress from './progress.jsx';
import SmallCover from './smallCover.jsx';

class PlayerAndProgress extends React.Component {
  render(){
    return <div className="playerAndProgress">
				<SmallCover
					track={this.props.track}
					title={this.props.title}
					artist={this.props.artist} />
        <Player
          randomTrack={this.props.randomTrack}
          track={this.props.track} />
        <Progress />
    </div>
  }
}

export default PlayerAndProgress
