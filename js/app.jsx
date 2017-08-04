import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import {Provider} from 'react-redux';
import store from './store';

import AppContainer from './appContainer.jsx'

$(() => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    document.getElementById('app')
  );
});
