import React from 'react';

// Redux
import store from './../store';
import { connect } from 'react-redux';

import Cover from './cover.jsx';

class Main extends React.Component {
  render() {
    return <div>
        <section id="title_mobile">
          <h2>{this.props.title} - {this.props.artist}</h2>
        </section>
				<Cover />
      </div>
  }
}

const mapStateToProps = store => {
  return {
    title: store.track.title_short,
    artist: store.track.artist.name
  };
};

export default connect(mapStateToProps)(Main);
