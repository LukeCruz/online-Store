import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
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
      if (json !== null) {
        this.setState({ trueFalse: true });
      }
    });
  }

  render() {
    const { cartItem, trueFalse } = this.state;
    const emptyCartOrCart = cartItem === null;
    const cartHeader = true;
    return (
      <div>
        <Header cartHeader={ cartHeader } />
        <div className="cart-container">
          <h2> Seu Carrinho</h2>
          {emptyCartOrCart
            ? <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
            : trueFalse && cartItem.map((e) => (
              <div key={ e.title }>
                <ItemCart item={ e } key={ e.title } />
              </div>
            ))}
          <Link to="/checkout">
            <button
              type="button"
              data-testid="checkout-products"
            >
              Finalizar Compra
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Cart;
