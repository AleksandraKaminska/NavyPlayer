import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button } from 'antd';
import './App.scss';

declare global {
  interface Window {
    DZ: object;
  }
}

const { DZ } = window

function Top() {
  return <h2>TOP</h2>;
}

function Artist() {
  return <h2>Artist</h2>;
}

function Search() {
  return <h2>Search</h2>;
}

const App = () =>
{
  const [repeat, setRepeat] = useState(false);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/artist">
            <Artist />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route>
            <Top />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
