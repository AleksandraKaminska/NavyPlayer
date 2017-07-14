import React from 'react';
import	{	Router,
		Route,
		Link,
		IndexLink,
		IndexRoute,
		hashHistory
}	from	'react-router';

class Footer extends React.Component {
  render(){
    return <div className="footer">
        <p>
          Powered by Deezer <a href="http://www.deezer.com/pl/" target='_blank'>
            <img src="images/DZ_Logo.png" alt='Deezer Logo'/>
          </a>
        </p>
      </div>
  }
}

export default Footer
