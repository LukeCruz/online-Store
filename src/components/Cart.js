import React from 'react';
import ItemCart from './ItemCart';

class Cart extends React.Component {
  state = {
    cartItem: [],
    trueFalse: false,
  };

  componentDidMount() {
    const getItem = localStorage.getItem('cartProducts');
    const json = JSON.parse(getItem);
    this.setState({ cartItem: json }, () => {
      console.log(typeof json, json);
      if (json !== null) {
        this.setState({ trueFalse: true });
      }
    });
  }

  render() {
    const { cartItem, trueFalse } = this.state;
    const emptyCartOrCart = cartItem === null;
    return (
      <div>
        {emptyCartOrCart
          ? <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
          : trueFalse && cartItem.map((e) => (
            <ItemCart item={ e } key={ e.title } />
          ))}
      </div>
    );
  }
}

export default Cart;
