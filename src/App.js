import React from 'react';
import './List.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import List from './components/List';
import Cart from './components/cart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/cart" component={ Cart } />
        <Route path="/" component={ List } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
