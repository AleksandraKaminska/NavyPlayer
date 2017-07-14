import React from 'react';
import	{	Router,
		Route,
		Link,
		IndexLink,
		IndexRoute,
		hashHistory
}	from	'react-router';

class Concerts extends React.Component {
  render(){
      let concerts = '';
      let li = this.props.concerts.map((elem, i) => {
        if (typeof(elem.offers[0]) != 'undefined') {
          concerts = <h2>Concerts</h2>;
          return <a href={elem.offers[0].url} target="_blank" key={i}>
            <li>{elem.venue.country} {elem.datetime.slice(0, 10)}</li>
          </a>
        }
      });
      return <div className='concerts'>
        {concerts}
        <div className="list">
          <ul>{li}</ul>
        </div>
      </div>
  }
}

export default Concerts
