import React from 'react';
import	{	Router,
		Route,
		Link,
		IndexLink,
		IndexRoute,
		hashHistory
}	from	'react-router';

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
