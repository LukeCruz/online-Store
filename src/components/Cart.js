import React from 'react';
import ItemCart from './ItemCart';

class Cart extends React.Component {
  state = {
    cartItem: []
  }

  componentDidMount () {
    const getItem = localStorage.getItem("cartProducts")
    const json = JSON.parse(getItem)
    this.setState({cartItem: json})
  }
  render() {
    const { cartItem } = this.state
    return (
      <div>
        <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
        {
          cartItem.map((e) => {
            return (
              <ItemCart item={e}/>
            )
          })
        }
      </div>
    );
  }
}

export default Cart;
