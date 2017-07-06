import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      counter: 0
    }
  }

  changeIsPlaying = () => {
    if (this.state.counter === 0) {
      this.setState({
        isPlaying: true,
        counter: 1
      });
      this.props.playTrack();
    } else {
      if (this.state.isPlaying === false) {
        this.setState({
          isPlaying: true
        });
        DZ.player.play();
      } else {
        this.setState({
          isPlaying: false
        });
        DZ.player.pause();
      }
    }
  }

  changeTrack = () => {
    this.setState({
      isPlaying: false,
      counter: 0
    });
    DZ.player.pause();
    this.props.randomTrack();
  }

  render() {
    return <div className="player">
      <div className="playerMain">
        <button onClick={this.changeIsPlaying}>
          <i className={this.state.isPlaying ? 'fa fa-pause-circle' : 'fa fa-play-circle'} aria-hidden="true"></i>
        </button>
        <button onClick={this.changeTrack}>
          <i className="fa fa-step-forward" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  }
}

export default Player
