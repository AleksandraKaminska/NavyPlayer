import React from 'react';
import { connect } from 'react-redux';
import store from './../store';

class Concerts extends React.Component {
  render(){
      let concerts = '';
      let li = this.props.concerts.map((elem, i) => {
        if (typeof(elem.offers[0]) != 'undefined') {
          concerts = <h2>Concerts</h2>;
          return <a href={elem.offers[0].url} target="_blank" rel="noopener" key={i}>
            <li>{elem.venue.country} {elem.datetime.slice(0, 10)}</li>
          </a>
        }
      });
      return <section id='concerts'>
        <div className='concerts'>
          {concerts}
          <div className="list">
            <ul>{li}</ul>
          </div>
        </div>
      </section>
  }
}

const mapStateToProps = function(store) {
  return {
    concerts: store.concerts
  };
};

export default connect(mapStateToProps)(Concerts);
