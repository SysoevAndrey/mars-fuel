import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import StartPage from './components/StartPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/start" component={StartPage} />
          <Route path="/">
            <Redirect to="/start" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
