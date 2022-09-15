import React from 'react';
import './List.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import List from './components/List';
import Cart from './components/Cart';
import Product from './components/Product';
import Checkout from './components/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ List } />
        <Route path="/cart" component={ Cart } />
        <Route exact path="/checkout" component={ Checkout } />
        <Route path="/product/:id" render={ (props) => <Product { ...props } /> } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
