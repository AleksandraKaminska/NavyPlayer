import React from 'react';

class Title extends React.Component {
  render() {
    return <div className="title">
      <div>
        <h3>{this.props.title_short}</h3>
      </div>
      <div>
        <h4>{this.props.artist}</h4>
      </div>
    </div>
  }
}

export default Title
