import React from 'react';

// Redux
import { connect } from 'react-redux';
import store from './../store';

import Similar from './similar.jsx';

class SimilarArtists extends React.Component {
  render(){
      let li = this.props.similar.map((elem, i) => <Similar key={i} elem={elem} />);
      return <section id='similar'>
          <h1>Similar Artists</h1>
          <article>
            <ul>{li}</ul>
          </article>
      </section>
  }
}

const mapStateToProps = store => {
  return {
    similar: store.similar
  };
};

export default connect(mapStateToProps)(SimilarArtists);
