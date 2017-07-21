import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true,
    }
  }

  changeIsPlaying = () => {
    if (this.state.isPlaying === false) {
      this.setState({
        isPlaying: true
      }, () => {
        DZ.player.play();
      });
    } else {
      this.setState({
        isPlaying: false
      }, () => {
        DZ.player.pause();
      });
    }
  }

  changeTrack = () => {
    this.setState({
      isPlaying: false,
      counter: 0
    }, () => {
      DZ.player.pause();
      this.props.randomTrack();
    });
  }

  render() {
    return <div className="player">
      <div className="playerMain">
        <button onClick={this.changeIsPlaying}>
          <img src={this.state.isPlaying ? './images/pause.png' : './images/play.png'} alt='play or pause'/>
        </button>
        <button onClick={this.changeTrack}>
          <img src="./images/forward.svg" alt='forward'/>
        </button>
      </div>
    </div>
  }
}

export default Player
