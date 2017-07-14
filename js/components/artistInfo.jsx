import React from 'react';
import	{	Router,
		Route,
		Link,
		IndexLink,
		IndexRoute,
		hashHistory
}	from	'react-router';

import Concerts from './concerts.jsx';

class ArtistInfo extends React.Component {
  render() {
    return <div className="artistInfo">
        <div className='info'>
          <img src={this.props.artistInfo.thumb_url} />
          <div>
            <p>{this.props.artistInfo.name}</p>
            <a href={this.props.artistInfo.facebook_page_url} target='_blank'>
              {this.props.artistInfo.facebook_page_url ?
                <i className="fa fa-facebook-square" aria-hidden="true"></i> : null}
              <span>{this.props.artistInfo.facebook_page_url}</span>
            </a>
          </div>
        </div>
        <Concerts concerts={this.props.concerts}/>
      </div>
  }
}

export default ArtistInfo
