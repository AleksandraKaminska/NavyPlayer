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
  render() {
    return(
      <div className="progress">
        <progress value={this.state.position} max="1"></progress>
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
