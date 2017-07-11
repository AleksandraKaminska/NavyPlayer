import React from 'react';

class Concerts extends React.Component {
  render(){
    if(this.props.concerts.length) {
      let li = this.props.concerts.map((elem, i) =>
        <a href={elem.offers[0].url} target="_blank" key={i}>
          <li>{elem.venue.country} {elem.datetime.slice(0, 10)} {elem.offers[0].status}</li>
        </a>)
      return <div className='show'>
        <h2>Concerts</h2>
        <div className="concerts">
          <ul>{li}</ul>
        </div>
      </div>
    } else {
      return null;
    }
  }
}

export default Concerts
