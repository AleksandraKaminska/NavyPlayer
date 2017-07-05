import React from 'react';

class Concerts extends React.Component {
  showMore = (event) => {
    console.log(event.target);
  }

  render(){
    let li = this.props.concerts.map((elem, i) => <li onClick={this.showMore} key={i}>{elem.venue.name}</li>)
    return <div style={{display: this.props.display}} className="concerts">
      <ul style={{listStyle: 'none'}}>{li}</ul>
    </div>
  }
}

export default Concerts
