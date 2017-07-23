import React from 'react';

// Redux
import { connect } from 'react-redux';
import { changeTrackAction } from './../actions/index.js';
import store from './../store';

class Album extends React.Component {
  render(){
      return <li
        id={this.props.elem.id}>
          <img src={this.props.elem.cover_small}/>
          <p>{this.props.elem.title}</p>
      </li>
  }
}

const mapStateToProps = store => {
  return {
    track: store.track
  };
};

export default connect(mapStateToProps)(Album);
