import React from 'react';

import Player from './player.jsx';
import Progress from './progress.jsx';

class PlayerAndProgress extends React.Component {
  render(){
    return <div className="playerAndProgress">
        <Player
          playOrPause={this.props.playOrPause}
          playStatus={this.props.playStatus}
          randomTrack={this.props.randomTrack}
          track={this.props.track}
          playTrack={this.props.playTrack} />
        <Progress
          elapsed={this.props.elapsed}
          duration={this.props.duration}
          position={this.props.position}/>
    </div>
  }
}

export default PlayerAndProgress
