import React from 'react';
import PropTypes from 'prop-types';

class ItemCart extends React.Component {
  state = {
    count: 0,
    remove: true,
  };

  componentDidMount() {
    const { item } = this.props;
    const { quant } = item;
    this.setState({ count: quant });
  }

  removeItem = () => {
    const { item } = this.props;
    const getItem = localStorage.getItem('cartProducts');
    const json = JSON.parse(getItem);
    const filter = json.filter((e) => e.title !== item.title);
    localStorage.setItem('cartProducts', JSON.stringify(filter));
    this.setState({ remove: false });
  };

  verifyAvaliabeQuantity = (elem) => {
    const cartItens = localStorage.getItem('cartProducts')
      ? JSON.parse(localStorage.getItem('cartProducts')) : [];
    console.log(cartItens.length);
    if (cartItens.length === 0) return true;
    const veryfiCart = cartItens.filter((item) => item.id === elem.id);
    console.log(veryfiCart);
    if (veryfiCart.length === 1) {
      console.log('jatanocarro');
      console.log(veryfiCart);
      if (veryfiCart[0].quant === veryfiCart[0].available_quantity) {
        return false;
      }
    }
    return true;
  };

  handleClickAdd = () => {
    const { item } = this.props;
    if (!this.verifyAvaliabeQuantity(item)) return;
    const getItem = localStorage.getItem('cartProducts');
    const json = JSON.parse(getItem);
    json.forEach((e) => {
      if (e.title === item.title) {
        e.quant += 1;
        localStorage.setItem('cartProducts', JSON.stringify(json));
        this.setState({ count: e.quant });
      }
    });
  };

  handleClickRemove = () => {
    const { item } = this.props;
    const getItem = localStorage.getItem('cartProducts');
    const json = JSON.parse(getItem);
    json.forEach((e) => {
      if (e.title === item.title && e.quant > 1) {
        e.quant -= 1;
        localStorage.setItem('cartProducts', JSON.stringify(json));
        this.setState({ count: e.quant });
      }
    });
  };

  render() {
    const { item } = this.props;
    const { count, remove } = this.state;
    return (!remove ? null : (
      <div className="cart-item">
        <button
          onClick={ this.removeItem }
          type="button"
          data-testid="remove-product"
        >
          Remover Produto
        </button>
        <img src={ item.thumbnail } alt={ item.title } />
        <h4 data-testid="shopping-cart-product-name">{item.title}</h4>
        <div>
          <p>Quantidade: </p>
          <button
            onClick={ this.handleClickRemove }
            data-testid="product-decrease-quantity"
            type="button"
          >
            -
          </button>
          <span data-testid="shopping-cart-product-quantity">{count}</span>
          <button
            onClick={ this.handleClickAdd }
            data-testid="product-increase-quantity"
            type="button"
          >
            +
          </button>
        </div>
      </div>
    ));
  }
}

ItemCart.propTypes = {
  item: PropTypes.shape({ root: PropTypes.string }),
}.isRequired;

export default ItemCart;
