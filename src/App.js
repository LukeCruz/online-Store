import React from 'react';
import './List.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import List from './components/List';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ List } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
