import React from 'react';
import Concerts from './concerts.jsx';

class ArtistInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none'
    }
  }

  show = () => {
    this.setState({
      display: (this.state.display === 'none') ? 'block' : 'none'
    });
  }

  hasConcerts = () => {
    if(this.props.concerts.length) {
      return <div className='show'>
        <h2 onClick={this.show} style={{cursor: 'pointer'}}>Show Concerts</h2>
        <Concerts display={this.state.display} concerts={this.props.concerts} />
      </div>
    } else {
      return <div className='show'>
        <h2>We don't have any concerts</h2>
      </div>;
    }
  }

  render() {
    return <div className="artistInfo">
        <div className='info'>
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
        </div>
        {this.hasConcerts()}
      </div>
  }
}

export default ArtistInfo
