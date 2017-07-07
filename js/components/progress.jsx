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

  showTime = (time) => {
     let min = Math.floor(time / 60);
     let s = time % 60;
     return (min < 10 ? '0' : '') + min + ':' + (s < 10 ? '0' : '') + s;
  }

  showPosition = () => {
    DZ.Event.subscribe('player_position', function(e){
       document.querySelector('.duration').innerText = (Math.floor(e[1] / 60) + ':' + e[1]%60);
       document.querySelector('.elapsed').innerText = (Math.floor(e[0] / 60) + ':' + Math.floor(e[0]%60));
       document.querySelector('progress').setAttribute("value", e[0]/e[1]);
    });
  }

  render() {
    this.showPosition();
    return(
      <div className="progress">
        <progress value={0} max="1"></progress>
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
