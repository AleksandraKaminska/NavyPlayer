import React from 'react';

class Cover extends React.Component {
  render(){
    const CoverStyle = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
      url(${this.props.track.album.cover_big})`
    }
    return <div className="cover" style={CoverStyle}></div>
  }
}

export default Cover
