import React from 'react';

class Title extends React.Component {
  render() {
    return <div className="title">
      <div>
        <h3>{this.props.title} - {this.props.artist}</h3>
      </div>
    </div>
  }
}

export default Title
