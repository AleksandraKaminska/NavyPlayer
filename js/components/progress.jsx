import React from 'react';

class Progress extends React.Component {
  showPosition = () => {
    DZ.Event.subscribe('player_position', e => {
      let min = Math.floor(e[0] / 60);
      let s = Math.floor(e[0] % 60);
      let time = min + ':' + (s < 10 ? '0' : '') + s;

      document.querySelector('.elapsed').innerText = time;

      min = Math.floor(e[1] / 60);
      s = Math.floor(e[1] % 60);
      time = min + ':' + (s < 10 ? '0' : '') + s;
      
      document.querySelector('.duration').innerText = time;
      document.querySelector('progress').setAttribute("value", e[0] / e[1]);
    });
  }

  changeSeek = (event) => {
    DZ.player.seek(event.clientX / window.innerWidth * 100);
  }

  render() {
    this.showPosition();
    return(
      <div className="progress">
        <progress onClick={this.changeSeek} value={0} max="1"></progress>
        <div className='time'>
          <span className="elapsed">00:00</span>
          <span className="pipe"> &#124; </span>
          <span className="duration">00:00</span>
        </div>
      </div>
    )
  }
}

export default Progress
