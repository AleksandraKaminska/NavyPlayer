import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: !DZ.player.isPlaying()
    }
  }

  changeIsPlaying = () => {
    if (this.state.isPlaying) {
      this.setState({
        isPlaying: false
      }, () => DZ.player.pause());
    } else {
      this.setState({
        isPlaying: true
      }, () => DZ.player.play());
    }
  }

  changeTrack = () => {
    this.setState({
      isPlaying: true,
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
