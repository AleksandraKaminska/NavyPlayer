import React from 'react';

class Concerts extends React.Component {
  render(){
      let li = this.props.concerts.map((elem, i) => {
        if (typeof(elem.offers[0]) != 'undefined') {
          return <a href={elem.offers[0].url} target="_blank" key={i}>
            <li>{elem.venue.country} {elem.datetime.slice(0, 10)}</li>
          </a>
        }
      });
      return <div className='show'>
        <h2>Concerts</h2>
        <div className="concerts">
          <ul>{li}</ul>
        </div>
      </div>
  }
}

export default Concerts
