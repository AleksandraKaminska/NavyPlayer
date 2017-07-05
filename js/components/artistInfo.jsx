import React from 'react';
import Axios from 'axios';

class ArtistInfo extends React.Component {
  render() {
    return <div className="artistInfo">
        <img src={this.props.artistInfo.thumb_url} />
        <div>
          <p>
            {this.props.artistInfo.name}
          </p>
          <a href={this.props.artistInfo.facebook_page_url} target='_blank'>
            {this.props.artistInfo.facebook_page_url ?
              <i className="fa fa-facebook-square" aria-hidden="true"></i> : null}
            <span>{this.props.artistInfo.facebook_page_url}</span>
          </a>
        </div>
        <a><p>Show Concerts</p></a>
      </div>
  }
}

export default ArtistInfo
