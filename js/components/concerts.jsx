import React from 'react';
import Axios from 'axios';

class Concerts extends React.Component {
  showMore = (event) => {
    console.log(event.target);
  }

  render(){
    let li = this.props.concerts.map((elem, i) => <li onClick={this.showMore} key={i}>{elem.venue.name}</li>)
    return <div style={{display: 'none'}} className="concerts">
      <ul>{li}</ul>
    </div>
  }
}

export default Concerts
