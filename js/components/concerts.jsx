import React from 'react';

class Concerts extends React.Component {
  render(){
    let li = this.props.concerts.map((elem, i) =>
      <li style={{cursor: 'pointer'}} key={i}>{elem.venue.country} {elem.datetime.slice(0, 10)} <a
        href={elem.offers[0].url} style={{color: 'white', textDecoration:'none'}} target="_blank">
          {elem.offers[0].status}
        </a>
      </li>)
    if(this.props.concerts.length) {
      return <div className='show'>
        <h2>Concerts</h2>
        <div className="concerts">
          <ul style={{listStyle: 'none', maxHeight: '40vh', overflowY: 'auto'}}>{li}</ul>
        </div>
      </div>
    } else {
      return null;
    }
  }
}

export default Concerts
