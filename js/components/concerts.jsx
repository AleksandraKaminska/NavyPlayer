import React from 'react';

class Concerts extends React.Component {
  render(){
    let li = this.props.concerts.map((elem, i) =>
      <li style={{cursor: 'pointer'}}key={i}>{elem.venue.country} {elem.datetime.slice(0, 10)} <a
        href={elem.offers[0].url} style={{color: 'white', textDecoration:'none'}} target="_blank">
          {elem.offers[0].status}
        </a>
      </li>)
    return <div style={{display: this.props.display}} className="concerts">
      <ul style={{listStyle: 'none'}}>{li}</ul>
    </div>
  }
}

export default Concerts
