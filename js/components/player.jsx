import React from 'react';

// Redux
import { connect } from 'react-redux';
import { changeTrackAction, prevTrackAction } from './../actions/index.js';
import store from './../store';

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
      isPlaying: true
    }, () => {
      DZ.player.pause();
      this.props.randomTrack();
    });
  }

  rewind = () => {
    this.setState({
      isPlaying: true
    }, () => {
      DZ.player.pause();
      if(this.props.prev.title === '') {
        this.props.randomTrack();
      }
      else {
        store.dispatch(prevTrackAction(this.props.track));
        store.dispatch(changeTrackAction(this.props.prev));
        DZ.player.playTracks([this.props.prev.id]);
      }
    });
  }

  render() {
    return <div className="player">
      <div className="playerMain">
        <button onClick={this.rewind}>
          <img src="./images/rewind.svg" alt='rewind'/>
        </button>
        <button onClick={this.changeIsPlaying} id='playOrPause'>
          <img src={this.state.isPlaying ? './images/pause.png' : './images/play.png'} alt='play or pause'/>
        </button>
        <button onClick={this.changeTrack}>
          <img src="./images/forward.svg" alt='forward'/>
        </button>
      </div>
    </div>
  }
}

const mapStateToProps = store => {
  return {
    track: store.track,
    prev: store.prev
  };
};

export default connect(mapStateToProps)(Player);
