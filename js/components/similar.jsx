import React from 'react';

class Similar extends React.Component {
  render(){
      return <li>
          <img src={this.props.elem.picture_small}/>
          <p>{this.props.elem.name}</p>
      </li>
  }
}

export default Similar;
