import React from 'react';
import PropTypes from 'prop-types';

class ItemCart extends React.Component {
  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <div className="cart-item">
        <img src={ item.thumbnail } alt={ item.title } />
        <h4 data-testid="shopping-cart-product-name">{item.title}</h4>
        <div>
          <p>Quantidade: </p>
          <span data-testid="shopping-cart-product-quantity">{item.quant}</span>
        </div>
      </div>
    );
  }
}

ItemCart.propTypes = {
  item: PropTypes.shape({ root: PropTypes.string }),
}.isRequired;

export default ItemCart;
