import React from 'react';

class Footer extends React.Component {
  login = () => {
    DZ.login(response => {
	    if (response.authResponse) {
		    DZ.api('/user/me', response => {
			    console.log('Success.');
		    });
	    } else {
		      console.log('User cancelled login or did not fully authorize.');
	      }
    }, {perms: 'basic_access,email'});
  }

  render(){
    return <div className="footer">
        <p onClick={this.login}>
          Powered by Deezer <a href="http://www.deezer.com/pl/" target='_blank'>
            <img src="images/DZ_Logo.png" alt='Deezer Logo'/>
          </a>
        </p>
      </div>
  }
}

export default Footer
