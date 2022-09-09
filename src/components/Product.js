import React from 'react';
import { Link } from 'react-router-dom';
import { getProductDetails } from '../services/api';
import PropTypes from 'prop-types';

class Product extends React.Component {
  state = {
    details: {},
    attributes: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const details = await getProductDetails(id);
    const { attributes } = details;
    this.setState({
      details,
      attributes,
    });
  }

  render() {
    const { details, attributes } = this.state;
    const { title, price, thumbnail } = details;
    return (
      <div data-testid="product">
        <p data-testid="product-detail-name">{ title }</p>
        <p data-testid="product-detail-price">{ price }</p>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <ul>
          {attributes.map((element) => (
            <li key={ element.name }>{`${element.name}: ${element.value_name}`}</li>
          ))}
        </ul>
        <Link to="/cart">
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Enviar para o carrinho
          </button>
        </Link>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Product;
