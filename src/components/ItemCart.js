import React from 'react';
import PropTypes from 'prop-types';

class ItemCart extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div>
        <h1 data-testid="shopping-cart-product-name">{item.title}</h1>
        <h2 data-testid="shopping-cart-product-quantity">{item.quant}</h2>
      </div>
    );
  }
}

ItemCart.propTypes = {
  item: PropTypes.objectOf.isRequired,
};

export default ItemCart;
