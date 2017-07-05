import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from './appContainer.jsx'

import "./style.scss";

document.addEventListener('DOMContentLoaded', function(){
  class App extends React.Component {
    render () {
      return (
        <AppContainer />
      );
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});
