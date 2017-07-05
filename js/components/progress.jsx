import React from 'react';

class Progress extends React.Component {
  render() {
    return(
      <div className="progress">
        <progress value={this.props.position} max="1"></progress>
        <div className='time'>
          <span className="elapsed">{this.props.elapsed}</span>
          <span className="pipe"> &#124; </span>
          <span className="duration">{this.props.duration}</span>
        </div>
      </div>
    )
  }
}

export default Progress
