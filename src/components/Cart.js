import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import ItemCart from './ItemCart';

class Cart extends React.Component {
  state = {
    cartItem: [],
    trueFalse: false,
    cartQuanti: 0,
  };

  componentDidMount() {
    this.getCartQuant();
    const getItem = localStorage.getItem('cartProducts');
    const json = JSON.parse(getItem);
    this.setState({ cartItem: json }, () => {
      if (json !== null) {
        this.setState({ trueFalse: true });
      }
    });
  }

  getCartQuant = () => {
    const cartItens = localStorage.getItem('cartProducts')
      ? JSON.parse(localStorage.getItem('cartProducts')) : [];
    const countQuant = (arr) => {
      let finalArr = 0;
      if (arr === []) return 0;
      arr.forEach((item) => {
        finalArr += item.quant;
      });
      return finalArr;
    };
    this.setState({ cartQuanti: countQuant(cartItens) });
  };

  render() {
    const { cartItem, trueFalse, cartQuanti } = this.state;
    const emptyCartOrCart = cartItem === null;
    const cartHeader = true;
    return (
      <div>
        <Header itensQuanti={ cartQuanti } cartHeader={ cartHeader } />
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
