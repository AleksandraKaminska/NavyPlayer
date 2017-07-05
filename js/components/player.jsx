import React from 'react';

class Player extends React.Component {


  render() {
    return <div className="player">
        <button onClick={this.props.playTrack}>Play a song</button>
        <button onClick={() => {DZ.player.play();}}>play</button>
        <button onClick={() => {DZ.player.pause();}}>pause</button>

      <div className="playerMain">
        <button onClick={this.props.playOrPause}>
          <i className={this.props.playStatus === 'PLAYING' ? 'fa fa-pause' : 'fa fa-play'}></i>
        </button>
        <button onClick={this.props.randomTrack}>
          <i className="fa fa-random"></i>
        </button>
      </div>
    </div>
  }
}

export default Player
