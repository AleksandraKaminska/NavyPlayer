import React from 'react';

class Progress extends React.Component {
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
