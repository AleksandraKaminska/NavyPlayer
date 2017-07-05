import React from 'react';

class Footer extends React.Component {
  render(){
    return(
      <div className="footer">
        <p>
          Powered by Deezer <iframe
          allowTransparency="true" scrolling="no" frameBorder="no"
          src="https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2F&color=orange_transparent&size=32"
          style={{width: '32px', height: '32px', verticalAlign: 'middle'}}></iframe>
        </p>
      </div>
    )
  }

}

export default Footer
