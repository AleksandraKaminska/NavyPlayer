import React from 'react';

class Progress extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       elapsed: '00:00',
       duration: '00:00',
       position: 0
     };
  }

  showPosition = () => {
    DZ.Event.subscribe('player_position', function(e){
       document.querySelector('.elapsed').innerText =
         (Math.floor(e[0] / 60) + ':' + (e[0] % 60 < 10 ? '0' : '') + Math.floor(e[0] % 60));
       document.querySelector('.duration').innerText =
         (Math.floor(e[1] / 60) + ':' + Math.floor(e[1] % 60) + (e[1] % 60 < 10 ? '0' : ''));
       document.querySelector('progress').setAttribute("value", e[0] / e[1]);
    });
  }

  changeSeek = (event) => {
    DZ.player.seek(event.clientX/window.innerWidth* 100);
  }

  render() {
    this.showPosition();
    return(
      <div className="progress">
        <progress onClick={this.changeSeek} value={0} max="1"></progress>
        <div className='time'>
          <span className="elapsed">{this.state.elapsed}</span>
          <span className="pipe"> &#124; </span>
          <span className="duration">{this.state.duration}</span>
        </div>
      </div>
    )
  }
}

export default Progress
